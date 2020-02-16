import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResidenceService } from '../../providers/residence/residence.service';

@IonicPage()
@Component({
  selector: 'page-edit-residence',
  templateUrl: 'edit-residence.html',
})
export class EditResidencePage {
  title: string;
  form: FormGroup;
  residence: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private resService: ResidenceService,
    private toast: ToastController) {
    this.residence = this.navParams.data.residence || {};
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.residence ? 'Alterando Residência' : 'Nova Residência';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.residence.key],
      txNmConjunto: [this.residence.txNmConjunto, Validators.required],
      txNmCasa: [this.residence.txNmCasa, Validators.required],
      txNmMorador: [this.residence.txNmMorador, Validators.required],
      telMorador: [this.residence.telMorador, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.resService.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Residência salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar a Residência.', duration: 3000 }).present();
        console.error(e);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditResidencePage');
  }

}
