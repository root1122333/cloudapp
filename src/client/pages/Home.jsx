import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserFiles from '@wasp/queries/getUserFiles';

export function HomePage() {
  const { data: files, isLoading, error } = useQuery(getUserFiles);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Bogdan's Cloud Storage App!</h1>
      <p className='text-lg'>Navigate to:</p>
      <ul className='list-disc ml-8'>
        <li>
          <Link to='/myfiles' className='text-blue-500 hover:underline'>My Files</Link>
        </li>
        <li>
          <Link to='/upload' className='text-blue-500 hover:underline'>Upload</Link>
        </li>
      </ul>
      <div>
        {files.map((file) => (
          <div key={file.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{file.name}</div>
            <div>{file.fileType}</div>
            <div>{file.uploadTime}</div>
            <div>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}