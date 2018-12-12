
import { Routes} from '@angular/router'; 
import { ListComponent } from '../components/list/list.component';
import { LoginComponent } from '../components/account-components/login/login.component';
import { RegisterComponent } from '../components/account-components/register/register.component';
import { AuthGuard,UnverifiedGuard,ClientGuard } from '../_auth.collection';
import { ManageAccountComponent } from '../components/account-components/manage-account/manage-account.component';
import { RegistrationCheckEmailsComponent } from '../registration-check-emails/registration-check-emails.component';
import { EmailVerificationComponent } from '../email-verification/email-verification.component';


export const appRoutes:Routes =[
  //login auth
  {path:'' , component:ListComponent,canActivate:[ClientGuard]},
  {path:'account' , component:ManageAccountComponent,canActivate:[AuthGuard]},

  //login auth
  {path:'check-email' , component:RegistrationCheckEmailsComponent,canActivate:[UnverifiedGuard]},

  //verification
  {path:'verify-email' , component:EmailVerificationComponent,canActivate:[UnverifiedGuard]},

  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

  ];


//export const MyRoute = RouterModule.forRoot(appRoutes)