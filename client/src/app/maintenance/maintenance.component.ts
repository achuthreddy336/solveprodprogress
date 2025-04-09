import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  // itemForm: FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel: any={};
  itemForm: FormGroup;
  showMessage: any;
  responseMessage: any;
  maintenanceList: any=[];
  maintenanceObj: any={};
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.itemForm = this.formBuilder.group({
        scheduledDate: [this.formModel.scheduledDate,[ Validators.required, this.dateValidator]],
        completedDate: [this.formModel.completedDate,[ Validators.required, this.dateValidator]],
        description: [this.formModel.description,[ Validators.required]], 
        status: [this.formModel.status,[ Validators.required]], 
        maintenanceId: [this.formModel.maintenanceId],
 
       
    });



}  
ngOnInit(): void {
  this.getMaintenance();
  }  
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }

    return null;
  }
  getMaintenance() {
    this.maintenanceList=[];
    this.httpService.getMaintenance().subscribe((data: any) => {
      this.maintenanceList=data;
     console.log(data)
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }
  viewDetails(details:any)
  {
    debugger;
    this.maintenanceObj={};
    this.maintenanceObj=details.equipment;
  }
  edit(val:any)
  {
    const scheduledDate =new Date(val.scheduledDate); // Convert string to Date object
    const completedDate =new Date(val.completedDate); // Convert string to Date object
    this.itemForm.patchValue({
      scheduledDate:  scheduledDate.toISOString().substring(0, 10),
      completedDate: completedDate.toISOString().substring(0, 10),
      description: val.description,
      status: val.status,
      equipmentId: val.equipmentId,
      maintenanceId:val.id
  });
  }
  update()
  {
    if(this.itemForm.valid)
    {
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.updateMaintenance(this.itemForm.value,this.itemForm.controls['maintenanceId'].value).subscribe((data: any) => {
          this.itemForm.reset();
      
          window.location.reload();
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
}

