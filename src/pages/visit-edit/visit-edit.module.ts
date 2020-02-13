import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitEditPage } from './visit-edit';

@NgModule({
  declarations: [
    VisitEditPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitEditPage),
  ],
})
export class VisitEditPageModule {}
