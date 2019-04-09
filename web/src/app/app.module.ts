import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { ButtomComponent } from './buttom/buttom.component';
import { SecondComponent } from './second/second.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    ButtomComponent,
    SecondComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent, TopComponent, SecondComponent, ButtomComponent, MainComponent]
})
export class AppModule { }
