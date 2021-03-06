
import { Routes} from '@angular/router'; 
import { ListComponent } from '../components/list/list.component';
import { LoginComponent } from '../components/account-components/login/login.component';
import { RegisterComponent } from '../components/account-components/register/register.component';
import { AuthGuard,UnverifiedGuard,ClientGuard } from '../_auth.collection';
import { RegistrationCheckEmailsComponent } from '../components/account-components/registration-check-emails/registration-check-emails.component';
import { EmailVerificationComponent } from '../components/account-components/email-verification/email-verification.component';
import { GoogleLoginComponent } from '../components/account-components/google-login/google-login.component';
import { FacebookLoginComponent } from '../components/account-components/facebook-login/facebook-login.component';
import { AnonymousGuard } from '../_auth.collection/_guards/anonymous.guard';
import { PeopleManagmentComponent } from '../components/account-components/people-managment/people-managment.component';
import { EditUserComponent } from '../components/account-components/edit-user-page/edit-user/edit-user.component';


export const appRoutes:Routes =[
  //login auth
  {path:'' , component:ListComponent,canActivate:[ClientGuard]},

  //account
  {path:'account' , component:EditUserComponent,canActivate:[AuthGuard]},

  //people
  {path:'people' , component:PeopleManagmentComponent,canActivate:[ClientGuard]},

  //login auth
  {path:'check-email' , component:RegistrationCheckEmailsComponent,canActivate:[UnverifiedGuard]},

  //login facebook
  {path:'external-google' , component:GoogleLoginComponent,canActivate:[AnonymousGuard]},

  //login facebook
  {path:'external-facebook' , component:FacebookLoginComponent,canActivate:[AnonymousGuard]},


  //verification
  {path:'verify-email' , component:EmailVerificationComponent,canActivate:[UnverifiedGuard]},

  {path:'login',component:LoginComponent,canActivate:[AnonymousGuard]},
  {path:'register',component:RegisterComponent,canActivate:[AnonymousGuard]},

  ];


//export const MyRoute = RouterModule.forRoot(appRoutes)