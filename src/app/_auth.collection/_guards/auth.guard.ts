import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private auth:AuthenticationService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
    if ( Object.keys(this.auth.CurrentUser).length !==0 ) {
      console.log("canActivate","true");
      console.log(this.auth.CurrentUser);
      
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    console.log("canActivate","false");
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
