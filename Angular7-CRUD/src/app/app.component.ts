import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostServiceService } from './post-service.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular 7 - Consuming RESTful API';
  public usersData = [];
  public postsData = [];

  createPostData;
  createPostUser;
  createPostTitle;
  createPostBody;

  getPostData;
  getPostID;
  getPostUserID;
  getPostUsername;
  getPostTitle;
  getPostBody;

  updatePostData;
  updatePostID;
  updatePostUser;
  updatePostTitle;
  updatePostBody;

  deletePostData;
  deletePostID;
  deletePostUser;
  deletePostTitle;
  deletePostBody;

  constructor(private postService: PostServiceService) { }

  ngOnInit() {

    this.postService.getUsers().subscribe((data) => {
      this.usersData = Array.from(Object.keys(data), k => data[k]);
    });

    this.postService.getPosts().subscribe((data) => {
      this.postsData = Array.from(Object.keys(data), k => data[k]);
    });

    this.createPostData = new FormGroup({

      userID: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ])),

      title: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
        ])),

      body: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
        ]))
    });

    this.getPostData = new FormGroup({

      postID: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))

    });

    this.updatePostData = new FormGroup({

      postID: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ])),

      userID: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ])),

      title: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128)
      ])),

      body: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]))
    });

    this.deletePostData = new FormGroup({

      postID: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]))

    });

  }

  // Create Post
  onSubmitCreatePost(data) {
    this.createPostUser = data.userID;
    this.createPostTitle = data.title;
    this.createPostBody = data.body;

    var formData = {
      user: this.createPostUser,
      title: this.createPostTitle,
      body: this.createPostBody
    };

    this.postService.createPost(formData).subscribe((postResponse) => {
      document.getElementById("modal-title").innerText = 'Create a new post';
      document.getElementById("modal-text").innerHTML = '<strong>Post created successfully.</strong>';
      $('#response-modal').modal('show');

      this.createPostData.patchValue({
        userID: "default",
        title: "",
        body: ""
      });

    });

  }

  onSubmitGetPost(data) {
    this.getPostID = data.postID;
  }

  // Read / Get Post
  loadGetPost(target) {
    let postID = target;

    if (!String(postID).match("[0-9]+")) {
      document.getElementById('get-post-user').innerText = "";
      document.getElementById('get-post-title').innerText = "";
      document.getElementById('get-post-body').innerText = "";
      return false;
    }

    this.postService.loadPost(postID).subscribe((postData) => {

      this.postService.loadUser(postData['userId']).subscribe((userData) => {
        document.getElementById('get-post-user').innerText = userData['username'];
      });

      document.getElementById('get-post-title').innerText = postData['title'];
      document.getElementById('get-post-body').innerText = postData['body'];

    });

  }

  resetGetPost() {
    document.getElementById('get-post-user').innerText = "";
    document.getElementById('get-post-title').innerText = "";
    document.getElementById('get-post-body').innerText = "";
  }

  // Update an existing post
  loadUpdatePost(target) {

    this.updatePostID = target;

    if (!String(this.updatePostID).match("[0-9]+")) {
      this.updatePostData.patchValue({
        userID: "default",
        title: "",
        body: ""
      });
      return false;
    }

    this.postService.loadPost(this.updatePostID).subscribe((postData) => {
      this.updatePostData.patchValue({
        userID: postData['userId'],
        title: postData['title'],
        body: postData['body']
      });
    });

  }
  
  onSubmitUpdatePost(data) {
    this.updatePostID = data.postID;
    this.updatePostUser = data.userID;
    this.updatePostTitle = data.title;
    this.updatePostBody = data.body;

    var formData = {
      postID: this.updatePostID,
      userID: this.createPostUser,
      title: this.createPostTitle,
      body: this.createPostBody
    };

    this.postService.updatePost(formData).subscribe((postResponse) => {
      document.getElementById("modal-title").innerText = 'Update an existing post';
      document.getElementById("modal-text").innerHTML = '<strong>Post updated successfully.</strong>';
      $('#response-modal').modal('show');

      this.updatePostData.patchValue({
        postID: "default",
        userID: "default",
        title: "",
        body: ""
      });

    });

  }

  // Delete an existing post
  loadDeletePost(target) {
    let postID = target;

    if (!String(postID).match("[0-9]+")) {
      document.getElementById('delete-post-user').innerText = "";
      document.getElementById('delete-post-title').innerText = "";
      document.getElementById('delete-post-body').innerText = "";
      return false;
    }

    this.postService.loadPost(postID).subscribe((postData) => {

      this.postService.loadUser(postData['userId']).subscribe((userData) => {
        document.getElementById('delete-post-user').innerText = userData['username'];
      });

      document.getElementById('delete-post-title').innerText = postData['title'];
      document.getElementById('delete-post-body').innerText = postData['body'];

    });

  }

  onSubmitDeletePost(data) {
    this.deletePostID = data.postID;
    this.postService.deletePost(this.deletePostID).subscribe((postResponse) => {

      document.getElementById("modal-title").innerText = 'Delete an existing post';
      document.getElementById("modal-text").innerHTML = '<strong>Post deleted successfully.</strong>';
      $('#response-modal').modal('show');

      this.deletePostData.patchValue({
        postID: "default",
      });
      this.resetDeletePost();

    });
  }

  resetDeletePost() {
    document.getElementById('delete-post-user').innerText = "";
    document.getElementById('delete-post-title').innerText = "";
    document.getElementById('delete-post-body').innerText = "";
  }

}
