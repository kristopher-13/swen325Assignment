import React,{useRef,useState} from 'react';
import * as firebaseConfig from '../Data/firebaseConfig'
import { Context } from 'vm';


export const AuthContext = React.createContext<any>(undefined);  

export const AuthProvider:React.FC = ({ children}) => 
{
    const [auth, setAuth] = React.useState({
        isLogin:false,
        email:'',
        photoURL:'',
    });

    async function userLogin (email:string, password:string){
         await firebaseConfig.loginWithEmail(email,password).then(result =>{
            return result;
        })
    }
    async function userPhoto(email:string)
    {
        await firebaseConfig.download(email).then(result => {
          return result;  
        })
    }
    const userLogout =  () => {
        firebaseConfig.logOut();
        setAuth({
            isLogin:false,
            email:'',
            photoURL:''
        })
    }   
    let state = {
        auth,
        setAuth,
        userLogin,
        userLogout
    }; 
    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContext;
