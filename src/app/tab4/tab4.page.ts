import {Component, OnInit} from '@angular/core';
import {WordpressService} from '../services/wordpress.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  items: any[];
  thumbs = new Map();
  categoryName: string;
  page: number;
  loaded: boolean;
  loading: boolean;

  constructor(private wordpressService: WordpressService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router) {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }

  replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  capitalizeFirstLetter(str) {
    str = this.replaceAll(str, '-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  goTo(str: string) {
    this.router.navigate(['/tabs/post/' + str]);
  }

  goBack() {
    this.location.back();
  }

  loadPosts() {
    this.loading = true;
    this.categoryName = this.route.snapshot.queryParams.name;
    const id = this.route.snapshot.paramMap.get('id');
    this.wordpressService.getPostsByCat(id, this.page).subscribe(data => {
      this.items = data;
      for (const res of data) {
        if (!this.thumbs.has(res.id)) {
          this.thumbs.set(res.id, {
            id: res.id,
            imageUrl: 'https://okbbbb.com/wp-content/uploads/2020/10/okbbbb-green.png',
            title: res.title.rendered,
            excerpt: res.excerpt.rendered
          });
        }
      }
      this.loading = false;
      this.loaded = true;
    });
  }

  next() {
    this.page++;
    this.loadPosts();
  }

  ngOnInit() {
    this.loading = false;
    this.page = 1;
    this.loadPosts();
  }

}
