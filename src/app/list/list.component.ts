import { Component, OnInit } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { Cancion } from '../cancion';
import { LIST } from '../mock-songs';

@Component({
  selector: 'app-cancion',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    list = LIST;
    selectedCancion: Cancion;

  constructor() { }

  ngOnInit() {
  }

  onSelect(cancion: Cancion): void {
    this.selectedCancion = cancion;
  }
}
