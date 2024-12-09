import { getAuth } from '@clerk/nextjs/server';
import React from 'react';

const DashboardPage =() => {
  // const { userId } =getAuth();
  
  return (
    <div>
      <h1>Welcome, user {0?'1':'0'}</h1>
    </div>
  );
};

export default DashboardPage;
