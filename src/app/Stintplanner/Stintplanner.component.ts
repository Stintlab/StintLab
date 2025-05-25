import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriversComponent } from "../Drivers/Drivers.component";

@Component({
  selector: 'app-Stintplanner',
  imports: [CommonModule, FormsModule, DriversComponent],
  templateUrl: './Stintplanner.component.html',
  styleUrls: ['./Stintplanner.component.css']
})
export class StintplannerComponent {
  raceStart = '';
  raceEnd = '';
  distance = '';


  onClick() {
    let dist = Date.parse(this.raceEnd) - Date.parse(this.raceStart);
    if(Number.isSafeInteger(dist)){
      this.distance = String(dist / 1000);
    }
  }
}
