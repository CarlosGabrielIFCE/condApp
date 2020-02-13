import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { VisitanteService } from '../../providers/visitante/visitante.service';

@IonicPage()
@Component({
  selector: 'page-visitantes',
  templateUrl: 'visitantes.html',
})
export class VisitantesPage {
  visitors: Observable<any>;

  constructor(public navCtrl: NavController,
    private visitorService: VisitanteService,
    private toast: ToastController) {
      this.visitors = this.visitorService.getAll();
  }

  newVisitor() {
    this.navCtrl.push('VisitanteEditPage');
  }

  editVisitor(visitor: any) {
    this.navCtrl.push('VisitanteEditPage', {visitor: visitor});
  }

  removeVisitor(key: string) {
    if (key) {
      this.visitorService.remove(key)
        .then(() => {
          this.toast.create({message: "Visitante removido com sucesso.", duration: 3000}).present();
        })
        .catch(() => {
          this.toast.create({message: "Erro ao remover o visitante", duration: 3000}).present();
        })
    }
  }
}
