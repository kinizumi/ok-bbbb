import {Component, OnInit} from '@angular/core';
import {WordpressService} from '../services/wordpress.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  items: any[];
  thumbs = new Map();
  page: number;
  loaded;
  loading;

  constructor(private wordpressService: WordpressService) {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  loadPosts() {
    this.loading = true;
    this.wordpressService.getPosts(this.page).subscribe(data => {
      this.items = data;
      for (const res of data) {
        if (!this.thumbs.has(res.id)) {
          this.thumbs.set(res.id, {id: res.id, title: res.title.rendered, content: res.content.rendered});
        }
      }
      this.loading = false;
      this.loaded = true;
    }, err => {
      this.loading = false;
      this.loaded = false;
    });
  }

  ngOnInit() {
    this.loading = false;
    this.page = 1;
    this.loadPosts();
  }

}
