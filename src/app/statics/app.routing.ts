
import { Routes} from '@angular/router'; 
import { ListComponent } from '../components/list/list.component';
import { LoginComponent } from '../components/account-components/login/login.component';
import { RegisterComponent } from '../components/account-components/register/register.component';
import { AuthGuard } from '../_auth.collection';
import { ManageAccountComponent } from '../components/account-components/manage-account/manage-account.component';


export const appRoutes:Routes =[
  {path:'' , component:ListComponent,canActivate:[AuthGuard]},
  {path:'account' , component:ManageAccountComponent,canActivate:[AuthGuard]},

  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  ];


//export const MyRoute = RouterModule.forRoot(appRoutes)