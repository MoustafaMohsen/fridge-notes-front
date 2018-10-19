
import { Routes} from '@angular/router'; 
import { GListComponent } from './g-list-comp/g-list.component';
import { GAddComponent } from './g-add-comp/g-add.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_auth.collection';


export const appRoutes:Routes =[
    {path:'' , component:GListComponent/*,canActivate:[AuthGuard]*/},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ];


//export const MyRoute = RouterModule.forRoot(appRoutes)