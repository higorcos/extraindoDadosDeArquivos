export interface IDataPortal {
    ID: string;
    BAIRRO: string;
    CEP: string;
    CIDADE: string;
    CNPJ: string;
    ENDERECO: string;
    LASTUPDATE: string; //data
    NOME: string;
    UF: string;
    UUID: string;
    UNIDADEORCAMENTARIA: string;
    STATUS: number;
    EMAILESIC: string;
    CODIGOTCE: string;
    PASTA: string;
    VERIFICARPRIMEIROACESSO: number;
    EMAILOUVIDORIA: string;
    LOGOMARCA: string;
    SINCRONIZARSACOP: number;
    ORGAO: string;
    ATIVO: number;
    SINCRONIZARREMUNERACAO: string;
    LINK: string;
    ASSINARPDF: number;
    TELEFONEESIC: string;
    TELEFONEOUVIDORIA: string;
    LOCALESIC: string;
    HORARIOESIC: string;
    EMAILSMTP: string;
    EMAILPORTA: string;
    EMAILUSUARIO: string;
    EMAILADMESIC: string;
    COVIDRECEITALINK: string;
    COVIDDESPESALINK: string;
    COVIDPLANEJAMENTOLINK: string;
    COVIDNOTICIALINK: string;
    BUSCARSACOP: number;
    SITEHORARIOFUNCIONAMENTO: string;
    SITEEMAILFALECOMNOSCO: string;
    LINKDIARIALEGISLACAO: string;
    ANOSAAP: number;
    TAMANHOQRCODE: string;
    ALTURAQRCODE: string;
    LINKTRANSPARENCIA: string;
    IDORGAOFOLHA: string;
    LINK_INSTAGRAM: string;
    LINK_FACEBOOK: string;
    LINK_WHATSAPP: string;
    ESICLOCALTRABALHO: string;
    ESICSERVIDORNOME: string;
    ESICSERVIDORFUNCAO: string;
    CAMINHOCERTIFICADO: string;
  }
export interface IDataLocalStoragePortal{
    NOME: string|null,
    UUID: string|null,
    ACRONYM: string|null,
    TYPE: string|null,
  }
  