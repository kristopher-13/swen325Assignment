import React from 'react';

export function minlength(minlength:number, value: any){
    if (!value || value.length < minlength) {
        return false;
    }
    else {
        return true;
    }
}

export function maxlength(maxlength:number, value: any){
    if (!value || value.length > maxlength) {
        return false;
    }
    else {
        return true;
    }
}

export function passwordCheck(pwd:string , cpwd:string){
    if (pwd != cpwd) {
        return false;
    }
    else {
        return true;
    }
}

export function emailCheck(value: any){
    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/.test(value)) {
        return true;
    } else {
        return false;
    }
}

export function requiredCheck(value:any){
    if (value)
    {
        return true;
    }else
    {
        return false
    }
}