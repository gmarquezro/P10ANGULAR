export const clases_de_albums: string[] = ['EP', 'LP'];
export const formatos_disponibles: string[] = ['Vinyl', 'Cd', 'Cassette'];

export interface Cancion {
  titulo: string;
  autor: string;
  fecha_publicacion: Date;
  tipo_album: string;
  formato_album: string;
  titulo_album: string;
  genero: string[];
  discografica: string;
  hashtag: string[];
  url: any;
  caratula: any;
}
