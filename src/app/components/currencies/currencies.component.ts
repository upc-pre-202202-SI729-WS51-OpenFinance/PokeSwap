import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items = [
    { name: 'BTC/USDT', value: 0.20080200 , sub: '+ 0.4%'},
    { name: 'ETH/USDT', value: 0.05402100 , sub: '+ 0.4%'},
    { name: 'XCH/USDT', value: 0.00316030 , sub: '+ 0.4%'},
    { name: 'BNB/USDT', value: 0.00024400 , sub: '+ 0.4%'},
    { name: 'ADA/USDT', value: 0.00263100 , sub: '+ 0.4%'},
    { name: 'XRP/USDT', value: 0.00012200 , sub: '+ 0.4%'},
    { name: 'XCH/USDT', value: 0.00316030 , sub: '+ 0.4%'},
  ]

}
