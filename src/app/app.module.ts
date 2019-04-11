import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YandexAutorizationComponent } from './yandex-autorization/yandex-autorization.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    providers: [HttpClient],
    bootstrap: [AppComponent, MainComponent, YandexAutorizationComponent]
})
export class AppModule {
}
