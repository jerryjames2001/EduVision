import Note from "../model/notes.model.js"; 

export const saveNote = async (req, res) => {
  try {

    const { content, moduleName, tags, isShared } = req.body;
    const userId = req.userId; 

    if (!content || !moduleName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const note = new Note({
      content,
      moduleName,
      tags,
      isShared,
      userId,  
    });

    const savedNote = await note.save();
    res.status(201).json({ success: true, note: savedNote });

  } catch (error) {
    console.error("Save Note Error:", error); 
    res.status(500).json({ success: false, message: error.message });
  }
};
