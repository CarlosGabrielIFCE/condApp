import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitanteService } from '../../providers/visitante/visitante.service';

@IonicPage()
@Component({
  selector: 'page-visitante-edit',
  templateUrl: 'visitante-edit.html',
})
export class VisitanteEditPage {
  title: string;
  form: FormGroup;
  visitor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private visitorService: VisitanteService,
    private toast: ToastController) {
    this.visitor = this.navParams.data.visitor || {};
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.visitor ? 'Alterando Visitante' : 'Novo Visitante';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.visitor.key],
      txNmVisitante: [this.visitor.txNmVisitante, Validators.required],
      cpfVisitante: [this.visitor.cpfVisitante, Validators.required],
      nrTelVisitante: [this.visitor.nrTelVisitante, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.visitorService.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Visitante salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o Visitante.', duration: 3000 }).present();
        console.error(e);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditVisitorPage');
  }
}
