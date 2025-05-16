import { Component, EventEmitter, input, Output } from '@angular/core';
import { LucideAngularModule, CircleUserRound } from 'lucide-angular';

@Component({
  selector: 'app-contact-card',
  imports: [LucideAngularModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  readonly circleUserRound = CircleUserRound;
  name = input.required<string>();
  email = input.required<string>();

  @Output() selected = new EventEmitter<void>();

  onClick(){
    this.selected.emit();
  }
}
