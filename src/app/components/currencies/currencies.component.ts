import { Component, HostListener, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-currencies",
  templateUrl: "./currencies.component.html",
  styleUrls: ["./currencies.component.css"]
})
export class CurrenciesComponent {

  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  totalCards: number = this.arr.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage!: number;
  totalPages!: number;
  overflowWidth!: string;
  cardWidth!: string;
  containerWidth!: number;

  items = [
    { name: 'BTC/USDT', value: 19188.76 , sub: '+ 0.6%'},
    { name: 'ETH/USDT', value: 1303.91 , sub: '+ 0.8%'},
    { name: 'LTC/USDT', value: 51.56 , sub: '+ 0.5%'},
    { name: 'BNB/USDT', value: 270.14 , sub: '+ 0.3%'},
    { name: 'ADA/USDT', value: 0.35 , sub: '+ 0.2%'},
    { name: 'XRP/USDT', value: 0.45 , sub: '+ 0.4%'},
    { name: 'XCH/USDT', value: 31.2 , sub: '+ 0.7%'},
    { name: 'SHIB/USDT', value: 0.000011 , sub: '+ 0.2%'},
    { name: 'SOL/USDT', value: 33.9 , sub: '+ 0.4%'},
    { name: 'DOGE/USDT', value: 0.06 , sub: '+ 0.7%'},
  ]

  @ViewChild("container", { static: true, read: ElementRef })
  container!: ElementRef;

  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 260);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }
}
