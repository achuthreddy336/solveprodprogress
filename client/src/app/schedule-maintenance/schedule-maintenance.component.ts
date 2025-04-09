import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss']
})
export class ScheduleMaintenanceComponent implements OnInit {
  itemForm: FormGroup;

  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel: any={};

  showMessage: any;
  responseMessage: any;
  equipmentList: any=[];
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        scheduledDate: [this.formModel.scheduledDate,[ Validators.required, this.dateValidator]],
        completedDate: [this.formModel.completedDate,[ Validators.required, this.dateValidator]],
        description: [this.formModel.description,[ Validators.required]], 
        status: [this.formModel.status,[ Validators.required]], 
        equipmentId: [this.formModel.equipmentId,[ Validators.required]], 
        hospitalId: [this.formModel.hospitalId,[ Validators.required]], 
       
    });



}  ngOnInit(): void {
  this.getHospital();

  }
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }

    return null;
  }
  getHospital() {
    this.hospitalList=[];
    this.httpService.getHospital().subscribe((data: any) => {
      this.hospitalList=data;
      console.log(this.hospitalList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }

  onSubmit()
  {
    debugger;
    if(this.itemForm.valid)
    {
      if (this.itemForm.valid) {
        this.showError = false;
      
        this.httpService.scheduleMaintenance(this.itemForm.value,1).subscribe((data: any) => {
          this.itemForm.reset();
          this.showMessage=true;
          this.responseMessage='Save Successfully';
          
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while logging in. Please try again later.";
          console.error('Login error:', error);
        });;
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }
  onHospitalSelect($event: any) {
   let id= $event.target.value
   this.equipmentList=[];
   this.httpService.getEquipmentById(id).subscribe((data: any) => {
     this.equipmentList=data;
     console.log(this.equipmentList);
   }, error => {
     // Handle error
     this.showError = true;
     this.errorMessage = "An error occurred while logging in. Please try again later.";
     console.error('Login error:', error);
   });;
  
}
}

