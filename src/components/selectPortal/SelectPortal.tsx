import { PortalContext } from "@/context/PortalContext"; 
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useContext } from "react";
import { IBoxSelectPortal } from "@/intefaces/SelectPortalInterface";
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
  const { setPortal,showPortal } = portalContext;
 
    
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
  
  useEffect(()=>{
    submit()
  },[resultId])

  const submit = () =>{
    setIdPortal(resultId) 
  }
  const click = ()=>{
    activeBox(false);
  }

  return (

    <div className="bg-[rgba(0,_0,_0,_0.7)]  fixed top-[0] left-[0] bottom-[0] right-[0] !z-[53]">
    <div className="bg-[#e0e0e0] p-[30px] absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded-[15px]">
 
      <form  className="flex flex-col w-[600px] asdczsczsc">
        
        <label className="">
          <div className="relative mb-3" data-twe-input-wrapper-init>
            <input
              type="text"
              name="filter"
              className="peer block min-h-[auto] w-full rounded border-0 bg-[white] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 text-black"
              placeholder="" 
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}

              />
            <label
            
              className="pointer-events-none uppercase absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-text-black peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >Filtrar
            </label>
          </div>

          <div className="">
          <select   
            className="peer block min-h-[auto] w-full rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary text-black appearance-none dark:text-white dark:bg-neutral-700 dark:peer-focus:text-primary"
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
        <input type="submit" onClick={()=> {click()}} value="Continuar" className={`px-5 my-3 mx-8 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50`}  />
      </form>

    </div>
    </div>
  )
}
