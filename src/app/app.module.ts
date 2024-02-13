import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FolderContentComponent } from './pages/folder-content/folder-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './pages/auth/auth.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './pages/auth/interceptors/auth.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import { FolderComponent } from './components/folder/folder.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    AppComponent,

    // main components
    RegisterComponent,
    AuthComponent,
    DashboardComponent,
    FolderContentComponent,


    // generic components
    InputFieldComponent,
    ButtonComponent,
    ModalComponent,
    FolderComponent,
    ContentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
