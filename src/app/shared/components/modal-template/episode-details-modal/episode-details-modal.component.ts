import { Component, Input } from '@angular/core';
import { ModalTemplateComponent } from '../modal-template.component';
import { Episode } from 'app/shared/utils/classes/episode';
import { ContentService } from 'app/services/content.service';
import { Character } from 'app/shared/utils/classes/character';
import { HorizontalScrollerComponent } from '../../horizontal-scroller/horizontal-scroller.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formatSeason } from 'app/shared/utils/functions/format-season';

@Component({
  selector: 'app-episode-details-modal',
  standalone: true,
  imports: [ModalTemplateComponent, HorizontalScrollerComponent],
  templateUrl: './episode-details-modal.component.html',
  styleUrl: './episode-details-modal.component.scss',
})
export class EpisodeDetailsModalComponent {
  constructor(
    private contentService: ContentService,
    private activeModal: NgbActiveModal
  ) {}

  @Input() modalData: any = {};

  epData: Episode = new Episode();
  charList: Character[] = [];

  getEpisode = formatSeason;

  ngOnInit(): void {
    this.epData = this.modalData.episode;
    this.getEpCharacters();
  }

  getEpCharacters() {
    const charIds = this.epData.characters.map(
      (char: string) => +char.split('/').pop()!
    );
    const ids = charIds.length > 1 ? charIds.join(',') : charIds.pop();

    this.contentService.listCharacter(String(ids)).subscribe({
      next: (res) => {
        this.charList = Array.isArray(res) ? res : [res];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToCharPage(id: number) {
    this.activeModal.close({ charId: id });
  }

  ngOnDestroy(): void {
    this.charList = [];
    this.epData = new Episode();
  }
}
