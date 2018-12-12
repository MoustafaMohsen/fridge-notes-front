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

  isClient(user: UserDto, allowManagers = true) {
    let role = user.role;

    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ||
        role === MyRoles.client;
      return result;
    } else {
      let result = role === MyRoles.client;
      return result;
    }
  }

  isRestricted(user: UserDto, allowManagers = true) {
    let role = user.role;

    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ||
        role === MyRoles.restricted;
      return result;
    } else {
      let result = role === MyRoles.restricted;
      return result;
    }
  }

  isAdmin(user: UserDto) {
    let result = user.role === MyRoles.client;
    return result;
  }

  isManager(user: UserDto, allowManagers = true) {
    let role = user.role;

    if (allowManagers) {
      let result =
        role === MyRoles.admin ||
        role === MyRoles.manager ;
      return result;
    } else {
      let result = role === MyRoles.manager;
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
