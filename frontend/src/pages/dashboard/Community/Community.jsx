import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar2 from '../../../components/Navbar/Navbar2';
import Slider from '../../../components/Navbar/Slider';
import SearchBar from '../../../components/searchbar/SearchBar';
import CommunityCard from './CommunityCard';
import { AppContext } from '../../../context/AppContext';

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState([]); // Store shared notes from the community
  const [userNotes, setUserNotes] = useState([]); // Store user's personal notes
  const [searchValue, setSearchValue] = useState('');
  const { backendurl } = useContext(AppContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${backendurl}/api/community/shared-notes`);
        setNotes(response.data);
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserNotes = async () => {
      try {
        const response = await axios.get(`${backendurl}/api/notes/get-notes`, { withCredentials: true });
        setUserNotes(response.data); // Save user's personal notes
      } catch (err) {
        console.error("Error fetching user notes:", err.response?.data || err.message);
      }
    };

    fetchNotes();
    fetchUserNotes(); // Fetch the user's notes separately
  }, [backendurl]);

  const handleSearch = (e) => setSearchValue(e.target.value);
  const onClearSearch = () => setSearchValue('');

  // Optimize search filtering
  const searchQuery = searchValue.toLowerCase();
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );

  return (
    <div className="bg-gradient-to-tr from-[#6a11cb] via-sky-500 to-[#f44d7a] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar2 />

      {/* Main Layout */}
      <div className='flex flex-row w-full'>
        <Slider />

        {/* Community Section */}
        <div className='flex flex-col flex-1 p-4 transition-all'>
          {/* Loading and Error Messages */}
          {loading && <p className="text-white text-center">Loading notes...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Show content only if not loading and no error */}
          {!loading && !error && (
            <>
              {/* Search Bar */}
              <div className="flex w-full justify-center items-center pb-4">
                <SearchBar value={searchValue} onChange={handleSearch} onClearSearch={onClearSearch} />
              </div>

              {/* Notes grid section */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 w-full px-2'>
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <CommunityCard
                      key={note._id}
                      noteId={note.noteId}
                      title={note.title}
                      tags={note.tags}
                      content={note.content}
                      userNotes={userNotes}
                      noteOwner={note.userEmail}
                    />
                  ))
                ) : (
                  <p className="text-white text-center col-span-full">No community notes found.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
