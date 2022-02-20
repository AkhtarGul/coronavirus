import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cases } from './model/cases';
import { Statistic } from './model/statistic';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrlState="https://620e90e9585fbc3359e74cf4.mockapi.io/Statistic"
  private readonly apiUrlCases="https://620e90e9585fbc3359e74cf4.mockapi.io/cases"
 
  constructor(private http: HttpClient) { }
  getAllCases():Observable<Cases[]>{
   return  this.http.get<Cases[]>(this.apiUrlCases)
   .pipe(
     tap(cases=>console.log('fetch cases')),
     catchError(this.handleError('getCases',[]))
     
   );
  }
  getCaseById(id:number):Observable<Cases>{
    let url=`${this.apiUrlCases}/${id}`
  return this.http.get<Cases>(url)
  .pipe(
    tap(_ => console.log(`fetched cases id=${id}`)),
    catchError(this.handleError<Cases>(`getCasesById id=${id}`))
  );
  }
  addCase(cases: Cases):Observable<Cases>{
    return this.http.post<Cases>(this.apiUrlCases,cases,httpOptions)
    .pipe(
      tap((c:Cases)=>console.log(`added cases w/ id=${c.id}`)),
      catchError(this.handleError<Cases>(`added Case`))
    );
  }
  deleteCase(id:number):Observable<Cases>{
    let url=`${this.apiUrlCases}/${id}`
    return this.http.delete<Cases>(url,httpOptions)
    .pipe(
      tap(_=>console.log(`deleted case id=${id}`)),
      catchError(this.handleError<Cases>(`delete Case`))
    );
  }
  updateCase(id:number,cases:Cases):Observable<Cases>{
    const url = `${this.apiUrlCases}/${id}`;
    return this.http.put<Cases>(url,cases,httpOptions)
    .pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    )
  }
  getStatistic(status: string): Observable<Statistic> {
    const url = `${this.apiUrlState}/${status}`;
    return this.http.get<Statistic>(url).pipe(
      tap(_ => console.log(`fetched statistic status=${status}`)),
      catchError(this.handleError<Statistic>(`getStatistic status=${status}`))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
