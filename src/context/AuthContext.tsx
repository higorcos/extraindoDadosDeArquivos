'use client'
import React ,{ createContext, useState, useEffect,ReactNode} from "react";
// import { PortalContext } from "../contexts/portal";
import api from "../services/api";
import { redirect } from 'next/navigation'

interface AuthContextProps {
    authenticated: boolean;
    loading: boolean;
    user: string | null
    login: (email:string, password:string) => void;
    logout: () => void;
  }
export const AuthContext = createContext<AuthContextProps|undefined>(undefined);

export const AuthProvider =({children}: { children: ReactNode })=> {

    const [statusUser, setStatusUser] = useState<boolean>(false)
    const [user,setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    /* const navigate = useNavigate(); */
    
    useEffect(()=>{
        const recoveryUser:string|null = localStorage.getItem('userWk')
        const recoveryToken = localStorage.getItem('tokenUserWkGerenciador')
        
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
        console.log('iii')
        //6cbe71077b4d0ab32f893a0633a3cb822484ea63 == Prefeitura Modelo
    api.post(`/6cbe71077b4d0ab32f893a0633a3cb822484ea63/login`,{
            email:email,
            password:password
    }).then((res)=>{
        const result = res.data
        console.log(result)
    if(result.auth){ // se autorização
      
        const token = result.token
        setUser(email)
        setStatusUser(true)
        
        localStorage.setItem('tokenUserWkGerenciador',token)
        localStorage.setItem('userWk',email)
        api.defaults.headers['x-access-token'] =  token
        /* navigate('/') */
        
        }else{// se não tiver autorização
        setStatusUser(false)
        alert('Login invalido')
        /* navigate(0); */
        
            
        }
    }).catch((err)=> {
        setStatusUser(false)

        alert('Login invalido')
        /* navigate(0); */
   
    })
    
    }
    const logout =()=>{
      localStorage.removeItem('userWkr')
      localStorage.removeItem('tokenUserWkGerenciador')
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