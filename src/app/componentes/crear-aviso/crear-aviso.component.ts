import { Component, EventEmitter, Output } from '@angular/core';
import { Aviso } from '../../Modelo/aviso.model';
import { FormsModule } from '@angular/forms'; 
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera'
import { IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonInput, IonTextarea, IonButton, IonImg, 
  IonButtons, IonBackButton, IonNote, IonIcon, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.scss'],
  standalone: true, 
  imports: [IonHeader, IonIcon, IonNote, IonBackButton, IonButtons, FormsModule, IonImg, IonButton, IonTextarea, 
    IonInput, IonToolbar, IonTitle, IonContent, IonLabel, IonItem],
})
export class CrearAvisoComponent {
  titulo: string = '';
  descripcion: string = '';
  foto: string = ''; 

  @Output() avisoCreado = new EventEmitter();  

  constructor() {
    addIcons({camera});
  }

	async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    })
 
    this.foto = image.base64String || '';
    console.log('Imagen seleccionada: ', this.foto);
  }

  onSubmit() {
    if (this.titulo && this.descripcion) {
      const nuevoAviso: Aviso = {
        id: 0, // Asignación dinámica de ID
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: new Date().toISOString(), // Fecha actual
        foto: this.foto
      };

      this.avisoCreado.emit(nuevoAviso);
      this.titulo = '';
      this.descripcion = '';
      this.foto = '';
    }
  }
}
