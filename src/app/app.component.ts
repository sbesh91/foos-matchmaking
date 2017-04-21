import { Component, OnInit } from '@angular/core';
import { 
  AngularFire,
  FirebaseListObservable, 
  FirebaseObjectObservable,
  FirebaseAuthState
} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit {    
  authState: FirebaseAuthState;
  constructor(private af: AngularFire){ }
  ngOnInit(): void {    
        
  }

  updateAuthState(e){
    this.authState = e;            
  }
}
