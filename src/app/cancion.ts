export const clases_de_albums: string[] = ['EP', 'LP'];

export interface Cancion {
  url: any;
  caratula: any;
  titulo: string;
  autor: string;
  titulo_album: string;
  tipo_album: string;
  discografica: string;
  fecha_publicacion: Date;
  genero: string;
  estilo: string[];
  descripcion: string;
  hashtag: string[];
}
