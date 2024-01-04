import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnDestroy {
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  mobileQuery: MediaQueryList;
  loadingRouteConfig!: boolean;

  private _mobileQueryListener: () => void;

  constructor(
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private sidenavService: SidenavService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  close() {
    this.sidenav.close();
  }

  navigate(path: any) {
    this.router.navigate([path]);
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
