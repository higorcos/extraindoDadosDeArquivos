'use client'
import React ,{ createContext, useState, useEffect,ReactNode} from "react";
import { AlertError, AlertSuccess, AlertWarning } from '@/ultils/alert';
import api from "../services/api";
import { useRouter } from 'next/navigation'


interface AuthContextProps {
    authenticated: boolean;
    loading: boolean;
    user: string | null
    login: (email:string, password:string) => void;
    logout: () => void;
  }
export const AuthContext = createContext<AuthContextProps|undefined>(undefined);

export const AuthProvider =({children}: { children: ReactNode })=> {    
    const router = useRouter();

    const [statusUser, setStatusUser] = useState<boolean>(false)
    const [user,setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    /* const navigate = useNavigate(); */
    
    useEffect(()=>{
        const recoveryUser:string|null = localStorage.getItem('userWk_folha_de_pagamento')
        const recoveryToken = localStorage.getItem('tokenUserWK_folha_de_pagamento')
        
        if(recoveryUser && recoveryToken){
            setUser(recoveryUser)
            api.defaults.headers['x-access-token'] =  recoveryToken
            setStatusUser(true)
        }else{
            setStatusUser(false)

        }
        setLoading(false)
         // eslint-disable-next-line
    },[])
    
    const login = (email:string, password:string)=>{
        //6cbe71077b4d0ab32f893a0633a3cb822484ea63 == Prefeitura Modelo
    api.post(`/user/login`,{
            email:email,
            password:password
    }).then((res)=>{
        const result = res.data.data
        console.log(result)
    if(result.auth){ // se autorização
      
        const token = result.token
        setUser(email)
        setStatusUser(true)
        
        localStorage.setItem('tokenUserWK_folha_de_pagamento',token)
        localStorage.setItem('userWk_folha_de_pagamento',email)
        api.defaults.headers['x-access-token'] =  token
        AlertSuccess('Login realizado com sucesso')

        router.push('/') 
        
        }else{// se não tiver autorização
        setStatusUser(false)
        
        AlertError('Login inválido')
        
        /* navigate(0); */
        
            
        }
    }).catch((err)=> {
        setStatusUser(false)
        AlertError('Login inválido')
        /* navigate(0); */
   
    })
    
    }
    const logout =()=>{
      localStorage.removeItem('userWk_folha_de_pagamento')
      localStorage.removeItem('tokenUserWK_folha_de_pagamento')
      api.defaults.headers['x-access-token'] =  null
      setUser(null)
      setStatusUser(false)

    }
    return(
        <AuthContext.Provider value={{authenticated: statusUser,user, loading, login, logout}}>
                {children}
        </AuthContext.Provider>
    )
}