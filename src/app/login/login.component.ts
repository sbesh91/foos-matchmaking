import {   
  Component,
  OnInit, 
  Input, 
  Output, 
  EventEmitter
} from '@angular/core';
import { 
  AngularFire,
  AuthMethods,
  AuthProviders,
  FirebaseAuthState,
  FirebaseObjectObservable
} from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {    
  @Output()
  authStateChange: EventEmitter<FirebaseAuthState> = new EventEmitter<FirebaseAuthState>();
  authState: FirebaseAuthState;    

  constructor(private af: AngularFire){ }

  ngOnInit(): void {      
    this.af.auth.subscribe(auth => {
      this.authState = auth;
      this.authStateChange.emit(this.authState);
      if(auth != null) {
        this.af.database.object(`users/${auth.uid}`).set(auth.google);
      }
    });  
  }  

  login(): void{
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });        
  }

  logout() {
     this.af.auth.logout();

     this.authStateChange.emit(null);
  }
}
