import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonHeader, IonButton, IonTitle, IonToolbar, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [RouterLink, RouterModule, IonHeader, IonButton, IonTitle, IonToolbar, IonContent]
})
export class HomePage {

  constructor(private router: Router) {}

  irAAvisos() {
    this.router.navigate(['/avisos']);
  }

  irACrearAviso() {
    this.router.navigate(['/crear-aviso']);
  }
}

