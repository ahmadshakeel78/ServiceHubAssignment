import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServiceDetailsComponent } from './details/service-details/service-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServicesComponent,ServiceDetailsComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ServicesModule { }
