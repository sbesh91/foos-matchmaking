import { Component, OnInit, Input } from '@angular/core';
import { 
  AuthMethods,
  AuthProviders,
  FirebaseAuthState
} from 'angularfire2/auth';
import { 
  AngularFire  
} from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  AuthState = <FirebaseAuthState> null;
  constructor(private af: AngularFire){ }

  ngOnInit(): void {
    this.af.auth.subscribe(auth => this.AuthState = auth);
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
