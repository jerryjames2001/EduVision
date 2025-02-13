import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("files", 10);

const key = process.env.Key1;
const endpoint = process.env.Endpoint;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

const processImageWithAzureOCR = async (imageBuffer) => {
  try {
    const result = await computerVisionClient.readInStream(imageBuffer);
    const operation = result.operationLocation.split("/").slice(-1)[0];

    // Wait for OCR to complete
    let response;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      response = await computerVisionClient.getReadResult(operation);
    } while (response.status !== "succeeded");

    return response.analyzeResult.readResults.map((page) =>
      page.lines.map((line) => line.words.map((w) => w.text).join(" ")).join("\n")
    ).join("\n");
  } catch (error) {
    console.error("Azure OCR Error:", error);
    throw new Error("Failed to process image with Azure OCR");
  }
};

export const uploadFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("File Upload Error:", err);
        return res.status(500).json({ success: false, message: "File upload failed" });
      }
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
      }

      // Process each uploaded file
      const extractedTexts = await Promise.all(
        req.files.map(async (file) => {
          return await processImageWithAzureOCR(file.buffer);
        })
      );

      return res.json({ success: true, extractedTexts });
    });
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

