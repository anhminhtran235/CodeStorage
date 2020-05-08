import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor.ts';
import { JwtModule } from '@auth0/angular-jwt';
import { DocumentIndividualComponent } from './document-components/document-individual/document-individual.component';
import { DocumentListComponent } from './document-components/document-list/document-list.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { DocumentDisplayComponent } from './document-components/document-display/document-display.component';
import { DocumentListResolver } from './_resolvers/document-list.resolver';
import { DocumentDisplayResolver } from './_resolvers/document-display.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export function tokenGetter() {
   return localStorage.getItem('token');
 }

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      DocumentIndividualComponent,
      DocumentListComponent,
      DocumentDisplayComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/auth']
         }
      })
   ],
   providers: [
      ErrorInterceptorProvider,
      DocumentListResolver,
      DocumentDisplayResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
