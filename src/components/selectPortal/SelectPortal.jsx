import { useState, useEffect } from "react";
import api from "../../services/api";
/* import Loading from "../../../utils/loading/LoadingFull"; */
import { PortalContext } from "../../context/PortalContext"; 
/* import styled from './selectPortal.module.css' */
import { useContext } from "react";

export default function SelectPortal({activeBox}) {
const [removeLoading, setRemoveLoading] = useState(true) //loading

const [idPortal,setIdPortal] = useState(null)
const [optionPortal,setOptionPortal] = useState(null)
const [filterOption, setFilterOption] = useState([])
const [resultFilterOption, setResultFilterOption] = useState([])
const {setPortal} = useContext(PortalContext)
const [resultId, setId] = useState(null)


useEffect(() => {
  //setRemoveLoading(false)
  const f = async ()=>{
    await api.get(`/fakeID/portal/show/available`).then((res) => {
      
      setOptionPortal(res.data.res);
      setResultFilterOption(res.data.res)
      
    }).catch((err)=>{
      console.log('erro')
    });
    //setRemoveLoading(true)
  }
    f()

}, []);
useEffect(()=>{
  if(filterOption != null && filterOption != undefined){
    if(optionPortal != null && optionPortal != undefined){

  setResultFilterOption(optionPortal.filter((item,index)=>{
    const nameCase = (item.NOME).toLowerCase()
    if(nameCase.includes(filterOption.toString().toLowerCase())){
      // console.log(nameCase)
      return item
    }
  }))
  }} 
//  console.log(resultFilterOption)   
// eslint-disable-next-line                  
},[filterOption])

useEffect(() => {
    setRemoveLoading(false)
    if( resultFilterOption != null){

      resultFilterOption.map((item)=>{
        if(item.UUID == idPortal){
          setPortal(item)
          console.log(item, 'item')
        }})
        setRemoveLoading(true);

      }
}, [idPortal]);

const submit = (e) =>{
  console.log('idfudiu',resultId)
  setIdPortal(resultId) 
}
return (
  <>
  <h1 onClick={()=>activeBox(false)}>
  asdasdass
  </h1>
    
  {/* {!removeLoading && <Loading/> } */}
  <div >
    <div >

      <div  >
      <div >
        <h5>Selecione o Portal</h5>
      </div>

      </div>
      <form  >
        
        <label className="form-office-new ">
        <input
            type="text"
            name="filter"
            placeholder="Filtrar opções"
            className="select select-category2 form-input-news"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          />
          <div className="form-news office-select">
          <select   
            className="select select-category2 form-input-news" 
            onChange={(e) => setId(e.target.value)}
            defaultValue={0}
          >
            <option disabled selected>Selecione um portal</option>
            {resultFilterOption == null
              ? ""
              : <>
              { resultFilterOption.map((item, i) => (
                  <option value={item.UUID} key={i}> 
                    {item.NOME}
                  </option>
                ))} 
              </>
                }
          </select>
          </div>
          
        </label>
        <input type="submit" onClick={(e)=> {activeBox(true); submit(e)}} value="Continuar" className="button-submit" />
      </form>

    </div>
  </div> 
    </>
)}
/*

<div className={styled.cardBackground}>
<div className={styled.cardRole}>

  <div  className={styled.header}>
  <div className={styled.title}>
    <h5>Selecione o Portal</h5>
  </div>

  </div>
  <form  className={styled.bodyForm}>
    
    <label className="form-office-new ">
    <input
        type="text"
        name="filter"
        placeholder="Filtrar opções"
        className="select select-category2 form-input-news"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      />
      <div className="form-news office-select">
      <select   
        className="select select-category2 form-input-news" 
        onChange={(e) => setId(e.target.value)}
        defaultValue={0}
      >
        <option disabled selected>Selecione um portal</option>
        {resultFilterOption == null
          ? ""
          : <>
          { resultFilterOption.map((item, i) => (
              <option value={item.UUID} key={i}> 
                {item.NOME}
              </option>
            ))} 
          </>
            }
      </select>
      </div>
      
    </label>
    <input type="submit" onClick={(e)=> {activeBox(true); submit(e)}} value="Continuar" className="button-submit" />
  </form>

</div>
</div> 

*/