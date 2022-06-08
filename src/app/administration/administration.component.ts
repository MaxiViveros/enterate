import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ArticlesService} from "../services/articles.service";
import {PdfReaderService} from "../services/pdf-reader.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  articleForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private articlesService: ArticlesService,
    private pdfReader: PdfReaderService
  ) {
    this.articleForm = this.formBuilder.group({
      body: [''],
      name: [''],
      type: [''],
      like: [''],
      dislike: [''],
    });
  }

  ngOnInit(): void {
    /*this.pdfReader.readPdf('./assets/constitucion-borrador.pdf')
      .then(text => alert('PDF parsed: ' + text), reason => console.error(reason));*/
  }

  onSubmitArticle() {
    this.articlesService.postArticle(this.articleForm.value);
    this.articleForm.reset();
  }

}
