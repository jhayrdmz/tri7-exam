import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav!: MatSidenav;

  private opened = new Subject<boolean>();
  opened$ = this.opened.asObservable();

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  open() {
    return this.sidenav.open();
  }

  close() {
    return this.sidenav.close();
  }

  toggle() {
    this.sidenav.toggle();
    this.opened.next(this.sidenav.opened);
  }

  hide() {
    this.opened.next(false);
    return this.close();
  }

  show() {
    this.opened.next(true);
    return this.open();
  }
}
