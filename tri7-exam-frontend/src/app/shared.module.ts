import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SidenavComponent } from './pages/shared/sidenav/sidenav.component';
import { TopnavComponent } from './pages/shared/topnav/topnav.component';

const components = [SidenavComponent, TopnavComponent];

const modules = [
  CommonModule,
  NgxPermissionsModule,
  ReactiveFormsModule,
  FormsModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  MatTabsModule,
  MatDatepickerModule,
  MatChipsModule,
  DragDropModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
})
export class SharedModule {}
