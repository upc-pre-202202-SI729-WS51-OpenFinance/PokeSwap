import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwapComponent } from './components/swap/swap.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

// Material UI
import { MatIconModule } from '@angular/material/icon';
import {CdkMenuModule} from '@angular/cdk/menu';

@NgModule({
  declarations: [
    AppComponent,
    SwapComponent,
    CurrenciesComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    CdkMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
