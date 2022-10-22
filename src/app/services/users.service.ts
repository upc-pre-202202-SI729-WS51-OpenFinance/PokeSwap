import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { User } from '../models/user';
import { catchError, retry } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //User Endpoint
  basePath = 'http://localhost:3000/api/v1/users';

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

  //Create User
  create(item: any): Observable<User>{
    return this.http.post<User>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
      
  }

  //Get User by Id
  getById(id: any): Observable<User>{
    return this.http.get<User>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //Get All Users
  getAll(): Observable<User>{
    return this.http.get<User>(this.basePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //Update User
  update(id: any, item: any): Observable<User>{
    return this.http.put<User>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //Delete User
  delete(id: any){
    return this.http.delete<User>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
