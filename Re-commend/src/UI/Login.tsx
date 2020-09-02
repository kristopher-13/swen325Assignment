import React,{useRef,useState} from 'react';
import { logInOutline } from 'ionicons/icons';
import { IonRow, IonInput, IonButton, IonIcon, IonLabel, IonGrid, IonModal, IonCol, IonTitle, IonHeader, IonItem, IonContent, IonPage, IonAlert, IonLoading } from '@ionic/react';
import {loginWithEmail} from '../Data/firebaseConfig';
import {AuthContext} from '../Business/AuthProvider';
import {useHistory} from 'react-router'
import './Login.css';
import '../UI/theme/global.css';
import { auth } from 'firebase';

const Login:React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [busy,setBusy] = useState<boolean>(false);
  const [alert,setAlert] = useState<boolean>(false);

  const {userLogin,auth} = React.useContext(AuthContext);
  const history = useHistory();

  const loginHandle = () => {
    setBusy(true);
   
     userLogin(email,password).then(
       (result:any) =>{
         console.log(result)
       }
     )
     setBusy(false);
  }
  
  return (
    
    <div class="width-10">
      <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          cssClass='my-custom-class'
          header={'Welcome back'}
          message={'Login successfully.'}
          buttons={['Go to Homepage']}
        />
        <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonModal isOpen={showModal} swipeToClose={true} animated={true} backdropDismiss={false}  >
        <IonGrid class="width-9 ion-padding-top ion-padding-bottom center">
     
            <IonRow className="width-10" color="dark">
              <IonItem color='dark' className="width-10">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput className="width-10" type="email" value={email} placeholder="Email" onIonChange={(e:any) => setEmail(e.detail!.value)} required></IonInput>
              </IonItem>
            </IonRow>
            <IonRow className="width-10">
              <IonItem color='dark' className="width-10"> 
                <IonLabel position="floating">Password</IonLabel>
                <IonInput className="width-10" type="password" value={password} placeholder="Password" onIonChange={(e:any) => setPassword(e.detail!.value)} required  ></IonInput>
              </IonItem>
            </IonRow> 
          <IonRow className="width-10">
            <IonCol>
              <IonButton color="light" className="width-10" onClick={loginHandle} >
              Login
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="light" className="width-10" onClick={e => setShowModal(false)}>
              Cancel
              </IonButton>
            </IonCol>
            
          </IonRow>
        </IonGrid>
      </IonModal>
    <IonRow className="width-10">
     <IonRow className="ion-justify-content-center width-10">
          <IonButton color="light" onClick={e => setShowModal(true)} className="width-10" >
            <IonIcon icon={logInOutline}></IonIcon>
              <IonLabel >
                Login
              </IonLabel>
            </IonButton>   
      </IonRow>
    </IonRow>
    </div >
    
  )
}

export default Login;
