import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ResidenceService {
  private PATH = 'residences/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello ResidenceProvider Provider');
  }

  //Retorna todos os Condôminos
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nameResidence'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
  }

  //Retorna um Condomino X
  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.payload.key, ...c.payload.val() };
      });
  }

  //Salva ou atualiza uma residencia
  save(residence: any) {
    return new Promise((resolve, reject) => {
      if (residence.key) {
        this.db.list(this.PATH)
          .update(residence.key, {nameOwner: residence.name, tel: residence.tel, nameResidence: residence.nameResidence})
          .then(() => resolve())
          .catch((e) => reject(e));
      }else {
        this.db.list(this.PATH)
          .push({ nameOwner: residence.nameOwner, tel: residence.tel, nameResidence: residence.nameResidence})
          .then(() => resolve());
      }
    })
  }

  //Remove uma residência
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
