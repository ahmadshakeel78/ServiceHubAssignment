import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss',
  standalone: false
})
export class SubmissionsComponent implements OnInit {
  services: any[] = [];
  selectedService: any = null;
  submissions: any[] = [];
  filteredSubmissions: any[] = [];
  paginatedSubmissions: any[] = [];
  columns: string[] = [];

  searchQuery = '';
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Fetch available services
    this.apiService.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  onServiceChange(serviceId: any): void {
    // Fetch submissions for the selected service
    this.selectedService = this.services.find((service) => service.id === serviceId?.target?.value);
    this.apiService.getSubmissions(serviceId?.target?.value).subscribe((data) => {
      this.submissions = data.submissions;
      this.filteredSubmissions = [...this.submissions];
      this.columns = this.extractColumns(data.submissions);
      this.updatePagination();
    });
  }

  extractColumns(data: any[]): string[] {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  filterSubmissions(): void {
    this.filteredSubmissions = this.submissions.filter((submission) =>
      Object.values(submission).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    this.updatePagination();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredSubmissions.sort((a, b) => {
      const valA = a[column] || '';
      const valB = b[column] || '';
      return this.sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSubmissions.length / this.itemsPerPage);
    this.paginatedSubmissions = this.filteredSubmissions.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  viewDetails(submissionId: string): void {
      this.router.navigate([`/submissions/${submissionId}`]);
  }
}