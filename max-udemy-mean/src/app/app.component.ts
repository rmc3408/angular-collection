import { Component } from '@angular/core';
import { Post } from './posts/posts.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'max-udemy-mean';
  //public storedPosts: Post[] = [];

  // onPostAdded(post: Post) {
  //   this.storedPosts.push(post);
  // }
}
