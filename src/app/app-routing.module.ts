import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DevicesComponent } from './devices/devices.component';
import { NavComponent } from './nav/nav.component';
import { DeviceRegistrationComponent } from './device-registration/device-registration.component';
import { AccountComponent } from './account/account.component';
import { DeviceDetailsComponent } from './devicedetails/devicedetails.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: ':acctID/account', component: AccountComponent},
  {path: ':acctID/devices', component: DevicesComponent},
  {path: ':acctID/devices/device-registration', component: DeviceRegistrationComponent},
  {path: ':acctID/devices/devicedetails/:fobSN', component: DeviceDetailsComponent},
  {path: 'nav-bar', component: NavComponent},
  {path: '', redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
