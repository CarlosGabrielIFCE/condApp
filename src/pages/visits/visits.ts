import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { VisitService } from '../../providers/visit/visit.service';

@IonicPage()
@Component({
  selector: 'page-visits',
  templateUrl: 'visits.html',
})
export class VisitsPage {
  visits: Observable<any>;

  constructor(public navCtrl: NavController,
    private visitService: VisitService,
    private toast: ToastController) {
      this.visits = this.visitService.getAll();
  }

  newVisit() {
    this.navCtrl.push('VisitEditPage');
  }

  editVisit(visit: any) {
    this.navCtrl.push('VisitEditPage', {visit: visit});
  }

  removeVisit(key: string) {
    if (key) {
      this.visitService.remove(key)
        .then(() => {
          this.toast.create({message: "Visita removida com sucesso.", duration: 3000}).present();
        })
        .catch(() => {
          this.toast.create({message: "Erro ao remover a visita", duration: 3000}).present();
        })
    }
  }
}
