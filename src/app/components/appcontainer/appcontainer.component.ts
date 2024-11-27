import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './appcontainer.component.html',
  styleUrl: './appcontainer.component.css'
})
export class AppContainerComponent {
  @Input()
  title: string = 'TODO IT';

  @Input()
  subtitle: string = 'Subtitle';

  @Input()
  headline: string = 'Something useful';
}
