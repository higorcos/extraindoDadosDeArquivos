import exportFromJSON from 'export-from-json'

export default function generateExportFile(name:string,fileTypeForExport:string,data:any,negateKeys:string[]){
    const dataExport = newObjectNegateDowland(data,negateKeys)
    
    
    switch (fileTypeForExport.toLocaleLowerCase()) {
        case 'json':
            const exportType =  exportFromJSON.types.json
            exportFromJSON({ data:dataExport, fileName:name, exportType:exportType })
            break;
        case 'csv':
            const exportCsv =  exportFromJSON.types.csv
            exportFromJSON({ data:dataExport, fileName:name, exportType:exportCsv })
            break;
        case 'xml':
            const exportXml =  exportFromJSON.types.xml
            exportFromJSON({ data:dataExport, fileName:name, exportType:exportXml })
            break;
        case 'xls':
            const exportXls =  exportFromJSON.types.xls
            exportFromJSON({ data:dataExport, fileName:name, exportType:exportXls })
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
  