import { Component, OnInit } from '@angular/core';
import { Cancion } from '../cancion';
import { CANCION } from '../mock-songs';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit {
  
    cancion = CANCION;
    selectedCancion: Cancion;

  constructor() { }

  ngOnInit() {
  }

  onSelect(cancion: Cancion): void {
    this.selectedCancion = cancion;
  }
}
