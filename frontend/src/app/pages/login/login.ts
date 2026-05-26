import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { Api } from '../../services/api';

@Component({

  selector:'app-login',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./login.html',

  styleUrls:['./login.css']

})

export class Login {

  username:string='';

  password:string='';

  role:string='Admin';

  errorMessage:string='';

  loading:boolean=false;

  constructor(

    private api:Api,

    private router:Router

  ){}

  onLogin(){

    this.loading=true;

    this.errorMessage='';

    const data={

      username:this.username,

      password:this.password,

      role:this.role

    };

    this.api.login(data).subscribe({

      next:(res:any)=>{

        this.loading=false;

        /* STORE ROLE */

        localStorage.setItem(

          'role',

          res.user.role

        );

        

        localStorage.setItem(

          'token',

          res.token

        );

        

        localStorage.setItem(

          'loginSuccess',

          'true'

        );

        

        if(res.user.role==='Admin'){

          this.router.navigate([
            '/dashboard'
          ]);

        }

        

        else{

          this.router.navigate([
            '/users'
          ]);

        }

      },

      error:(err:any)=>{

        this.loading=false;

        this.errorMessage='Invalid credentials';

      }

    });

  }

}