"use client"
import { useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import FuncionsTableSheetsGroup from "../ultils/FuncionsTableSheetsGroup";
import styles from '@/components/table/Table.module.css'
import {IdataFolha,IpropsComponetShowData,IdataFolhasAgrupadas} from '@/intefaces/ShowSheetsDataInterface'

const negateKeys = ['ID','ORGAO','VISUALIZACAO']

export default function TableSheetsSecondary(props:IpropsComponetShowData) {
  const files = props.sheetsGroup;


  const [inforSheets,setInforSheets] = useState<IdataFolhasAgrupadas[]>(files)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Número de itens por página
  const [sizeData, setSizeData] = useState<number>(0);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inforSheets.slice(indexOfFirstItem, indexOfLastItem);

  
  useEffect(()=>{
    setSizeData(inforSheets.length)
  },[inforSheets])

  const resultFilter = (filteredData: IdataFolhasAgrupadas[]) => {
    /*  */setInforSheets(filteredData);
  };
  
  return (
    <>
      <FuncionsTableSheetsGroup
      {...props}
      sheetsNow={inforSheets}
      resultFilter={resultFilter}
      negateKeys={negateKeys}
      />
   
    <section className={`flex flex-col items-center overflow-x-auto`}>
      <br/>
      <Table responsive id="Folhas de Cargos e funções" className="!text-[.8em]">
        <thead>
          <tr className={styles.titleTable}>
            <th className={`px-[60px] `}>Tipo Folha</th>
            <th className={`px-[60px] `}>Vínculo</th>
            <th className={`px-[60px] `}>Cargo/Função</th>
            <th className={`px-[60px] `}>Valor</th>
            <th className={`px-[60px] `}>Quantidade</th>
            <th className={`px-[60px] `}>Total</th>
          </tr>
        </thead>
        <tbody>         
          {currentItems?.map((data:IdataFolhasAgrupadas, index:number) => (
            <tr key={index} className={styles.bodyTable}>
              {/*  //Matrícula	CPF	Nome	Admissão	Cargo	Função	CBO	Lotação	Vínculo	Carga Horária	Folha	Ano	Período	Valor Bruto	Desconto	Líquido */}
              <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px] `}>{data.TIPO_FOLHA}</td>
              <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.VINCULO}</td>
              <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.CARGO}</td>
              <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.VALORBRUTO}</td>
              <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.CONTAGEM}</td>
              <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.VALOR_TOTAL}</td>

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
          disabled={indexOfLastItem >= inforSheets.length}
        >
          Próxima
        </button>
      </div>
      {/*
      <section className={styles.footerPaginationTable}>
      {inforSheets?.length > numberViews ? <p>{inforSheets.length == 0 ? <>0 </> : <>{countMin} </>} - {inforSheets.length < numberViews && filter!= "" ? <>{inforSheets.length} </> : <>{countMax} </>} de {countFilesAll} publicações</p> : <p>{countFilesAll} publicações</p>}

      {inforSheets?.length == 0 && <><h6 className={styles.resultTableFooter}>Nenhum Resultado Encontrado</h6></>}



    {inforSheets?.length > numberViews ? 
      <Pagination size="sm">
      <Pagination.First onClick={(e)=> {setNumberPageNow(1); setCountMin(0);setCountMax(numberViews)}}/>

      {inforSheets.length != 0 ? <>{countMin == 0 ? 
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
         
