import React, { useState } from 'react'
import Image from 'next/image'
import {
    History,
    Info,
    Share2,
    Download,
    Trash2
} from "lucide-react"


import Rename from '@/components/shared/Rename';
import Movetotrash from '@/components/shared/Movetotrash';
import Detail from '@/components/shared/Detail';



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


 
const Rightclick = ({ userdata, filedata }) => {
  
  const [showrename,setshowrename]=useState(false);
  const [renameclick,setrenameclick]=useState(false);

  const [showmovetotrash,setshowmovetotrash]=useState(false);
  const [movetotrashclick,setmovetotrashclick]=useState(false);

  const [showdetail,setshowdetail]=useState(false);
  const [detailclick,setdetailclick]=useState(false);

  function onclose(){
    setshowrename(false);
    setrenameclick(false);
    setshowmovetotrash(false);
    setmovetotrashclick(false);
    setdetailclick(false);
    setshowdetail(false);
  }

  const openewtabfordownload = (referenceid) => {
    const baseUrl = process.env.NEXT_WEBSITE_URL || "http://localhost:3000/";
    window.open(`${baseUrl}${referenceid}`);
  };
  
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="none">
            <Image src={'/assets/icons/dots.svg'} height={40} width={40} alt='image' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-4">
          <DropdownMenuLabel>{filedata.filename}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={()=>{
              setshowrename(true);
              setrenameclick(true);
            }}>
              <div className='bg-lime-100 rounded-full p-1'>
                <History color='#3dd9b3' />
              </div>
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{
              setdetailclick(true);
              setshowdetail(true);
            }}>
              <div className='p-1 rounded-full bg-purple-100'>
                  <Info color='#EEA8FD' />
              </div>
              <span>Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='p-1 rounded-full bg-yellow-100'>
                  <Share2 color='#F9AB72' />
              </div>
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>openewtabfordownload(filedata.filereferenceid)}>
              <div className='p-1 rounded-full bg-[#EFF8FF]'>
                <Download color='#56B8FF' />
              </div> 
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{
              setshowmovetotrash(true);
              setmovetotrashclick(true);
            }}>
              <div className='p-1 rounded-full bg-red/25'>
                <Trash2 color='#FF7474' />
              </div>
              <span>Move to Trash</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {showrename && <Rename trigger={renameclick} onclosefunc={onclose} file={filedata} />}
      {showmovetotrash && <Movetotrash trigger={movetotrashclick} onclosefunc={onclose} file={filedata}/>}
      {showdetail && <Detail trigger={detailclick} onclosefunc={onclose} itemdata={filedata} userdata={userdata} />}
    </>
  )
}

export default Rightclick
