import { Component, OnInit, HostBinding } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { BehaviorSubject } from 'rxjs' // Usaremos rxjs@6.x para 
import { CANCIONES } from '../mock-canciones';
import { Cancion } from '../cancion';
import * as moment from 'moment';
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

/* Variables reproductor */
  audio: HTMLAudioElement;
  isMuted: Boolean;
  isPlaying: Boolean;
  shuffle: Boolean;
  repeat: Boolean;
  repeat_one: Boolean;
  current_song_index: number;
  repeat_state: number;
  playerStatus: BehaviorSubject<string> = new BehaviorSubject('paused');
  currentTime: BehaviorSubject<string> = new BehaviorSubject('00:00');
  durationTime: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  currentPercent: BehaviorSubject<number> = new BehaviorSubject(0);
  durationTimeLeft: BehaviorSubject<string> = new BehaviorSubject('00:00');

/* Fin variables reproductor */

  @HostBinding('@pageAnimations')
  public animatePage = true;

  _canciones = [];
  totalCanciones = -1;

  get canciones() {
    return this._canciones;
  }

  constructor() {

  /* Asignamos valores iniciales a las variables de reproductor */

    this.isMuted = false;
    this.isPlaying = false;
    this.shuffle = false;
    this.repeat = false;
    this.repeat_one = false;
    this.repeat_state = 0;
    this.audio = new Audio();
 
  }

  ngOnInit() {
    moment.updateLocale(moment.locale(), { invalidDate: "" }) // Actualizamos el mensaje que muestra moment.js al obtener una fecha inválida
    this._canciones = CANCIONES;
    this.registerAudioEvents();
  }

  private registerAudioEvents(): void {
    this.audio.addEventListener('timeupdate', this.updateTime, false);
    this.audio.addEventListener('playing', this.setStatus, false);
    this.audio.addEventListener('pause', this.setStatus, false);
    this.audio.addEventListener('waiting', this.setStatus, false);
    this.audio.addEventListener('ended', this.setStatus, false);
}

private updateTime = (evt) => {
  this.setTime(this.audio.currentTime);
}

private setTime(currentTime){
  let durationTime = this.audio.duration;
  let current = moment.duration(currentTime, 'seconds');
  let percent = currentTime / durationTime * 100;
  let timeLeft = durationTime - currentTime; // Calculamos el tiempo restante de reproducción, como número
  let left = moment.duration(timeLeft, 'seconds'); // Pasamos el tiempo restante de reproducción a segundos
  let duration = moment.duration(durationTime, 'seconds');

  this.durationTimeLeft.next(moment.utc(left.asMilliseconds()).format('mm:ss')); // Asignamos el próximo valor de tiempo restante de reproducción

  this.currentTime.next(moment.utc(current.asMilliseconds()).format('mm:ss')); //00:00

  this.currentPercent.next(percent);//50


}

setStatus = (event) => {
  switch (event.type) {
      case 'playing':
          this.playerStatus.next('playing');
          let duration =  moment.duration(this.audio.duration, 'seconds'); 
          this.durationTime.next(moment.utc(duration.asMilliseconds()).format('mm:ss'));
          break;
      case 'pause':
          this.playerStatus.next('paused');
          break;
      case 'waiting':
          this.playerStatus.next('loading');
          break;
      case 'ended':
          this.changeSong();
          this.playerStatus.next('ended');
          break;
      default:
          this.playerStatus.next('paused');
          break;
  }
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

  /* onSelect
   *  Se ejecuta al seleccionar una canción de la lista de canciones */
  onSelect(cancion: Cancion): void {
    this.selectedCancion = cancion; // Definimos la variable selectedCancion para que guarde la canción seleccionada
    this.current_song_index = CANCIONES.indexOf(this.selectedCancion); // Guardamos la posición de la canción actual en el array CANCIONES
    this.audio.src = this.selectedCancion.url;
    this.audio.play();
  }

  /* close
   *  Deberá cerrar la lista */
  close(): void {
    if (this.isOpen)
      this.isOpen = false;
  }

/* Funciones de reproductor */

  /* randomIntFromInterval
   *  Genera un numero entero en el rango indicado
   *  La utilizamos para la reproducción aleatoria */
    
  randomIntFromInterval(min: number, max: number) { // minimo y maximo incluidos en el rango
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /* playPause
   *  Reproducirá la canción si esta está pausada
   *  pausará la canción si esta se está reproduciendo */
  public playPause() {
    if (this.audio.paused) {
      this.audio.play();
    } // Si NO se está reproduciendo la canción, la iniciamos
    else {
      this.audio.pause();
    } // Si se estaba reproduciendo la canción, la paramos
  }

  /* stop
   *  Pausa la reproducción de la canción y
   *  y asigna el tiempo de reproducción a 0 */
  public stop() {
    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0.0;
    } // Si se está reproduciendo la canción, la paramos 
  }

  /* toggleMute
   *  Si la canción está en silencio, activa el sonido
   *  si la canción tiene el sonido activado, lo desactiva */
  toggleMute() {
      this.audio.muted = !this.audio.muted;
  } // Si el sonido está desactivado, entonces lo activamos (unmute), sino lo desactivamos 

  updateRepeatState() {
    this.repeat_state += 1;

    if (this.repeat_state > 2) this.repeat_state = 0; // hay tres estados de repetición definidos (0, 1 y 2), por lo tanto el estado de repetición no puede exceder 2

    switch (this.repeat_state) {
      case 0: // No se ha indicado repetición
        this.repeat_one = false;
        break;
      case 1: // Se reproducen las canciones de la lista de canciones en bucle
        this.repeat = true;
        break;
      case 2: // Se repite la reproducción de la misma canción en bucle
        this.repeat = false;
        this.repeat_one = true;
        break;
    }
  }

  /* changeSong:
 *  Modo aleatorio desactivado:
 *    - Adelantamos o retrocedemos una canción en función del valor del parámetro
 *     que recibe la función. 1 corresponde a siguiente y -1 a anterior.
 *  Modo aleatorio activado:
 *    - Se selecciona una canción aleatoria de entre las canciones disponibles: array CANCIONES
 *  - Ya esté o no activado el modo aleatorio, se mantiene el estado de reproducción al pasar de canción:
 *     - si la anterior cancion se estaba reproduciendo, la nueva canción también se reproducirá y viceversa */
  public changeSong(n: number = 0) {

    let randomInt: number;

    if (!this.audio.paused) {
      this.audio.pause(); // Si se está reproduciendo la canción actual, la paramos
      this.isPlaying = true; // Guardamos el estado de reproducción de la canción anterior
    } else {
      this.isPlaying = false;
    }

    if (!this.shuffle) {
      if (!this.repeat) {
        if ((this.current_song_index > 0 && n === -1) || (this.current_song_index < (CANCIONES.length - 1) && n === 1)) {
          this.current_song_index += n;
        } // Si la canción actual, antes de ejecutar la función, no es ni la primera ni la última, pasamos de canción
      } else {
        if (this.current_song_index === 0 && n === -1) {
          this.current_song_index = CANCIONES.length - 1;
        } else if (this.current_song_index === (CANCIONES.length - 1) && n === 1) {
          this.current_song_index = 0;
        } else {
          this.current_song_index += n;
        }
      } // Evaluamos si el modo repetición (repeat) está activado
    } else {
      randomInt = this.randomIntFromInterval(0, (CANCIONES.length - 1)); // Generamos un nº aleatorio en el intervalo del array canciones
      while (randomInt === this.current_song_index) {
        randomInt = this.randomIntFromInterval(0, (CANCIONES.length - 1));
      } // Evitamos que en modo shuffle la nueva canción sea la misma que la anterior
      this.current_song_index = randomInt;
    } // Evluamos si el modo aleatorio (shuffle) está activado

    this.selectedCancion = CANCIONES[this.current_song_index];
    this.audio.src = this.selectedCancion.url;
    this.audio.play();
  }

  /* isFirstPlaying
   *  Sirve para desactivar el botón "skip_previous" en caso de que no se haya seleccionado ninguna opción de repetición de canciones
   */
  isFirstPlaying() {
    if (((this.repeat_state === 0) && (!this.shuffle)) && (this.current_song_index === 0)) {
      return true;
    } // Si no se ha seleccionado ninguna opción de repetición y el índice de la canción que se está reproduciendo es 0, entonces se desactivará el botón "skip_previous"
    else {
      return false;
    } // Si alguna opción de repetición está activada, el botón no se deshabilitará en ningún caso
  }

/* isLastPlaying
 *  Sirve para desactivar el botón "skip_next" en caso de que no se haya seleccionado ninguna opción de repetición de canciones
 */
  isLastPlaying() {
    if (((this.repeat_state === 0) && (!this.shuffle)) && (this.current_song_index === (this.canciones.length - 1))) {
      return true;
    } // Si no se ha seleccionado ninguna opción de repetición y el índice de la canción que se está reproduciendo es 0, entonces se desactivará el botón "skip_next"
    else {
      return false;
    }  // Si alguna opción de repetición está activada, el botón no se deshabilitará en ningún caso
  }

  updateSliderValue(event: MatSliderChange) {
    let percentage = event.value;
    let newCurrentTime = percentage * this.audio.duration/100;
    this.audio.currentTime = newCurrentTime;
  }

}

