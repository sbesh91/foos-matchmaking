import { leave } from '@angular/core/src/profile/wtf_impl';
import { FoosService } from '../foos.service';
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

@Component({  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  authState: FirebaseAuthState;
  queue: Queue = new Queue();  
  getMyStatus(){
    if(!this.queue.users){
      return false;
    }
    return this.queue.users.filter((value) => value.uid == this.authState.google.uid).length > 0;
  }

  constructor(private af: AngularFire, private svc: FoosService) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      this.authState = auth;
    });

    this.af.database.object('queue').subscribe(queue => {          
      this.queue.users = queue.users;
      this.queue.status = queue.status;
      
      if(this.queue.status == Status.found){                      
        this.svc.FireFoundMessage();
      }else if(this.queue.status == Status.searching){        
        this.svc.FireSearchingMessage(this.queue);
      }
    });
  }
  
  join(){
    if(this.authState != null) {                           
        this.svc.JoinQueue(this.queue, this.authState);
    }
  }  

  leave(){    
    if(this.authState != null) {                           
        this.svc.LeaveQueue(this.queue, this.authState);
    }
  }    
}
