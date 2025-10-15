import * as admin from 'firebase-admin';

// Configuração simplificada
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NODE_ENV === 'production' 
      ? process.env.FIREBASE_PROJECT_ID 
      : 'biblioteca-dev'
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

// Configurar emulator se estiver em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  db.settings({
    host: 'localhost:8080',
    ssl: false
  });
}
