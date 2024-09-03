'use client'
import React,{ createContext, useState, ReactNode} from "react";
import { IDataPortalInsert, IDataPortalResult, IPortalContext } from "@/intefaces/SelectPortalInterface";

export const PortalContext = createContext<IPortalContext|undefined>(undefined)

export const PortalProvider =({children}: { children: ReactNode })=> {
    
    const [statusPortal,setStatusPortal] = useState<boolean>(true)
    
    const setPortal = (dataPortal:IDataPortalInsert)=>{
        console.log('o000o',dataPortal)
        localStorage.setItem('name_PORTAL',dataPortal.name)
        localStorage.setItem('uuid_PORTAL',dataPortal.uuid)

        const portalAcronym:string = generateAcronym(dataPortal.name)
        localStorage.setItem('ACRONYM_PORTAL', portalAcronym)
        const organType:string = portalType(dataPortal.name)
        localStorage.setItem('TYPE_PORTAL', organType)

        setStatusPortal(!statusPortal)
        
    }
    //@@
    //Adicionar Tipagem
    const showPortal= {
        NOME: localStorage.getItem('name_PORTAL'),
        UUID: localStorage.getItem('uuid_PORTAL'),
        ACRONYM: localStorage.getItem('ACRONYM_PORTAL'),
        TYPE: localStorage.getItem('TYPE_PORTAL'),
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