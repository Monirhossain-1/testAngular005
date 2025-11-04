import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;
  loading: boolean = false;
  error: string = '';
  success: string = '';
  private destroy$ = new Subject<void>();

  departments = [
    'Human Resources',
    'Engineering',
    'Sales',
    'Marketing',
    'Finance',
    'Operations',
    'Customer Support'
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\(\)\s]+$/)]],
      department: ['', Validators.required],
      position: ['', [Validators.required, Validators.minLength(2)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      hireDate: ['', Validators.required],
      isActive: [true]
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployeeById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (employee) => {
          this.employeeForm.patchValue(employee);
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load employee';
          this.loading = false;
          console.error('Error:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.error = 'Please fill all required fields correctly';
      return;
    }

    this.loading = true;
    const formData = this.employeeForm.value;

    const operation = this.isEditMode
      ? this.employeeService.updateEmployee(this.employeeId!, formData)
      : this.employeeService.createEmployee(formData);

    operation.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.success = this.isEditMode
          ? 'Employee updated successfully'
          : 'Employee created successfully';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/employees']), 1500);
      },
      (error) => {
        this.error = 'Failed to save employee';
        this.loading = false;
        console.error('Error:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

  getFieldError(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName} must be at least ${field.getError('minlength').requiredLength} characters`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (field?.hasError('pattern')) {
      return `${fieldName} format is invalid`;
    }
    if (field?.hasError('min')) {
      return `${fieldName} must be greater than 0`;
    }
    return '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
