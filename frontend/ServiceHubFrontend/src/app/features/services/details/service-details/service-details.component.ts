import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss',
  standalone:false
})
export class ServiceDetailsComponent implements OnInit  {
  service: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id'); // Get ID from route
    if (serviceId) {
      this.apiService.getServiceById(serviceId).subscribe({
        next: (data) => (this.service = data),
        error: (err) => console.error('Failed to fetch service details:', err),
      });
    }
  }
}
