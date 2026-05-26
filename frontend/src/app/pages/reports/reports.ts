import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({

  selector:'app-reports',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./reports.html',

  styleUrls:['./reports.css']

})

export class Reports {

  constructor(
    private router:Router
  ){}

  reports=[

    {
      name:'Monthly User Report',
      type:'Users',
      status:'Generated'
    },

    {
      name:'Admin Activity Report',
      type:'Admin',
      status:'Generated'
    },

    {
      name:'Security Access Report',
      type:'Security',
      status:'Pending'
    }

  ];

  goDashboard(){

    this.router.navigate(
      ['/dashboard']
    );

  }

  downloadAll(){

    alert(
      'All reports downloaded successfully 😎'
    );

  }

  viewReport(report:any){

    alert(
      'Opening ' + report.name
    );

  }

}