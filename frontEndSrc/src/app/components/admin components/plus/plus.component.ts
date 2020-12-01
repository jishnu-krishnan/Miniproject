import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.css']
})
export class PlusComponent implements OnInit {

  fabButtons = [
    {
      icon: 'mode_edit',
      class: 'btn-floating yellow',
      route: '/admin/content'
    },
    {
      icon: 'bookmark',
      class: 'btn-floating red',
      route: '/admin/bookmark'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  constructor() { }

  ngOnInit(): void {
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }


}
