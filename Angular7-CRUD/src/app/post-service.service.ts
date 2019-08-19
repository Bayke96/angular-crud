import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private usersURL = "https://jsonplaceholder.typicode.com/users";
  private postsURL = "https://jsonplaceholder.typicode.com/posts";
  private loadedPostData = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.usersURL);
  }

  getPosts() {
    return this.http.get(this.postsURL);
  }

  loadPost(postID) {
    return this.http.get("https://jsonplaceholder.typicode.com/posts/" + postID);
  }

  loadUser(userID) {
    return this.http.get("https://jsonplaceholder.typicode.com/users/" + userID);
  }

  createPost(data) {
    return this.http.post(this.postsURL,
      {
        user: data.user,
        title: data.title,
        body: data.body
      }
    );
  }

}
