import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserFiles from '@wasp/queries/getUserFiles';
import uploadFile from '@wasp/actions/uploadFile';

export function UploadPage() {
  const [file, setFile] = useState(null);
  const uploadFileFn = useAction(uploadFile);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result;
        uploadFileFn({ name: file.name, fileType: file.type, content });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='p-4'>
      <input type='file' onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Upload
      </button>
    </div>
  );
}