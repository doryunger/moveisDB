import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Material from "@angular/material";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AlertComponent } from './_components';
import { SecureComponent } from './_components/secure/secure.component';
import { DialogComponent } from './_components/dialog/dialog.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        HttpClientJsonpModule,
        FormsModule,
        BrowserAnimationsModule,
        Material.MatButtonModule,
        Material.MatMenuModule,
        Material.MatCardModule,
        Material.MatToolbarModule,
        Material.MatIconModule,
        Material.MatGridListModule,
        Material.MatFormFieldModule,
        Material.MatRadioModule,
        Material.MatSelectModule,
        Material.MatCheckboxModule,
        Material.MatDatepickerModule,
        Material.MatNativeDateModule,
        Material.MatFormFieldModule,
        Material.MatInputModule,
        Material.MatAutocompleteModule,
        Material.MatSidenavModule,
        Material.MatListModule,
        Material.MatDialogModule,
        Material.MatProgressSpinnerModule,
        FontAwesomeModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent
,
        SecureComponent ,
        DialogComponent   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: Material.MatDialogRef, useValue: {} }
    ],
    bootstrap: [AppComponent],
    entryComponents:[DialogComponent]
})
export class AppModule { };