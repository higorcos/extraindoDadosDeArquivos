"use client"

import { useState } from 'react'
//import SelectPortal from '../../components/selectPortal/SelectPortal' 


export default function Page(){
    const [ showBoxOfSelectPortal, setShowBoxOfSelectPortal] = useState<boolean>(true);

    const clickSelectPortal = (status:string) =>{
        setShowBoxOfSelectPortal(false)
    }

return(
<>
    <h1>TTTT</h1>
    {/* {showBoxOfSelectPortal&&<SelectPortal activeBox={clickSelectPortal} />} */}
</>
)}