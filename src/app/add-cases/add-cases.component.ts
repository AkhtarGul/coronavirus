import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-cases',
  templateUrl: './add-cases.component.html',
  styleUrls: ['./add-cases.component.scss']
})
export class AddCasesComponent implements OnInit {

  constructor(private router: Router, private apiSrv: ApiService, private formBuilder: FormBuilder) { }

  
  casesForm!: FormGroup;
  name = '';
  gender = '';
  age: number = 0;
  address = '';
  city = '';
  country = '';
  status = '';
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.caseFormInitiale();
  }
  caseFormInitiale(){
    this.casesForm = this.formBuilder.group({
      name : [null, Validators.required],
      gender : [null, Validators.required],
      age : [null, Validators.required],
      address : [null, Validators.required],
      city : [null, Validators.required],
      country : [null, Validators.required],
      status : [null, Validators.required]
    });
  }
  onFormSubmit(){
    this.isLoadingResults=true;
    this.apiSrv.addCase(this.casesForm.value).subscribe(res=>{
      const id=res.id;
      this.isLoadingResults=false;
      this.router.navigate(['/cases-details',id]);
    },
    (err:any)=>{
      console.log(err);
      this.isLoadingResults=false;
    });
    
  }
}
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
