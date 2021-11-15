import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { InputUppercaseDirective } from './directives/input-uppercase.directive';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    NameFilterPipe,
    InputUppercaseDirective,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    NameFilterPipe,
    InputUppercaseDirective
  ],
  entryComponents: [DeleteDialogComponent]
})
export class SharedModule {}
