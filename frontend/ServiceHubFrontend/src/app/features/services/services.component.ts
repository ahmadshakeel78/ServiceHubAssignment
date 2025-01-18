import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  standalone: false
})
export class ServicesComponent implements OnInit {
  services: any[] = []; // List of all services
  selectedService: any = null; // Selected service configuration
  dynamicForm!: FormGroup; // Dynamic form group
  isLoading = false; // Loading state for fetching configuration

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.loadServices();
  }

  
  //Fetch the list of available services from the backend
 
  loadServices(): void {
    this.apiService.getServices().subscribe(
      (data) => {
        this.services = data;
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  /**
   * Fetch the configuration for the selected service and build the form
   * @param event - Change event from the dropdown
   */
  fetchServiceConfig(event: Event): void {
    const serviceId = (event.target as HTMLSelectElement).value;

    if (!serviceId) {
      this.selectedService = null;
      return;
    }

    // Find the selected service locally
    this.selectedService = this.services.find((service) => service.id === serviceId);

    if (this.selectedService) {
      this.buildForm(this.selectedService.required_fields);
    } else {
      console.error(`Service with ID ${serviceId} not found.`);
    }
  }

  /**
   * Build the dynamic form based on the selected service's required fields
   * @param fields - Required fields configuration from the selected service
   */
  buildForm(fields: any[]): void {
    const formControls: { [key: string]: any } = {};

    fields.forEach((field) => {
      const validators = [];
      if (field.validation) {
        validators.push(Validators.pattern(new RegExp(field.validation)));
      }
      if (field.max_length) {
        validators.push(Validators.maxLength(field.max_length));
      }
      validators.push(Validators.required); // Assuming all fields are required
      formControls[field.name] = ['', validators];
    });

    this.dynamicForm = this.fb.group(formControls);
  }

  /**
   * Handle form submission and send data to the backend
   */
  onSubmit(): void {
    if (this.dynamicForm.valid) {
      const formData = this.dynamicForm.value;

      this.apiService.submitServiceData(this.selectedService.id, formData).subscribe(
        () => {
          alert('Form submitted successfully!');
          this.dynamicForm.reset();
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Failed to submit the form. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}