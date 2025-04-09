import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleMaintenanceComponent } from '../app/schedule-maintenance/schedule-maintenance.component';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

describe('ScheduleMaintenanceComponent', () => {
  let component: ScheduleMaintenanceComponent;
  let fixture: ComponentFixture<ScheduleMaintenanceComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleMaintenanceComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleMaintenanceComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.itemForm = formBuilder.group({
      scheduledDate: [null, [Validators.required]],
      completedDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      status: [null, [Validators.required]],
      equipmentId: [null, [Validators.required]],
      hospitalId: [null, [Validators.required]],
    });
    fixture.detectChanges();
  });

 

  it('should initialize itemForm with required fields', () => {
    expect(component.itemForm).toBeDefined();
    expect(component.itemForm.get('scheduledDate')).toBeTruthy();
    expect(component.itemForm.get('completedDate')).toBeTruthy();
    expect(component.itemForm.get('description')).toBeTruthy();
    expect(component.itemForm.get('status')).toBeTruthy();
    expect(component.itemForm.get('equipmentId')).toBeTruthy();
    expect(component.itemForm.get('hospitalId')).toBeTruthy();
  });

  it('should mark scheduledDate field as invalid if empty', () => {
    const scheduledDateControl = component.itemForm.get('scheduledDate');
    scheduledDateControl?.setValue('');
    expect(scheduledDateControl?.invalid).toBeTruthy();
  });

  it('should mark completedDate field as invalid if empty', () => {
    const completedDateControl = component.itemForm.get('completedDate');
    completedDateControl?.setValue('');
    expect(completedDateControl?.invalid).toBeTruthy();
  });

  it('should mark description field as invalid if empty', () => {
    const descriptionControl = component.itemForm.get('description');
    descriptionControl?.setValue('');
    expect(descriptionControl?.invalid).toBeTruthy();
  });

  it('should mark status field as invalid if empty', () => {
    const statusControl = component.itemForm.get('status');
    statusControl?.setValue('');
    expect(statusControl?.invalid).toBeTruthy();
  });

  // Add more test cases as needed for form validation and functionality
});
