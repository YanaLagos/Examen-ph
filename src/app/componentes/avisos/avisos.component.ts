import { Component, OnInit } from '@angular/core';
import { AvisoServicioService } from 'src/app/servicios/aviso-servicio.service';
import { Aviso } from '../../Modelo/aviso.model';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons'
import { IonList, IonLabel, IonItem, IonButton, IonTitle, IonBackButton, IonToolbar, IonButtons, IonContent, IonHeader, IonIcon, IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [IonImg, IonIcon, IonHeader, IonContent, IonButtons, IonToolbar, IonBackButton, IonTitle, CommonModule, IonList, IonLabel, IonItem, IonButton]
})
export class AvisosComponent implements OnInit {
  avisos: Aviso[] = []; 

  constructor(
    private AvisoServicioService: AvisoServicioService,
    private alertController: AlertController
  ) {
    addIcons({trashOutline});
  }

  ngOnInit() {
    this.cargarAvisos();
  }

  cargarAvisos() {
    this.AvisoServicioService.obtenerAvisos().then(avisos => {
      this.avisos = avisos;
    });
  }

  async eliminarAviso(id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Aviso',
      message: '¿Estás seguro de que deseas eliminar este aviso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.AvisoServicioService.eliminarAviso(id).then(() => {
              this.cargarAvisos(); 
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
