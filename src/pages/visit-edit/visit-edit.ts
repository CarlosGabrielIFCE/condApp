import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisitService } from '../../providers/visit/visit.service';
import { Observable } from 'rxjs/Observable';
import { VisitanteService } from '../../providers/visitante/visitante.service';
import { ResidenceService } from '../../providers/residence/residence.service';

@IonicPage()
@Component({
  selector: 'page-visit-edit',
  templateUrl: 'visit-edit.html',
})
export class VisitEditPage {
  title: string;
  form: FormGroup;
  visit: any;
  visitantes: any;
  residencias: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private visitService: VisitService,
    private toast: ToastController, private visitanteService: VisitanteService,
    private residenceService: ResidenceService) {
    this.visit = this.navParams.data.visit || {};
    this.createForm();
    this.setupPageTitle();
    this.visitanteService.getAll()
      .subscribe((result) => {
        this.visitantes = result;
      })
    this.residenceService.getAll()
      .subscribe((result) => {
        this.residencias = result;
      })
  }

  private setupPageTitle() {
    this.title = this.navParams.data.visit ? 'Alterando Visita' : 'Nova Visita';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.visit.key],
      dtVisita: [this.visit.dtVisita, Validators.required],
      hrVisita: [this.visit.hrVisita, Validators.required],
      visitante: [this.visit.visitante, Validators.required],
      morador: [this.visit.morador, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.visitService.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Visita salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar a Visita.', duration: 3000 }).present();
        console.error(e);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitEditPage');
  }

}
