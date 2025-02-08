import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() plan: string = '';
  @Input() typePlan: string = '';
  @Input() price: string = '';
  @Input() textButton: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
