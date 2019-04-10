import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YandexAutorizationComponent } from './yandex-autorization/yandex-autorization.component';

@NgModule({
  declarations: [
    AppComponent,
    YandexAutorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent, YandexAutorizationComponent]
})
export class AppModule { }
