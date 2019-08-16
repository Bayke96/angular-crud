import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private getAllUsersURL = "https://jsonplaceholder.typicode.com/users";
  private getAllPostsURL = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.getAllUsersURL);
  }

  getPosts() {
    return this.http.get(this.getAllPostsURL);
  }

}
