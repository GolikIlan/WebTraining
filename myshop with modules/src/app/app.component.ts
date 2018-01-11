import { Component, ViewChild } from '@angular/core';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('mainLayout') mainLayout:MainLayoutComponent;
}
