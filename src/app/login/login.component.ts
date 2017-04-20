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
  FirebaseAuthState
} from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  AuthState = <FirebaseAuthState> null;      
  @Output()
  AuthStateChange: EventEmitter<FirebaseAuthState> = new EventEmitter<FirebaseAuthState>();
  constructor(private af: AngularFire){ }

  ngOnInit(): void {  
    var that = this;  
    this.af.auth.subscribe(auth => {
      that.AuthState = auth;
      that.AuthStateChange.emit(this.AuthState);
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

     this.AuthStateChange.emit(null);
  }
}
