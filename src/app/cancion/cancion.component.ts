import { Component, OnInit } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { Cancion } from '../cancion';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit {
  cancion: Cancion = {
    titulo: 'Jailhouse Rock',
    autor: 'Elvis Presley',
    year: '1957',
    disco: 'single',
    estilo: 'Rock'
  };
  

  constructor() { }

  ngOnInit(): void {
  }

}
