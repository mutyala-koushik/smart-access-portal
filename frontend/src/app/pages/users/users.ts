import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { Api } from '../../services/api';

@Component({

  selector:'app-users',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./users.html',

  styleUrls:['./users.css']

})

export class Users
implements OnInit {

  /* MODAL */

  showDeleteModal:boolean=false;

  deleteUserId:any=null;

  users:any[]=[];

  filteredUsers:any[]=[];

  searchText:string='';

  username:string='';

  selectedRole:string='General User';

  currentRole:string='';

  totalUsers:number=0;

  adminUsers:number=0;

  generalUsers:number=0;

  loading:boolean=true;

  /* SUCCESS MESSAGE */

  message:string='';

  /* BUTTON STATES */

  addingUser:boolean=false;

  deleting:boolean=false;

  /* EDIT MODE */

  editMode:boolean=false;

  editUserId:any=null;

  constructor(

    private router:Router,

    private api:Api,

    private cdr:ChangeDetectorRef

  ){}

  ngOnInit(){

    /* GET ROLE */

    this.currentRole=

      localStorage.getItem('role') || '';

    /* LOAD USERS */

    this.loadUsers();

  }

  /* LOAD USERS */

  loadUsers(){

    this.loading=true;

    this.api.getUsers().subscribe({

      next:(res:any)=>{

        this.users=[...res];

        this.filteredUsers=[...res];

        this.updateCounts();

        this.loading=false;

        this.cdr.detectChanges();

      },

      error:(err:any)=>{

        this.loading=false;

      }

    });

  }

  /* SEARCH USERS */

  searchUsers(){

    this.filteredUsers=

      this.users.filter(user =>

        user.name
        .toLowerCase()
        .includes(
          this.searchText.toLowerCase()
        )

      );

  }

  /* ADD / UPDATE USER */

  addUser(){

    if(this.currentRole!=='Admin'){

      return;

    }

    if(this.addingUser){

      return;

    }

    if(!this.username.trim()){

      return;

    }

    this.addingUser=true;

    const userData={

      name:this.username,

      role:this.selectedRole

    };

    /* UPDATE */

    if(this.editMode){

      this.api.updateUser(

        this.editUserId,

        userData

      ).subscribe({

        next:(res:any)=>{

          this.message=
          'User Updated Successfully';

          setTimeout(()=>{

            this.message='';

          },2000);

          this.resetForm();

          this.loadUsers();

          this.addingUser=false;

        },

        error:(err:any)=>{

          this.addingUser=false;

        }

      });

    }

    /* ADD */

    else{

      this.api.addUser(userData).subscribe({

        next:(res:any)=>{

          this.message=
          'User Added Successfully';

          setTimeout(()=>{

            this.message='';

          },2000);

          this.resetForm();

          this.loadUsers();

          this.addingUser=false;

        },

        error:(err:any)=>{

          this.addingUser=false;

        }

      });

    }

  }

  /* EDIT USER */

  editUser(user:any){

    this.editMode=true;

    this.editUserId=user._id;

    this.username=user.name;

    this.selectedRole=user.role;

  }

  /* OPEN MODAL */

  openDeleteModal(id:any){

    this.showDeleteModal=true;

    this.deleteUserId=id;

  }

  /* CLOSE MODAL */

  closeDeleteModal(){

    this.showDeleteModal=false;

    this.deleteUserId=null;

  }

  /* CONFIRM DELETE */

  confirmDelete(){

    if(this.currentRole!=='Admin'){

      return;

    }

    if(this.deleting){

      return;

    }

    this.deleting=true;

    this.api.deleteUser(

      this.deleteUserId

    ).subscribe({

      next:(res:any)=>{

        this.message=
        'User Deleted Successfully';

        setTimeout(()=>{

          this.message='';

        },2000);

        this.loadUsers();

        this.deleting=false;

        this.closeDeleteModal();

      },

      error:(err:any)=>{

        this.deleting=false;

        this.closeDeleteModal();

      }

    });

  }

  /* UPDATE COUNTS */

  updateCounts(){

    this.totalUsers=

      this.users.length;

    this.adminUsers=

      this.users.filter(

        user=>user.role==='Admin'

      ).length;

    this.generalUsers=

      this.users.filter(

        user=>user.role==='General User'

      ).length;

  }

  /* RESET FORM */

  resetForm(){

    this.username='';

    this.selectedRole='General User';

    this.editMode=false;

    this.editUserId=null;

  }

  /* DASHBOARD */

  goDashboard(){

    this.router.navigateByUrl(
      '/dashboard'
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

    this.router.navigateByUrl(
      '/login'
    );

  }

}