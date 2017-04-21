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
  private notification: Notification;
  authState: FirebaseAuthState;
  queue: Queue = new Queue();  
  getMyStatus(){
    if(!this.queue.users){
      return false;
    }
    return this.queue.users.filter((value) => value.uid == this.authState.google.uid).length > 0;
  }

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      this.authState = auth;
    });

    this.af.database.object('queue').subscribe(queue => {          
      this.queue.users = queue.users;
      this.queue.status = queue.status;
      
      //todo figure out how to destroy old notifications so they don't stack      
      if(this.notification){
        this.notification.close();
      }
      if(this.queue.status == Status.found){        
        Notification.requestPermission(result => {
          if(result == 'granted'){            
            navigator.serviceWorker.ready.then(registration => {   
              registration.getNotifications().then(notifications => {
               for(let n of notifications){
                 n.close();
               }
             });

              registration.showNotification("Game Found!");              
            });
          }
        });
        // todo move this into user interaction
        // this.queue.clear();
        // this.af.database.object('queue').set(this.queue);
        
      }else if(this.queue.status == Status.searching){        
        Notification.requestPermission(result => {
          if(result == 'granted'){
            navigator.serviceWorker.ready.then(registration => {
             registration.getNotifications().then(notifications => {
               for(let n of notifications){
                 n.close();
               }
             });
             
              registration.showNotification(`Searching for ${4 - this.queue.users.length} players...`);
            });
          }
        });
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
