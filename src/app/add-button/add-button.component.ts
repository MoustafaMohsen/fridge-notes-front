import { Component, OnInit } from '@angular/core';
import { GListService } from '../Services/g-list.service';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

    constructor(public web: GListService,) { }

  ngOnInit() {
  }

}
