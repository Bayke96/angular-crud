import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostServiceService } from './post-service.service';

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
  getPostUser;
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

  onSubmitCreatePost(data) {
    this.createPostUser = data.userID;
    this.createPostTitle = data.title;
    this.createPostBody = data.body;
  }

  onSubmitGetPost(data) {
    this.getPostID = data.postID;
  }

  onSubmitUpdatePost(data) {
    this.updatePostID = data.postID;
    this.updatePostUser = data.userID;
    this.updatePostTitle = data.title;
    this.updatePostBody = data.body;
  }

  onSubmitDeletePost(data) {
    this.deletePostID = data.postID;
  }

}
