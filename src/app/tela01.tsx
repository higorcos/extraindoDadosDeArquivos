'use client'
import React, { FormEvent, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'



export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [namefile, setNameFile] = useState<string | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       if (event.target.files) {
          const fileTemp = event.target.files[0]
          const validExtensions = ['application/vnd.ms-excel', 'text/csv', 'application/json', 'application/xml', 'text/xml'];
          
          // Verificação pelo tipo MIME
          if (validExtensions.includes(fileTemp.type)) {
            setFile(fileTemp);
            toast.success("Arquivo adicionado", {
              position: "top-right"
            });
         } else {
          setFile(null);
          
            toast.error("Arquivo inválido, Formato não é aceito!", {
              position: "top-right"
            });
           // Você pode adicionar uma mensagem de erro ao usuário aqui, se necessário
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
    </div>
    <label 
      id='iInputFile'
      className="w-full h-[300px] border-2 border-dotted border-cor-primaria flex flex-col justify-center items-center mb-12 bg-fundo-n2 rounded-lg">
      <input 
        onChange={handleFileChange}
        type="file"  
        name="inputFile" 
        id="iImputFile" 
        //accept=".xls,.xlsx"
        className="hidden"/>
        
      {
        file == null ? <>
      <div className="upload-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-plus w-[50px] h-[50px] mb-5 fill-cor-primaria botao-padrao"  viewBox="0 0 16 16">
        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
        </svg>
      </div>
        <p className="text-cor-primaria text-center text-base">Adicione o arquivo com os dados da folha.<br/> São aceitos no formato csv e xls</p>
        </> : <>
        <div className="upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-check w-[50px] h-[50px] mb-5 fill-cor-primaria botao-padrao"  viewBox="0 0 16 16">
            <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
          </svg>
      </div>
        <p className="text-cor-primaria text-center text-base">Arquivo: {file.name}</p>
        </>
        
      }
    </label>
    <button onClick={()=>{}} className="px-5 py-2 bg-botao-padrao text-white rounded-md cursor-pointer absolute right-5 bottom-5 hover:bg-botao-padrao hover:opacity-50">AVANÇAR</button>
    
    </div>
  );
}