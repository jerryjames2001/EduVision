import React, { useMemo, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import Navbar2 from '../../../components/Navbar/Navbar2';
import Slider from '../../../components/Navbar/Slider';
import SearchBar from '../../../components/searchbar/SearchBar';
import { AppContext } from "../../../context/AppContext";
import NoteCard1 from './NoteCard1';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyNotes = () => {
    const { backendurl } = useContext(AppContext);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    const [isSharing, setIsSharing] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);


    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${backendurl}/api/notes/get-notes`, { withCredentials: true });
            setNotes(response.data.notes || []); // Ensure notes is always an array
        } catch (error) {
            setError("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    }, [backendurl]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => setSearchValue(e.target.value);
    const onClearSearch = () => setSearchValue('');

    const filteredNotes = useMemo(() => {
        if (!searchValue.trim()) return notes;
        const lowerSearch = searchValue.toLowerCase();
        return notes.filter(note =>
            (note.moduleName && note.moduleName.toLowerCase().includes(lowerSearch)) ||
            (note.content && note.content.toLowerCase().includes(lowerSearch)) ||
            (Array.isArray(note.tags) && note.tags.some(tag => tag.toLowerCase().includes(lowerSearch)))
        );
    }, [searchValue, notes]);

    // Open delete confirmation modal
    const confirmDelete = (note) => {
        setNoteToDelete(note);
        setShowDeleteModal(true);
    };

    // Handle delete action
    const handleDelete = async () => {
        if (!noteToDelete) return;

        try {
            await axios.delete(`${backendurl}/api/notes/delete-note/${noteToDelete._id}`, { withCredentials: true });

            // Remove deleted note from state
            setNotes(prevNotes => prevNotes.filter(n => n._id !== noteToDelete._id));

            // Show success toast
            toast.success("Note deleted successfully!", {
                position: "top-right",
                autoClose: 3000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setShowDeleteModal(false);
            setNoteToDelete(null);
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note!", { position: "top-right", theme: "dark" });
        }
    };


    return (
        <div className="bg-gradient-to-tr from-[#6a11cb] via-sky-500 to-[#f44d7a] min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar2 />

            {/* Main Layout */}
            <div className='flex flex-row w-full'>
                {/* Sidebar with Slide Animation */}
                <Slider />

                {/* Notes Section */}
                <div className='flex flex-col flex-1 p-4 transition-all'>
                    {/* Loading and Error Messages */}
                    {loading && <p className="text-white text-center">Loading notes...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Show content only if not loading and no error */}
                    {!loading && !error && (
                        <>
                            {/* Search Bar */}
                            <div className="flex w-full justify-center items-center pb-4">
                                <SearchBar
                                    value={searchValue}
                                    onChange={handleSearch}
                                    onClearSearch={onClearSearch}
                                />
                            </div>

                            {/* Notes grid section */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 w-full px-2'>
                                {filteredNotes.length > 0 ? (
                                    filteredNotes.map((note) => (
                                        <NoteCard1
                                            key={note._id}
                                            title={note.moduleName}
                                            tags={note.tags}
                                            content={note.content}
                                            onDelete={() => confirmDelete(note)} // Pass delete handler
                                            onShare={() => {
                                                setSelectedNote(note);
                                                setIsSharing(true);
                                            }}
                                            selectedNote={note}
                                        />
                                    ))
                                ) : (
                                    <p className="text-white text-center col-span-full">No notes found</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            {showDeleteModal && noteToDelete && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-md backdrop-brightness-75 flex justify-center items-center z-50">
                    <div className="group select-none w-[300px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
                        <div className="text-center p-3 flex-auto justify-center">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="group-hover:animate-bounce w-12 h-12 text-gray-600 fill-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                            </svg>
                            <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
                            <p className="font-bold text-sm text-gray-400 px-2">
                                Do you really want to delete <span className="text-red-400">"{noteToDelete.moduleName}"</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="p-2 mt-2 text-center space-x-2">
                            <button
                                className="bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 hover:bg-transparent px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyNotes;
