import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { KebabCasePipe } from '../../utils';

@Component({
  selector: 'app-badge',
  imports: [KebabCasePipe],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  label = input.required<string>();
}
