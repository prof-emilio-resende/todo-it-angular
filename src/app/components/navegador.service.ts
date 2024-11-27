import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavegadorService {
  constructor(private router: Router) {}

  navegar(path: string) {
    this.router.navigate([path]);
  }
}
