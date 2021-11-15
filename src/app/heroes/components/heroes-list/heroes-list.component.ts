import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Hero } from '@shared/models/hero.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html'
})
export class HeroesListComponent implements OnInit {

  @Input() heroes!: Hero[];

  @Output() onEdit = new EventEmitter<Hero>();
  @Output() onRemove = new EventEmitter<Hero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Hero>([]);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'heroes': {
            this.dataSource.data = change.currentValue;
          }
        }
      }
    }
  }

}
