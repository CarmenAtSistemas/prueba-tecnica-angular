import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'pt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  @ViewChild(MenuComponent)
  ptMenu!: MenuComponent;

  constructor(private dataService: DataService){
  }

  ngAfterViewInit () {
    this.dataService.ptMenu = this.ptMenu;
  }
}
