'use client'
import React, { FormEvent, useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { AlertError, AlertSuccess, AlertWarning } from '@/ultils/alert';
import PageInsertScreen2 from './tela02';
import PageInsertScreen1 from './tela01';
import SelectTypeFormt from './selecaoTipo';

import {TypeColumunsDataInsert} from './intefaces/TypeColumunsDataInsert'  



export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [status1, setStatus1] = useState<boolean>(true);
    const [returnInput, setReturnInput] = useState<TypeColumunsDataInsert | null>(null);

    const [startType_TCE_MA, setStartType_TCE_MA] = useState<boolean>(false);
    const [startType_TCE_PI, setStartType_TCE_PI] = useState<boolean>(false);

   

   
    const valueFile = (value:any) => {
      setFile(value)
      setStatus1(false)
      setStatus(true)
      
    };
    const valuesSelect = (value:TypeColumunsDataInsert) => {
      setReturnInput(value)

      console.log(returnInput)
      //onSubmit()
      //setStatus(false)
      
    };

    const fClickTCE_MA = () =>{
      console.log('Click_TCE_MA');
      setStartType_TCE_MA(true)
    }
    const fClickTCE_PI = () =>{
      console.log('Click_TCE_PI');
    }
  
    async function onSubmit() {
            
      if (!file || !returnInput) return;
 
  
      const formData = new FormData()
      formData.append("file", file);
      formData.append("columnNome", returnInput.columnNome);
      formData.append("columnVinculo", returnInput.columnVinculo);
      formData.append("columnMes_Periodo", returnInput.columnMes_Periodo);
      formData.append("columnAno", returnInput.columnAno);
      formData.append("columnOrgao", returnInput.columnOrgao);
      formData.append("columnCpf", returnInput.columnCpf);
      formData.append("columnMatricula", returnInput.columnMatricula);
      formData.append("columnCargo", returnInput.columnCargo);
      formData.append("columnDataAdmissao", returnInput.columnDataAdmissao);
      formData.append("columnCargaHoraria", returnInput.columnCargaHoraria);
      formData.append("columnValorBruto", returnInput.columnValorBruto);
      formData.append("columnValorLiquido", returnInput.columnValorLiquido);
      formData.append("columnValorDesconto", returnInput.columnValorDesconto);
      
      try{
  
      const result = await axios.post('http://localhost:3003/test',formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      console.log(result)
        AlertSuccess("Folha Cadastrada")
        AlertWarning("Entre na Pagina /admin/listagem")
        
        return {error: false, result}

      }catch(error){
        AlertError("Erro, Verifique os parametros")
        return {error: true, msgError:error ,result:[]}
   
      }  
    }
    
  return (
      <>
      {status1 && <PageInsertScreen1 setValueParent={valueFile}/>}

      {file != null && <>
      {status && <PageInsertScreen2 setValueParent={valuesSelect} dataFile={file} />}
      </>
      }
      </>

  );
}
/*
 {status1 && <PageInsertScreen1 setValueParent={valueFile}/>}
<SelectTypeFormt clickTCE_MA={fClickTCE_MA} clickTCE_PI={fClickTCE_PI}/>

*/