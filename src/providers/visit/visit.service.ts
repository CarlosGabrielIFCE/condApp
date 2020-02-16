import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class VisitService {
  private PATH = 'visits/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello VisitProvider Provider');
  }

  //Retorna todos as Visitas
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nameVisit'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
  }

  //Retorna uma Visita X
  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.payload.key, ...c.payload.val() };
      });
  }

  //Salva ou atualiza uma visita
  save(visit: any) {
    return new Promise((resolve, reject) => {
      if (visit.key) {
        this.db.list(this.PATH)
          .update(visit.key, {dtVisita: visit.dtVisita, hrVisita: visit.hrVisita, visitante: visit.visitante, morador: visit.morador, inAtiva: visit.inAtiva, hrSaida: visit.hrSaida})
          .then(() => resolve())
          .catch((e) => reject(e));
      }else {
        this.db.list(this.PATH)
          .push({dtVisita: visit.dtVisita, hrVisita: visit.hrVisita, visitante: visit.visitante, morador: visit.morador, inAtiva: visit.inAtiva, hrSaida: visit.hrSaida})
          .then(() => resolve());
      }
    })
  }

  //Remove uma residência
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
