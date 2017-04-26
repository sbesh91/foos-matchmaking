import { Status } from "./status.enum";

export class Queue {
    users: any[];
    status: Status = Status.empty;    

    public add(user:any){
        if(!this.users){
            this.users = [];
        }
        this.users.push(user);
        this.setStatus();
    }

    public remove(user: any){
        this.users = this.users.filter((obj, index) => { 
            return obj.uid != user.google.uid;
        });
        this.setStatus();
    }

    public clear(){
        this.users = [];
        this.setStatus();
    }
    private setStatus(){
        if(this.users.length == 4){
            this.status = Status.found;            
        }else if(this.users.length > 0 && this.users.length < 4){
            this.status = Status.searching;            
        }else if(this.users.length == 0){
            this.status = Status.empty;            
        }else{
            this.status = Status.error;
        }
    }
}
