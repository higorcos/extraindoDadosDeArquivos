"use client"

import { useRouter } from 'next/navigation'

export default function ActionAfterUpload() {
  const router = useRouter()
  

  
  return (
    <>
    <div className={'bg-[rgba(0,_0,_0,_0.7)] fixed top-[0] left-[0] bottom-[0] right-[0] flex justify-center items-center flex-col z-50'}>
      <div className={''}>
        <button className={`px-5 m-6 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50`} onClick={()=>router.refresh()}>NOVO UPLOAD</button>
        <button className={`px-5 m-6 py-2 bg-botao-padrao text-white rounded-md cursor-pointer hover:bg-botao-padrao hover:opacity-50`} onClick={()=>router.push('/admin/listagem')}>VERIFICAR FOLHAS</button>
      </div>
    </div>
    </>
   )}
         
