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

  createPostData;
  createPostUser;
  createPostTitle;
  createPostBody;

  constructor(private postService: PostServiceService) { }


  ngOnInit() {

    this.postService.getUsers().subscribe((data) => {
      this.usersData = Array.from(Object.keys(data), k => data[k]);
    });

    this.createPostData = new FormGroup({
      user: new FormControl(""),
      title: new FormControl(""),
      body: new FormControl("")
    });

  }

  onSubmitCreatePost(data) {

    this.createPostUser = data.user;
    this.createPostTitle = data.title;
    this.createPostBody = data.body;

  }

}
