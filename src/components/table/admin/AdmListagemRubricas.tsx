'use client'
import { AlertError, AlertSuccess, AlertWarning, AlertLoading, AlertUpdateLoading } from '@/ultils/alert';
import { IdataFolha  } from "@/intefaces/ShowSheetsDataInterface";
import React, { useState, useEffect, CSSProperties } from 'react'
import "react-toastify/dist/ReactToastify.css";
import api from '@/services/api';

interface Iprops{
 mes:string,
 ano:string,
 uuid: string | null,
 handleChangeVisibility: (state:boolean)=>void
}

export default function AdmListagemRubricas(props:Iprops) {
   const [data, setData] = useState<IdataFolha[]>([]);
   console.log(props)
   
   if(props.mes == null || props.ano == null ||props.uuid == null){
     AlertWarning("Erro passagem de parâmetros")
     window.location.reload();
    } 
     
    useEffect(()=>{
      const fetchData = async () => {
        const idAlert = AlertLoading('Carregando')
        try{
          const resultado:any = await api.get(`/folha/${props.uuid}/searchByPeriodAndNotDisplayed/${props.mes}/${props.ano}`)
            AlertUpdateLoading(idAlert,'success',"Sucesso no carregamento")
            const {data} = resultado.data
            setData(data)
            return {error: false, result:data}
    
          }catch(error){
            AlertUpdateLoading(idAlert,'error',"Erro no carregamento")

            return {error: true, msgError:error ,result:[]}
       
          } 
      }
        fetchData()
    },[])
    
    const tableStyle: CSSProperties= {
      height: '500px', // Define a altura do contêiner para ativar a rolagem vertical
       //padding: '20px',
       overflow: 'auto', // Ativa a rolagem vertical e horizontal
     };
   
     const tableInnerStyle: CSSProperties = {
       minWidth: '50px', // Define uma largura mínima para ativar a rolagem horizontal
       borderCollapse: 'collapse', // Opcional: remove espaços entre células da tabela
     };
    
  return (
      <>
      <div className={'bg-[rgba(0,_0,_0,_0.7)] fixed top-[0] left-[0] bottom-[0] right-[0] flex justify-center items-center flex-col z-[52]'}>

      <div className="w-4/5 bg-fundo-n1 p-3 rounded-lg shadow-md  text-cor-primaria">
        <div className="flex justify-center items-center mb-10">
          
        </div>
  
      <div className="mb-8">
          <div className='flex justify-between'>
            <p className="text-xl mb-2  font-[600]">Itens da Folha:</p>
            <div onClick={()=>props.handleChangeVisibility(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1f2937" className="bi bi-x-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
              </svg>
            </div>
          </div>
        
             <div 
        className="w-full h-[300px] border-2 border-dotted border-cor-primaria bg-fundo-n2 rounded-lg pb-10"
        style={tableStyle}
        >
          <table style={tableInnerStyle}
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
            
           
              <thead className="text-xs text-gray-700 uppercase bg-cor-primaria dark:bg-gray-700 dark:text-gray-400">
                <tr
                className="bg-cor-primaria border-b dark:bg-gray-800 dark:border-gray-700">
                 
                    <th 
                    scope="col" className="px-6 py-4"
                    key={1}
                    >
                        NOME
                    </th>
                    <th 
                    scope="col" className="px-6 py-4"
                    key={2}>
                      CARGO
                    </th>
                    <th 
                    scope="col" className="px-6 py-4"
                    key={3}>
                      TIPO FOLHA
                    </th>
                    <th 
                    scope="col" className="px-6 py-4"
                    key={4}>
                      PERIODO
                    </th>
                    <th 
                    scope="col" className="px-6 py-4"
                    key={5}>
                      ANO
                    </th>
                 
                </tr>
              </thead>
              <tbody>
                {data?.map((i:IdataFolha, key:number) => (
                  <tr 
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  key={key}>
                    
                      <td 
                      className="px-6 py-4"
                      key={key}>{i.NOME}</td>
                      <td 
                      className="px-6 py-4"
                      key={key}>{i.CARGO}</td>
                       <td 
                      className="px-6 py-4"
                      key={key}>{i.TIPO_FOLHA}</td>
                      <td 
                      className="px-6 py-4"
                      key={key}>{i.MES_PERIODO}</td>
                       <td 
                      className="px-6 py-4"
                      key={key}>{i.ANO}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
  
  
          </div>
      </div>
      </div>
      </div>
      </>

  );
}