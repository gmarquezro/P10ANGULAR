# MusicPlayerApp

MusicPlayerApp is a music player with firebase integration.
All information about the songs is stored in a public database.

The player has a number of basic features in any player:
Song selection, 
Flow control, 
A user can drag and drop in the desired minute, 
Playback/restoration time display, 
Playback control, 
Play, 
Pause, 
Stop, 
Repeat, 
Random, 
Search engine, 
Detail with the track information (Author, Cover, Album), 
Volume control(mute)


## Autores ✒️
* **Gerard Marquez** - *Developer* - [graumanix](https://github.com/graumanix)
* **Oriol Gonzalo** - *Developer* - [ogonzaloUoc](https://github.com/ogonzaloUoc)
* **Manuel Mendizábal** - *Developer* - [ManuelMendizabal](https://github.com/ManuelMendizabal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 

## Initial screen
At first we found only a search engine and a list of available songs.
 
## Track selection
When you select a track, the player starts playing it
Shows the detail of the track
Updates the controls by displaying the stop button
It updates every second the current and remaining playback time as well as the slider's playback percentage.

## Playback list and filtering
In this list we will find all the available songs which we will be able to filter from the input "Search".

## Track selection
When the track is selected it will be marked in gray

## Track detail
The system will show us on the right side the detail of the selected song:
Title, 
Cover, 
Author, 
Album, 
Release date, 
Gender

In the lower right side of the player we will also find the cover, title and author of the track.

## Playback control
In the lower left part of the screen we will find the reproduction bar where we will be able to carry out the following actions:
Song back, 
Stop, 
Play/Pause, 
Song forward, 
Random Play, 
Repeat, 
Current Playback Time, 
Remaining Playback Time, 
Playback percentage bar where we can move to the desired time of the track by dragging and dropping, 
Mute


## Development server

Run `npm install` 

Run `npm install moment` or `npm add moment` as well, as it seems moment is not included by running `npm install`. Running this command should resolve the potential issue that arises when trying to import the moment.js library.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
