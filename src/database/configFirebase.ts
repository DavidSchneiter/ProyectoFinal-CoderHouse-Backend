import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore'
import { logger } from '../utils';
import config from '../utils/config';

// import serviceAccount from './adminFirebase.json';

initializeApp({
  credential: cert(config.FIREBASE as ServiceAccount)
});

export const dbConnectionFirebase = async() => {
 try {
   const db = getFirestore()
   logger.info('Firestore connection')
   return db
 } catch (error) {
   logger.error(error)
   throw new Error("Firestore connection error: " + error)
 }
}
