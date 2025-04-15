import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-template',
  standalone: true,
  imports: [],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.scss',
})
export class ModalTemplateComponent {
  @Input() isSearch: boolean = false;
  @Output() onSearch: EventEmitter<void> = new EventEmitter();

  submitSearch(): void {
    this.onSearch.emit();
  }
}
