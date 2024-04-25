import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() id!: string;
  @Output() edit = new EventEmitter();
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  goToEdit(id:string) {
    this.edit.emit(id);
    this.toggleDropdown();
  }

}
