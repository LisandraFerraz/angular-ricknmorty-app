import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  standalone: true,
  imports: [],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
})
export class ListHeaderComponent {
  @Input() title: string = '';
  @Input() hasFilters: boolean = false;
  @Output() clearFilters: EventEmitter<void> = new EventEmitter();

  clear() {
    this.clearFilters.emit();
  }
}
