'use client';

import React, { useState } from 'react'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Availablespace = ({space}) => {
    //space=4.999999999853
    const tofixedpsace=Math.floor(space*100)/100;//4.99
    const minus5=5.00-tofixedpsace;
    const tofixedforminus5=Math.floor(minus5*100)/100;
    const [storagetaken, setstoragetaken] = useState(tofixedpsace);
    const percentage=(tofixedpsace/5);//0.998
    const progress=(1-percentage)*100;
    const progress1=Math.floor(progress*100)/100
    //console.log("percentage - tofixedspace: ",percentage,tofixedpsace)
    const [availablespace,setavailablespace]=useState(percentage);
  return (
    <div className='  py-4  '>
        <div className=' flex items-center justify-center  mx-4  rounded-3xl border-spacing-1 border border-dashed'>
            <div className='w-[225px] h-[225px] p-4 '>
                <CircularProgressbarWithChildren className='' value={progress} maxValue={120} strokeWidth={9} styles={buildStyles({
                    pathColor:'rgba(255,255,255,0.9)',
                    pathTransitionDuration:1.3,
                    trailColor:'rgba(251,142,145,0.9)',
                })}>
                        <p className='text-white font-semibold text-4xl'>{progress1}% </p>
                        <p className='text-white font-semibold text-medium'>Space used</p>

                </CircularProgressbarWithChildren>
            </div>
            <div className='gap-10'>
                <p className='text-white text-2xl font-semibold'>Available Storage</p>
                <p className='text-white  font-extralight'>{tofixedforminus5}GB / 5.0GB</p>
            </div>
        </div>
    </div>
  )
}

export default Availablespace
