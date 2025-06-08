import { Component } from '@angular/core';
import {ToggleSwitch} from "primeng/toggleswitch";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dark-mode-selector',
  imports: [
    ToggleSwitch,
    FormsModule
  ],
  templateUrl: './dark-mode-selector.component.html',
  styleUrl: './dark-mode-selector.component.scss'
})
export class DarkModeSelectorComponent {
  readonly darkModeClass = "dark-mode";
  darkMode: boolean = false;

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      if(this.darkMode && !element.classList.contains(this.darkModeClass)) {
        element.classList.add(this.darkModeClass);
      }
      if(!this.darkMode && element.classList.contains(this.darkModeClass)) {
        element.classList.remove(this.darkModeClass);
      }
    }
  }
}
