import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from "../_services/authentication.service";
import {  Router } from "@angular/router";
import {  MatSnackBar } from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private router:Router,private snack:MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
            console.log("Error Interceptor");
            
            if (err.status === 401) {
                this.snack.open("Please Login Or Register","x",{duration:3000})
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/login'] );
                //location.reload(true);
                return throwError(err);
            }

            //console.log(err);
            //const error =  err.statusText ||err.error.message ; 
            return Observable.throw(err);
        }))
        //return next.handle(request)
    }

}//class