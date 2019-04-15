import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: "checkbox.component.html",
  styleUrls: ["checkbox.component.css"]
})
export class CheckboxComponent implements OnInit {
  @Input() dropDownSortElems;

  ss = null;

  constructor(ss: SharedService) {
    this.ss = ss;
  }

  ngOnInit() {

  }

  sortByParam(sort_param) {
    this.sentDataToMainComponent("load_by_sort_param:" + sort_param);
  }

  sentDataToMainComponent(data) {
    this.ss.send(data);
  }
}
