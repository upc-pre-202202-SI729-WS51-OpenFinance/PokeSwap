import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Coin } from '../../models/coin';
import { CoinsService } from '../../services/coins.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  portfolioData: Coin;
  isEditMode: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price'];

  //El !: en portfolioForm o paginator es para obviar la declaración/asignación en el constructor
  @ViewChild('portfolioForm', {static: false})
  portfolioForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private portfolioService : CoinsService) { 
    this.portfolioData = {} as Coin;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllCoins();
  }

  getAllCoins(){
    this.portfolioService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  //Editar item

  editItem(element: Coin){
    this.portfolioData = _.cloneDeep(element);
    this.isEditMode = true;
  }

//Eliminar item

  deleteItem(id: number){
    this.portfolioService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o: Coin)=>{
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

//Cancelar edicion
  cancelEdit(){
    this.isEditMode = false;
    this.portfolioForm.resetForm();
  }
//añadir token
  addCoin(){
    this.portfolioData.id = 0;
    this.portfolioService.create(this.portfolioData).subscribe((response: any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        return o;
      });
    });
  }
//actualizar informacion de token
  updateCoin(){
    this.portfolioService.update(this.portfolioData.id, this.portfolioData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: Coin)=>{
        if(o.id === response.id){
          o = response;
        }

        return o;
      });
    });
  }

  onSubmit(){
    if(this.portfolioForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('about to update');
        this.updateCoin();
      } else {
        console.log('about to add');
        this.addCoin();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}
