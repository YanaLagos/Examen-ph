export class Aviso {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    fotoUrl?: string;
  
    constructor(
      id: number,
      titulo: string,
      descripcion: string,
      fecha: string = new Date().toISOString(),
      fotoUrl?: string
    ) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fecha = fecha;
      this.fotoUrl = fotoUrl;
    }
  }
  