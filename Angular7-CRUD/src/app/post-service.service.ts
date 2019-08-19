import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private getAllUsersURL = "https://jsonplaceholder.typicode.com/users";
  private getAllPostsURL = "https://jsonplaceholder.typicode.com/posts";
  private loadedPostData = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.getAllUsersURL);
  }

  getPosts() {
    return this.http.get(this.getAllPostsURL);
  }

  loadPost(postID) {
    return this.http.get("https://jsonplaceholder.typicode.com/posts/" + postID);
  }

  loadUser(userID) {
    return this.http.get("https://jsonplaceholder.typicode.com/users/" + userID);
  }

}
