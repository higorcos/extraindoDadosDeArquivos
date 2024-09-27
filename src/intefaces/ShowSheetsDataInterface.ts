export interface IdataFolha{
  ID: string;
  NOME: string;
  MES_PERIODO: string;
  ANO: string;
  TIPO_FOLHA: string;
  ORGAO: string;
  CPF: string;
  MATRICULA: string;
  CBO: string;
  CARGO: string;
  LOTACAO: string;
  VINCULO: string | null;
  DATAADMISSAO: string; 
  CARGAHORARIA: string;
  VALORBRUTO: number;
  VALORLIQUIDO: number;
  VALORDESCONTO: number;
  VISUALIZACAO: number;
}

export interface IdataPeriods{
  MES_PERIODO: string,
  ANO: string
}

export interface IinforPortal{
  ID:string
	CNPJ:string,
  NOME:string,
}

export interface IdataFolhasAgrupadas{
    TIPO_FOLHA: string,
    VINCULO:string,
    CARGO: string,
    LOTACAO:string,
    VALORBRUTO: number,
    CONTAGEM: number,
    VALOR_TOTAL: number
}

export interface IpropsComponetShowData {
  sheets: IdataFolha[],
  periods: IdataPeriods[],
  inforPortal: IinforPortal,
  sheetsGroup: IdataFolhasAgrupadas[]
  uuidOrgao:string,
  idTable: OptionSwitchTable
}

export interface IdataSheetsAndDataGruop{
  inforPortal: IinforPortal,
  periodos: IdataPeriods[],
  folhas: IdataFolha[],
  folhasAgupadas: IdataFolhasAgrupadas[],
}

export type AllowedFileTypes = 'csv' | 'xls' | 'xml' | 'pdf' | 'json';

export type OptionSwitchTable = '0'|'1'|'2';
