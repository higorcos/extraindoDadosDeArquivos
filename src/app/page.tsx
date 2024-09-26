'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import SelectTypeFormt from '../components/others/SelectTypeTCE';
import InsertFile from '../components/firstInsertion/LayoutInsertFile';
import InsertFileRubricas from '../components/LastInsertion/LayoutInsertFileRubricas';
import { AlertError, AlertSuccess, AlertWarning } from '@/ultils/alert';
import {TypeColumunsDataInsert} from '../intefaces/TypeColumunsDataInsertInterface'  
import {TypeColumunsDataInsertRubricas} from '../intefaces/TypeColumunsDataInsertInterfaceRubricas'  
import InsertReferences from '../components/firstInsertion/FileTableView';
import InsertReferencesRubricas from '@/components/LastInsertion/FileTableViewRubricas';


export default function PageInsertFile() {

const [file, setFile] = useState<File | null>(null);
const [renderSelectType, setRenderSelectType] = useState<boolean>(true);
const [showFileReferencesLayout, setShowFileReferencesLayout] = useState<boolean>(false);
const [showInsertLayout, setShowInsertLayout] = useState<boolean>(false);
const [returnInput, setReturnInput] = useState<TypeColumunsDataInsert | null>(null);
const [startType_TCE_MA, setStartType_TCE_MA] = useState<boolean>(false);

const [fileRubricas, setFileRubricas] = useState<File | null>(null);   
const [showFileReferencesLayoutRubricas, setShowFileReferencesLayoutRubricas] = useState<boolean>(false);
const [showInsertLayoutRubricas, setShowInsertLayoutRubricas] = useState<boolean>(false);
const [returnInputRubricas, setReturnInputRubricas] = useState<TypeColumunsDataInsertRubricas | null>(null);


const valueFile = (value:any) => {
  setFile(value)
  setShowInsertLayout(false)
  //setShowFileReferencesLayout(true)
  setShowInsertLayoutRubricas(true)
};
const valueFileRubricas = (value:any) => {
  setFileRubricas(value)
  setShowFileReferencesLayout(true)
  setShowInsertLayoutRubricas(false)
};
const valuesSelect = (value:TypeColumunsDataInsert) => {
  setReturnInput(value)
  setShowFileReferencesLayout(false)
  setShowFileReferencesLayoutRubricas(true)
};
const valuesSelectRubricas = (value:TypeColumunsDataInsertRubricas) => {
  setReturnInputRubricas(value)
  //setShowFileReferencesLayoutRubricas(false)
  onSubmit()
};

const fClickTCE_MA = () =>{
  console.log('Click_TCE_MA');
  setStartType_TCE_MA(true)
  setRenderSelectType(false)
  setShowInsertLayout(true)
}
const fClickTCE_PI = () =>{
  console.log('Click_TCE_PI');
  setStartType_TCE_MA(false)
  setRenderSelectType(false)
  setShowInsertLayout(true)
}

async function onSubmit() {
        
  if (!file || !returnInput) return;
  if (!fileRubricas || !returnInput) return;


  const formData = new FormData()
  formData.append("fileFolha", file);
  formData.append("columnNome", returnInput.columnNome);
  //formData.append("columnVinculo", returnInput.columnVinculo);
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
  //formData.append("columnValorDesconto", returnInput.columnValorDesconto);
  formData.append("columnCBO", returnInput.columnCBO);
  formData.append("columnIdTipoPagamento", returnInput.columnIdTipoPagamento);
  formData.append("columnLotacao", returnInput.columnLotacao);

  formData.append("fileRubricas", fileRubricas);

  
  try{

  const result = await axios.post('http://localhost:8008/folha/test/483bcd1babe83af2d8e22d0a0b2acc87b495d941?',formData, {
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
    {renderSelectType && <SelectTypeFormt clickTCE_MA={fClickTCE_MA} clickTCE_PI={fClickTCE_PI}/>}
    {showInsertLayout && <InsertFile setValueParent={valueFile}/>}
    {showInsertLayoutRubricas && <InsertFileRubricas setValueParent={valueFileRubricas}/>}


      {file != null && <>
        {showFileReferencesLayout && <>
          {startType_TCE_MA ? 
            <><InsertReferences typeTCE={"MA"} setValueParent={valuesSelect} dataFile={file} /></> : 
            <><InsertReferences typeTCE={"PI"} setValueParent={valuesSelect} dataFile={file} /></>}
        </>}
      </>}
      
      {fileRubricas != null && <>
        {showFileReferencesLayoutRubricas && <>
          {startType_TCE_MA ? 
            <><InsertReferencesRubricas typeTCE={"MA"} setValueParent={valuesSelectRubricas} dataFile={fileRubricas} /></> : 
            <><InsertReferencesRubricas typeTCE={"PI"} setValueParent={valuesSelectRubricas} dataFile={fileRubricas} /></>}
        </>}
      </>}
    </>
);
}