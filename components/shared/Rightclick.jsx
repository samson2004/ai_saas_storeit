import React from 'react'
import Image from 'next/image'
import {
    History,
    Info,
    Share2,
    Download,
    Trash2
} from "lucide-react"
import Rename from '@/components/shared/Rename';
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
            <DropdownMenuItem>
              <div className='bg-lime-100 rounded-full p-1'>
                <History color='#3dd9b3' />
              </div>
              <Rename />
            </DropdownMenuItem>
            <DropdownMenuItem>
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
            <DropdownMenuItem>
              <div className='p-1 rounded-full bg-[#EFF8FF]'>
                <Download color='#56B8FF' />
              </div> 
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='p-1 rounded-full bg-red/25'>
                <Trash2 color='#FF7474' />
              </div>
              <span>Move to Trash</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default Rightclick
