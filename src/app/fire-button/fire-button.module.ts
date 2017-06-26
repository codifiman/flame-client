// fire-button.module
import { NgModule } from '@angular/core';

import { FireService } from './fire.service';

@NgModule({
  providers: [
    FireService
  ]
})
export class FireModule { }
