import { Component, OnInit } from '@angular/core';
import { AvisoServicioService } from 'src/app/servicios/aviso-servicio.service';
import { Aviso } from '../../Modelo/aviso.model';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons'
import { IonList, IonLabel, IonItem, IonButton, IonTitle, IonBackButton, IonToolbar, IonButtons, 
  IonContent, IonHeader, IonIcon, IonImg, IonModal, IonFooter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [IonFooter, IonModal, IonImg, IonIcon, IonHeader, IonContent, IonButtons, IonToolbar, IonBackButton, 
    IonTitle, CommonModule, IonList, IonLabel, IonItem, IonButton]
})
export class AvisosComponent implements OnInit {

  avisos: Aviso[] = []; 
  modalAbierto: boolean = false;
  avisoAEliminar: Aviso | null = null; 

  constructor(
    private AvisoServicioService: AvisoServicioService,
    private alertController: AlertController
  ) {
    addIcons({trashOutline});
  }

  async ngOnInit() {
    await this.AvisoServicioService.iniciarPlugin()
    await this.cargarAvisos();
  }

  async cargarAvisos() {
    await this.AvisoServicioService.obtenerAvisos().then(avisos => {
      this.avisos = avisos;
    });
  }

  async eliminarAviso(id: number) {
    this.avisoAEliminar = this.avisos.find(aviso => aviso.id === id) || null;
    this.modalAbierto = true;
  }

  async cancelar() {
    this.modalAbierto = false;  // Cierra el modal luego de cancelar
  }

  async confirmar() {
    if (this.avisoAEliminar) {
      await this.AvisoServicioService.eliminarAviso(this.avisoAEliminar.id);
      this.cargarAvisos();
    }
    // Cierra el modal luego de confirmar
    this.modalAbierto = false;
    this.avisoAEliminar = null; 
  }
}
