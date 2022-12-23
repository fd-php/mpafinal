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

  getCollection<tipo>(path: string) {
    const collection = this.angularfirestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.angularfirestore.collection<tipo>(path,
      ref => ref.where( parametro, condicion, busqueda));
    return collection.valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.angularfirestore.collection(path);
    return collection.doc(id).delete();
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

  getCollectionAll<tipo>(path, parametro: string, condicion: any, busqueda: string, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.angularfirestore.collectionGroup<tipo>(path,
      ref => ref.where( parametro, condicion, busqueda)
                .orderBy('fechaCreacion', 'desc')
                .limit(1)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }
}
