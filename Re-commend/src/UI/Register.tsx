import React,{useRef,useState} from 'react';
import { IonRow, IonButton, IonIcon, IonLabel,  IonGrid, IonItem, IonInput,  IonContent, IonSlides, IonSlide, IonHeader, IonToolbar, IonImg, IonPage, IonCheckbox,  IonAlert, IonLoading } from '@ionic/react';
import {register, loginWithEmail,upload} from '../Data/firebaseConfig';
import './Register.css';
import '../UI/theme/global.css';
import {takePicture} from '../Business/photoTaker';
import {dataURItoBlob} from '../Business/URIToBlob';
import {AuthProvider} from '../Business/AuthProvider'
import {minlength,maxlength,emailCheck,passwordCheck,requiredCheck} from '../Business/Validation';
import {imageOutline,createOutline} from 'ionicons/icons';
import { CameraPhoto } from '@capacitor/core';
import {AuthContext} from '../Business/AuthProvider';
import { Redirect, useHistory } from 'react-router';

const Register:React.FC = () =>{
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setcPassword] = useState<string>("");
    const [photo,setPhoto] = useState<CameraPhoto>();
    const [photosrc,setPhotosrc] = useState<string>("");
    const [checked,setChecked] = useState<boolean>(false);

    const [busy,setBusy] = useState<boolean>(false);
    const [alert,setAlert] = useState<boolean>(false);
    const [alertMsg,setAlertMsg] = useState<string>("");
    const history = useHistory();
    const {userLogin,auth,setAuth} = React.useContext(AuthContext);

    const slideOpts = {
        initialSlide: 0,
        speed: 400
      };
    
    const handlePhoto = () => {
      const pic = takePicture().then(result =>{
        var src = result!.webPath
        setPhoto(result!);
        setPhotosrc(src!);
      });
    }

    const validate = () => {
      setBusy(true)
      var msg = "";
      
      if(requiredCheck(email) == false)
      {
        msg += "Email is not filled " + "\n";
      }else if(emailCheck(email) == false){
        msg += "Email is not in proper format " + "\n";
      }
      
      if(requiredCheck(password) == false)
      {
        msg += "Password is not filled " + "\n";
      }else if(minlength(6,password) == false)
      {
        msg += "Password is less than 6 characters " + "\n";
      }else if(maxlength(32,password) == false)
      {
        msg += "Password is less than 6 characters " + "\n";
      }

      if(requiredCheck(cpassword) == false)
      {
        msg += "Confirm Password is not filled " + "\n";
      }else if(passwordCheck(password,cpassword) == false)
      {
        msg += "Password is not same as confirm password " + "\n";
      }
       
      if(requiredCheck(photosrc) == false) msg += "Photo is not selected " + "\n";
      if(requiredCheck(checked) == false) msg += "Terms & conditions is not agreed " + "\n";
      
      if (msg != "")
      {
        setAlertMsg(msg); 
        setBusy(false);
      }
      else{
        submitForm();
      }
      
    }

    const submitForm = () =>{

      var isOkay = true;
      var msg = '';
      dataURItoBlob(photo!).then(
        result =>{
          upload(result,email).then(res => {
            if(res == Error)        
            {
              isOkay = false;
              msg += Error;
            }
          });
        });

      register(email,password).then(res => {
        if(res! == Error)
        {
          isOkay = false;
          msg += Error;
        }
      });

      if(msg != '')
      {
        setAlertMsg(msg);
        setBusy(false); 
      }

      if(isOkay == true)
      {
        setAlert(true);
        setBusy(false);
        userLogin(email,password);
        setAuth({
          isLogin:true,
          email:email,
          photoURL:photosrc,
      });
        history.replace("/home");
      }
    }

    return(
      <IonPage>
        <IonContent color = 'dark'>
          <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          cssClass='my-custom-class'
          header={'Thanks for Joining Re-commend'}
          message={'Registration completed successfully.'}
          buttons={['Go to Homepage']}
        />
        <IonLoading message="Please wait..." duration={0} isOpen={busy}/>

          <IonSlides pager={true} options={slideOpts}>

          <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonHeader>
                    AGREEMENT TO TERMS
                  </IonHeader>
                </IonRow>
                <IonRow class ='ion-justify-content-center ion-padding'>
                  
                  <p style={{'fontSize':'12px',
                  'overflow':'scroll',
                  'minHeight': '100px',
                  'maxHeight': '400px',
                  'width':'80%'}}> 

These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and [business entity name] (“we,” “us” or “our”), concerning your access to and use of the [website name.com] website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). 

You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.

Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason. 

We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions, and you waive any right to receive specific notice of each such change. 




It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Site after the date such revised Terms and Conditions are posted. 

The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. 

Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. 

These terms and conditions were generated by Termly’s Terms and Conditions Generator.
</p>
                
               
                
                </IonRow>
                <IonRow class ='ion-justify-content-center ion-padding'>
                <IonItem>
                  <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                  <IonLabel style={{'paddingLeft':'12px','fontSize':'12px'}}>  I agree the terms & conditions </IonLabel>
                </IonItem>
                </IonRow>
              </IonGrid>
              
              
            </IonSlide>

            <IonSlide>
              <IonGrid>
                <IonRow class="ion-justify-content-center ion-padding">
                  <p style={{'fontSize':'12px'}}>
                    Welcome to Re-commend! Having a profile picture would help you to show your characters and make more friends!
                    Please select a photo to be your profile picture!
                  </p>
                </IonRow>
                <IonRow>
                  {photo && <IonImg style={{
                     'minHeight': '100px',
                     'maxHeight': '400px',
                      'margin-left': 'auto',
                      'margin-right': 'auto',
                      'width' : '50%'
                  }} src={photosrc} ></IonImg>}
                    
                </IonRow>
                <IonRow class ='ion-justify-content-center ion-padding' style={{'paddingBottom':'0'}}>
                   <IonButton color='light' onClick={handlePhoto}>
                     <IonIcon icon={imageOutline} style={{'paddingRight':'4px'}}></IonIcon>
                       Select Photo
                     </IonButton>
                </IonRow>
                <IonRow class ='ion-justify-content-center'>
                  {photo && <p style={{'fontSize':'12px'}}>
                    Nice Photo! Please swipe left to proceed!
                  </p>
                  } 
                </IonRow>
              </IonGrid>
              
            </IonSlide>
            <IonSlide>
              <IonGrid>
                <IonRow class ='ion-justify-content-center ion-padding'>
                  {alertMsg &&<IonToolbar style={{'width': '80%','borderRadius':'15px','padding':'14px'}} >
                    <text style={{'fontSize':'12px','whiteSpace': 'pre-line'}}> {alertMsg} </text>
                    
                  </IonToolbar>
                  }     
                </IonRow>
                <IonRow class ='ion-justify-content-center'>
                  <p style={{'fontSize':'12px'}}>
                    Please fill in your email address and password.
                  </p>
                </IonRow>
                <IonGrid style={{'border': '1px white solid'}} class='width-8'>
                  <IonRow class ='ion-justify-content-center' >
                    <IonItem color='dark' class="width-10">
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput type="email" value={email} placeholder="Email" onIonChange={(e:any) => setEmail(e.detail!.value)} required></IonInput>
                    </IonItem>
                  </IonRow>
                  <IonRow class ='ion-justify-content-center' >
                    <IonItem color='dark' class="width-10"> 
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput type="password" value={password} placeholder="Password(6-32 characters)" onIonChange={(e:any) => setPassword(e.detail!.value)} required  ></IonInput>
                    </IonItem>
                  </IonRow> 
                  <IonRow class ='ion-justify-content-center' >
                    <IonItem color='dark' class="width-10"> 
                      <IonLabel position="floating">Confirm Password</IonLabel>
                      <IonInput type="password" value={cpassword} placeholder="Confirm Password" onIonChange={(e:any) => setcPassword(e.detail!.value)} required  ></IonInput>
                    </IonItem>
                  </IonRow> 
                </IonGrid>
                <IonRow class ='ion-justify-content-center ion-padding'>
                  <IonButton color='light' onClick={validate}>
                  <IonIcon icon={createOutline} style={{'paddingRight':'4px'}}></IonIcon>
                    Register
                  </IonButton>
                </IonRow>
              </IonGrid>
            </IonSlide>
            
          </IonSlides>
        </IonContent>
      </IonPage>
      
    );
}

export default Register;