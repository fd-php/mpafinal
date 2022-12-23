
import { Injectable } from '@angular/core';


import {Auth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
//import { getAuth, onAuthStateChanged } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  constructor(
    public auth: Auth,
    public firestore: Firestore ) {
      this.getUserProfileId();
     }

  //  getUserProfileId(){
  //     const user =  this.auth.currentUser;
  //    return this.firestore, `${user.uid}`;
  //    }

     async getUserProfileId(){
      const user =  await this.auth.currentUser;
      if (user === null){
        return null;
      }else {
          return `${user.uid}`;
        }
     }


     getUserProfileMail(){
      const user = this.auth.currentUser;
     return this.firestore, `${user.email}`;
     }

  async register({email, password}){
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password);
        return user;
    } catch (e) {
      return null;
    }

  }

  async login({email, password}){
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password);
        return user;
    } catch (e) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}



