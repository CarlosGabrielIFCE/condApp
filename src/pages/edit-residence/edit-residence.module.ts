import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditResidencePage } from './edit-residence';

@NgModule({
  declarations: [
    EditResidencePage,
  ],
  imports: [
    IonicPageModule.forChild(EditResidencePage),
  ],
})
export class EditResidencePageModule {}
