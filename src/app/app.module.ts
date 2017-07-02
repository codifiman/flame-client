import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArmSwitchComponent } from './arm-switch/arm-switch.component';
import { FireButtonComponent } from './fire-button/fire-button.component';

import { ClientTokenService } from './client-token/client-token.service';
import { LockService } from './lock/lock.service';
import { FlameAPIService } from './flame-api/flame-api.service';
import { FireService } from './fire/fire.service';

@NgModule({
  declarations: [
    AppComponent,
    ArmSwitchComponent,
    FireButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    LockService,
    ClientTokenService,
    FlameAPIService,
    FireService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
