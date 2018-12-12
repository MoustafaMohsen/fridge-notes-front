import { Injectable } from "@angular/core";
import { MyRoles, UserDto } from "../_models/user";

@Injectable({
  providedIn: "root"
})
export class RolesService {
  constructor() {}

  isUnverified(user: UserDto, allowManagers = true) {
    let role = user.role;

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
