import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Market',
      url: 'https://okbbbb.com/adverts/',
      icon: 'send'
    },
    {
      title: 'Q & A',
      url: 'https://okbbbb.com/?show=recent-questions',
      icon: 'text'
    },
    {
      title: 'Contact',
      url: 'https://okbbbb.com/contact-us/',
      icon: 'people'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  navi(url){
    window.open(url);
  }
}
