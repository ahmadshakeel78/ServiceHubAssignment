import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../models/service.model';
import { Submission, SubmissionResponse } from '../../models/submission.model';
import { DashboardMetrics } from '../../models/dashboard-metrics.model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = 'http://localhost:5001/api';

    constructor(private http: HttpClient) { }

    getServices(): Observable<Service[]> {
        return this.http.get<Service[]>(`${this.baseUrl}/services`);
    }
    getServiceById(serviceId: string): Observable<Service> {
        return this.http.get<Service>(`${this.baseUrl}/services/${serviceId}`);
    }
    submitServiceData(serviceId: string, data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/services/submit/${serviceId}`, data);
    }

    getSubmissions(serviceId: string): Observable<SubmissionResponse> {
        return this.http.get<SubmissionResponse>(`${this.baseUrl}/services/submissions/${serviceId}`);
    }

    getReports(): Observable<DashboardMetrics> {
        return this.http.get<DashboardMetrics>(`${this.baseUrl}/services/reporting`);
    }
}
