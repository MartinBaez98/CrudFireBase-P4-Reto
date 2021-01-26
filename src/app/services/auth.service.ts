import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any=false;

  constructor(public afAuth:AngularFireAuth,private afsAuth:AngularFireAuth) { 
    afAuth.authState.subscribe(user=> (this.isLogged=user))

  }
  //Register
  async onRegister (user:User){
    try{
      return this.afAuth.createUserWithEmailAndPassword(
        user.email, 
        user.password)
    }catch(error){
      console.log('Error on register',error)
    }
  }
  //login
  async onLogin(user:User){
    try{
      return await this.afAuth.signInWithEmailAndPassword(user.email,user.password)
    }catch(error){
      console.log('Error en login: ',error) 
    }
  }

  loginGitUser(){
    return this.afsAuth.signInWithPopup(new firebase.default.auth.GithubAuthProvider());
  }

  loginGoogleUser(){
    return this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }
}
