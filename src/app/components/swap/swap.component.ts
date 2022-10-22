import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Coin } from '../../models/coin';
import { CoinsService } from '../../services/coins.service';
import { UsersService } from '../../services/users.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.css']
})
export class SwapComponent implements OnInit, DoCheck {

  swapData: Coin;
  dataSource: any;

  default_from = "USDT";
  default_to = "ETH";

  fromQuantity: any;
  fromPrice: any;

  toQuantity: any;

  actualQuantityFrom: any;
  actualQuantityTo: any;
  
  balance: any;

  @ViewChild('swapForm', {static: false})
  swapForm!: NgForm;

  constructor(private swapService : CoinsService, private userService : UsersService) { 
    this.swapData = {} as Coin;
    this.dataSource = Array;
  }

  swap(): void {
    this.swapData = {
      "id": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_from)].id,
      "name": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_from)].name,
      "symbol": this.default_from,
      "price": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_from)].price,
      "quantity": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_from)].quantity - this.fromQuantity
    }
    this.updateCoin();

    this.swapData = {
      "id": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_to)].id,
      "name": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_to)].name,
      "symbol": this.default_to,
      "price": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_to)].price,
      "quantity": this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_to)].quantity + this.toQuantity
    }
    this.updateCoin();

    window.location.reload();
  }

  ngOnInit(): void {
    this.getAllCoins();
    this.fromPrice = 0;
  }

  ngDoCheck(): void {
    if (this.fromQuantity != null) {
      this.fromPrice = this.fromQuantity * this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_from)].price;

      this.toQuantity = this.fromPrice / this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_to)].price;
    }

    this.actualQuantityFrom = this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_from)].quantity;

    this.actualQuantityTo = this.dataSource[this.dataSource.findIndex((obj: { symbol: string; }) => obj.symbol === this.default_to)].quantity;
  }

  getAllCoins(){
    this.swapService.getAll().subscribe((response: any)=>{
      this.dataSource = response;
      console.log(this.dataSource)
    });
  }

  updateCoin(){
    this.swapService.update(this.swapData.id, this.swapData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: Coin)=>{
        if(o.id === response.id){
          o = response;
        }

        return o;
      });
    });
  }
}
