import { Queue } from './queue';
import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2";
import { User } from "app/user";

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
            
            registration.showNotification(`Searching for ${queue.usersPerMatch - queue.users.length} players...`);
          });
        }
      });
  }  

  public FireTableAvailable(queue: Queue){
    Notification.requestPermission(result => {
        if(result == 'granted'){
          navigator.serviceWorker.ready.then(registration => {
            registration.getNotifications().then(notifications => {
              for(let n of notifications){
                n.close();
              }
            });
            
            registration.showNotification(`Table is now available`);
          });
        }
      });
  }

  public ResetQueue(queue: Queue){
    queue.clear();
    this.af.database.object('queue').set(queue);
  }

  public JoinQueue(queue: Queue, user: User){
    queue.add(user);
    this.af.database.object('queue').set(queue);
  }

  public LeaveQueue(queue: Queue, user: User){    
    queue.remove(user);
    this.af.database.object('queue').set(queue);
  }
}
