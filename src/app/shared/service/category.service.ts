import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories',
    //sorting by name in alpa although they are sorted by default;)
      (ref) => ref.orderByChild('name')
    ).snapshotChanges();
  }
}
