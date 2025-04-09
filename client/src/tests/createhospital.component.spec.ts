import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreatehospitalComponent } from '../app/createhospital/createhospital.component';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

describe('CreatehospitalComponent', () => {
  let component: CreatehospitalComponent;
  let fixture: ComponentFixture<CreatehospitalComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatehospitalComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HttpService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatehospitalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.itemForm = formBuilder.group({
      name: [null, [Validators.required]],
      location: [null, [Validators.required]],
    });
    fixture.detectChanges();
  });



  it('should initialize itemForm with required fields', () => {
    expect(component.itemForm).toBeDefined();
    expect(component.itemForm.get('name')).toBeTruthy();
    expect(component.itemForm.get('location')).toBeTruthy();
  });

  it('should mark name field as invalid if empty', () => {
    const nameControl = component.itemForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.invalid).toBeTruthy();
  });

  it('should mark location field as invalid if empty', () => {
    const locationControl = component.itemForm.get('location');
    locationControl?.setValue('');
    expect(locationControl?.invalid).toBeTruthy();
  });

  // Add more test cases as needed for form validation and functionality
});
