export interface DashboardMetrics {
    totalSubmissionsPerService: TotalSubmissions[];
    dailyTrends: DailyTrend[];
    mostUsedServices: MostUsedService[];
  }
  
  export interface TotalSubmissions {
    serviceId: string;
    serviceName: string;
    totalSubmissions: number;
  }
  
  export interface DailyTrend {
    _id: { day: number; month: number; year: number };
    submissions: number;
  }
  
  export interface MostUsedService {
    serviceId: string;
    serviceName: string;
    count: number;
  }
  