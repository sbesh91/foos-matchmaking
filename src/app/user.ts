export class User {
    uid: string;
    name: string;
    photoURL: string;
    email: string;
    constructor(uid:string, name:string, photoURL:string, email:string){
        this.uid = uid;
        this.name = name;
        this.photoURL = photoURL;
        this.email = email;
    }
}
