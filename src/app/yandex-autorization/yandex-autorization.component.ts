import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl, yandexDiskUrl, yandexDiskRedirectUrl } from "../config/config";

@Component({
  selector: 'app-yandex-autorization',
  templateUrl: "yandex-autorization.component.html",
  styleUrls: ["yandex-autorization.component.css"]
})
export class YandexAutorizationComponent implements OnInit {
  yandexAuthUrl = 'https://oauth.yandex.ru/authorize?' +
      'response_type=token' +
      '&client_id=5a58fbfa8c2e413091acf54202975c48' +
      '&redirect_uri=' + yandexDiskRedirectUrl;

  userToken = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if (document.location.hash) {
      var token = /access_token=([^&]+)/.exec(document.location.hash)[1];

      // todo: from cookies
      this.userToken = token;

      this.createUser(token);

      this.getImagesFromUserYandexDisk(token);
    }
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

  parseYandexDiskResponse(yandexResponseObject) {
    var yandexDiskImageItems = yandexResponseObject._embedded.items;

    var updateImagesRequest = {
      "images": [],
    };

    yandexDiskImageItems.forEach(function(item) {
      updateImagesRequest.images.push({
        "image_name": item.name,
        "image_url": item.file,
        "resource_id": item.resource_id,
      })
    });

    this.updateImages(updateImagesRequest)
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
            data => this.parseYandexDiskResponse(data),
            err => console.log(err),
            () => {}
        );
  }

  updateImages(updateImagesRequest) {
    var url = serverUrl + "/images/" + this.userToken;

    console.log(url);

    this.http.post(url, updateImagesRequest)
        .subscribe(
            data => {},
            err => console.log(err),
            () => console.log("user images updated")
        );
  }
}
