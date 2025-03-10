import React, { useState } from 'react';
import Navbar2 from '../../../components/Navbar/Navbar2';
import Slider from '../../../components/Navbar/Slider';
import SearchBar from '../../../components/searchbar/SearchBar';
// import NoteCard from './NoteCard';
import NoteCard1 from './NoteCard1';

const MyNotes = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const onClearSearch = () => {
        setSearchValue('');
    };

    // Sample Notes Data
    const notes = [
        { title: "Module 1", tags: ["React", "JS"], content: "This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i This is a sample note for Module 1 Loref i    ..." },
        { title: "Module 2", tags: ["CSS", "Tailwind"], content: "The success of any seminar depends largely on the encouragement and guidelines of many others. I would like to take this opportunity to express my gratitude to those people who have been instrumental in the successful completion of this seminar work. First and foremost, I give all glory, honour and praise to God Almighty who gave me wisdom and enabled me to complete the project successfully. I also express sincere thanks, from the bottom of my heart, to my parents for their encouragement and support in all my endeavours and especially in this project. Words are inadequate to express my deep sense of gratitude to Dr. V P Devasia, Principal, SJCET, Palai for allowing me to utilize all the facilities of our college and also for his encouragement. I extend my sincere gratitude to Dr. Rahul Shajan , Head of the Department Computer Applications, SJCET, Palai who has been a constant source of inspiration and without his tremendous help and support this project would not have been materialized. I owe a particular debt of gratitude to my internal seminar guide, Mr. Akhil Sekharan Asst. Professor, Department of Computer Applications, SJCET, Palai for all the necessary help and support that she has extended to me. Her valuable suggestions, corrections and the sincere efforts to accomplish my seminar even under a tight time schedule were crucial in the successful completion of this seminar. I extend my sincere thanks to all of our teachers and non-teaching staff of SJCET, Palai for the knowledge they have imparted to me over the last two years. I would also like to express my appreciation to all my friends for their comments, help and support." },        { title: "Module 3", tags: ["JavaScript","html","css"], content: "Understanding closures in JavaScript..." },
        { title: "Module 4", tags: ["JavaScript"], content: "Understanding closures in JavaScript..." },
        { title: "Module 5", tags: ["JavaScript"], content: "Understanding closures in JavaScript..." }
    ];

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

                    {/* Search Bar */}
                    <div className="flex w-full justify-center items-center pb-4">
                        <SearchBar
                            value={searchValue}
                            onChange={handleSearch}
                            handleSearch={handleSearch}
                            onClearSearch={onClearSearch}
                        />
                    </div>

                    {/* Notes grid section */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 w-full px-2'>
                        {notes.map((note, index) => (
                            <NoteCard1
                                key={index}
                                title={note.title}
                                tags={note.tags}
                                content={note.content}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyNotes;
