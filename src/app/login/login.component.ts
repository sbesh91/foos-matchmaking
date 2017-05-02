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
  FirebaseObjectObservable
} from 'angularfire2';
import { User } from "app/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;    

  constructor(private af: AngularFire){ }

  ngOnInit(): void {      
    this.af.auth.subscribe(auth => {
      if(auth != null) {
        this.user = new User(auth.uid,auth.auth.displayName,auth.auth.photoURL,auth.auth.email);
        this.af.database.object(`users/${auth.uid}`).set(this.user);
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
  }
}
