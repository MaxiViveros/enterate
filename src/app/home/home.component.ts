import { Component, OnInit } from '@angular/core';
import { Article } from '../core/models/article.model';
import {User} from '../core/models/user.model';
import { PrimeNGConfig } from 'primeng/api';
import {ArticlesService} from "../services/articles.service";
import {HttpClient} from "@angular/common/http";
import {Vote} from "../core/models/vote.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];
  listOfUsers: any[] = [];
  listOfVotesUsers: any[] = [];
  ipAddress = "";
  likeFlag: boolean = false;
  dislikeFlag: boolean = false;
  displayCommentBox: boolean = false;
  commentForm: FormGroup;

  constructor(
    private primengConfig: PrimeNGConfig,
    private articlesServices: ArticlesService,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.commentForm = this.formBuilder.group({
      author: [''],
      body: [''],
      articleId: ['']
    });
  }

  ngOnInit(): void {
    //this.getIPAddress();
    this.getArticles();
    this.getUsersWithVotes();
    this.primengConfig.ripple = true;
  }
  articleSelected: any;
  displayArticleSelected(article:any) {
    this.displayCommentBox = true;
    this.articleSelected = article;
  }
  displayComments: boolean = false;
  displayCommentsOfArticle(article:any) {
    this.articleSelected = article;
    this.displayComments = true;
  }

  onSubmitComment(article: any) {
    console.log(article);
    this.commentForm.get('articleId')?.setValue(article.idArticle);
    console.log(this.commentForm.value);
    this.articlesServices.postComment(this.commentForm.value);
    if (this.likeFlag) {
      article.like += 1;
      this.articlesServices.updateArticle(article, article.idArticle);
    }
    else if (this.dislikeFlag) {
      article.dislike += 1;
      this.articlesServices.updateArticle(article, article.idArticle)
    }
    this.displayCommentBox = false;
    this.commentForm.reset();
    this.likeFlag = false;
    this.dislikeFlag = false;
  }

  getArticles() {
    this.articlesServices.getArticles().subscribe((res) => {
      this.articles = res.map((e) => {
        return {
          idArticle: e.payload.doc.id,
          ...(e.payload.doc.data() as Article)
        }
      });
      //console.log(this.articles)
    });
  }

  getUsersWithVotes() {
    this.articlesServices.getUsers().subscribe((res) => {
      this.listOfUsers = res.map((e) => {
        return {
          userId: e.payload.doc.id,
          ...(e.payload.doc.data() as User)
        }
      });
      //console.log(this.listOfUsers)
      this.listOfUsers.forEach((x) => {
        this.articlesServices.getVoteOfUsers(x.userId).subscribe((res) => {
          this.listOfVotesUsers = res.map((e) => {
            return {
              voteId: e.payload.doc.id,
              ...(e.payload.doc.data() as Vote)
            }
          });
          //console.log(this.listOfVotesUsers)
        });
      });
    });
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      let newUser = {
        ipAddress: this.ipAddress
      }
      console.log(this.ipAddress)
      //this.articlesServices.postUser(newUser);
    });
  }

  like(article: any) {
    this.dislikeFlag = false;
    this.likeFlag = true;
    /*if (localStorage.getItem("like:" + article.idArticle) === null) {
      article.like += 1;
      this.dislikeFlag = false;
      this.likeFlag = true;
      this.articlesServices.updateArticle(article, article.idArticle);
      localStorage.setItem("like:" + article.idArticle, "true");
    }*/
  }



  dislike(article: any) {
    this.dislikeFlag = true;
    this.likeFlag = false;
    /*if (localStorage.getItem("dislike:" + article.idArticle) === null) {
      article.dislike += 1;
      this.dislikeFlag = true;
      this.likeFlag = false;
      this.articlesServices.updateArticle(article, article.idArticle)
      localStorage.setItem("dislike:" + article.idArticle, "true");
    }*/
  }

}
