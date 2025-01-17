export interface Service {
    id: string;
    name: string;
    required_fields: RequiredField[];
  }
  
  export interface RequiredField {
    label: { en: string; ar: string };
    name: string;
    type: string; // e.g., "text", "number", "dropdown"
    validation: string;
    max_length: number;
    placeholder?: { en: string; ar: string };
    validation_error_message: { en: string; ar: string };
    options?: DropdownOption[]; // Only for dropdowns
  }
  
  export interface DropdownOption {
    label: string;
    name: string;
  }
  