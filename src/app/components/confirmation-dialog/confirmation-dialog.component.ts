import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

export type ConfirmationDialogProps = {
  title: string;
  message: string;
};

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatButton, MatDialogTitle, MatDialogClose, MatDialogContent, MatDialogActions],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogData: ConfirmationDialogProps = inject(MAT_DIALOG_DATA);
}
