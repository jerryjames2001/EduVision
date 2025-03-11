import React, { useMemo, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import Navbar2 from '../../../components/Navbar/Navbar2';
import Slider from '../../../components/Navbar/Slider';
import SearchBar from '../../../components/searchbar/SearchBar';
import { AppContext } from "../../../context/AppContext";
import NoteCard1 from './NoteCard1';

const MyNotes = () => {
    const { backendurl } = useContext(AppContext);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        </div>
    );    
};

export default MyNotes;
