import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ResidenceService } from '../../providers/residence/residence.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  residences: Observable<any>;

  constructor(public navCtrl: NavController,
    private resService: ResidenceService,
    private toast: ToastController) {
      this.residences = this.resService.getAll();
  }

  newResidence() {
    this.navCtrl.push('EditResidencePage');
  }

  editResidence(residence: any) {
    this.navCtrl.push('EditResidencePage', {residence: residence});
  }

  removeResidence(key: string) {
    if (key) {
      this.resService.remove(key)
        .then(() => {
          this.toast.create({message: "Residencia removida com sucesso.", duration: 3000}).present();
        })
        .catch(() => {
          this.toast.create({message: "Erro ao remover a residencia", duration: 3000}).present();
        })
    }
  }

}
