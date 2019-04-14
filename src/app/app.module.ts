import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YandexAutorizationComponent } from './yandex-autorization/yandex-autorization.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from "./shared.service";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalContent } from './modal-window/modal-window.component';

@NgModule({
    declarations: [
        AppComponent,
        YandexAutorizationComponent,
        MainComponent,
        NgbdModalContent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
    ],
    entryComponents: [NgbdModalContent],
    providers: [HttpClient, CookieService, SharedService],
    bootstrap: [AppComponent, MainComponent, YandexAutorizationComponent]
})
export class AppModule {
}
