'use client'
import React, { FormEvent, useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { AlertError, AlertWarning } from '@/ultils/alert';
import PageInsertScreen2 from './tela02';
import PageInsertScreen1 from './tela01';



export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [status1, setStatus1] = useState<boolean>(true);
    const [returnInput, setReturnInput] = useState({});
   

   
    const valueFile = (value:any) => {
      setReturnInput(value)
      console.log(value)
      setStatus1(false)
      setStatus(true)
      
    };
    const valuesSelect = (value:any) => {
      setReturnInput(value)
      setStatus(false)
      
    };
    
  return (
      <>
      {status1 && <PageInsertScreen1 setValueParent={valueFile}/>}
      {status && <PageInsertScreen2 setValueParent={valuesSelect}/>}
      </>

  );
}