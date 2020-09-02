import React,{useRef,useState} from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;


export async function takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
      });
     return image;  
}