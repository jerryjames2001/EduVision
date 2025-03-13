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


export const getUserNotes = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from token in verifyToken middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const notes = await Note.find({ userId }).sort({ createdAt: -1 }); // Fetch notes, newest first
    res.status(200).json({ success: true, notes });

  } catch (error) {
    console.error("Fetch Notes Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;  // Get note ID from request params
    const userId = req.userId;  // Extract userId from token middleware

    // Check if the note exists and belongs to the authenticated user
    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
    }

    // Delete the note
    await Note.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    res.status(500).json({ success: false, message: "Error deleting note", error: error.message });
  }
};
