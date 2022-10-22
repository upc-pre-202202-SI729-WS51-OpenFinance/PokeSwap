import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { CoinsService } from './services/coins.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'PokeSwap';
  balance: Number;

  dataSource : any;

  constructor(private userService : UsersService, private coinsService : CoinsService) { 
    this.balance = 0;
  }

  ngOnInit(): void {
    /*this.getAllUsers();*/
    this.getAllCoins();
  }

  getAllCoins(){
    this.coinsService.getAll().subscribe((response: any)=>{
      this.dataSource = response;

      this.balance = this.dataSource[0].quantity;

      console.log(this.dataSource)
    });
  }

  /*
  getAllUsers(){
    this.userService.getAll().subscribe((response: any)=>{
      this.balance = response[1].balance;
    });
  }
  */
}

