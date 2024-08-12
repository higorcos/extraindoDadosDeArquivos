'use client'
/*
import { FormEvent, useState } from 'react'
import axios from 'axios'

export default function Page() {

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    if (!file) return;

    const formData = new FormData()
    formData.append("file", file);
    
    try{

    const result = await axios.post('http://localhost:3003/test',formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    console.log(result)
      return {error: false, result}
    }catch(error){
      return {error: true, msgError:error ,result:[]}
 
    }  
  }
 


  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="nFile" onChange={handleFileChange}/>
      <br></br>
      <button type="submit" >Submit</button>
    </form>
  )
}
*/

import React, { useEffect, useState } from "react";
import { read, utils } from 'xlsx';

export default function StudentAidTotal() {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (file) {
      (async() => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          
          // Ler o arquivo com o formato correto
          const workbook = read(arrayBuffer, { type: "array" });
  
          // Obter a primeira planilha
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          
          // Converter para JSON
          const raw_data = utils.sheet_to_json(worksheet, { header: 1 });
          
          // Definir os dados da planilha
          console.log(raw_data)
          setRows(raw_data);
        } catch (error) {
          console.error("Error processing Excel file:", error);
        }
      })();
    }
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <table>
        <thead>
          <tr>
            {rows[0]?.map((header, index) => (
              <th key={index}>{index}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}