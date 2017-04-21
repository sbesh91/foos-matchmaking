import { Queue } from '../queue';
import { Component, OnInit, Input } from '@angular/core';
import { 
  AngularFire,
  AuthMethods,
  AuthProviders,
  FirebaseAuthState,
  FirebaseObjectObservable
} from 'angularfire2';
import { Status } from "app/status.enum";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  authState: FirebaseAuthState;
  queue: Queue = new Queue();

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      this.authState = auth;
    });
    this.af.database.object('queue').subscribe(queue => {          
      this.queue.users = queue.users;
      this.queue.status = queue.status;
      
      //todo figure out how to destroy old notifications so they don't stack      
      if(this.queue.status == Status.found){
        new Notification("Game Found!");
      }else if(this.queue.status == Status.searching){
        new Notification(`Searching for ${4 - this.queue.users.length} players...`);
      }
    });
  }
  
  join(){
    if(this.authState != null) {                           
        this.queue.add(this.authState.google);
        this.af.database.object('queue').set(this.queue);
    }
  }  
}
