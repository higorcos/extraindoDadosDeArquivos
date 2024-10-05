'use client'
import React, { useContext, useState, useEffect, CSSProperties } from 'react'
import "react-toastify/dist/ReactToastify.css";

import { AlertError, AlertSuccess } from '@/ultils/alert';
import api from '@/services/api';
import { IDataLocalStoragePortal } from "@/intefaces/PortaisDataInterface";
import { IdataAllPeriods } from "@/intefaces/ShowSheetsDataInterface";
import { PortalContext } from "@/context/PortalContext";
import AdmListagemRubricas from '@/components/table/admin/AdmListagemRubricas'
import FloatingButton from '@/components/others/FloatingButton'

export default function PageListagemFolhasAdm() {
  const [data, setData] = useState<IdataAllPeriods[]>([]);
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [showListNames, setShowListNames] = useState<boolean>(false);

  const portalContext = useContext(PortalContext);
  if (!portalContext) {
    throw new Error('Error portalContext');
  }
  const showPortal: IDataLocalStoragePortal = portalContext.showPortal;

  useEffect(() => {
    onSubmit();
  }, []);

  async function onSubmit() {
    try {
      const resultado: any = await api.get(`/folha/${showPortal.UUID}/allPeriods`);
      AlertSuccess("Sucesso no carregamento");
      const { data } = resultado.data;
      setData(data);
      return { error: false, result: data };
    } catch (error) {
      AlertError("Erro no carregamento");
      return { error: true, msgError: error, result: [] };
    }
  }

  // Função para alterar o valor de VISUALIZACAO
  const handleCheckboxChange = (index: number) => {
    setData((prevData: any) =>
      prevData.map((item: any, i: number) => {
        if (i === index) {
          if (item.VISUALIZACAO === 1) {
            ChangeVisibility(item.MES_PERIODO,item.ANO,0)
            return { ...item, VISUALIZACAO: 0 };
          } else {
            ChangeVisibility(item.MES_PERIODO,item.ANO,1)
            return { ...item, VISUALIZACAO: 1 };
          }
        } else {
          return item;
        }
      })
    );
  };

  const handleChangeVisibility = (state:boolean)=>{
    setShowListNames(state)
  }

  async function ChangeVisibility(month:string,year:string,visibility:number) {
    try {
      const resultado: any = await api.put(`/folha/${showPortal.UUID}/changeView/${month}/${year}/${visibility}`);
      
      AlertSuccess(`Sucesso, na troca de visibilidade do período`);
    } catch (error) {
      AlertError("Erro, na troca de visibilidade do período");
    }
  }

  async function seachForPeriod(month:string,year:string,uuid=showPortal.UUID){
    setMonth(month)
    setYear(year)
    setShowListNames(true)
  }

  const tableStyle: CSSProperties = {
    height: '500px',
    overflow: 'auto',
  };

  const tableInnerStyle: CSSProperties = {
    minWidth: '50px',
    borderCollapse: 'collapse',
  };

  return (
    <>
      <FloatingButton/>
      <div className={'fixed top-[0] left-[0] bottom-[0] right-[0] flex justify-center items-center flex-col z-50'}>
      <div className="w-3/5 bg-fundo-n1 p-4 rounded-lg shadow-md text-cor-primaria ">
        <div className="mb-8">
          <p className="text-xl mb-2 font-[600]">Folhas Por Periodo:</p>
          <div
            className="w-full h-[300px] border-2 border-dotted border-cor-primaria bg-fundo-n2 rounded-lg pb-10"
            style={tableStyle}
          >
            <table
              style={tableInnerStyle}
              className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10"
            >
              <thead className="text-xs text-gray-700 uppercase bg-cor-primaria dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-cor-primaria border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="col" className="px-6 py-4">PERIODO</th>
                  <th scope="col" className="px-6 py-4">ANO</th>
                  <th scope="col" className="px-6 py-4">VISIBILIDADE</th>
                  <th scope="col" className="px-6 py-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i: any, index: number) => (
                  <tr key={index} 
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <td className="px-6 py-4">{i.MES_PERIODO}</td>
                    <td className="px-6 py-4">{i.ANO}</td>
                    <td className="px-6 py-4 flex">  
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        id={`vehicle${index}`}
                        name={`vehicle${index}`}
                        value="1"
                        checked={i.VISUALIZACAO == 1}
                        onChange={() => handleCheckboxChange(index)} // Função chamada quando o checkbox é alterado
                      />
                     
                    </td>
                    <td className="px-6 py-4">
                      <svg onClick={()=>{seachForPeriod(i.MES_PERIODO,i.ANO) }}
                      xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-eye cursor-pointer" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
      </div>
      </div>
     
      {showListNames && <AdmListagemRubricas mes={month} ano={year} uuid={showPortal.UUID} handleChangeVisibility={handleChangeVisibility}/>}

    </>
  );
}
