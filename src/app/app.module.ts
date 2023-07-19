import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ServiceModule } from './services/services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailsComponent } from './devicedetails/devicedetails.component';
import { DeviceRegistrationComponent } from './device-registration/device-registration.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SignUpComponent,
    AccountComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    DeviceRegistrationComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [Title, MdbModalService],
  bootstrap: [AppComponent]
})

export class AppModule {}
