import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { SwapComponent } from './components/swap/swap.component';

const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'swap', component: SwapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
