import {Component, Input, OnInit} from '@angular/core';
import {ArticlesService} from "../services/articles.service";
import {Article} from "../core/models/article.model";
import {Comment} from "../core/models/comment.model";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  listOfAllComments: any[];
  listOfCommentsOfArticle: any[] = [];

  constructor(
    private articlesService: ArticlesService
  ) { }

  @Input() article: any;

  ngOnInit(): void {
    this.articlesService.getComments().subscribe((res) => {
      this.listOfAllComments = res.map((e) => {
        return {
          idComment: e.payload.doc.id,
          ...(e.payload.doc.data() as Comment)
        }
      });
      this.listOfAllComments.forEach((x) => {
        if (x.articleId === this.article.idArticle) {
          this.listOfCommentsOfArticle.push(x);
        }
      });
      console.log(this.listOfCommentsOfArticle);
    });
  }

}
