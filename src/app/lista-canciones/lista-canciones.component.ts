import { Component, OnInit, HostBinding } from '@angular/core';
import { CANCIONES } from '../mock-canciones';
import { Cancion } from '../cancion';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
  // ... 
} from '@angular/animations';


@Component({
  selector: 'app-lista-canciones',
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('li, form', [
          style({ opacity: 0, transform: 'translateX(-100%)' }),
          stagger(-30, [
            animate('3s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
    trigger('close', [
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

  selectedCancion: Cancion;
  isOpen = true;

  @HostBinding('@pageAnimations')
  public animatePage = true;

  _canciones = [];
  totalCanciones = -1;

  get canciones() {
    return this._canciones;
  }

  constructor() { }

  ngOnInit() {
    this._canciones = CANCIONES;
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';

    this._canciones = CANCIONES.filter(cancion => cancion.titulo.toLowerCase().includes(criteria.toLowerCase()) // Filto por titulo
      || cancion.autor.toLowerCase().includes(criteria.toLowerCase()) // Filtro por autor
      || cancion.titulo_album.toLowerCase().includes(criteria.toLowerCase()) // Filtro por titulo_album
      || cancion.fecha_publicacion.getFullYear().toString().includes(criteria)); // Filtro por año en fecha_publicacion

    const newTotal = this.canciones.length;

    if (this.totalCanciones !== newTotal) {
      this.totalCanciones = newTotal;
    } else if (!criteria) {
      this.totalCanciones = -1;
    }
  }

  onSelect(cancion: Cancion): void {
    this.selectedCancion = cancion;
  }

  close(): void {
    if (this.isOpen)
      this.isOpen = false;
  }
}

