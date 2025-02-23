import React, { useState } from 'react'
import Navbar2 from '../../../components/Navbar/Navbar2'
import Slider from '../../../components/Navbar/Slider'
import FileUpload from './FileUpload'
import TextEditor from './TextEditor'

const TextExtract = () => {
  const [extractedTexts, setExtractedTexts] = useState({});

  return (
    <div className='bg-gradient-to-tr from-[#6a11cb] via-sky-500 to-[#f44d7a] min-h-screen'>
      {/* Navbar */}
      <Navbar2 />

      <div className='flex flex-row'>
        {/* Left Sidebar */}
        <Slider />

        {/* Right-side content */}
        <div className="flex p-6 space-x-6 w-full">
          {/* Left: File Upload */}
          <div className="w-1/2">
            <FileUpload onExtractedText={setExtractedTexts} />
          </div>

          {/* Right: Extracted Text Editor */}
          <div className="w-1/2">
            <TextEditor extractedTexts={extractedTexts} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default TextExtract