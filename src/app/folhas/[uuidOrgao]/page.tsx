import axios from 'axios'
import TableSheetsPrimary from "@/components/table/public/TableSheetsPrimary"
import { redirect } from 'next/navigation';
import { IdataPeriods} from '@/intefaces/ShowSheetsDataInterface'


interface PropsPeriods{
  error: boolean,
	title: string,
  data: IdataPeriods[],
}
interface Params{
  uuidOrgao: string,
}
export default async function Page({params}:{params:Params}) {
  const {uuidOrgao}:Params = params
  let redirectPath: string | null = null
  

  try{
 
    const {data: resultFetch}:{data:PropsPeriods} = await axios.get(`http://localhost:8008/folha/${uuidOrgao}/showPeriods`)

    const {data}:{data:IdataPeriods[]} = resultFetch

    if(data.length == 0 ){
      console.log('00000000')
    }

    redirectPath=(`/folhas/${uuidOrgao}/${data[0].MES_PERIODO}/${data[0].ANO}/0`);

  }catch(error){
    console.log(error)
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear(); 
    redirectPath=(`/folhas/${uuidOrgao}/${month}/${year}/0`); 
 
   
  }finally{
    if (redirectPath)
      redirect(redirectPath)
    }

  return ( 
    <>Redirecionando</>
  )
}