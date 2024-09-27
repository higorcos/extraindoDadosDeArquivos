import axios from 'axios'
import {IdataSheetsAndDataGruop,OptionSwitchTable} from '@/intefaces/ShowSheetsDataInterface'
import SwitchTable from '@/components/table/public/SwitchTable'

interface Params{
  uuidOrgao: string,
  mes: string,
  ano: string,
  idTable:OptionSwitchTable,
}
interface Props {
  error: boolean,
	title: string,
  data: IdataSheetsAndDataGruop,
}

export default async function Page({params}:{params:Params}) {
  const {uuidOrgao, mes, ano,idTable}:Params = params
  
  let inforFolhas: IdataSheetsAndDataGruop = {
    inforPortal: {
    ID:'',
    CNPJ:'',
    NOME:'',
  },
  periodos: [],  // Array vazio para IdataPeriods
  folhas: [],    // Array vazio para IdataFolha
  folhasAgupadas: [] // Array vazio para IdataFolhasAgrupadas
};

  try{
    const {data: resultFetch}:{data:Props} = await axios.get(`http://localhost:8008/folha/${uuidOrgao}/searchByPeriodAndTables/${mes}/${ano}`)
    const {data}:{data:IdataSheetsAndDataGruop} = resultFetch
    inforFolhas = data;

  }catch(error){
    console.log(error)
  }

  return ( 
  <>
    <SwitchTable sheets={inforFolhas.folhas} periods={inforFolhas.periodos} sheetsGroup={inforFolhas.folhasAgupadas} uuidOrgao={uuidOrgao} idTable={idTable}/>
  </>
  )
}