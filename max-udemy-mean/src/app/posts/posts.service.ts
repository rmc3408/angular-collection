import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { GetPostRequest, Post, PostDB, createPostRequest } from "./posts.model";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiURL = "http://localhost:4201/posts"
  private posts: Post[] = []
  private updatedPosts = new Subject<Post[]>()

  constructor(private http: HttpClient) {}
  
  listenerUpdate() {
    return this.updatedPosts.asObservable()
  }

  getPosts() {
    this.http.get<GetPostRequest>(this.apiURL)
    .pipe(map((preData: GetPostRequest) => {
      return preData.posts.map((post: PostDB) => {
        return ({ id: post._id, title: post.title, content: post.content })
      })
    }))
    .subscribe(posData => {
      this.posts = posData
      this.updatedPosts.next([...this.posts])
    })
    //return [...this.posts]
  }

  addPost(title: string, content: string) {
    this.http.post<createPostRequest>(this.apiURL, { title, content })
    .subscribe((preData: createPostRequest) => {
     const newPostCreated: Post = { id: preData.posts._id, title: preData.posts.title, content: preData.posts.content }
      this.posts.push(newPostCreated)
      this.updatedPosts.next([...this.posts])
    })   
  }

  deletePost(id: string) {
    this.http.delete(this.apiURL + '/' + id).subscribe(() => {
      const filteredPosts = this.posts.filter((post) => post.id !== id)
      this.posts = [...filteredPosts]
      this.updatedPosts.next([...filteredPosts])
    })
  }
}