import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SidenavService } from '../../../services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent {
  @Input() hasSidenav!: boolean;

  opened: boolean = true;

  constructor(
    public auth: AuthService,
    public router: Router,
    private sidenavService: SidenavService
  ) {}

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.sidenavService.opened$.subscribe((status) => {
      this.opened = status;
    });
  }
}
