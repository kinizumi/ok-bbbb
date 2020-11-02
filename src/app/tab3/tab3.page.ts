import {Component, OnInit} from '@angular/core';
import {WordpressService} from '../services/wordpress.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  items: any[];
  thumbs = new Map();
  categoryName: string;
  searchStr: string;
  page: number;
  loaded: boolean;
  searching: boolean;

  constructor(private wordpressService: WordpressService,
              private route: ActivatedRoute) {
  }

  search() {
    this.thumbs = new Map();
    this.loadPosts();
  }

  loadPosts() {
    this.searching = true;
    this.categoryName = this.route.snapshot.paramMap.get('id');
    if (this.searchStr !== undefined) {
      this.wordpressService.search(this.searchStr, this.page).subscribe(data => {
        this.items = data;
        for (const res of data) {
          if (!this.thumbs.has(res.id)) {
            this.thumbs.set(res.id, {id: res.id, title: res.title.rendered, content: res.content.rendered});
          }
        }
        this.searching = false;
        this.loaded = true;
      }, err => {
        this.searching = false;
        this.loaded = false;
      });
    }
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  ngOnInit() {
    this.searching = false;
    this.page = 1;
    this.loadPosts();
  }
}
