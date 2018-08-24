import * as admin from 'firebase-admin';

export abstract class FirebaseService {
  abstract firestore(): admin.firestore.Firestore;
}
