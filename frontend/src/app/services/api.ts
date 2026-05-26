import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn:'root'
})

export class Api {

  baseUrl='http://localhost:3000';

  constructor(
    private http:HttpClient
  ){}

  /* GET HEADERS */

  getHeaders(){

    const token=

      localStorage.getItem('token');

    return {

      headers:new HttpHeaders({

        authorization:token || ''

      })

    };

  }

  /* LOGIN */

  login(data:any){

    return this.http.post(

      `${this.baseUrl}/login`,

      data

    );

  }

  /* GET USERS */

  getUsers(){

    return this.http.get(

      `${this.baseUrl}/users`,

      this.getHeaders()

    );

  }

  /* ADD USER */

  addUser(data:any){

    return this.http.post(

      `${this.baseUrl}/add-user`,

      data,

      this.getHeaders()

    );

  }

  /* UPDATE USER */

  updateUser(id:any,data:any){

    return this.http.put(

      `${this.baseUrl}/update-user/${id}`,

      data,

      this.getHeaders()

    );

  }

  /* DELETE USER */

  deleteUser(id:any){

    return this.http.delete(

      `${this.baseUrl}/delete-user/${id}`,

      this.getHeaders()

    );

  }

}