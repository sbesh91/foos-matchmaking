import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { QueueComponent } from './queue/queue.component';

export const firebaseConfig = {
  apiKey: "AIzaSyB_9MJdhOp7YBue9k2_sL-ZF0FB-C3TB9Q",
  authDomain: "foos-matchmaking.firebaseapp.com",
  databaseURL: "https://foos-matchmaking.firebaseio.com",
  projectId: "foos-matchmaking",
  storageBucket: "foos-matchmaking.appspot.com",
  messagingSenderId: "280411271819"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BodyComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
