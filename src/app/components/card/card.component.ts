import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() status: string = '';
  @Output() destroyFct: EventEmitter<number> = new EventEmitter();

  @HostBinding('class') get hostClasses() {
    return "rounded-lg border bg-card text-card-foreground shadow-sm w-11/12";
  }

  destroy() {
    this.destroyFct.emit(this.id);
  }

  getCardBadgeClasses() {
    const allClasses = "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ";
    const badges = {
      "Pendente": "bg-black text-white",
      "Em andamento": "bg-yellow-500 text-black",
      "Finalizado": "bg-green-500 text-white",
    } as Record<string, string>;

    return allClasses + badges[this.status];
  }
}
