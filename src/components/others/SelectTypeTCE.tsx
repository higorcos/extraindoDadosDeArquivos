'use client'
import React, {useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { AlertError, AlertSuccess } from '@/ultils/alert';
import Image from 'next/image';
import imageTCEMA from '@/../public/img/tce-ma.png'
import imageTCEPI from '@/../public/img/tce-pi.png'


export default function SelectTypeTCE(props:any) {
  const {clickTCE_MA, clickTCE_PI} = props

    const [file, setFile] = useState<File | null>(null);
    const [namefile, setNameFile] = useState<string | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       if (event.target.files) {
          const fileTemp = event.target.files[0]
          const validExtensions = ['application/vnd.ms-excel', 'text/csv', 'application/json', 'application/xml', 'text/xml'];
          
          // Verificação pelo tipo MIME
          if (validExtensions.includes(fileTemp.type)) {
            setFile(fileTemp);
            AlertSuccess("Arquivo adicionado")
         } else {
          setFile(null);
            AlertError(`Arquivo inválido, Formato não é aceito!`)
         }
       }
    };
    

  return (
    <div className="w-3/5 bg-fundo-n1 p-5 rounded-lg shadow-md relative">
    <div className="flex justify-center items-center mb-10">
        <div className="bg-black"></div>
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria mx-2 relative"></div>
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 relative"></div>
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 relative"></div>
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 relative"></div>
    </div>    
      <div 
        className="w-full h-[300px]  flex flex-col justify-center items-center mb-12  rounded-lg">
        <div 
          className="h-[100px] w-[500px] border-2 border-cor-primaria flex flex-col justify-center items-center m-2 p-5 rounded-lg"
          onClick={clickTCE_MA}
        >
          <Image 
              width={500}
              height={500}
              src={imageTCEMA}
              alt="Icone tribuna de contas do maranhão"/>
        </div>
        <div 
          className="h-[100px] w-[500px] border-2 border-cor-primaria flex flex-col justify-center items-center m-2 p-5 rounded-lg"
          onClick={clickTCE_PI}
        >
          <Image 
              width={500}
              height={500}
              src={imageTCEPI}
              alt="Icone tribuna de contas do Piaui"/>
        </div>
      </div>
    
    </div>
  );
}