import { Status } from "./status.enum";
import { User } from "app/user";

export class Queue {
    usersPerMatch: number = 4;
    users: User[];
    status: Status = Status.empty;    

    public add(user:User){
        if(!this.users){
            this.users = [];
        }
        this.users.push(user);
        this.setStatus();
    }

    public remove(user: User){
        this.users = this.users.filter((obj, index) => { 
            return obj.uid != user.uid;
        });
        this.setStatus();
    }

    public clear(){
        this.users = [];
        this.setStatus();
    }
    private setStatus(){
        if(this.users.length == this.usersPerMatch){ 
            this.status = Status.found;            
        }else if(this.users.length > 0 && this.users.length < this.usersPerMatch){
            this.status = Status.searching;            
        }else if(this.users.length == 0){
            this.status = Status.empty;            
        }else{
            this.status = Status.error;
        }
    }
}
