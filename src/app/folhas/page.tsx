import axios from 'axios'
import TableSheetsPrimary from "@/components/table/public/TableSheetsPrimary"
//import React, { FormEvent, CSSProperties } from 'react'

interface Props {
  error: boolean,
	title: string,
  data: DataFolha[],
}
interface DataFolha{
    ID: string;
    NOME: string;
    MES_PERIODO: string;
    ANO: string;
    TIPO_FOLHA: string;
    ORGAO: string;
    CPF: string;
    MATRICULA: string;
    CBO: string;
    CARGO: string;
    LOTACAO: string;
    VINCULO: string | null;
    DATAADMISSAO: string; 
    CARGAHORARIA: string;
    VALORBRUTO: number;
    VALORLIQUIDO: number;
    VALORDESCONTO: number;
    VISUALIZACAO: number;
}
export default async function Page() {
  let inforFolhas: DataFolha[] = [];

  try{
    const {data: resultFetch}:{data:Props} = await axios.get('http://localhost:8008/folha/483bcd1babe83af2d8e22d0a0b2acc87b495d941/searchByPeriod/07/2024')
    const {data}:{data:DataFolha[]} = resultFetch
    inforFolhas = data;

  }catch(error){
    console.log(error)
   const dataa = {
      error: true,
      title: 'Erro',
      data: []
   }
   inforFolhas = []; 
   
  }

  return ( 
    <>
    <TableSheetsPrimary data={inforFolhas}/>
  </>
  )
}