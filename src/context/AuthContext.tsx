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

function isTokenExpired(token: string): boolean {
    // Divida o token para pegar a parte do payload
    const payloadBase64 = token.split('.')[1];  // Pega a segunda parte do token (payload)
    
    // Decodifica o payload
    const decodedPayload = JSON.parse(atob(payloadBase64));
    
    // O campo `exp` contém o tempo de expiração em segundos (Unix Time)
    const expirationTime = decodedPayload.exp;
  
    // Pega o tempo atual em segundos
    const currentTime = Math.floor(Date.now() / 1000);
  
    // Verifica se o token está expirado
    return currentTime > expirationTime;
  }

export const AuthProvider =({children}: { children: ReactNode })=> {    
    const router = useRouter();

    const [statusUser, setStatusUser] = useState<boolean>(false)
    const [user,setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    /* const navigate = useNavigate(); */
    
    useEffect(()=>{
        const recoveryUser:string|null = localStorage.getItem('userWk_folha_de_pagamento')
        const recoveryToken = localStorage.getItem('tokenUserWK_folha_de_pagamento')

        if(recoveryToken){
            if(isTokenExpired(recoveryToken)){
              setStatusUser(false)
              logout()
              router.push('/login') 
            }
        }
        
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
            
        }
    }).catch((err)=> {
        setStatusUser(false)
        AlertError('Login inválido')
   
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