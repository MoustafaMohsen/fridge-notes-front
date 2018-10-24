import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './boot/app.component';
import { GListComponent } from './g-list-comp/g-list.component';
import { GListService } from './Services/g-list.service';
import { GAddComponent } from './g-add-comp/g-add.component';
import { GUpdateComponent } from './g-update-comp/g-update.component';

import { RouterModule } from '@angular/router'; 
import { appRoutes } from './app.routing';
//import { GEditComponent } from './g-edit/g-edit.component';

//materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule,MatButtonToggleModule,MatInputModule,MatSliderModule,
  MatCardModule,MatProgressBarModule,MatToolbarModule,MatAutocompleteModule,
  MatFormFieldModule,MatSlideToggleModule,MatSnackBarModule,MatDividerModule, MatMenuModule,
  MatIconModule, MatExpansionModule, MatListModule,MatTooltipModule
} from '@angular/material';
import { HelpersService } from './Services/helpers.service';
import { FormatService } from './Services/frormat.service';
import { ItemCardComponent } from './item-card-comp/item-card.component';
import { CardButtonsComponent } from './card-buttons-comp/card-buttons.component';
import { MyAuthModule } from './_auth.collection';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserbarComponent } from './userbar/userbar.component';
import { AccountComponent } from './account/account.component';
import { TopnavComponent } from './topnav/topnav.component';



@NgModule({
  declarations: [
    AppComponent,
    GListComponent,
    GAddComponent,
    GUpdateComponent,
   // GEditComponent,
    ItemCardComponent,
    CardButtonsComponent,
    LoginComponent,
    RegisterComponent,
    UserbarComponent,
    AccountComponent,
    TopnavComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MyAuthModule,
    ReactiveFormsModule,
    //matrials
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatButtonToggleModule,MatInputModule,
    MatSliderModule,MatCardModule,MatProgressBarModule,MatToolbarModule,MatAutocompleteModule,
    MatFormFieldModule,MatSlideToggleModule,MatSnackBarModule,MatDividerModule,MatMenuModule,
    MatIconModule,MatExpansionModule,MatListModule,MatTooltipModule
    
  ],
  providers: [GListService,HelpersService,FormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
