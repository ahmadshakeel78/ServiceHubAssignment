export interface SubmissionResponse {
    total: number; // Total number of submissions
    page: number;  // Current page
    pages: number; // Total number of pages
    submissions: Submission[]; // Array of submissions
  }
  
  export interface Submission {
    _id: string; // Unique identifier for the submission
    serviceId: string; // ID of the associated service
    data: SubmissionData; // Data submitted for the service
    submittedAt: string; // Submission timestamp (ISO date string)
    __v: number; // Version key (if used by MongoDB)
  }
  
  export interface SubmissionData {
    amount: string; // Example field: Amount submitted
    bank_account_number: string; // Example field: Bank account number
    firstname: string; // Example field: First name of the submitter
    lastname: string; // Example field: Last name of the submitter
  }
  