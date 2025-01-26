// camara.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html', 
  styleUrls: ['./camara.component.scss'],
  standalone: true,
  imports: [IonButton]
})


export class CamaraComponent {
  @Output() photoCaptured = new EventEmitter<string>(); 

  constructor() {}

  // Función para tomar la foto
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,  // Guarda la imagen en formato Base64
      });

      // Emitir la foto capturada al componente padre
      this.photoCaptured.emit(image.base64String || '');
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
