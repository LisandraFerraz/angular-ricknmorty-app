import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'app/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
