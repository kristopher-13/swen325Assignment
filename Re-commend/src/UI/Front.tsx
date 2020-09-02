import React from 'react';
import { IonContent, IonPage, IonTitle,IonRow,IonGrid } from '@ionic/react';
import Login from './Login';
import RegisterButton from './RegisterButton';
import './Front.css';
import './theme/global.css';



const Front: React.FC = () => {
 
  return (
      <IonPage>
        <IonContent color="dark">
          <IonGrid className="center">
            <IonRow className="ion-margin ">
              <IonTitle size="large" className="title">
                Re-Commend
              </IonTitle>
            </IonRow>
            <IonRow className="middle-8">
              <Login/>
              <RegisterButton/>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
  );
};

export default Front;