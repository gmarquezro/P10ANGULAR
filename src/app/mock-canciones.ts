import { Cancion, clases_de_albums } from './cancion';

export const CANCIONES: Cancion[] = [
  {
    url: '../assets/songs/sharifLaffrey_Tangier.mp3',
    caratula: '../assets/img/sharifLaffrey.jpg',
    titulo: 'Tangier',
    autor: 'Sharif Laffrey',
    titulo_album: 'Tangier',
    tipo_album: clases_de_albums[0],
    discografica: 'ESP Institute',
    fecha_publicacion: new Date(2020, 10, 13),
    genero: 'Electronic',
    estilo: ['Acid', ' Detroit'],
    descripcion: 'Rumbling bassline blasting out of a meaty soundsystem.',
    hashtag: ['Techno', 'middleacid', 'Detroit', 'espinstitute', 'sharif', 'laffrey', 'tangier']
  },
  {
    url: '../assets/songs/routeE.mp3',
    caratula: '../assets/img/routeE.jpg',
    titulo: 'Route E',
    autor: 'Jensen Interceptor',
    titulo_album: 'Delayed Response',
    tipo_album: clases_de_albums[0],
    discografica: 'Power Station',
    fecha_publicacion: new Date(2018, 7, 18),
    genero: 'Electronic',
    estilo: ['EBM', ' Industrial', ' New Wave', ' Electro'],
    descripcion: 'Some serious low slung BPM machine funk.',
    hashtag: ['Industrial', 'jenseninterceptor', 'ebm', 'industrial', 'newwave', 'powerstation']
  },
  {
    url: '../assets/songs/Davardage.mp3',
    caratula: '../assets/img/davardage.jpg',
    titulo: 'Davardage',
    autor: 'Maahrt',
    titulo_album: 'Various Artists #2',
    tipo_album: clases_de_albums[0],
    discografica: 'Kump',
    fecha_publicacion: new Date(2019, 2, 15),
    genero: 'Electronic',
    estilo: ['Ambient', ' Downtempo', ' Slow-industrial', ' Tribal'],
    descripcion: 'Slow industrial and tribal sounds. ',
    hashtag: ['kump', 'maahrt', 'downtempo', 'industrial']
  },
  {
    url: '../assets/songs/kleineReise.mp3',
    caratula: '../assets/img/franzScala.jpg',
    titulo: 'Kleine Reise',
    autor: 'Franz Scala',
    titulo_album: 'Mechatronica White 2',
    tipo_album: clases_de_albums[0],
    discografica: 'Mechatronica',
    fecha_publicacion: new Date(2018, 10, 2),
    genero: 'Electronic',
    estilo: ['Electro', ' Acid', ' Italo-Disco', ' Synth-pop', ' New Beat'],
    descripcion: 'spacey anthem for the floor.',
    hashtag: ['franz', 'scala', 'franzscala', 'mechatronica', 'synth-pop', 'Italo', 'newbeat']
  },
  {
    url: '../assets/songs/phoneSex.mp3',
    caratula: '../assets/img/phoneSex.jpg',
    titulo: 'P.H.O.N.E Sex',
    autor: 'ADSX feat.Hanoben',
    titulo_album: 'P.H.O.N.E Sex',
    tipo_album: clases_de_albums[0],
    discografica: 'Discos Capablanca',
    fecha_publicacion: new Date(2018, 6, 19),
    genero: 'Electronic',
    estilo: ['acid-house', ' Acid', ' Electro'],
    descripcion: 'Dense and trippy freakout.',
    hashtag: ['adsx', 'hanoben', 'acid', 'acid-house']
  }
];
