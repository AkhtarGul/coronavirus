import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../model/cases';

@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {
cases!:Cases
  constructor(private route: ActivatedRoute, private apiSrv: ApiService, private router: Router) { }
  isLoadingResults:boolean = true;
  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params?.id);
    // this.route.queryParams.subscribe(param=>{
    //    let id= param['id'];
    //     this.getCasesDetails(id);
    // })
  }
  getCasesDetails(id: number) {
    if(id!=null){
    this.apiSrv.getCaseById(id)
      .subscribe((data: any) => {
        this.cases = data;
        console.log(this.cases);
        this.isLoadingResults = false;
      });
    }
  }
  // deleteCases(cases.id)
  deleteCases(id:any){
    this.apiSrv.deleteCase(id)
    .subscribe(res=>{
      this.isLoadingResults=false;
      this.router.navigate(['/cases'])
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }
}
