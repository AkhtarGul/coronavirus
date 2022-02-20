import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrls: ['./edit-cases.component.scss']
})
export class EditCasesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }
  casesForm!: FormGroup;
  id = 0;
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
    this.getCasesById(this.route.snapshot.params.id);
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
  getCasesById(id: any) {
    this.api.getCaseById(id).subscribe((data: any) => {
      this.id = data.id;
      this.casesForm.setValue({
        name: data.name,
        gender: data.gender,
        age: data.age,
        address: data.address,
        city: data.city,
        country: data.country,
        status: data.status
      });
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCase(this.id, this.casesForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/cases-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  casesDetails() {
    this.router.navigate(['/cases-details', this.id]);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}