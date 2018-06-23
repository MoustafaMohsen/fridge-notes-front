import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

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
  MatFormFieldModule,MatSlideToggleModule,MatSnackBarModule,MatDividerModule,
} from '@angular/material';
import { HelpersService } from './Services/helpers.service';
import { FormatService } from './Services/frormat.service';
import { ItemCardComponent } from './item-card-comp/item-card.component';
import { CardButtonsComponent } from './card-buttons-comp/card-buttons.component';
import { RecomendedItemsComponent } from './recomended-items-comp/recomended-items.component';



@NgModule({
  declarations: [
    AppComponent,
    GListComponent,
    GAddComponent,
    GUpdateComponent,
   // GEditComponent,
    ItemCardComponent,
    CardButtonsComponent,
    RecomendedItemsComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    //matrials
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatButtonToggleModule,MatInputModule,
    MatSliderModule,MatCardModule,MatProgressBarModule,MatToolbarModule,MatAutocompleteModule,
    MatFormFieldModule,MatSlideToggleModule,MatSnackBarModule,MatDividerModule,
    
  ],
  providers: [GListService,HelpersService,FormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
