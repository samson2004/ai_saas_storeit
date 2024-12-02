'use client';

import React from 'react'
import Image from 'next/image'

const layout = ({children}) => {
  return (
    <div className='flex min-h-screen'>
        <section className='bg-brand hidden lg:flex xl:w-2/5 w-1/2 justify-center items-center'>
            <div className='pt-[100px] flex-col justify-center space-y-12 max-w-[430px]'>
                <div className='flex text-white pt-10 gap-5'>
                    <Image src={'/logo200.jpg'} alt='icon-storeit' width={40} height={40} className='h-[40px]' />
                    <h2 className='h2 mt-3'>StoreIt</h2>
                </div>
                <div className='space-y-5 text-white'>
                    <h1 className='h1'>Manage your files the best way</h1>
                    <p className='body-1'>
                    Awesome, we've created the perfect place for you to store all your documents.
                    </p>
                </div>
                <div className='pt-[75px] flex items-center justify-center'>
                <Image src={'/illustration.jpg'} alt='illustration' width={342} height={342} className='transition-all hover:scale-105 hover:rotate-2'/>
                </div>
            </div>
        </section>
        <section className='flex flex-1 flex-col items-center lg:justify-center bg-white p-4 py-10 lg:p-10 lg:py-0'>
            <div className='mb-16 lg:hidden'>
                <Image src={'/full-logo.png'} width={242} height={84} alt='full logo' className='h-auto w-[200px] lg:w-[250px]' />
            </div>
            {children}  
        </section>
        
        </div>
  )
}

export default layout