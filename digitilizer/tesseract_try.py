import cv2
from pytesseract import pytesseract
pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def rescale_frame(frame, scale):
    """Rescale frame to display in a good way."""
    width = int(frame.shape[1] * scale)
    height = int(frame.shape[0] * scale)
    dimensions = (width, height)
    return cv2.resize(frame, dimensions, interpolation=cv2.INTER_AREA)
# Load the image
image_path = "./test_images/jaison.jpg"  # Replace with your image path
image = cv2.imread(image_path)
image = rescale_frame(image, 0.25)


cv2.imshow("Image", image)

gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

_, thresh_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

processed_image = cv2.medianBlur(thresh_image, 1)

cv2.imshow("Processed Image", processed_image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Perform OCR on the preprocessed image
extracted_text = pytesseract.image_to_string(processed_image)

# Print the extracted text
print("Extracted Text:")
print(extracted_text)
