import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResidenceService } from '../providers/residence/residence.service';

//Imports do AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { VisitanteService } from '../providers/visitante/visitante.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBfavJbUuiu-BbrmLharlk54t3H60UyIfg",
        authDomain: "condapp-10098.firebaseapp.com",
        databaseURL: "https://condapp-10098.firebaseio.com",
        projectId: "condapp-10098",
        storageBucket: "condapp-10098.appspot.com",
        messagingSenderId: "78965565992",
      }
    ),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ResidenceService,
    VisitanteService
  ]
})
export class AppModule { }
