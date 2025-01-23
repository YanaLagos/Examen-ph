import { Component, EventEmitter, Output } from '@angular/core';
import { Aviso } from '../Modelo/aviso.model';
import { FormsModule } from '@angular/forms'; 
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonInput, IonTextarea, IonButton, IonImg } from "@ionic/angular/standalone";

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.scss'],
  standalone: true, 
  imports: [FormsModule, IonImg, IonButton, IonTextarea, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem],
})
export class CrearAvisoComponent {
  titulo: string = '';
  descripcion: string = '';
  foto: string = ''; 

  @Output() avisoCreado = new EventEmitter();  

  constructor() {}

  onSubmit() {
    if (this.titulo && this.descripcion) {
      const nuevoAviso: Aviso = {
        id: 0, // El id se asignará dinámicamente
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: new Date().toISOString() // Fecha actual
      };

      this.avisoCreado.emit();
      this.titulo = '';
      this.descripcion = '';
      this.foto = '';
    }
  }
}
