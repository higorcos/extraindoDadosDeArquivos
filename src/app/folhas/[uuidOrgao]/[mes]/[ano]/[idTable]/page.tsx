import {IdataSheetsAndDataGruop,OptionSwitchTable} from '@/intefaces/ShowSheetsDataInterface'
import SwitchTable from '@/components/table/public/SwitchTable'
import {FormatData} from '@/components/others/FormatData';
import api from '@/services/api';

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
    const {data: resultFetch}:{data:Props} = await api.get(`/folha/${uuidOrgao}/searchByPeriodAndTables/${mes}/${ano}`)
    const {data}:{data:IdataSheetsAndDataGruop} = resultFetch
    inforFolhas['periodos'] = data['periodos'];
    inforFolhas['inforPortal'] = data['inforPortal'];
    

    inforFolhas['folhas'] = FormatData(data.folhas, Object.keys(data.folhas[0]));
    inforFolhas['folhasAgupadas'] = FormatData(data.folhasAgupadas, Object.keys(data.folhasAgupadas[0]));

  }catch(error:any){
    console.log(error.data)
  }

  return ( 
  <>
  <section className={`flex flex-col justify-between h-screen zsfgasfgs`}> {/* h-[200vh] */}

    <SwitchTable 
      sheets={inforFolhas.folhas} 
      periods={inforFolhas.periodos} 
      sheetsGroup={inforFolhas.folhasAgupadas} 
      inforPortal={inforFolhas.inforPortal}
      uuidOrgao={uuidOrgao} 
      idTable={idTable}/>
      {/* Rodapé aqui */}
    </section>
  </>
  )
}