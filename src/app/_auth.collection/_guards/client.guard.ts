import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from "../_services/authentication.service";
import { RolesService } from '../_services/Roles.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private router:Router,private auth:AuthenticationService,private RolesSrv:RolesService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("==UnverifiedGuard==")      
    // If logged in check roles
    if ( Object.keys(this.auth.CurrentUser).length !==0 ) {      

        let result = this.RolesSrv.isClient(this.auth.CurrentUser)
        console.log(result);
        if(!result){
            let unverified = this.RolesSrv.isUnverified(this.auth.CurrentUser);

            if(unverified)
                this.router.navigate(['/check-email']);
        }
        return result;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
