import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database'
import { userInfo } from 'os';

// Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyBAOxfd4J5YdnQnujefBhmlnNLDww_CsoE",
    authDomain: "re-commend.firebaseapp.com",
    databaseURL: "https://re-commend.firebaseio.com",
    projectId: "re-commend",
    storageBucket: "re-commend.appspot.com",
    messagingSenderId: "931145234278",
    appId: "1:931145234278:web:d563bea3e834415a1e3aa7",
    measurementId: "G-GG2G0EKBLP"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  export const storage = firebase.storage()

  export async function loginWithEmail(email: string, password: string){
    try{
      const res = await firebase.auth().signInWithEmailAndPassword(email,password);
      console.log(res);
      return true;
    } catch(error){
      console.log(error);
      return false;
    } 
  }
  export async function loginWithFB(email: string, password: string){
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider).then(result =>{
    })
    try{
      return true;
    } catch(error){
      console.log(error);
      return false;
    } 
  }

  export async function register(email: string, password: string){
    try{
      const res = await firebase.auth().createUserWithEmailAndPassword(email,password); 
      return true;
    } catch(error){
      console.log(error);
      return false;
    } 
  }

  export const logOut = () => {
    return firebase.auth().signOut();
  };

  

  export async function getUser()
  {
    try{ var user = await firebase.auth().currentUser;
      return user;
  } catch(error){
    console.log(error);
    return false;
  } 
  }

  export async function upload(file:any,name:string)
  {
    try{
      const res = await firebase.storage().ref().child(name).put(file);
    return true;
    } catch(error){
      console.log(error);
      return false;
    } 
  }
  
  export async function download(name:string)
  {
    try{ var URL = await firebase.storage().ref().child(name).getDownloadURL();
        return URL;
    } catch(error){
      console.log(error);
      return false;
    } 
  }
