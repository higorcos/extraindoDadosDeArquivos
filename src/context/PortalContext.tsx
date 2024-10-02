'use client'
import React,{ createContext, useState, ReactNode} from "react";
import { IDataPortalInsert, IDataPortalResult, IPortalContext,  } from "@/intefaces/SelectPortalInterface";
import { IDataLocalStoragePortal  } from "@/intefaces/PortaisDataInterface";

export const PortalContext = createContext<IPortalContext|undefined>(undefined)


export const PortalProvider =({children}: { children: ReactNode })=> {
    
    const [statusPortal,setStatusPortal] = useState<boolean>(true)
    
    const setPortal = (dataPortal:IDataPortalInsert)=>{
        console.log('o000o',dataPortal)
        localStorage.setItem('si_fl_name_PORTAL',dataPortal.name)
        localStorage.setItem('si_fl_uuid_PORTAL',dataPortal.uuid)

        const portalAcronym:string = generateAcronym(dataPortal.name)
        localStorage.setItem('si_fl_sigla_nome_portal', portalAcronym)
        const organType:string = portalType(dataPortal.name)
        localStorage.setItem('si_fl_tipo_portal_selecionado', organType)

        setStatusPortal(!statusPortal)
        
    }
    //@@
    //Adicionar Tipagem
    const showPortal:IDataLocalStoragePortal = {
        NOME: localStorage.getItem('si_fl_name_PORTAL'),
        UUID: localStorage.getItem('si_fl_uuid_PORTAL'),
        ACRONYM: localStorage.getItem('si_fl_sigla_nome_portal'),
        TYPE: localStorage.getItem('si_fl_tipo_portal_selecionado'),
    }
    const generateAcronym =(name:string)=>{
        
        if(name.indexOf("Câmara") >= 0){
            return name.replace("Câmara Municipal", "C.M.");   
          }else if((name.indexOf("Prefeitura")) >= 0){       
            return name.replace("Prefeitura Municipal", "P.M.");
          }else{
            //console.log('nada aqui')
            return name
          }
    }
    const portalType = (name:string)=>{
        
        if(name.indexOf("Câmara") >= 0){
            return '4';
          }else if((name.indexOf("Prefeitura")) >= 0){
            return '3';
          }else{
            return '0';
          }
    }
 
    return(
    <PortalContext.Provider value={{setPortal,showPortal,statusPortal}}>
     {children}
    </PortalContext.Provider>
    )
}