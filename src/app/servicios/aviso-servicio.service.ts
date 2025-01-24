import { Injectable } from '@angular/core';
import { Aviso } from '../Modelo/aviso.model';

@Injectable({
  providedIn: 'root',
})
export class AvisoServicioService {
  private avisos: Aviso[] = [];

  constructor() {
    //Avisos de ejemplo
        this.avisos.push({
          id: 1,
          titulo: 'Se regalan gatitos',
          descripcion: 'Regalo tres gatitos de tres meses. Consultar al +569XXXXXXXX.',
          foto: 'https://via.placeholder.com/150', // URL de ejemplo para la foto
          fecha: new Date().toISOString(),
        });
    
        this.avisos.push({
          id: 2,
          titulo: 'Se vende Switch con juegos',
          descripcion: 'Vendo Switch con tres años de uso y dos controles. Estoy juntando plata para comprarme la Play5.',
          foto: 'https://via.placeholder.com/150', // URL de ejemplo para la foto
          fecha: new Date().toISOString(),
        });
  }

  obtenerAvisos(): Promise<Aviso[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.avisos);
      }, 1000);
    });
  }

  agregarAviso(titulo: string, descripcion: string, foto?: string): Promise<void> {
    const nuevoAviso: Aviso = {
      id: this.avisos.length + 1,
      titulo,
      descripcion,
      foto,
      fecha: new Date().toISOString(), 
    };
    this.avisos.push(nuevoAviso);
    return Promise.resolve();
  }

  eliminarAviso(id: number): Promise<void> {
    this.avisos = this.avisos.filter(aviso => aviso.id !== id);
    return Promise.resolve();
  }
}
