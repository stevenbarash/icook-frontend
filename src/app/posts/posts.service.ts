import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                name: post.name,
                intro: post.intro,
                id: post._id,
                image: post.image,
                userId: post.userId
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getUserPost(userId: string) {
    return this.http.get<{
      _id: string;
      name: string;
      intro: string;
      image: string;
      userId: string;
    }>('http://localhost:3000/api/posts/' + userId);
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      intro: string;
      image: string;
      userId: string;
    }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(name: string, intro: string, image: File) {
    const postData = new FormData();
    postData.append('name', name);
    postData.append('intro', intro);
    postData.append('image', image, name);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, name: string, intro: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('name', name);
      postData.append('intro', intro);
      postData.append('image', image, name);
    } else {
      postData = {
        // tslint:disable-next-line: object-literal-shorthand
        id: id,
        // tslint:disable-next-line: object-literal-shorthand
        name: name,
        // tslint:disable-next-line: object-literal-shorthand
        intro: intro,
        // tslint:disable-next-line: object-literal-shorthand
        image: image,
        userId: null
      };
    }
    this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }
}
