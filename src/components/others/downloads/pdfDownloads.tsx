import pdfMake from 'pdfmake/build/pdfmake'


import pdfFonts from 'pdfmake/build/vfs_fonts'
/* import {NomeTipoPortal,NomePortal} from '../../../../../../../services/variables'
import {logoPortalBase64} from '../../../../../../../services/logoBase64' */
interface DataFolha{
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
export default  function generatePdf({data}:{data:DataFolha[]}) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    const arrayData2:any = [
        [
            {text:  '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
             {text: '',bold: true,fontSize: 9},
            ]
    ]
  
    data.map((d:DataFolha, i:any) => {
        arrayData2.push([
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
            {text:d.ANO,fontSize: 8},
          
            ]) 
    })
 
    const reportTitle = [
        {

        }
    ]
    const details = [
       /*  {
            image: logoPortalBase64,
	    width: 50,height: 50,alignment: 'center'},	
        {
            text: `${NomeTipoPortal} de ${NomePortal}\n\n`,fontSize: 14,alignment: 'center'
        }, */
        {
			style: 'tableExample',
			table: {
				headerRows: 1,
				// dontBreakRows: true,
				// keepWithHeaderRows: 1,
				body: arrayData2
			}
		},
    ]
    // const footer = [{text: `Arquivo gerado no portal: ${new Date().toLocaleString()} \n`,fontSize: 8, alignment: 'center'}]
    const footer = [{text: ``}]

    
    const docDefinitions = {
        pageSize: 'A2',
        pageMargins:[15,50,15,40],
        headers : [reportTitle],
        content: [details],
        footer: [footer],
        
    }
 pdfMake.createPdf(docDefinitions).open()//.print()//.download()
    
}