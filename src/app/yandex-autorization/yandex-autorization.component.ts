import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from "../config/config";

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

  constructor(private http: HttpClient) {
    if (document.location.hash) {
      var token = /access_token=([^&]+)/.exec(document.location.hash)[1];

      this.createUser(token);
    }
  }

  ngOnInit() {
  }

  public initYandexAutorization() {
    window.open(this.yandexAuthUrl, '_blank');
  }

  createUser(token: string) {
    var url = serverUrl + "/users/" + token;

    console.log(url);

    this.http.post(url, {})
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('done')
        );
  }
}
