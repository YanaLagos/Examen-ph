import { Injectable } from '@angular/core';
import { Aviso } from '../Modelo/aviso.model';

@Injectable({
  providedIn: 'root',
})
export class AvisoServicioService {
  private avisos: Aviso[] = [];

  constructor() {}

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
