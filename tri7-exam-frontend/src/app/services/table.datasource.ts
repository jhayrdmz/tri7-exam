import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, finalize, merge } from 'rxjs/operators';
import { PaginatorService } from './paginator.service';

export class TableDataSource implements DataSource<any> {
  pageUrl = new Subject<string>();

  private dataSubject = new BehaviorSubject<any[]>([]);

  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private paginatorService: PaginatorService) {}

  loadData(endpoint: string, filter?: string | object) {
    this.loadingSubject.next(true);

    this.paginatorService
      .query(endpoint, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data: any) => {
        this.dataSubject.next(data.data);
        this.totalSubject.next(data.meta.total);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect() {
    this.dataSubject.complete();
    this.totalSubject.complete();
    this.loadingSubject.complete();
  }
}
