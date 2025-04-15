import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalTemplateComponent } from '../modal-template.component';
import { Episode } from 'app/shared/utils/classes/episode';
import { ContentService } from 'app/services/content.service';
import { Character } from 'app/shared/utils/classes/character';
import { Router } from '@angular/router';
import { HorizontalScrollerComponent } from '../../horizontal-scroller/horizontal-scroller.component';

@Component({
  selector: 'app-episode-details-modal',
  standalone: true,
  imports: [ModalTemplateComponent, HorizontalScrollerComponent],
  templateUrl: './episode-details-modal.component.html',
  styleUrl: './episode-details-modal.component.scss',
})
export class EpisodeDetailsModalComponent {
  constructor(private contentService: ContentService, private router: Router) {}

  epData: Episode = new Episode();

  @Input() modalData: any = {};
  @Output() close = new EventEmitter<void>();

  charList: Character[] = [];

  ngOnInit(): void {
    this.epData = this.modalData.episode;
    this.getEpCharacters();
  }

  getEpCharacters() {
    const charIds = this.epData.characters
      .map((char: string) => char.slice(-1))
      .join(',');

    this.contentService.listCharacter(charIds).subscribe({
      next: (res) => {
        this.charList = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  goToCharPage(id: number) {
    this.router.navigate([`/character/${id}`]);
  }
}
