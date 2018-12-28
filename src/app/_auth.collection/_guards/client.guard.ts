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
    console.log("==ClientGuard==")      
    let user = this.auth.CurrentUser;
    // If logged in check roles
    if ( Object.keys(user).length !==0 && user.token) {
        let result = this.RolesSrv.isClient(user);
        
        console.log(result);
        if(!result){
            let unverified = this.RolesSrv.isUnverified(user);
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
