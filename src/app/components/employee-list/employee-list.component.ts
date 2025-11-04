import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchQuery: string = '';
  sortBy: string = 'firstName';
  loading: boolean = false;
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.employees = data;
          this.filteredEmployees = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load employees';
          this.loading = false;
          console.error('Error:', error);
        }
      );
  }

  searchEmployees(): void {
    if (!this.searchQuery.trim()) {
      this.filteredEmployees = this.employees;
      return;
    }

    this.filteredEmployees = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sortEmployees(): void {
    this.filteredEmployees.sort((a, b) => {
      const aValue = a[this.sortBy as keyof Employee];
      const bValue = b[this.sortBy as keyof Employee];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      return 0;
    });
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['/edit', employee.id]);
  }

  viewEmployee(employee: Employee): void {
    this.router.navigate(['/detail', employee.id]);
  }

  deleteEmployee(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loadEmployees();
            alert('Employee deleted successfully');
          },
          (error) => {
            this.error = 'Failed to delete employee';
            console.error('Error:', error);
          }
        );
    }
  }

  addNewEmployee(): void {
    this.router.navigate(['/add']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
