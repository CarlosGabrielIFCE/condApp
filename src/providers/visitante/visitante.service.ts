import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class VisitanteService {
  private PATH = 'visitors/';

  constructor(private db: AngularFireDatabase) {
    console.log('Hello VisitanteProvider Provider');
  }

  //Retorna todos os Visitantes
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nameVisitor'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
  }

  //Retorna um Visitante X
  get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.payload.key, ...c.payload.val() };
      });
  }

  //Salva ou atualiza um visitante
  save(visitor: any) {
    return new Promise((resolve, reject) => {
      if (visitor.key) {
        this.db.list(this.PATH)
          .update(visitor.key, {txNmVisitante: visitor.txNmVisitante, cpfVisitante: visitor.cpfVisitante, nrTelVisitante: visitor.nrTelVisitante})
          .then(() => resolve())
          .catch((e) => reject(e));
      }else {
        this.db.list(this.PATH)
          .push({txNmVisitante: visitor.txNmVisitante, cpfVisitante: visitor.cpfVisitante, nrTelVisitante: visitor.nrTelVisitante})
          .then(() => resolve());
      }
    })
  }

  //Remove uma residência
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
