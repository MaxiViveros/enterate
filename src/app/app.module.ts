import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";

/* Configuración de Firebase */
import { environment } from "src/environments/environment";

/* Módulos de Firestore */
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

//primeNG
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CommentsComponent } from './comments/comments.component';
import { HeaderComponent } from './header/header.component';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {RatingModule} from 'primeng/rating';
import { AdministrationComponent } from './administration/administration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "primeng/card";
import {PaginatorModule} from "primeng/paginator";
import {PanelModule} from "primeng/panel";
import {TagModule} from "primeng/tag";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    CommentsComponent,
    HeaderComponent,
    AdministrationComponent
  ],
    imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        BrowserModule,
        AppRoutingModule,
        AccordionModule,
        ButtonModule,
        DataViewModule,
        DropdownModule,
        RatingModule,
        HttpClientModule,
        FormsModule,
        RippleModule,
        DialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CardModule,
        PaginatorModule,
        PanelModule,
        TagModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
