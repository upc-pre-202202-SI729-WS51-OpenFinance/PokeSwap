import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Coin } from '../models/coin';
import { catchError, retry } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  //Coin Endpoint
  basePath = 'http://localhost:3000/api/v1/coins';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  //API Error Handling
  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      // Default error handling
      console.log(`An error ocurred: ${error.error.message}`);
    }
    else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError('Something happened with request, please try again later');
  }

  //Create Coin
  create(item: any): Observable<Coin>{
    return this.http.post<Coin>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
      
  }

  //Get Coin by Id
  getById(id: any): Observable<Coin>{
    return this.http.get<Coin>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //Get All Coins
  getAll(): Observable<Coin>{
    return this.http.get<Coin>(this.basePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //Update Coin
  update(id: any, item: any): Observable<Coin>{
    return this.http.put<Coin>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //Delete Coin
  delete(id: any){
    return this.http.delete<Coin>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
