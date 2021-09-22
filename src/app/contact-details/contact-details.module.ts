import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ContactDetailsPage } from './contact-details.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactDetailsPage
      }
    ])
  ],
  declarations: [ContactDetailsPage]
})
export class ContactDetailsPageModule {}
