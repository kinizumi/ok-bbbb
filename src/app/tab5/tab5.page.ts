import {Component, OnInit} from '@angular/core';
import {WordpressService} from '../services/wordpress.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  recipeId;
  content;
  title;
  loading;

  constructor(private wordpressService: WordpressService,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.wordpressService.getPost(this.recipeId).subscribe(data => {
      this.content = data.content.rendered;
      this.title = data.title.rendered;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  goBack() {
    this.location.back();
  }


}
