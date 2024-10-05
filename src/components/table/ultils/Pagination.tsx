import Pagination from 'react-bootstrap/Pagination';

interface Props{
    currentPage:number,
    itemsPerPage:number,
    indexOfLastItem:number,
    indexOfFirstItem:number,
    setNewCurrentPage:(value:number)=>void,
    sizeData:number
}

export default function PaginationComponet(props:Props){

    const {currentPage,itemsPerPage,indexOfFirstItem,indexOfLastItem,setNewCurrentPage,sizeData} = props
    
    
    const totalPages:number = Math.ceil(sizeData / itemsPerPage);

    return(<>
    <section className={`flex flex-col items-center`}>
    

        {sizeData == 0 && <h6 className={`text-[#000080] !text-[1.1em] my-[160px]`}>Nenhum Resultado Encontrado</h6>}

        {(totalPages > 1)?
            <>
            <div className={`text-[#000080] !text-[.7em]`}>{`${indexOfFirstItem+1} - ${indexOfLastItem} de ${sizeData} resultados`}</div>
            
            <Pagination size="sm">
            <Pagination.First className={``} onClick={()=> {setNewCurrentPage(1)}}/>
            <Pagination.Prev className={``} onClick={()=> {setNewCurrentPage(currentPage - 1)}} disabled={currentPage == 1 ? true : false}/>
            <Pagination.Item className={``} ><>{`${currentPage} de ${totalPages}`}</></Pagination.Item>     
            <Pagination.Next className={``} onClick={()=> {setNewCurrentPage(currentPage + 1)}} disabled={currentPage == totalPages ? true : false}/>
            <Pagination.Last className={``} onClick={()=> {setNewCurrentPage(totalPages)}}/>
            </Pagination>
            </>
            : 
            <>
            <div className={`text-[#000080] !text-[.7em]`}>{`${sizeData} resultados`}</div>
            </>}
        

    </section> 
    </>);
}