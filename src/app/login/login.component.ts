import { Component } from '@angular/core';
import { AppContainerComponent } from "../components/appcontainer/appcontainer.component";
import { NavegadorService } from '../components/navegador.service';

@Component({
  selector: 'app-login',
  imports: [AppContainerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private navegador: NavegadorService) {}

  navegar(path: string) {
    this.navegador.navegar(path);
  }
}
