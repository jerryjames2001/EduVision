import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    moduleName:{
        type: String,
        required: true,
        trim: true,
    },
    tags: [String],
    content: {
        type: String,
        required: true,
    },
    isShared: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

export default mongoose.model('Note', notesSchema);