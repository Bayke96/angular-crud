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

  editPostData;
  editPostUser;
  editPostTitle;
  editPostBody;

  constructor(private postService: PostServiceService) { }


  ngOnInit() {

    this.postService.getUsers().subscribe((data) => {
      this.usersData = Array.from(Object.keys(data), k => data[k]);
    });

    this.postService.getPosts().subscribe((data) => {
      this.postsData = Array.from(Object.keys(data), k => data[k]);
    });

    this.createPostData = new FormGroup({

      user: new FormControl("", Validators.compose([
        Validators.required
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

    this.editPostData = new FormGroup({
      user: new FormControl(""),
      title: new FormControl(""),
      body: new FormControl("")
    });

  }

  onSubmitCreatePost(data) {

    this.createPostUser = data.user;
    this.createPostTitle = data.title;
    this.createPostBody = data.body;

    console.log("User:" + this.createPostUser);
    console.log("Title: " + this.createPostTitle);
    console.log("Body: " + this.createPostBody);

  }

}
