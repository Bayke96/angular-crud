import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private usersURL = "https://jsonplaceholder.typicode.com/users";
  private postsURL = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  // Get all users.
  getUsers() {
    return this.http.get(this.usersURL);
  }

  // Get all posts.
  getPosts() {
    return this.http.get(this.postsURL);
  }

  // Load a single post based on its ID.
  loadPost(postID) {
    return this.http.get("https://jsonplaceholder.typicode.com/posts/" + postID);
  }

  // Load a single user based on his ID.
  loadUser(userID) {
    return this.http.get("https://jsonplaceholder.typicode.com/users/" + userID);
  }

  // Create a new post.
  createPost(data) {
    return this.http.post(this.postsURL,
      {
        user: data.user,
        title: data.title,
        body: data.body
      }
    );
  }

  // Update a post based on its ID.
  updatePost(data) {
    return this.http.put(this.postsURL + '/' + data.postID,
      {
        user: data.userID,
        title: data.title,
        body: data.body
      }
    );
  }

  // Delete a post based on its ID.
  deletePost(postID) {
    return this.http.delete(this.postsURL + '/' + postID);
  }

}
