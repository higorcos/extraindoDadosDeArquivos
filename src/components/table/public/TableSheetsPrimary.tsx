
import { useEffect,useState} from "react";
import { Table } from "react-bootstrap";
/* import Loading from "../../../../others/LoadingFull"; */
//import GeneratePDF from './download-pdf/Sacop' 

import exportFromJSON from 'export-from-json'
import Pagination from 'react-bootstrap/Pagination';
import ButtonTypeHidden from '@/components/button/ButtonTypeHidden';

import styles from '@/components/table/Table.module.css'
 
interface Props {
  //name: string,
  //files: string|null,
  //cnpj: string,
  //infor: '',
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

export default function TableSheetsPrimary(props:Props) {
  const files = props.data;
  const [portaria,setPortaria] = useState<DataFolha[]>(files)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Número de itens por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = portaria.slice(indexOfFirstItem, indexOfLastItem);
 

  

  return (
    <>
  <section className={`${styles.tableShowPortarias}${styles.tableFilesSacop}`}>
      <br/>
      
    <Table responsive id="filesSacop">
      <thead>
        <tr>
          <th className={styles.thPortariasTable}>Matrícula</th>
          <th className={styles.thPortariasTable}>CPF</th>
          <th className={styles.thPortariasTable}>Nome</th>
          <th className={styles.thPortariasTable}>Admissão</th>
          <th className={styles.thPortariasTable}>Cargo</th>
          {/* <th className={styles.thPortariasTable}>Função</th> */}
          <th className={styles.thPortariasTable}>CBO</th>
          <th className={styles.thPortariasTable}>Lotação</th>
          <th className={styles.thPortariasTable}>Vínculo</th>
          <th className={styles.thPortariasTable}>Carga Horária</th>
          <th className={styles.thPortariasTable}>Folha</th>
          <th className={styles.thPortariasTable}>Ano</th>
          <th className={styles.thPortariasTable}>Período</th>
          <th className={styles.thPortariasTable}>Valor Bruto</th>
          <th className={styles.thPortariasTable}>Desconto</th>
          <th className={styles.thPortariasTable}>Líquido</th>
        </tr>
      </thead>
      <tbody>         
        {currentItems?.map((data:DataFolha, index:number) => (
          <tr key={index}>
            {/*  //Matrícula	CPF	Nome	Admissão	Cargo	Função	CBO	Lotação	Vínculo	Carga Horária	Folha	Ano	Período	Valor Bruto	Desconto	Líquido */}
            <td className={`${styles.thTitlePortais} ${styles.tdTable}`}>{index} @ {data.MATRICULA}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.CPF}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.NOME}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.DATAADMISSAO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.CARGO}</td>
            {/* <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.}</td> */}
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.CBO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.LOTACAO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.VINCULO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.CARGAHORARIA}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.TIPO_FOLHA}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.ANO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.MES_PERIODO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.VALORBRUTO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.VALORDESCONTO}</td>
            <td className={`${styles.dataCollum} ${styles.tdTable}`}>{data.VALORLIQUIDO}</td>

          </tr>

))} 
        
        

      </tbody>
    </Table>


      {/* Paginação */}
      <div>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>Página {currentPage}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={indexOfLastItem >= portaria.length}
      >
        Próxima
      </button>
    </div>
    {/*
    <section className={styles.footerPaginationTable}>
    {portaria?.length > numberViews ? <p>{portaria.length == 0 ? <>0 </> : <>{countMin} </>} - {portaria.length < numberViews && filter!= "" ? <>{portaria.length} </> : <>{countMax} </>} de {countFilesAll} publicações</p> : <p>{countFilesAll} publicações</p>}

    {portaria?.length == 0 && <><h6 className={styles.resultTableFooter}>Nenhum Resultado Encontrado</h6></>}



  {portaria?.length > numberViews ? 
    <Pagination size="sm">
    <Pagination.First onClick={(e)=> {setNumberPageNow(1); setCountMin(0);setCountMax(numberViews)}}/>

    {portaria.length != 0 ? <>{countMin == 0 ? 
              <Pagination.Prev></Pagination.Prev> : 
              <Pagination.Prev onClick={(e)=> {setNumberPageNow(numberPageNow-1); setCountMin(countMin - numberViews);setCountMax(countMax - numberViews)}}></Pagination.Prev>}</> : <></>}

    <Pagination.Item active >{numberPageNow}</Pagination.Item>

    {numberPageNow == countPages ? 
              <Pagination.Next disabled ></Pagination.Next> : 
              <Pagination.Next onClick={(e)=> {setNumberPageNow(numberPageNow+1); setCountMin(countMax); setCountMax(countMax + numberViews)}}/>} 

    <Pagination.Last onClick={(e)=> {setNumberPageNow(countPages); setCountMin((countPages*numberViews)-10);setCountMax(countPages*numberViews)}}/>
    </Pagination>
    : <section className={styles.resultTableFooter}></section> }

    </section>
      */}
  </section> 
  </>)}
         
