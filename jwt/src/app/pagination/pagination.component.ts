import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
@Input() page: number;
@Input() count: number;
@Input() perpage: number;
@Input() pagestoshow: number;
@Input() loading: number;

@Output() goPrev = new EventEmitter<boolean>();
@Output() gonext = new EventEmitter<boolean>();
@Output() goPage = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }
  onPrev(): void{
    this.goPrev.emit(true);
  }
  onnext(): void{
    this.gonext.emit(true);
  }
  onPage(n:number): void{
    this.goPage.emit(n);
   }

}
