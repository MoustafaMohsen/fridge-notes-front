import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { GListService } from './Services/g-list.service';
//import { GAddComponent } from './g-add-comp/g-add.component';
import { GUpdateComponent } from './components/card-components/button-components/g-update-comp/g-update.component';

import { RouterModule } from '@angular/router'; 
import { appRoutes } from './statics/app.routing';
//import { GEditComponent } from './g-edit/g-edit.component';

//materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {
  MatButtonModule, MatCheckboxModule,MatButtonToggleModule,MatInputModule,MatSliderModule,
  MatCardModule,MatProgressBarModule,MatToolbarModule,MatAutocompleteModule,
  MatFormFieldModule,MatSlideToggleModule,MatSnackBarModule,MatDividerModule, MatMenuModule,
  MatIconModule, MatExpansionModule, MatListModule,MatTooltipModule,MatSidenavModule
} from '@angular/material';
import { HelpersService } from './Services/helpers.service';
import { FormatService } from './Services/frormat.service';
import { ItemCardComponent } from './components/card-components/item-card/item-card.component';
import { CardButtonsComponent } from './components/card-components/button-components/card-buttons-comp/card-buttons.component';
import { MyAuthModule } from './_auth.collection';
import { LoginComponent } from './components/account-components/login/login.component';
import { RegisterComponent } from './components/account-components/register/register.component';
import { UserbarComponent } from './components/account-components/userbar/userbar.component';
import { TopnavComponent } from './components/topnav/topnav.component';

import { AddCardComponent } from './components/card-components/add-card/add-card.component';
import { AddButtonComponent } from './components/card-components/button-components/add-button/add-button.component';
import { EditUserComponent } from './components/account-components/edit-user-page/edit-user/edit-user.component';
import { RegistrationCheckEmailsComponent } from './components/account-components/registration-check-emails/registration-check-emails.component';
import { EmailVerificationComponent } from './components/account-components/email-verification/email-verification.component';
import { GoogleLoginComponent } from './components/account-components/google-login/google-login.component';
import { FacebookLoginComponent } from './components/account-components/facebook-login/facebook-login.component';
import { PeopleManagmentComponent } from './components/account-components/people-managment/people-managment.component';
import { ChangePasswrodComponent } from './components/account-components/edit-user-page/change-passwrod/change-passwrod.component';
import { DeleteUserComponent } from './components/account-components/edit-user-page/delete-user/delete-user.component';
import { EditUserSectionComponent } from './components/account-components/edit-user-page/edit-user-section/edit-user-section.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    //GAddComponent,
    GUpdateComponent,
   // GEditComponent,
    ItemCardComponent,
    CardButtonsComponent,
    LoginComponent,
    RegisterComponent,
    UserbarComponent,
    TopnavComponent,
    AddCardComponent,
    AddButtonComponent,
    EditUserComponent,
    RegistrationCheckEmailsComponent,
    EmailVerificationComponent,
    GoogleLoginComponent,
    FacebookLoginComponent,
    PeopleManagmentComponent,
    ChangePasswrodComponent,
    DeleteUserComponent,
    EditUserSectionComponent,
    FooterComponent,

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MyAuthModule,
    ReactiveFormsModule,
    //matrials
    MatButtonModule, MatCheckboxModule,MatButtonToggleModule,MatInputModule,
    MatSliderModule,MatCardModule,MatProgressBarModule,MatToolbarModule,MatAutocompleteModule,
    MatFormFieldModule,MatSlideToggleModule,MatSnackBarModule,MatDividerModule,MatMenuModule,
    MatIconModule,MatExpansionModule,MatListModule,MatTooltipModule,MatSidenavModule,

  ],
  providers: [GListService,HelpersService,FormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
