import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({

  selector:'app-settings',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./settings.html',

  styleUrls:['./settings.css']

})

export class Settings {

  darkMode:boolean=false;

  notifications:boolean=true;

  constructor(
    private router:Router
  ){}

  goDashboard(){

    this.router.navigate(
      ['/dashboard']
    );

  }

  toggleDarkMode(){

    this.darkMode=!this.darkMode;

    document.body.classList.toggle(
      'dark-mode'
    );

  }

  saveSettings(){

    alert(
      'Settings saved successfully 😎'
    );

  }

}