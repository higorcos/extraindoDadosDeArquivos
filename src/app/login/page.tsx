'use client'
import React, { FormEvent, useState, useEffect, CSSProperties, useContext } from 'react'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { AlertError, AlertSuccess, AlertWarning } from '@/ultils/alert';
import {AuthContext} from '../../context/AuthContext'

export default function PageListagemFolhasAdm() {
  const [emailUser,setEmailUser] = useState<string>('')
  const [password,setPassword] = useState<string>('')

  const a = useContext(AuthContext);

  const onSubmit=(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
 
    console.log(emailUser,password)
    a?.login(emailUser,password) 
  }
   
return (
  <div className="grid grid-cols-[1fr]">
    {/* {!removeLoading && <Loading/> } */}
    <form
    method='post'
    onSubmit={onSubmit}
    className={`flex flex-col w-full  items-center font-sans`}>
      <div 
      className={`flex flex-col items-center bg-white shadow-[5px_5px_15px_rgb(0,0,0,0.2)]  max-w-[600px] min-w-[400px]  p-[30px] rounded-[15px]`}>
        <h1 className={`text-[#000080] text-2xl font-semibold uppercase mb-2.5`}>Faça seu login</h1>
        <div className={`flex justify-center w-1/5 mb-[30px]`}>
          <img className={`w-full first:mr-2.5`} src="/img/logo.jpg" alt="" />         
        </div>
        <label className={` flex justify-center items-center flex-col mt-5 mb-3`}>
          <input
            type="email"
            name="title"
            className={`text-center border rounded w-6/12 max-w-[600px] min-w-[200px] border-solid border-[#0b49d848] focus:border focus:border-solid focus:border-cor-primaria`}
            //value={emailUser}
            onChange={(e) =>  setEmailUser(e.target.value)}
            placeholder='DIGITE SEU EMAIL'
          />
          <div className={`content-[''] absolute h-px w-[49%] bottom-[-3px] scale-x-0 left-1/4;`}></div>
        </label>
        <label className={` flex justify-center items-center flex-col mb-5 `}>        
          <input
            type="password"
            name="title"
            className={`text-center border rounded w-6/12 max-w-[600px] min-w-[200px] border-solid border-[#0b49d848] focus:border focus:border-solid focus:border-cor-primaria`}
            placeholder='DIGITE SUA SENHA'
            onChange={(e) =>  setPassword(e.target.value)}
          />
        </label>
        <input type="submit" className={`px-6 py-3 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50  my-5`} value="ENTRAR" />
      </div>

    </form> 
  </div> )
}