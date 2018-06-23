
import { Routes} from '@angular/router'; 
import { GListComponent } from './g-list-comp/g-list.component';
import { GAddComponent } from './g-add-comp/g-add.component';


export const appRoutes:Routes =[
    {path:'' , component:GListComponent},
    {path:'add',component:GAddComponent},
  ];


//export const MyRoute = RouterModule.forRoot(appRoutes)