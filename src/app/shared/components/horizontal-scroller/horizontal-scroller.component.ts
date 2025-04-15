import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroller',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-scroller.component.html',
  styleUrl: './horizontal-scroller.component.scss',
})
export class HorizontalScrollerComponent {
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;

  scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 300,
      behavior: 'smooth',
    });
  }
  scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 300,
      behavior: 'smooth',
    });
  }
}
