'use client'
import React, { FormEvent, useState, useEffect, CSSProperties } from 'react'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { AlertError, AlertSuccess, AlertWarning } from '@/ultils/alert';


export default function PageListagemFolhasAdm() {
    const [data, setData] = useState<any>(null);

   
    useEffect(()=>{
      onSubmit()
    },[])
  

    async function onSubmit() {
    
      
      try{
  
      const resultado:any = await axios.get('http://localhost:3003/listagem')
      console.log(resultado)
        AlertSuccess("Sucesso no carregamento")
        const {result} = resultado.data
        console.log(result)
        setData(result)
        return {error: false, result}

      }catch(error){
        AlertError("Erro no carregamento")
        return {error: true, msgError:error ,result:[]}
   
      }  
    }
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
         <div className="w-3/5 bg-fundo-n1 p-5 rounded-lg shadow-md  text-cor-primaria">
      
      <div className="flex justify-center items-center mb-10">
          <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
          <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
          <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria mx-2 "></div>
      </div>
  
      
  
      <div className="mb-8">
          <p className="text-xl mb-4  font-[600]">Listagem Administrativa dos dados:</p>
        
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
                    scope="col" className="px-6 py-3"
                    key={2}>
                        NOME
                    </th>
                    <th 
                    scope="col" className="px-6 py-3"
                    key={2}>
                      CARGO
                    </th>
                    <th 
                    scope="col" className="px-6 py-3"
                    key={2}>
                      PERIODO
                    </th>
                    <th 
                    scope="col" className="px-6 py-3"
                    key={2}>
                      ANO
                    </th>
                    <th 
                    scope="col" className="px-6 py-3"
                    key={2}>
                      VISUALIZAÇÃO
                    </th>
                 
                </tr>
              </thead>
              <tbody>
                {data?.map((i:any) => (
                  <tr 
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  key={1}>
                    
                      <td 
                      className="px-6 py-4"
                      key={i}>{i.nome}</td>
                      <td 
                      className="px-6 py-4"
                      key={i}>{i.cargo}</td>
                      <td 
                      className="px-6 py-4"
                      key={i}>{i.mes_periodo}</td>
                       <td 
                      className="px-6 py-4"
                      key={i}>{i.ano}</td>
                       <td 
                      className="px-6 py-4"
                      key={i}>Não Visivel</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
  
  
          </div>
      </div>
  
      <div className="flex justify-between">
     
          
      </div>
  </div>
      </>

  );
}