"use client"
import { useEffect, useState} from "react";
import { OptionSwitchTable, IpropsComponetShowData} from '@/intefaces/ShowSheetsDataInterface'
import TableSheetsPrimary from "./TableSheetsPrimary";
import { useRouter } from "next/navigation";

 
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

  return (
      <>
      
        <div onClick={()=>setOptionSwitchTable('0')}> Button 0 </div>
        <div onClick={()=>setOptionSwitchTable('1')}> Button 1 </div>
        <div onClick={()=>setOptionSwitchTable('2')}> Button 2 </div>

        {optionSwitchTable == '0' && <>0<TableSheetsPrimary {...props} idTable={'0'}/></>}
        {optionSwitchTable == '1' && <>1<TableSheetsPrimary {...props} idTable={'1'}/></>}
        {optionSwitchTable == '2' && <>2<TableSheetsPrimary {...props} idTable={'2'}/></>}

  </>
  )}
         
