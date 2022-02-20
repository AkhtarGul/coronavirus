import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../model/cases';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'status'];
  data: Cases[] = [];
  isLoadingResults = true;
  constructor(private apiSrv:ApiService,private router:Router) { }

  ngOnInit(): void {


      this.apiSrv.getAllCases().subscribe(res=>{
        this.data=res;
        this.isLoadingResults=false;
        console.log(...res);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  gotoAddedCase(){
    this.router.navigate(['/add-cases']);
  }
  gotoChart(){
    this.router.navigate(['/cases-stat']);
  }
  // caseDetail(){
  //   this.router.navigate(['/cases-details/', this.data.find(id)])
  // }
}
