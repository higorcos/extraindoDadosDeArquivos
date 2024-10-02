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
        showPortal: any;
        statusPortal: boolean;
}
export interface IBoxSelectPortal {
        activeBox: (status:string)=>void;
}

