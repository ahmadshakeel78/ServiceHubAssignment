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
  selectedService: any; // Selected service configuration
  dynamicForm!: FormGroup; // Dynamic form group

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Fetch all services and store them locally
    this.apiService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  fetchServiceConfig(serviceId: any): void {
    // Find the selected service locally
    this.selectedService = this.services.find((service) => service.id === serviceId.target?.value);

    if (this.selectedService) {
      this.buildForm(this.selectedService.required_fields);
    } else {
      console.error(`Service with ID ${serviceId} not found.`);
    }
  }

  buildForm(fields: any[]): void {
    const formControls: any = {};
    fields.forEach((field) => {
      const validators = [];
      if (field.validation) {
        validators.push(Validators.pattern(new RegExp(field.validation)));
      }
      if (field.max_length) {
        validators.push(Validators.maxLength(field.max_length));
      }
      formControls[field.name] = ['', validators];
    });
    this.dynamicForm = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      const formData = this.dynamicForm.value;
      this.apiService.submitServiceData(this.selectedService.id,formData).subscribe(() => {
        alert('Form submitted successfully!');
        this.dynamicForm.reset()
      });
    }
  }
}
