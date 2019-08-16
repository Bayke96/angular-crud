import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private usersData = [];
  private getAllUsersURL = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.getAllUsersURL);
  }
}
