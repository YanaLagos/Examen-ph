export class Aviso {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    foto?: string;
  
    constructor(
      id: number,
      titulo: string,
      descripcion: string,
      fecha: string = new Date().toISOString(),
      foto?: string
    ) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fecha = fecha;
      this.foto = foto;
    }
  }
  