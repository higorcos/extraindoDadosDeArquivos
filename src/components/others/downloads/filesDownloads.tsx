import exportFromJSON from 'export-from-json'
import {AllowedFileTypes} from '@/intefaces/ShowSheetsDataInterface'

export default function generateExportFile(fileName:string,fileTypeForExport:AllowedFileTypes,dice:any,negateKeys:string[]){
    const data = newObjectNegateDowland(dice,negateKeys)
    
    
    switch (fileTypeForExport) {
        case 'json':
            const exportType =  exportFromJSON.types.json
            exportFromJSON({ data, fileName, exportType:exportType })
            break;
        case 'csv':
            const exportCsv =  exportFromJSON.types.csv
            exportFromJSON({ data, fileName, exportType:exportCsv })
            break;
        case 'xml':
            const exportXml =  exportFromJSON.types.xml
            exportFromJSON({ data, fileName, exportType:exportXml })
            break;
        case 'xls':
            const exportXls =  exportFromJSON.types.xls
            exportFromJSON({ data, fileName, exportType:exportXls })
            break;
        default:
            throw new Error(`Tipo de arquivo não suportado: ${fileTypeForExport}`);
      }
  }
  
  const newObjectNegateDowland =(data:any,negateKeys:string[])=>{
    const resultKeysNegate =  negateFilterKeys(data,negateKeys)
    return objectDownload(data,resultKeysNegate)
  }
  const objectDownload = (data:any,keys:any)=>{
    var result = []
    for (const i in data) {
        const newData = keys.map((key:any) => {
            let value = data[i][key]
                return {[key]: value}
            }
            ).reduce((prev:any,next:any)=>{
                return({...prev,...next})
            },{})
        result.push(newData)
            
        }
   return result
  } 
  //remover as keys desnecessárias
  const negateFilterKeys = (data:any,negateKeys:any)=>{
  
    return Object
      .keys(data[0])
      .filter(key => !negateKeys.includes(key))
  }
  