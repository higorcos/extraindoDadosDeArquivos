"use client"
import { useState} from "react";
import FuncionsTable from "../ultils/FuncionsTable";
import styles from '@/components/table/Table.module.css'
import {IdataFolha,IpropsComponetShowData} from '@/intefaces/ShowSheetsDataInterface'

const negateKeys = ['ID','ORGAO','VISUALIZACAO']

export default function TableSheetsTertiary(props:IpropsComponetShowData) {
  const files = props.sheets;
  const [inforSheets,setInforSheets] = useState<IdataFolha[]>(files)

  const resultFilter = (filteredData:IdataFolha[]) => {
    setInforSheets(filteredData);
  };
  
  return (
    <>
    
    <FuncionsTable
      {...props}
      sheetsNow={inforSheets}
      resultFilter={resultFilter}
      negateKeys={negateKeys}
      />
    <section className={`${styles.tableShowPortarias}${styles.tableFilesSacop} flex flex-col items-center overflow-x-auto`}>
      <br/>
      <table  id="filesSacop" className="!text-[.7em]">
        <thead>
          <tr className={styles.titleTable}>
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
          {inforSheets?.map((data:IdataFolha, index:number) => (
            <tr key={index} className={styles.bodyTable}>
              {/*  //Matrícula	CPF	Nome	Admissão	Cargo	Função	CBO	Lotação	Vínculo	Carga Horária	Folha	Ano	Período	Valor Bruto	Desconto	Líquido */}
              <td className={`${styles.thTitlePortais} ${styles.tdTable} text-center`}>{data.MATRICULA}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.CPF}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.NOME}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.DATAADMISSAO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.CARGO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.CBO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.LOTACAO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.VINCULO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.CARGAHORARIA}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.TIPO_FOLHA}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.ANO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.MES_PERIODO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.VALORBRUTO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.VALORDESCONTO}</td>
              <td className={`${styles.dataCollum} ${styles.tdTable} text-center`}>{data.VALORLIQUIDO}</td>

            </tr>

  ))} 
          
        </tbody>
      </table>
    </section> 
    <section className={`flex flex-col items-center`}>

    {inforSheets.length == 0 && <h6 className={`text-[#000080] !text-[1.1em] my-[160px]`}>Nenhum Resultado Encontrado</h6>}
    <div className={`text-[#000080] !text-[.7em]`}>{`${inforSheets.length} resultados`}</div>
    </section>
    
  </>)}
         
