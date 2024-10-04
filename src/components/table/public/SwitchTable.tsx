"use client"
import { useEffect, useState} from "react";
import { OptionSwitchTable, IpropsComponetShowData} from '@/intefaces/ShowSheetsDataInterface'
import TableSheetsPrimary from "./TableSheetsPrimary";
import { useRouter } from "next/navigation";
import TableSheetsTertiary from "./TableSheetsPrimaryTertiary";
import TableSheetsSecondary from "./TableSheetsPrimarySecondary";

 
export default function SwitchTable(props:IpropsComponetShowData) {
    const router = useRouter()  
  const [optionSwitchTable, setOptionSwitchTable] = useState<OptionSwitchTable>(props.idTable);

  
  useEffect(() => {
    if (!isValidOption(props.idTable)) {
      router.push(`/folhas/${props.uuidOrgao}`); // Redireciona para a página de erro 404 se o valor for inválido
    }
  }, [optionSwitchTable]);

   // Função para validar se o idTable é uma das opções válidas
   const isValidOption = (value: string): value is OptionSwitchTable => {
    return value === '0' || value === '1' || value === '2';
  };
  const a = 'border-b-[2px] border-[#000080]'

  return (
      <>
      <div className="flex flex-col items-center p-[20px] text-[#000080] uppercase">
        <h1 className="text-[1.3em] text-wrap font-semibold">Folha de pagamentos</h1>
        <p className="text-[1em]">{props.inforPortal.NOME}</p>
      </div>
      <div className="flex justify-center uppercase pt-[12px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="red" className="bi bi-info-circle mr-[3px]" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
        </svg>
        <p className="text-[.5em]">Alterne entre as opções de tabelas abaixo</p>
      </div>
        <div className={"flex justify-center pt-[12px] pb-[12px]"}>

        <div onClick={()=>setOptionSwitchTable('0')} className={`cursor-pointer uppercase !text-[.7em] ${optionSwitchTable == '0' && a } `}>Remuneração de servidores</div>
        <div onClick={()=>setOptionSwitchTable('1')} className={`cursor-pointer uppercase !text-[.7em] ${optionSwitchTable == '1' && a } ml-[20px]`}>Tabela de cargo e funções</div>
        <div onClick={()=>setOptionSwitchTable('2')} className={`cursor-pointer uppercase !text-[.7em] ${optionSwitchTable == '2' && a } ml-[20px]`}>Relação nominal de servidores</div>

        </div>
         
        {/*  {optionSwitchTable == '0' && <TableSheetsPrimary {...props} idTable={'0'}/>}
        {optionSwitchTable == '1' && <TableSheetsPrimary {...props} idTable={'1'}/>}
        {optionSwitchTable == '2' && <TableSheetsPrimary {...props} idTable={'2'}/>}  */}
        {optionSwitchTable == '0' && <>0<TableSheetsPrimary {...props} idTable={'0'}/></>}
        {optionSwitchTable == '1' && <>1<TableSheetsSecondary {...props} idTable={'1'}/></>}
        {optionSwitchTable == '2' && <>2<TableSheetsTertiary {...props} idTable={'2'}/></>} 
    
  </>
  )}
         
