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
import { User } from "app/user";

@Component({  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  user: User;
  queue: Queue = new Queue();  
  
  getMyStatus(){
    if(!this.queue.users || !this.user){
      return false;
    }
    return this.queue.users.filter((value) => value.uid == this.user.uid).length > 0;
  }

  getMyStatusAndGameStatus(){
    return this.getMyStatus() && this.queue.status == Status.found;
  }


  constructor(private af: AngularFire, private svc: FoosService) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if(auth){
        this.user = new User(auth.uid,auth.auth.displayName,auth.auth.photoURL,auth.auth.email);
        this.listenToQueue();      
      }
    });   
  }
  
  listenToQueue(){
    this.af.database.object('queue').subscribe(queue => {          
        this.queue.users = queue.users;
        this.queue.status = queue.status;     
        this.notify(); 
      });
  }

  join(){
    if(this.user != null) {                                 
        this.svc.JoinQueue(this.queue, this.user);
    }
  }  

  leave(){    
    if(this.user != null) {                           
        this.svc.LeaveQueue(this.queue, this.user);
    }
  }

  reset(){    
    if(this.queue != null) {                           
        this.svc.ResetQueue(this.queue);
        this.notify(true);
    }
  }      
  
  private notify(reset:boolean = false){
      if(this.queue.status == Status.found){                      
        this.svc.FireFoundMessage();
      }else if(this.queue.status == Status.searching){        
        this.svc.FireSearchingMessage(this.queue);
      } else if(reset && this.queue.status == Status.empty){
        this.svc.FireTableAvailable(this.queue);
      }
  }
}
