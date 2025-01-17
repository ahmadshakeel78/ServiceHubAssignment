import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmissionsRoutingModule } from './submissions-routing.module';
import { SubmissionsComponent } from './submissions.component';
import { SubmissionDetailsComponent } from '../submission-details/submission-details.component';


@NgModule({
  declarations: [SubmissionsComponent,SubmissionDetailsComponent],
  imports: [
    CommonModule,
    SubmissionsRoutingModule,
    FormsModule
  ]
})
export class SubmissionsModule { }
