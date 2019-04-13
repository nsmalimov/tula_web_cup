import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YandexAutorizationComponent } from './yandex-autorization/yandex-autorization.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from "./shared.service";


@NgModule({
    declarations: [
        AppComponent,
        YandexAutorizationComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [HttpClient, CookieService, SharedService],
    bootstrap: [AppComponent, MainComponent, YandexAutorizationComponent]
})
export class AppModule {
}
