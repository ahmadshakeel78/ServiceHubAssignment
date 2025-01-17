import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
  styleUrl: './submission-details.component.scss',
  standalone:false
})
export class SubmissionDetailsComponent implements OnInit {
  submission: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    // Get the submission ID from the route
    const submissionId = this.route.snapshot.params['id'];

    // Fetch submission details using the API service
    this.apiService.getSubmissions(submissionId).subscribe((data) => {
      this.submission = data;
    });
  }
  // Get keys of an object
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Check if a value is an object
  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  // Navigate back to the submissions listing
  goBack(): void {
    window.history.back(); // Simple back navigation
  }

}
