import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScroll {
  constructor(private elRef: ElementRef) {}

  @Output() nearEnd: EventEmitter<void> = new EventEmitter();
  @Input() heightLimit = 120;

  private window!: Window;

  ngOnInit(): void {
    this.window = window;
  }

  @HostListener('window:scroll', [])
  windowScrollEvent() {
    const scrolledPosition = this.window.scrollY + this.window.innerHeight;
    const documentH = document.documentElement.scrollHeight;

    if (documentH - scrolledPosition < this.heightLimit) {
      this.nearEnd.emit();
    }
  }
}
