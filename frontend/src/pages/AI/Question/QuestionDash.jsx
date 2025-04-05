import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Navbar2 from '../../../components/Navbar/Navbar2'
import AiSlider from '../../../components/Navbar/AiSlider'
import { AppContext } from "../../../context/AppContext";
import SearchBar from '../../../components/searchbar/SearchBar'
import NoteCard from './NoteCard'
import axios from 'axios'

const QuestionDash = () => {
  const [isExpanded, setIsExpanded] = useState(true);
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
      <div className='flex'>
        {/* Sidebar with Slide Animation */}
        <AiSlider isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

        <div
          className={`flex-grow p-6 w-full transition-all duration-300 ${isExpanded ? "ml-48 sm:ml-52 md:ml-56 lg:ml-64 xl:ml-72" : "ml-14"
            }`}
        >
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
                <div className={`grid gap-4 w-full px-2 ${isExpanded
                  ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5'
                  }`}>
                  {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                      <NoteCard
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
    </div>
  )
}

export default QuestionDash