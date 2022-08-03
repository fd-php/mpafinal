import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
//import { getDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

constructor(
      private angularfirestore: AngularFirestore ) { }
    //servicios para el perfil
  async altaComplejo<tipo>(data: tipo, enlace: string, id: string){
   const ref = this.angularfirestore.collection<tipo>(enlace);
   return await ref.doc(id).set(data);
    //return await ref.add(data);
  }

  async altaUsuario<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.angularfirestore.collection<tipo>(enlace);
    return await ref.doc(id).set(data);
     //return await ref.add(data);
   }

   get<tipo>(enlace: string, id: string){
    const ref = this.angularfirestore.collection<tipo>(enlace);
    return ref.doc(id).valueChanges();
  }

  getComplejos<tipo>(enlace: string){
    const ref = this.angularfirestore.collection<tipo>(enlace);
    return  ref.valueChanges();
  }
  getLength(enlace: string){
    const ref = this.angularfirestore.collection(enlace);
    return  ref.valueChanges();
  }

  updateDoc(data: any, path: string, id: string){
    const collection = this.angularfirestore.collection(path);
    return collection.doc(id).update(data);
  }

  createId(){
   return this.angularfirestore.createId();
  }
}
