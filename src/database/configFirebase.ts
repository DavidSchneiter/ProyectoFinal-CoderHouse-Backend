import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore'
import serviceAccount from './adminFirebase.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

export const dbConnectionFirebase = async() => {
 try {
   const db = getFirestore()
   console.log('Firestore connection')
   return db
 } catch (error) {
   console.log(error)
   throw new Error("Firestore connection error: " + error)
 }
}