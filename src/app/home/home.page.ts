import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonHeader, IonButton, IonTitle, IonToolbar, IonContent, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonItem,  RouterModule, IonHeader, IonButton, IonTitle, IonToolbar, IonContent]
})
export class HomePage {

  constructor(private router: Router) {}

  irAAvisos() {
    this.router.navigate(['/avisos']);
  }

  irACrearAviso() {
    this.router.navigate(['/crear']);
  }
}

