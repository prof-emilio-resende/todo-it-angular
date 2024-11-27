import {Component, HostBinding, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {NavegadorService} from '../navegador.service';

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
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() status: string = '';

  @HostBinding('class') get hostClasses() {
    return "rounded-lg border bg-card text-card-foreground shadow-sm w-11/12";
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
