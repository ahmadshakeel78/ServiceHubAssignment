import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  standalone: false
})
export class ReportsComponent implements OnInit {
  totalSubmissionsData: any;
  dailyTrendsData: any;
  mostUsedServicesData: any;
  ngOnInit(): void {
    this.getReports();
  }

  constructor(private apiService: ApiService) {
    Chart.register(...registerables);
   }

  getReports(): void {
    this.apiService.getReports().subscribe((data) => {
      // Bar Chart: Total Submissions Per Service
      this.totalSubmissionsData = {
        labels: data.totalSubmissionsPerService.map((item: any) => item.serviceName),
        datasets: [
          {
            label: 'Total Submissions',
            data: data.totalSubmissionsPerService.map((item: any) => item.totalSubmissions),
            backgroundColor: ['#007bff', '#28a745', '#ffc107'],
          },
        ],
      };

      // Line Chart: Daily Trends
      this.dailyTrendsData = {
        labels: data.dailyTrends.map(
          (item: any) => `${item._id.day}-${item._id.month}-${item._id.year}`
        ),
        datasets: [
          {
            label: 'Submissions Over Time',
            data: data.dailyTrends.map((item: any) => item.submissions),
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
          },
        ],
      };

      // Pie Chart: Most Used Services
      this.mostUsedServicesData = {
        labels: data.mostUsedServices.map((item: any) => item.serviceName),
        datasets: [
          {
            data: data.mostUsedServices.map((item: any) => item.count),
            backgroundColor: ['#007bff', '#28a745', '#ffc107'],
          },
        ],
      };
    });
  }
}

