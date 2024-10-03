import { IDataLocalStoragePortal  } from "@/intefaces/PortaisDataInterface";

export interface IDataPortalInsert {
        name: string,
        uuid: string,
}
export interface IDataPortalResult {
        NOME: string,
        UUID: string,
        ACRONYM: string,
        TYPE: string
}
export interface IPortalContext  {
        setPortal:(obj:IDataPortalInsert)=> void;
        showPortal: IDataLocalStoragePortal;
        statusPortal: boolean;
}
export interface IBoxSelectPortal {
        activeBox: (status:string)=>void;
}

