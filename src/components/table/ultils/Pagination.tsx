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
    <section className={``}>
    


        {(totalPages > 1)?
            <>
            <div className={``}>{`Página Atual: ${currentPage} de ${totalPages} com ${sizeData} resultados`}</div>
            
            <Pagination size="sm">
            <Pagination.First onClick={()=> {setNewCurrentPage(1)}}/>
            <Pagination.Prev onClick={()=> {setNewCurrentPage(currentPage - 1)}} disabled={currentPage == 1 ? true : false}/>
            <Pagination.Item active >{`De ${indexOfFirstItem+1} a ${indexOfLastItem}`}</Pagination.Item>     
            <Pagination.Next onClick={()=> {setNewCurrentPage(currentPage + 1)}} disabled={currentPage == totalPages ? true : false}/>
            <Pagination.Last onClick={()=> {setNewCurrentPage(totalPages)}}/>
            </Pagination>
            </>
            : 
            <>
            <div className={``}>{`${sizeData} resultados`}</div>
            </>}
        
        {sizeData == 0 && <h6 className={``}>Nenhum Resultado Encontrado</h6>}

    </section> 
    </>);
}