import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
  ){

  }

    addUser(value){
      return new Promise<any>((resolve, reject) => {
        this.afs.collection('/users').add({
          name: value.name,
          surname: value.surname,
          age: parseInt(value.age)
        })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
      })
    }

}
