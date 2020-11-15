import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  templateUrl: './plus-button.component.html',
  styleUrls: ['./plus-button.component.css']
})
export class PlusButtonComponent implements OnInit {

  fabButtons = [
    {
      icon: 'mode_edit',
      class: 'btn-floating yellow',
      route: '/content/add'
    },
    {
      icon: 'bookmark',
      class: 'btn-floating red',
      route: '/bookmark/add'
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
