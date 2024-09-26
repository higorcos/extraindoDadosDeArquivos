'use client'
import React, { FormEvent, useState, useEffect,CSSProperties  } from 'react'
import { read, utils } from 'xlsx';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { AlertError, AlertWarning } from '@/ultils/alert';
import {TypeColumunsDataInsertRubricas} from '../../intefaces/TypeColumunsDataInsertInterfaceRubricas'  

interface Props{
  dataFile: File;
  typeTCE: 'MA'|'PI';
  setValueParent: (value: TypeColumunsDataInsertRubricas) => void; 
}


export default function InsertReferencesRubricas(props:Props) {
const defaultValueInputTCE_MA: TypeColumunsDataInsertRubricas={
  columnOrgao: '0',
  columnMes_Periodo: '1',
  columnAno: '2',
  columnIdTipoPagamento: '3',
  columnCpf: '4',
  columnTipoPagamento: '7',
  columnValor: '8',
  columnDesconto: '14',
}
const defaultCollumnsTableTCE_MA=["Órgão", "Mês(Período)", "Ano", "ID Tipo pagamento", "CPF", "", "", "Tipo Pagamento", "Valor", "", "", "", "", "",'Desconto']
const {dataFile, setValueParent,typeTCE} = props
const [file, setFile] = useState(dataFile);
const [rows, setRows] = useState<(string | number)[][]>([]);
const [numColumns,setNumColumns] = useState<number>()
const heightTable= {
  "MA": 500,
  "PI": 300
}
const [returnInput, setReturnInput] = useState<TypeColumunsDataInsertRubricas>({
  columnCpf: '',
  columnMes_Periodo: '',
  columnAno: '',
  columnOrgao: '',
  columnTipoPagamento: '',
  columnIdTipoPagamento: '',
  columnDesconto: '',
  columnValor: '',});

const objParams = [
  { nameParam: 'columnOrgao', nameInput: 'CPF do Orgão' },
  { nameParam: 'columnMes_Periodo', nameInput: 'Mes Período' },
  { nameParam: 'columnAno', nameInput: 'Ano' },
  { nameParam: 'columnIdTipoPagamento', nameInput: 'Id Tipo Pagamento' },
  { nameParam: 'columnCpf', nameInput: 'Cpf' },
  { nameParam: 'columnTipoPagamento', nameInput: 'Tipo Pagamento' },
  { nameParam: 'columnValor', nameInput: 'Valor' },
  { nameParam: 'columnDesconto', nameInput: 'Desconto' },
]

    

useEffect(() => {
  if (dataFile) {
    (async() => {
      try {
        const arrayBuffer = await dataFile.arrayBuffer();
        
        // Ler o arquivo com o formato correto
        const workbook = read(arrayBuffer, { type: "array", cellText: true,cellDates:true });

        // Obter a primeira planilha
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Converter para JSON
        const raw_data: (string | number)[][] = utils.sheet_to_json(worksheet, { header: 1, raw:false, dateNF:"MM/DD/YYYY" });
        
        // Definir os dados da planilha
        setRows(raw_data);

        // Obter o número de colunas (o comprimento da primeira linha)
        const numColumns:number = raw_data[0]?.length || 0;
        setNumColumns(numColumns)

      } catch (error) {
        console.error("Error processing Excel file:", error);
      }
    })();
  }
}, [file]);

async function onSubmit(event:  React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault()
    if(typeTCE == "MA"){
      setValueParent(defaultValueInputTCE_MA)
      return
    }
  
    if (checkIfAreAllFieldsDefined(returnInput)){
        setValueParent(returnInput)
      }else{
        return AlertWarning(`Selecione todas as colunas`)
      }
}

const checkIfAreAllFieldsDefined = (obj: TypeColumunsDataInsertRubricas): boolean => {
  if (returnInput){
    return Object.values(obj).every(value => value !== "");
  }else{
    return false
  }
}

const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement> ) => {
  const value = event.currentTarget.value;
  const name = event.currentTarget.name;
  //console.log( `${name} ${value}`)
  if (value !== undefined && name !== undefined) {
    setReturnInput(prevState => ({
      ...prevState,
      [name]: `${value}`,
    }));
  }      
};

const tableStyle: CSSProperties = {
  // height: '250px', // Define a altura do contêiner para ativar a rolagem vertical
  //padding: '20px',
  overflow: 'auto', // Ativa a rolagem vertical e horizontal
};

const tableInnerStyle: CSSProperties = {
  minWidth: '50px', // Define uma largura mínima para ativar a rolagem horizontal
  borderCollapse: 'collapse', // Opcional: remove espaços entre células da tabela
};
console.log(dataFile)

return (
  <div className="w-3/5 bg-fundo-n1 p-5 rounded-lg shadow-md  text-cor-primaria">
    
  <div className="flex justify-center items-center mb-10">
      <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
      <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
      <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
      <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria mx-2 relative"></div>
  </div>
    {typeTCE == "PI" ? <>
        <form className="mb-8" method='POST'>
            <p className="text-xl mb-4 font-[600]">Selecione em qual coluna os dados se encontram:</p>
            <div className="grid grid-cols-6 gap-4">
              
                {objParams.map((item, i) => (
                    <div key={i}>
                        <label className="block text-cor-primaria mb-2">{item.nameInput}:</label>
                        <select className="w-full p-2 border border-gray-300 rounded" name={item.nameParam}  onChange={(e)=>handleChangeSelect(e)}>
                            <option value="" disabled selected>Selecione</option>
                            {Array(numColumns).fill('').map((item, j) => (
                                <option key={j} value={j} >Coluna {j+1}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </form>
    </> :  <p className="text-xl mb-4 font-[600]">Modelo TCE-MA: </p>}
    

  <div className="mb-8">
      <p className="text-xl mb-4  font-[600]">Visualização Da tabela de rubricas:</p>
      <div 
      className={`w-full h-[400px] border-2 border-dotted border-cor-primaria bg-fundo-n2 rounded-lg pb-10`}
      style={tableStyle}
      >
        <table style={tableInnerStyle}
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
          <thead className="text-xs text-gray-700 uppercase bg-cor-primaria dark:bg-gray-700 dark:text-gray-400">
            <tr
            className="bg-cor-primaria border-b dark:bg-gray-800 dark:border-gray-700">

              {typeTCE == "MA" ? <>
                {defaultCollumnsTableTCE_MA?.map((index) => (
                  <th 
                  scope="col" className="px-6 py-3"
                  key={index}>{index}</th>
                ))}
              </> : <>              
              {rows[0]?.map((header, index) => (
                  <th 
                  scope="col" className="px-6 py-3"
                  key={index}>{index + 1}</th>
                ))}
              </>
              }
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              key={index}>
                {row.map((cell, i) => (
                  <td 
                  className="px-6 py-4"
                  key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>


      </div>
  </div>

  <div className="flex justify-between">
      <button  onClick={()=>location.reload()} className="px-5 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50">CANCELAR</button>
      

      <button onClick={(e)=>onSubmit(e)} 
        className={`px-5 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50  
          ${Object.keys(returnInput).length < objParams.length ? 'opacity-20' : false}`}
      >AVANÇAR</button>
      
  </div>
  </div>

);
}