import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { TableDataSource } from '../../services/table.datasource';
import { PaginatorService } from '../../services/paginator.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dataSource!: TableDataSource;
  displayedColumns = [
    'id',
    'first_name',
    'last_name',
    'position',
    'created_at',
    'actions',
  ];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private paginatorService: PaginatorService) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginatorService);
    this.dataSource.loadData('/employees');
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  refresh() {
    this.dataSource.loadData('/employees', {
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
    });
  }
}
