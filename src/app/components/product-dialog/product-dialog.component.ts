import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-dialog',
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, ProductFormComponent],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialogComponent {}
