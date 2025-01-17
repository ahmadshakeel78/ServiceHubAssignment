import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ServiceDetailsComponent } from './details/service-details/service-details.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },
  { path: ':id', component: ServiceDetailsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
