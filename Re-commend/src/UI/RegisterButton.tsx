import React,{useRef,useState} from 'react';
import { logInOutline } from 'ionicons/icons';
import { IonRow, IonInput, IonButton, IonIcon, IonLabel, IonGrid, IonModal, IonCol, IonTitle, IonHeader, IonItem } from '@ionic/react';
import {createOutline} from 'ionicons/icons';
import '../UI/theme/global.css';

const RegisterButton:React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

return (
    <IonRow className="ion-justify-content-center width-10">
          <IonButton color="light" href="./register" className="width-10" >
            <IonIcon icon={createOutline}></IonIcon>
              <IonLabel >
                Register
              </IonLabel>
            </IonButton>   
    </IonRow>
  )
}

export default RegisterButton;
