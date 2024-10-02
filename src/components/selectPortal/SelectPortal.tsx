import { PortalContext } from "@/context/PortalContext"; 
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useContext } from "react";
/* import Loading from "../../../utils/loading/LoadingFull"; */
/* import styled from './selectPortal.module.css' */
import { IBoxSelectPortal, IDataPortalInsert } from "@/intefaces/SelectPortalInterface";
import { IDataPortal } from "@/intefaces/PortaisDataInterface";


export default function SelectPortal({activeBox}:IBoxSelectPortal) {
  const [removeLoading, setRemoveLoading] = useState<boolean>(true) //loading
  const [idPortal,setIdPortal] = useState<string|null>(null)
  const [optionPortal,setOptionPortal] = useState<IDataPortal[] | null>(null)
  const [filterOption, setFilterOption] = useState<string|[]>([])
  const [resultFilterOption, setResultFilterOption] = useState<IDataPortal[]| null>(null)
  const [resultId, setId] = useState<string|null>(null)

  const portalContext = useContext(PortalContext);
  if (!portalContext) {
    throw new Error('Error portalContext');
  }
  const { setPortal } = portalContext;
    
  useEffect(() => {
    //setRemoveLoading(false)
    const f = async ()=>{
      await api.get(`/portais`).then((res) => {
        setOptionPortal(res.data.data);
        setResultFilterOption(res.data.data)
        
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
  
    setResultFilterOption(optionPortal.filter((item:IDataPortal)=>{
      const nameCase = (item.NOME).toLowerCase()
      if(nameCase.includes(filterOption.toString().toLowerCase())){
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
  
        resultFilterOption.map((item:IDataPortal)=>{
          if(item.UUID == idPortal){
            setPortal({name:item.NOME,uuid: item.UUID})
           
          }})
          setRemoveLoading(true);
  
        }
  }, [idPortal]);
  
  const submit = () =>{
    setIdPortal(resultId) 
  }
  const click = ()=>{
    console.log('set',resultId)

    submit()
    //activeBox();
    //setPortal({name:'test',uuid:`${ new Date()}`})

  }

  return (
    <>
    <h1 onClick={()=>{click()}}>
    -------------
    </h1>


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
        <input type="submit" onClick={()=> {click()}} value="Continuar" className="button-submit" />
      </form>

    </div>
    </div> 
      </>
  )
}
