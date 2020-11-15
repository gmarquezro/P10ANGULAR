import { Component, OnInit } from '@angular/core';
import { Cancion, clases_de_albums, formatos_disponibles } from '../cancion';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit {
  cancion_ejemplo: Cancion = {
    url: '../assets/songs/sharifLaffrey_Tangier.mp3',
    caratula: '../assets/img/sharifLaffrey.jpg',
    titulo: 'Tangier',
    autor: 'Sharif Laffrey',
    tipo_album: clases_de_albums[0],
    formato_album: formatos_disponibles[0],
    titulo_album: 'Tangier',
    fecha_publicacion: new Date(2020, 10, 13),
    genero: ['Techno', ' Acid', ' Detroit'],
    discografica: 'ESP Institute',
    hashtag: ['Techno', 'middleacid', 'Detroit', 'espinstitute', 'sharif', 'laffrey', 'tangier']
  };
  
  constructor() { }

  ngOnInit() {
  }

}
