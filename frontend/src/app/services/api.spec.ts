import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl = 'https://smart-access-portal.onrender.com';

  constructor(
    private http: HttpClient
  ) {}

  login(data: any) {

    return this.http.post(
      `${this.baseUrl}/login`,
      data
    );

  }

  getUsers() {

    const token = localStorage.getItem('token');

    return this.http.get(
      `${this.baseUrl}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  }

}