import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yandex-autorization',
  templateUrl: "yandex-autorization.component.html",
  styleUrls: ["yandex-autorization.component.css"]
})
export class YandexAutorizationComponent implements OnInit {
  yandexAuthUrl = 'https://oauth.yandex.ru/authorize?' +
      'response_type=token' +
      '&client_id=5a58fbfa8c2e413091acf54202975c48' +
      '&redirect_uri=http://localhost:4200';

  constructor() {
    if (document.location.hash) {
      var token = /access_token=([^&]+)/.exec(document.location.hash)[1];

      // todo: сохранить в базе как авторизованного
      console.log(token);
    }
  }

  ngOnInit() {
  }

  public initYandexAutorization(){
    window.open(this.yandexAuthUrl, '_blank');
  }

}
