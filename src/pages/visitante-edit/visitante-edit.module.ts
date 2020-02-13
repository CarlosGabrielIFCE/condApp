import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitanteEditPage } from './visitante-edit';

@NgModule({
  declarations: [
    VisitanteEditPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitanteEditPage),
  ],
})
export class VisitanteEditPageModule {}
