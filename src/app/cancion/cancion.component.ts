import { Component, OnInit, Input } from '@angular/core';
import { Cancion } from '../cancion';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes
  // ... 
} from '@angular/animations'; 

@Component({
  selector: 'app-cancion',
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateY(0)',
      })),
      transition(':enter', [
        style({
          transform: 'translateY(100%)',
          opacity: .1
        }),
        animate('3s ease')
      ]),
      transition(':leave', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease')
      ]),
    ]),
  ],
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css'],
})

export class CancionComponent implements OnInit {
  audioObj = new Audio();

  @Input() cancion: Cancion;
  
  constructor() {
   }

  ngOnInit() {
  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  setVolume(ev){
    this.audioObj.volume = ev.target.value;
  }

  play() {
    if (globalThis.play == false)
      this.audioObj.play();
    else
      this.audioObj.src = this.cancion.url;
      this.audioObj.load();
      this.audioObj.play();   
  }

  pause() {
    this.audioObj.pause();
    globalThis.play = false;
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime=0;
  }

  

}
