'use client';
import React from 'react'
import { useUser } from '@clerk/nextjs';

const ImagePage = () => {
  const {user}=useUser();
  console.log(user)
  return (
    <>
      <div>
      <h1>Welcome
        {user.id}
      </h1>
    </div>
    </>
  );
}

export default ImagePage