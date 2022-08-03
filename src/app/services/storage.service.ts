import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadString } from 'firebase/storage';
import { Auth } from '@angular/fire/auth';
import {Photo} from '@capacitor/camera';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private firestore: Firestore,
    private auth: Auth
    ) { }

getUserProfile(){
  const user = this.auth.currentUser;
  const userDocRef = doc(this.firestore, `Perfiles/${user.uid}/certificados/${user.uid}`);
  return docData(userDocRef);
}

async uploadFile(cameraFile: Photo){
  const user = this.auth.currentUser;
  const path = `certificados/${user.uid}/certificado.png`;
  const storageRef = ref(this.storage, path);

  try {
    await uploadString(storageRef, cameraFile.base64String, 'base64');

    const fileUrl = await getDownloadURL(storageRef);

    const userDocRef = doc(this.firestore, `Perfiles/${user.uid}/certificados/${user.uid}`);

    await setDoc(userDocRef, {
      fileUrl,
    });
    return true;
  } catch (e) {
    return null;
  }

}

}
