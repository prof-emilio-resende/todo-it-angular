import { Component } from '@angular/core';
import { AppContainerComponent } from '../components/appcontainer/appcontainer.component';
import {NavegadorService} from '../components/navegador.service';

@Component({
  selector: 'app-signup',
  imports: [AppContainerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true
})
export class SignupComponent {
  constructor(private navegador: NavegadorService) {}

  navegar(path: string) {
    this.navegador.navegar(path);
  }
}
