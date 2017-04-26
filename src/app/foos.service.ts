import { FirebaseAuthState } from 'angularfire2/auth';
import { Queue } from './queue';
import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2";

@Injectable()
export class FoosService {

  constructor(private af: AngularFire) { }

  public FireFoundMessage()
  {
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
  }  

  public FireSearchingMessage(queue: Queue){
    Notification.requestPermission(result => {
        if(result == 'granted'){
          navigator.serviceWorker.ready.then(registration => {
            registration.getNotifications().then(notifications => {
              for(let n of notifications){
                n.close();
              }
            });
            
            registration.showNotification(`Searching for ${4 - queue.users.length} players...`);
          });
        }
      });
  }  

  public ResetQueue(queue: Queue){
    queue.clear();
    this.af.database.object('queue').set(queue);
  }

  public JoinQueue(queue: Queue, authState: FirebaseAuthState){
    queue.add(authState.google);
    this.af.database.object('queue').set(queue);
  }

  public LeaveQueue(queue: Queue, authState: FirebaseAuthState){    
    queue.remove(authState);
    this.af.database.object('queue').set(queue);
  }
}
