import { Injectable } from "@angular/core";
import { MyRoles, UserDto } from "../_models/user";

@Injectable({
  providedIn: "root"
})
export class RolesService {
  constructor() {}

  isUnverified(user: UserDto, allowManagers = true) {
    let role = user.role;
    let Finalresult:boolean
    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ||
        role === MyRoles.unverfied;
        Finalresult= result;
    } else {
      let result = role === MyRoles.unverfied;
      Finalresult= result;
    }
    return Finalresult;
  }

  isClient(user: UserDto, allowManagers = true) {
    let role = user.role;
    let Finalresult:boolean
    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ||
        role === MyRoles.client;
        Finalresult= result;
    } else {
      let result = role === MyRoles.client;
      Finalresult= result;
    }
    console.log("isClient()=",Finalresult);
    return Finalresult;
  }

  isRestricted(user: UserDto, allowManagers = true) {
    let role = user.role;
    let Finalresult:boolean
    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ||
        role === MyRoles.restricted;
        Finalresult= result;
      } else {
      let result = role === MyRoles.restricted;
      Finalresult= result;
    }
    console.log("isRestricted()=",Finalresult);
    return Finalresult;

  }

  isAdmin(user: UserDto) {
    let result = user.role === MyRoles.client;
    console.log("isAdmin()=",result);
    return result;
  }

  isManager(user: UserDto, allowManagers = true) {
    let role = user.role;
    let Finalresult:boolean

    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ;
        Finalresult= result;
      } else {
      let result = role === MyRoles.manager;
      Finalresult= result;
    }
    console.log("isManager()=",Finalresult);
    return Finalresult;
  }

  hasRole(user: UserDto, role: string, allowManagers = true) {
    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ||
        role === MyRoles.unverfied;
      return result;
    } else {
      let result = role === MyRoles.unverfied;
      return result;
    }
  }
  
} //class
