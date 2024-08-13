'use client'
import React, { FormEvent, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'



export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [returnInput, setReturnInput] = useState({});

    const objParams = [
      { nameParam: 'columnNome', nameInput: 'Nome' },
      { nameParam: 'columnVinculo', nameInput: 'Vínculo' },
      { nameParam: 'columnMes_Periodo', nameInput: 'Mês(Período)' },
      { nameParam: 'columnAno', nameInput: 'Ano' },
      { nameParam: 'columnOrgao', nameInput: 'Órgão' },
      { nameParam: 'columnCpf', nameInput: 'CPF' },
      { nameParam: 'columnMatricula', nameInput: 'Matrícula' },
      { nameParam: 'columnCargo', nameInput: 'Cargo' },
      { nameParam: 'columnDataAdmissao', nameInput: 'Data Admissão' },
      { nameParam: 'columnCargaHoraria', nameInput: 'Carga Horária' },
      { nameParam: 'columnValorBruto', nameInput: 'Valor Bruto' },
      { nameParam: 'columnValorLiquido', nameInput: 'Valor Líquido' },
      { nameParam: 'columnValorDesconto', nameInput: 'Valor Desconto' }]
    
    async function onSubmit(event:  React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault()
      console.log(returnInput)
      
    }
  
    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement> ) => {
      //const value = event.target.value;
      console.log( `${event.currentTarget.name} ${event.currentTarget.value}`)
      setReturnInput({
        ...returnInput,
        [event.currentTarget.name]: `${event.currentTarget.value}`,
      });
    };
    

  return (
    <div className="w-3/5 bg-fundo-n1 p-5 rounded-lg shadow-md  text-cor-primaria">
      
    <div className="flex justify-center items-center mb-10">
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria mx-2 relative"></div>
        <div className="w-[15px] h-[15px] rounded-full bg-cor-primaria opacity-25 mx-2 "></div>
    </div>

    <form className="mb-8" method='POST'>
        <p className="text-xl mb-4 font-[600]">Selecione em qual coluna os dados se encontram:</p>
        <div className="grid grid-cols-6 gap-4">
            {objParams.map((item, i) => (
                <div key={i}>
                    <label className="block text-cor-primaria mb-2">{item.nameInput}:</label>
                    <select className="w-full p-2 border border-gray-300 rounded" name={item.nameParam}  onChange={(e)=>handleChangeSelect(e)}>
                        <option value="" disabled selected>Selecione</option>
                        {Array(10).fill('').map((item, j) => (
                            <option key={j} value={j} >Coluna {j+1}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    </form>

    <div className="mb-8">
        <p className="text-xl mb-4  font-[600]">Visualização:</p>
        <div className="w-full h-[300px] border-2 border-dotted border-cor-primaria bg-fundo-n2 rounded-lg p-4"></div>
    </div>

    <div className="flex justify-between">
        <button  onClick={()=>location.reload()} className="px-5 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50">CANCELAR</button>
        <button onClick={(e)=>onSubmit(e)} className="px-5 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50">AVANÇAR</button>
    </div>
</div>

  );
}