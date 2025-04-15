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
  @Input() title: string = '';

  @Output() onSearch: EventEmitter<void> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.title);
  }

  submitSearch(): void {
    this.onSearch.emit();
  }

  closeModal() {
    this.onClose.emit();
  }
}
