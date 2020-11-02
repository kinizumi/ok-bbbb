import {Component, OnInit} from '@angular/core';
import {WordpressService} from '../services/wordpress.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  items: any[];
  cats = new Map();
  loading: boolean;
  loaded: boolean;
  page: number;

  constructor(private wordpressService: WordpressService) {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  loadList() {
    this.loading = true;
    this.wordpressService.getCategories(this.page).subscribe(data => {
      this.items = data;
      for (const res of data) {
        if (!this.cats.has(res.id) && res.parent !== 0 && res.name !== 'Uncategorized' && res.count > 0) {
          const image = ''; // 'https://okbbbb.com/wp-content/uploads/2020/10/okbbbb-green.png';
          this.cats.set(res.id, {id: res.id, slug: res.id, post_count: res.count, imageUrl: image, name: res.name});
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
    this.loadList();
  }

  next() {
    this.page++;
    this.loadList();
  }

}
