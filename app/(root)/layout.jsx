'use client';
import React from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import homepagenavitems from '@/constants';
import { SignedIn,SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { redirect, usePathname } from 'next/navigation';
import UploadForm from '@/components/shared/uploadForm';



const HomePagelayout =({children}) => {

 
  const handlesignin=()=>{
    redirect('/sign-in')
  }
  const pathname=usePathname();
  return (
    <div className=''>
      <section className='h-[100px] flex justify-between m-3 items-center pr-5' >
        <div className='w-80'>
            <div className='flex justify-center items-center '>
                <Image src={'/logo5353.png'} width={53} height={53} alt='logo' className='' />
                <p className='text-brand  font-medium  text-2xl'>Storage</p>
            </div>
        </div>
        <div className='w-3/4'>
            <div className='flex border shadow-md h-[40px] rounded-full w-1/2'>
                <Image src={'/assets/icons/search.svg'} width={24} height={24} alt='search' className='h-auto pl-2'/>
                <Input type="search" placeholder="search" className='border-none shadow-none focus:ring-0 focus:outline-none focus-visible:outline-none' />
            </div>
        </div>
        <div className='flex'>
            <UploadForm />
            <Button className='bg-white hover:bg-white border-none shadow-none'>
                 <a href="/sign-up">
                  <Image src={'/assets/icons/logout.svg'} width={24} height={24} alt='logout' className='ml-3'/>
                 </a>
            </Button>
        </div>
      </section>
      <SignedIn>
      <div className="flex ">
          <div className='flex-col mt-[50px] w-1/6'>
            <div className=" p-4 w-80">
              {homepagenavitems.map((navitem,index)=>{
                const isactive= navitem.link==pathname;
              return(
                <ul className="space-y-4 w-full pl-12 " key={index}>
                <li className={`px-5 py-3  mb-5 rounded-3xl font-semibold  ${isactive?"bg-brand text-white shadow-md ":"bg-white "}`}>
                    <div className='flex items-start justify-start '>
                        <Image src={navitem.src} width={navitem.width} height={navitem.height} alt='dashboard' className='h-[30px] w-[30px] mr-3 fill-gray-500'/>
                        <a href={navitem.link} className="">
                        {navitem.name}
                            </a>
                    </div>
                </li>
              </ul> 
              )})}
            </div>
            <div>
                <div className='m-10'>
                  <Image src={'/assets/images/files-2.png'} alt='illustration' width={300} height={300} className='transition-all hover:scale-105 hover:rotate-2'/>
                </div>
                <div className='flex gap-5 mx-28'>
                <UserButton showName/>
                </div>
            </div>
          </div>
          <section className=" flex-1 px-6 pt-6 m-6 bg-gray-100 rounded-3xl">{children}</section>
        </div>
       
      </SignedIn>
      <div className='w-full'>
        <div className='ml-96'>
          <SignedOut>
            <Button onClick={handlesignin}>Click to signin</Button>
          </SignedOut>
        </div>
      </div>
      </div>
  );
};

export default HomePagelayout;
