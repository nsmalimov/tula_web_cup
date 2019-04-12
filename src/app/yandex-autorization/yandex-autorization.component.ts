import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl, yandexDiskUrl } from "../config/config";

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

      this.getImagesFromUserYandexDisk(token)
    }
  }

  ngOnInit() {
  }

  public initYandexAutorization() {
    window.open(this.yandexAuthUrl, "_self");
  }

  createUser(token: string) {
    var url = serverUrl + "/users/" + token;

    this.http.post(url, {})
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('done')
        );
  }

  getImagesFromUserYandexDisk(token: string) {
    var url = yandexDiskUrl;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'OAuth ' + token,
    });
    let options = {
      headers: headers
    };

    this.http.get(url, options)
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('done')
        );
  }

  updateImages(token: string) {
    var url = serverUrl + "/users/" + token;

    this.http.post(url, {})
        .subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('done')
        );
  }
}
