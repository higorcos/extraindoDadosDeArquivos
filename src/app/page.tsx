'use client'
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

    const result = await axios.post('http://localhost:3003/products/dinamic/xml',formData, {
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