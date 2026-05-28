import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Api } from '../../services/api';

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({

  selector:'app-dashboard',

  standalone:true,

  imports:[
    CommonModule,
    RouterLink
  ],

  templateUrl:'./dashboard.html',

  styleUrls:['./dashboard.css']

})

export class Dashboard
implements OnInit,AfterViewInit {

  users:any[]=[];

  successMessage:string='';

  currentTime:string='';

  currentDate:string='';

  totalUsers:number=0;

  adminUsers:number=0;

  generalUsers:number=0;

  adminPercentage:number=0;

  darkMode:boolean=false;

  loading:boolean=true;

  constructor(

    private router:Router,

    private api:Api,

    private cdr:ChangeDetectorRef

  ){}

  ngOnInit(){

    this.loadUsers();

    this.startClock();

    const loginSuccess=

      localStorage.getItem(
        'loginSuccess'
      );

    if(loginSuccess){

      this.successMessage=
        'Login Successful';

      setTimeout(()=>{

        this.successMessage='';

      },2500);

      localStorage.removeItem(
        'loginSuccess'
      );

    }

  }

  ngAfterViewInit(){

    setTimeout(()=>{

      this.loadChart();

    },200);

  }

  /* LOAD USERS */

  loadUsers(){

    this.loading = true;

    this.api.getUsers().subscribe({

      next:(res:any)=>{

        console.log("API RESPONSE:",res);

        /* FIXED RESPONSE */

        this.users = res.users || [];

        this.totalUsers = res.totalUsers || 0;

        this.adminUsers = res.admins || 0;

        this.generalUsers = res.generalUsers || 0;

        /* SAFE PERCENTAGE */

        if(this.totalUsers > 0){

          this.adminPercentage = Math.round(

            (this.adminUsers / this.totalUsers) * 100

          );

        }else{

          this.adminPercentage = 0;

        }

        this.loading = false;

        this.cdr.detectChanges();

        setTimeout(()=>{

          this.loadChart();

        },200);

      },

      error:(err:any)=>{

        console.log("USERS ERROR:",err);

        this.loading = false;

      }

    });

  }

  /* CLOCK */

  startClock(){

    setInterval(()=>{

      const now=new Date();

      this.currentTime=

        now.toLocaleTimeString(
          [],
          {
            hour:'2-digit',
            minute:'2-digit'
          }
        );

      this.currentDate=

        now.toLocaleDateString(
          [],
          {
            weekday:'long',
            month:'short',
            day:'numeric'
          }
        );

    },1000);

  }

  /* CHART */

  loadChart(){

    const canvas:any=
      document.getElementById(
        'myChart'
      );

    if(!canvas){

      return;
    }

    const existingChart=
      Chart.getChart(canvas);

    if(existingChart){

      existingChart.destroy();
    }

    new Chart(canvas,{

      type:'doughnut',

      data:{

        labels:[
          'Admins',
          'General Users'
        ],

        datasets:[{

          data:[
            this.adminUsers,
            this.generalUsers
          ],

          backgroundColor:[
            '#10b981',
            '#8b5cf6'
          ],

          borderWidth:0

        }]
      },

      options:{

        responsive:true,

        maintainAspectRatio:false,

        cutout:'60%',

        plugins:{

          legend:{

            display:true,

            position:'top'

          }

        }

      }

    });

  }

  /* DARK MODE */

  toggleDarkMode(){

    this.darkMode=!this.darkMode;

    document.body.classList.toggle(
      'dark-mode'
    );

  }

  /* LOGOUT */

  logout(){

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}
