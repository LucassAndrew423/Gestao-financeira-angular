import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Importações do Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environments'; // Importa suas chaves

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 2. Registra o Firebase no App
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    
    // 3. Habilita o Banco de Dados (Firestore)
    provideFirestore(() => getFirestore())
  ]
};