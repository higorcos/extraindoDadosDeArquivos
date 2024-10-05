"use client"
import { useEffect, useState} from "react";
import Pagination from "../ultils/Pagination";
import styles from '@/components/table/Table.module.css'
import FuncionsTableSheetsGroup from "../ultils/FuncionsTableSheetsGroup";
import {IpropsComponetShowData,IdataFolhasAgrupadas} from '@/intefaces/ShowSheetsDataInterface'


const negateKeys = ['ID','ORGAO','VISUALIZACAO']

export default function TableSheetsSecondary(props:IpropsComponetShowData) {
  const files = props.sheetsGroup;
  const [inforSheets,setInforSheets] = useState<IdataFolhasAgrupadas[]>(files)
  
  const [currentPage, setCurrentPage] = useState<number>(1); //Pagina Atual
  const [itemsPerPage] = useState<number>(10); // Número de itens por página
  const [sizeData, setSizeData] = useState<number>(0);
  const indexOfLastItem:number = currentPage * itemsPerPage; //Indice do primeiro item
  const indexOfFirstItem:number = indexOfLastItem - itemsPerPage; //Indice do ultimo item
  const currentItems:IdataFolhasAgrupadas[] = inforSheets.slice(indexOfFirstItem, indexOfLastItem); //array resultante


  useEffect(()=>{
    setSizeData(inforSheets.length)
  },[inforSheets])

  const resultFilter = (filteredData: IdataFolhasAgrupadas[]) => {
    setInforSheets(filteredData);
  };
  
  const setNewCurrentPage=(value:number)=>{
    setCurrentPage(value)
  }
  
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
        <table  id="Folhas de Cargos e funções" className="!text-[.8em]">
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
                <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px] `}>{data.TIPO_FOLHA}</td>
                <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.VINCULO}</td>
                <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.CARGO}</td>
                <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.VALORBRUTO}</td>
                <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.CONTAGEM}</td>
                <td className={`${styles.dataSheetsGroup} ${styles.tdTable} text-center m-[2000px]`}>{data.VALOR_TOTAL}</td>
              </tr>
          ))}     
          </tbody>
        </table>
      </section> 
        <Pagination 
          currentPage={currentPage} 
          itemsPerPage={itemsPerPage} 
          indexOfLastItem={indexOfLastItem} 
          indexOfFirstItem={indexOfFirstItem}   
          setNewCurrentPage={setNewCurrentPage}
          sizeData={inforSheets.length}
          />
  </>)}
         
