import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-template',
  standalone: true,
  imports: [],
  templateUrl: './modal-template.component.html',
  styleUrl: './modal-template.component.scss',
})
export class ModalTemplateComponent {
  constructor(private modalService: NgbModal) {}

  @Input() isSearch: boolean = false;
  @Input() title: string = '';

  @Output() onSearch: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {}

  submitSearch(): void {
    this.onSearch.emit();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
