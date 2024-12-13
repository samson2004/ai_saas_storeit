'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';
import Recentfilesection from '@/components/shared/Recentfilesection'

const DashboardPage =() => {
  const {user}=useUser();
  return (
    <>
    <div class="grid grid-rows-3 grid-flow-col grid-cols-4 gap-20 h-full">
      <div class="row-span-1 col-span-2 bg-yellow-300 rounded-3xl "  >01</div>
      <div class="col-span-2 row-span-2 bg-brand rounded-3xl ">02</div>
      <div class="row-span-3 col-span-2 bg-white rounded-3xl ">
        <Recentfilesection clerkid={user.id} />
      </div>
    </div>
    </>
  );
};

export default DashboardPage;
