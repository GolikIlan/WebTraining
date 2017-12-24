import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imagePath: string;

  constructor() { 
    this.imagePath = "./assets/images/blackPaper.jpg";
  }

  ngOnInit() {
  }

}
