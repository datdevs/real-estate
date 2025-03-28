import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-empty-record',
  imports: [MatIcon],
  templateUrl: './empty-record.component.html',
  styleUrl: './empty-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyRecordComponent {
  message = input<string>('No records found');
  icon = input<string>('inventory_2');
}
