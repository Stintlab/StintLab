import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DarkModeSelectorComponent} from "./components/dark-mode-selector/dark-mode-selector.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DarkModeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StintLab';
}
