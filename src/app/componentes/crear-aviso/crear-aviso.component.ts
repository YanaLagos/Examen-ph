import { Component, EventEmitter, Output } from '@angular/core';
import { Aviso } from '../../Modelo/aviso.model';
import { AvisoServicioService } from 'src/app/servicios/aviso-servicio.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { CamaraServicioService } from 'src/app/servicios/camara/camara.service';
import { IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonInput, IonTextarea, IonButton, IonImg, 
  IonButtons, IonBackButton, IonNote, IonIcon, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.scss'],
  standalone: true, 
  imports: [CommonModule, IonHeader, IonIcon, IonNote, IonBackButton, IonButtons, FormsModule, IonImg, IonButton, IonTextarea, 
    IonInput, IonToolbar, IonTitle, IonContent, IonLabel, IonItem],
})

export class CrearAvisoComponent {
  titulo: string = '';
  descripcion: string = '';
  foto: string = ''; 
  formInvalid: boolean = false;

  @Output() avisoCreado = new EventEmitter<Aviso>(); 

  constructor(
    private avisoServicio: AvisoServicioService,
    private camaraServicio: CamaraServicioService,
    private router: Router
    ) {
    addIcons({ camera });
    }

  async tomarFoto() {
    this.foto = await this.camaraServicio.tomarFoto();
    console.log('Imagen seleccionada: ', this.foto);
  }
  async onSubmit() {
    if (this.titulo && this.descripcion && this.foto) {
      try {
        // Guardar el aviso en SQLite
        await this.avisoServicio.agregarAviso(this.titulo, this.descripcion, this.foto);
  
        // Redirigir al listado de avisos
        this.router.navigate(['/avisos']);
      } catch (error) {
        console.error('Error al agregar el aviso:', error);
      }
  
      this.limpiarFormulario();
    } else {
      this.formInvalid = true;
    }
  }

  limpiarFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.foto = '';
  }
}  
