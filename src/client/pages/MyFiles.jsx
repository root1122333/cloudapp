import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserFiles from '@wasp/queries/getUserFiles';
import deleteExpiredFiles from '@wasp/actions/deleteExpiredFiles';

export function MyFiles() {
  const { data: files, isLoading, error } = useQuery(getUserFiles);
  const deleteExpiredFilesFn = useAction(deleteExpiredFiles);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {files.map((file) => (
        <div
          key={file.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{file.name}</div>
          <div>{file.fileType}</div>
          <div>{file.uploadTime}</div>
        </div>
      ))}
      <button
        onClick={deleteExpiredFilesFn}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Delete Expired Files
      </button>
      <Link
        to='/upload'
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
      >
        Upload File
      </Link>
    </div>
  );
}