'use client'

import { useState } from 'react'
import SelectPortal from '@/components/selectPortal/SelectPortal' 
import { PortalContext } from '@/context/PortalContext';


export default function Page(){
    const [ showBoxOfSelectPortal, setShowBoxOfSelectPortal] = useState<boolean>(true);

    const clickSelectPortal = () =>{
        setShowBoxOfSelectPortal(false)
    }


return(
<>
    <h1>TTTT</h1>
<br/>
<br/>
<br/>
<br/>
{showBoxOfSelectPortal&&<SelectPortal activeBox={clickSelectPortal} />} 
</>
)}