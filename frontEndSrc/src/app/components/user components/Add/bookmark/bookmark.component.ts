import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ckeditorContent="gh";
}
