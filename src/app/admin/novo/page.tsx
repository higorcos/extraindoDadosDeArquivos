'use client'
import React, { useContext, useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import SelectTypeFormt from '../../../components/others/SelectTypeTCE';
import InsertFile from '../../../components/firstInsertion/LayoutInsertFile';
import InsertFileRubricas from '../../../components/LastInsertion/LayoutInsertFileRubricas';
import { AlertError, AlertSuccess, AlertWarning,AlertLoading, AlertUpdateLoading } from '@/ultils/alert';
import {TypeColumunsDataInsert} from '../../../intefaces/TypeColumunsDataInsertInterface'  
import {TypeColumunsDataInsertRubricas} from '../../../intefaces/TypeColumunsDataInsertInterfaceRubricas'  
import InsertReferences from '../../../components/firstInsertion/FileTableView';
import InsertReferencesRubricas from '@/components/LastInsertion/FileTableViewRubricas';
import FloatingButton from '@/components/others/FloatingButton'
import LoadingFull from '@/components/others/LoadingFull';
import ActionAfterUpload from '@/components/others/ActionAfterUpload';
import api from '@/services/api';
import { IDataLocalStoragePortal  } from "@/intefaces/PortaisDataInterface";
import { PortalContext } from "@/context/PortalContext"; 

export default function PageInsertFile() {

const [file, setFile] = useState<File | null>(null);
const [renderSelectType, setRenderSelectType] = useState<boolean>(true);
const [loading, setLoading] = useState<boolean>(false);

const [boxActionAfterUpload, setBoxActionAfterUpload] = useState<boolean>(false);
const [showFileReferencesLayout, setShowFileReferencesLayout] = useState<boolean>(false);
const [showInsertLayout, setShowInsertLayout] = useState<boolean>(false);
const [returnInput, setReturnInput] = useState<TypeColumunsDataInsert | null>(null);
const [startType_TCE_MA, setStartType_TCE_MA] = useState<boolean>(false);

const [fileRubricas, setFileRubricas] = useState<File | null>(null);   
const [showFileReferencesLayoutRubricas, setShowFileReferencesLayoutRubricas] = useState<boolean>(false);
const [showInsertLayoutRubricas, setShowInsertLayoutRubricas] = useState<boolean>(false);
const [returnInputRubricas, setReturnInputRubricas] = useState<TypeColumunsDataInsertRubricas | null>(null);

const portalContext = useContext(PortalContext);
if (!portalContext) {
  throw new Error('Error portalContext');
}

const showPortal:IDataLocalStoragePortal  = portalContext.showPortal;

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
  const idAlert = AlertLoading('Enviando dados')
  setLoading(true)


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
 
  const result = await api.post(`/folha/${showPortal.UUID}`,formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
      timeout: 300000// Tempo de espera de 10 segundos
    
  })
  console.log(result)  
    AlertUpdateLoading(idAlert,'success',"Sucesso, folhas cadastradas")
    setBoxActionAfterUpload(true)
    
    return {error: false, result}

  }catch(error){
    AlertUpdateLoading(idAlert,'error',"Erro, verifique possíveis erros")
    return {error: true, msgError:error ,result:[]}

  }finally{
    setLoading(false)
  } 
}

return (
    <>
    <FloatingButton/>
    
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
      
      {boxActionAfterUpload && <ActionAfterUpload/>}
      {loading && <LoadingFull/>} 
    </>
);
}