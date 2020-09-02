import React,{useRef,useState} from 'react';
import { CameraPhoto } from '@capacitor/core';

export async function dataURItoBlob(photo:CameraPhoto) {
    // codej adapted from:
    //  http://stackoverflow.com/questions/33486352/
    //cant-upload-image-to-aws-s3-from-ionic-camera
    let blob = await fetch(photo!.webPath!).then(r => r.blob());
    return blob;
};