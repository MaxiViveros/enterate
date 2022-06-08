import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Article} from "../core/models/article.model";
import {User} from "../core/models/user.model";
import {Comment} from "../core/models/comment.model";
import {Vote} from "../core/models/vote.model";

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  postArticle(article: Article) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("articles").add(article).then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }

  getComments() {
    return this.angularFirestore.collection("comments").snapshotChanges();
  }

  getArticles() {
    return this.angularFirestore.collection("articles").snapshotChanges();
  }

  getUsers() {
    return this.angularFirestore.collection("users").snapshotChanges();
  }

  getVoteOfUsers(id:any) {
    return this.angularFirestore.collection("users/"+id+"/vote").snapshotChanges();
  }

  postUser(user: User) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("users").add(user).then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
      this.angularFirestore.collection("users/")
    })
  }

  updateArticle(article:Article, idArticle:any) {
    return this.angularFirestore.collection("articles").doc(idArticle).update({
      body: article.body,
      name: article.name,
      type: article.type,
      like: article.like,
      dislike: article.dislike
    });
  }

  postComment(comment: Comment) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("comments").add(comment).then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }



}
