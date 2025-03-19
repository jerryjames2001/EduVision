import e from 'express';
import Note from '../model/notes.model.js';
import Community from '../model/communityNote.model.js'

export const shareNote = async (req, res) => {
    try {
        const { noteId, userEmail, grade, subject, tags } = req.body;

        // Find the note
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Update note to mark it as shared
        note.isShared = true;
        await note.save();

        // Copy note details to Community model
        const communityNote = new Community({
            userId: note.userId, // Keeping track of the original owner
            noteId: note._id,
            title: note.moduleName,
            content: note.content,
            subject,
            grade,
            userEmail,
            tags,
        });

        await communityNote.save();

        return res.status(200).json({ message: 'Note shared successfully!' });
    } catch (error) {
        console.error('Error sharing note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};