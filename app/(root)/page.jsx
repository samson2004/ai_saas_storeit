import { getclerkmetadata } from '@/lib/actions/user.actions';
import {  currentUser } from '@clerk/nextjs/server';
import React from 'react';
const DashboardPage =async() => {

  const user=await currentUser();

  if(!user) return null;
  console.log(user);

  // const userId=await getclerkmetadata();

  return (
    <>
      <div>
      <h1>Welcome 
        {user}
      </h1>
    </div>
    </>
  );
};

export default DashboardPage;
