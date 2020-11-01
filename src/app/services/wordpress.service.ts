import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  mainUrl = 'https://okbbbb.com/wp-json/wp/v2/';

  constructor(private http: HttpClient) {
  }

  public getPosts(page: number): any {
    return this.http.get(this.mainUrl + 'posts/?status=publish&page=' + page);
  }

  public getPostsByCat(categoryName: string, page: number): any {
      return this.http.get(this.mainUrl + 'posts/?status=publish&categories=' + categoryName + '&page=' + page);
  }

  public getCategories(): any {
      return this.http.get(this.mainUrl + 'categories?order_by=count&order=desc');
  }

  public search(searchStr: string, page: number): any {
    return this.http.get(this.mainUrl + 'posts/?status=publish&search=' + searchStr + '&page=' + page);
  }

  public getPost(recipeId: string): any {
    return this.http.get(this.mainUrl + 'posts/' + recipeId);
  }
}
