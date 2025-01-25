import { Injectable } from '@angular/core';
import { Aviso } from '../Modelo/aviso.model';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AvisoServicioService {
  private avisos: Aviso[] = [];
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  plataforma: string = ""
  db!: SQLiteDBConnection;

  DB_NAME: string         = "lista_avisos";
  DB_ENCRIPTADA: boolean  = false;
  DB_MODE: string         = "no-encryption";
  DB_VERSION: number      = 1;
  DB_READ_ONLY: boolean   = false;
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS avisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      fecha TEXT NOT NULL,
      foto TEXT
    );
  `;

  constructor() {}

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
  }
  async iniciarPlugin() {    
    this.plataforma = Capacitor.getPlatform()
    if(this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)  

   /* await this.agregarAviso(
      1,
      "Se regalan gatitos", 
      "Regalo tres gatitos de tres meses. Consultar al +569XXXXXXXX.", 
      ""
    );
    await this.agregarAviso(
      2,
      "Se vende Switch con juegos", 
      "Vendo Switch con tres años de uso y dos controles. Estoy juntando plata para comprarme la Play5.", 
      ""
    );    */     
  }

  async abrirConexion() {                    
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }

  async obtenerAvisos(): Promise<Aviso[]> {
    const resultado = await this.db.query('SELECT * FROM avisos ORDER BY fecha DESC');
    return resultado?.values?.map((aviso: any) => ({
      id: aviso.id,
      titulo: aviso.titulo,
      descripcion: aviso.descripcion,
      fecha: aviso.fecha,
      foto: aviso.foto,
    })) || [];
  }

  async agregarAviso(titulo: string, descripcion: string, foto: string): Promise<void> {
    const fecha = new Date().toISOString();

    // Insertar el aviso solo si no existe un aviso con el mismo id
    await this.db.run(
      `INSERT INTO avisos (titulo, descripcion, foto, fecha)
       SELECT ?, ?, ?, ?
       WHERE NOT EXISTS (SELECT 1 FROM avisos WHERE id = ?)`,
      [titulo, descripcion, foto, fecha, titulo]
    );
  }

  async eliminarAviso(id: number): Promise<void> {
    const query = 'DELETE FROM avisos WHERE id = ?';
    await this.db.run(query, [id]);
  }
}