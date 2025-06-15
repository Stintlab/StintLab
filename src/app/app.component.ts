import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DriverService } from './services/driver/driver.service';
import { HttpClient } from '@angular/common/http';
import { DriverModel } from './models/driver-model';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StintLab';

  constructor(private driverService: DriverService, private httpClient: HttpClient) {
    httpClient.get<DriverModel>("").subscribe(d => "ITS PETERPAN!", e => console.error(e))
  }
}
