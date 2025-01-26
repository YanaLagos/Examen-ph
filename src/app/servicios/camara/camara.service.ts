import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CamaraServicioService {

  constructor() {}

  async tomarFoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });

      return image.base64String || '';
    } catch (error) {
      console.error('Error al capturar la foto', error);
      return ''; 
    }
  }
}
