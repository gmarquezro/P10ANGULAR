import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Necesario para la directiva ngModule del reproductor



import { AppComponent } from './app.component';
import { CancionComponent } from './cancion/cancion.component';
import { ListaCancionesComponent } from './lista-canciones/lista-canciones.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    CancionComponent,
    ListaCancionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
