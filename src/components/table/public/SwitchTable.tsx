"use client"
import { useState} from "react";
import {IdataFolha, IdataPeriods,IdataFolhasAgrupadas, OptionSwitchTable} from '@/intefaces/ShowSheetsDataInterface'
import TableSheetsPrimary from "./TableSheetsPrimary";

 
interface Props {
  sheets: IdataFolha[],
  periods: IdataPeriods[],
  sheetsGroup: IdataFolhasAgrupadas[],
  uuidOrgao:string,
}

export default function SwitchTable(props:Props) {
  
  const [optionSwitchTable, setOptionSwitchTable] = useState<OptionSwitchTable>(0);
  
  return (
      <>
        <div onClick={()=>setOptionSwitchTable(0)}> Button 0 </div>
        <div onClick={()=>setOptionSwitchTable(1)}> Button 1 </div>
        <div onClick={()=>setOptionSwitchTable(2)}> Button 2 </div>

        {optionSwitchTable == 0 && <>0<TableSheetsPrimary {...props}/></>}
        {optionSwitchTable == 1 && <>1<TableSheetsPrimary {...props}/></>}
        {optionSwitchTable == 2 && <>2<TableSheetsPrimary {...props}/></>}

  </>
  )}
         
