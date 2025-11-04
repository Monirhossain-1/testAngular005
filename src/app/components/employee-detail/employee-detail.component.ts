import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  employee: Employee | null = null;
  loading: boolean = false;
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.loadEmployee(+params['id']);
      }
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployeeById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.employee = data;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load employee details';
          this.loading = false;
          console.error('Error:', error);
        }
      );
  }

  editEmployee(): void {
    if (this.employee?.id) {
      this.router.navigate(['/edit', this.employee.id]);
    }
  }

  deleteEmployee(): void {
    if (!this.employee?.id) return;

    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            alert('Employee deleted successfully');
            this.router.navigate(['/employees']);
          },
          (error) => {
            this.error = 'Failed to delete employee';
            console.error('Error:', error);
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
