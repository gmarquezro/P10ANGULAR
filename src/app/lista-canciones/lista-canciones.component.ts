import { Component, OnInit } from '@angular/core';
import { CANCIONES } from '../mock-canciones';
import { Cancion } from '../cancion';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
  // ... 
} from '@angular/animations'; 


@Component({
  selector: 'app-lista-canciones',
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      transition(':enter', [style({
        width: '0%',
        transform: 'translateX(50px)',
        opacity: 0,
      }),
      group([
        animate('1.5s .2s ease', style({
          transform: 'translateX(0)',
        })),
        animate('3s ease', style({
          opacity: 1,
          width: '100%',
        }))
      ])
    ]),
      transition(':leave', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ]),
    trigger('openClose', [
      state('closed', style({
        width: '65%',
      })),
      transition('* => closed', [
        animate('2.5s ease')
      ]),
    ])
  ],
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})
export class ListaCancionesComponent implements OnInit {

  canciones = CANCIONES;
  selectedCancion: Cancion;
  isOpen = true;

  constructor() { }

  ngOnInit() {
  }

  onSelect(cancion: Cancion): void {
    this.selectedCancion = cancion;
  }
  close(): void {
    if(this.isOpen)
      this.isOpen = false;
  }
}
