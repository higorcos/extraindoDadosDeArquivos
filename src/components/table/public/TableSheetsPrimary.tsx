"use client"
import { useEffect,useState} from "react";
import { Table } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import styles from '@/components/table/Table.module.css'
import {IdataFolha, IdataPeriods,IdataFolhasAgrupadas} from '@/intefaces/ShowSheetsDataInterface'
import generateExportFile from "@/components/others/downloads/filesDownloads";
 
import { useRouter } from 'next/navigation'

 
interface Props {
  sheets: IdataFolha[],
  periods: IdataPeriods[],
  sheetsGroup: IdataFolhasAgrupadas[]
  uuidOrgao:string,
}
const negateKeys = ['ID','ORGAO','VISUALIZACAO']

export default function TableSheetsPrimary(props:Props) {
  const router = useRouter()
  const files = props.sheets;
  console.log(props)
  const [inforSheets,setInforSheets] = useState<IdataFolha[]>(files)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Número de itens por página
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inforSheets.slice(indexOfFirstItem, indexOfLastItem);


  const filtrarTabela = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFilter = e.target.value.toLowerCase();

    const dadosFiltrados: IdataFolha[] = files.filter((item) =>
      item.NOME.toLowerCase().includes(valueFilter) ||
      item.MES_PERIODO.toLowerCase().includes(valueFilter) ||
      item.ANO.toLowerCase().includes(valueFilter) ||
      item.TIPO_FOLHA.toLowerCase().includes(valueFilter) ||
      item.ORGAO.toLowerCase().includes(valueFilter) ||
      item.CPF.toLowerCase().includes(valueFilter) ||
      item.MATRICULA.toLowerCase().includes(valueFilter) ||
      item.CBO.toLowerCase().includes(valueFilter) ||
      item.CARGO.toLowerCase().includes(valueFilter) ||
      item.LOTACAO.toLowerCase().includes(valueFilter) ||
      (item.VINCULO ? item.VINCULO.toLowerCase().includes(valueFilter) : false) ||
      item.DATAADMISSAO.toLowerCase().includes(valueFilter) ||
      item.CARGAHORARIA.toLowerCase().includes(valueFilter) ||
      item.VALORBRUTO.toString().includes(valueFilter) ||
      item.VALORLIQUIDO.toString().includes(valueFilter) ||
      item.VALORDESCONTO.toString().includes(valueFilter) 
    );
    setInforSheets(dadosFiltrados);
  };

  const handlePeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/folhas/${props.uuidOrgao}/${event.target.value}`)
  };
  
  return (
    <>
    <br/>
      <label htmlFor="periodos">Período</label>
      <select onChange={handlePeriod} id="periodos">
      {props.periods.map((period:IdataPeriods,key:number)=>(
        <option value={period.MES_PERIODO+"/"+period.ANO} key={key}>{period.MES_PERIODO+""+period.ANO}</option>
      ))}
  
      </select>

<section className={styles.box}>
    <div className={styles.search}>
        <div className={styles.fromPortarias}>
            <input type="text" id="search" className={styles.formInput} autoComplete="off" placeholder=" " onChange={filtrarTabela}></input>
            <label htmlFor="search" className={styles.formLabelPortarias}>Buscar</label>
            <div className={styles.imgSearchPortarias}>
                {/* <img src="/icons/search.svg" alt="iconeDownload" className={styles.iconeBuscarPortarias}></img> */}
            <div className={styles.iconeBuscarPortarias}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconeBuscarPortarias} width="20" height="20" fill={'#000080'}  viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            </div>
            </div>
        </div>
    </div>
    <div className={styles.fromPortarias}>
        <div className={styles.boxDownload}> 
        <div className={styles.iconeDownload}>
            <svg xmlns="http://www.w3.org/2000/svg"   width="30" height="30" onClick={(e)=>generateExportFile('folha_de_pagamento','csv',inforSheets,negateKeys)}  className={styles.iconDownloadCSV} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"/>
            </svg>
            </div>
            <div className={styles.iconeDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  onClick={(e)=> generateExportFile('folha_de_pagamento','xls',inforSheets,negateKeys)} className={styles.iconDownloadXLS} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM6.472 15.29a1.176 1.176 0 0 1-.111-.449h.765a.578.578 0 0 0 .254.384c.07.049.154.087.25.114.095.028.202.041.319.041.164 0 .302-.023.413-.07a.559.559 0 0 0 .255-.193.507.507 0 0 0 .085-.29.387.387 0 0 0-.153-.326c-.101-.08-.255-.144-.462-.193l-.619-.143a1.72 1.72 0 0 1-.539-.214 1.001 1.001 0 0 1-.351-.367 1.068 1.068 0 0 1-.123-.524c0-.244.063-.457.19-.639.127-.181.303-.322.527-.422.225-.1.484-.149.777-.149.305 0 .564.05.78.152.216.102.383.239.5.41.12.17.186.359.2.566h-.75a.56.56 0 0 0-.12-.258.625.625 0 0 0-.247-.181.923.923 0 0 0-.369-.068c-.217 0-.388.05-.513.152a.472.472 0 0 0-.184.384c0 .121.048.22.143.3a.97.97 0 0 0 .405.175l.62.143c.217.05.406.12.566.211a1 1 0 0 1 .375.358c.09.148.135.335.135.56 0 .247-.063.466-.188.656a1.216 1.216 0 0 1-.539.439c-.234.105-.52.158-.858.158-.254 0-.476-.03-.665-.09a1.404 1.404 0 0 1-.478-.252 1.13 1.13 0 0 1-.29-.375Zm-2.945-3.358h-.893L1.81 13.37h-.036l-.832-1.438h-.93l1.227 1.983L0 15.931h.861l.853-1.415h.035l.85 1.415h.908L2.253 13.94l1.274-2.007Zm2.727 3.325H4.557v-3.325h-.79v4h2.487v-.675Z"/>
            </svg>  
            </div>
            <div className={styles.iconeDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" onClick={(e)=>generateExportFile('folha_de_pagamento','pdf',inforSheets,negateKeys)} className={styles.iconDownloadPDF} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
            </svg>
            </div>
            <div className={styles.iconeDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  className={styles.iconDownloadXML} onClick={(e)=> generateExportFile('folha_de_pagamento','xml',inforSheets,negateKeys)} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.527 11.85h-.893l-.823 1.439h-.036L.943 11.85H.012l1.227 1.983L0 15.85h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992 1.274-2.007Zm.954 3.999v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.025L4.58 11.85h-.806v3.999h.706Zm4.71-.674h1.696v.674H8.4V11.85h.791v3.325Z"/>
            </svg>
            </div>
            <div className={styles.iconeDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  onClick={(e)=> generateExportFile('folha_de_pagamento','json',inforSheets,negateKeys)} className={styles.iconDownloadJSON} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM4.151 15.29a1.176 1.176 0 0 1-.111-.449h.764a.578.578 0 0 0 .255.384c.07.049.154.087.25.114.095.028.201.041.319.041.164 0 .301-.023.413-.07a.559.559 0 0 0 .255-.193.507.507 0 0 0 .084-.29.387.387 0 0 0-.152-.326c-.101-.08-.256-.144-.463-.193l-.618-.143a1.72 1.72 0 0 1-.539-.214 1.001 1.001 0 0 1-.352-.367 1.068 1.068 0 0 1-.123-.524c0-.244.064-.457.19-.639.128-.181.304-.322.528-.422.225-.1.484-.149.777-.149.304 0 .564.05.779.152.217.102.384.239.5.41.12.17.186.359.2.566h-.75a.56.56 0 0 0-.12-.258.624.624 0 0 0-.246-.181.923.923 0 0 0-.37-.068c-.216 0-.387.05-.512.152a.472.472 0 0 0-.185.384c0 .121.048.22.144.3a.97.97 0 0 0 .404.175l.621.143c.217.05.406.12.566.211a1 1 0 0 1 .375.358c.09.148.135.335.135.56 0 .247-.063.466-.188.656a1.216 1.216 0 0 1-.539.439c-.234.105-.52.158-.858.158-.254 0-.476-.03-.665-.09a1.404 1.404 0 0 1-.478-.252 1.13 1.13 0 0 1-.29-.375Zm-3.104-.033a1.32 1.32 0 0 1-.082-.466h.764a.576.576 0 0 0 .074.27.499.499 0 0 0 .454.246c.19 0 .33-.055.422-.164.091-.11.137-.265.137-.466v-2.745h.791v2.725c0 .44-.119.774-.357 1.005-.237.23-.565.345-.985.345a1.59 1.59 0 0 1-.568-.094 1.145 1.145 0 0 1-.407-.266 1.14 1.14 0 0 1-.243-.39Zm9.091-1.585v.522c0 .256-.039.47-.117.641a.862.862 0 0 1-.322.387.877.877 0 0 1-.47.126.883.883 0 0 1-.47-.126.87.87 0 0 1-.32-.387 1.55 1.55 0 0 1-.117-.641v-.522c0-.258.039-.471.117-.641a.87.87 0 0 1 .32-.387.868.868 0 0 1 .47-.129c.177 0 .333.043.47.129a.862.862 0 0 1 .322.387c.078.17.117.383.117.641Zm.803.519v-.513c0-.377-.069-.701-.205-.973a1.46 1.46 0 0 0-.59-.63c-.253-.146-.559-.22-.916-.22-.356 0-.662.074-.92.22a1.441 1.441 0 0 0-.589.628c-.137.271-.205.596-.205.975v.513c0 .375.068.699.205.973.137.271.333.48.589.626.258.145.564.217.92.217.357 0 .663-.072.917-.217.256-.146.452-.355.589-.626.136-.274.205-.598.205-.973Zm1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676h-.032Z"/>
            </svg>
            </div>   
        </div> 
        <label htmlFor="Download" className={styles.formLabelPortarias}>Download</label>
    </div> 
    </section>


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
        {currentItems?.map((data:IdataFolha, index:number) => (
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
         
