import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { GListService } from "../../Services/g-list.service";
import { AuthenticationService } from "../_services/authentication.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private auth:AuthenticationService){}

    intercept(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>> {
        let currentUser =this.auth.CurrentUser//JSON.parse( localStorage.getItem('currentuser') );

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
        }
        return next.handle(request);
    }
}//class