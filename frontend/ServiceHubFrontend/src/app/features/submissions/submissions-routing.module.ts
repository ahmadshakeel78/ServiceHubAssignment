import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionsComponent } from './submissions.component';
import { SubmissionDetailsComponent } from '../submission-details/submission-details.component';

const routes: Routes = [
  { path: '', component: SubmissionsComponent },
  { path: ':id', component: SubmissionDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmissionsRoutingModule { }
