import { Component, OnInit } from '@angular/core';
import { FirebaseAuthState } from 'angularfire2/auth';
import { 
  AngularFire,
  FirebaseListObservable, 
  FirebaseObjectObservable
} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit {    
  AuthState: FirebaseAuthState;
  constructor(private af: AngularFire){ }
  ngOnInit(): void {    
    
  }

}
