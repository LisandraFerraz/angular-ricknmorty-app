import { Component, Input } from '@angular/core';
import { Episode } from 'app/shared/utils/classes/episode';
import { formatSeason } from 'app/shared/utils/functions/format-season';
import { EpisodeDetailsModalComponent } from '../modal-template/episode-details-modal/episode-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-episodes-card',
  standalone: true,
  imports: [EpisodeDetailsModalComponent],
  templateUrl: './episodes-card.component.html',
  styleUrl: './episodes-card.component.scss',
})
export class EpisodesCardComponent {
  constructor(private modalService: NgbModal) {}

  @Input() episode: Episode = new Episode();

  isModalOpen: boolean = false;

  getEpisode = formatSeason;

  ngOnInit(): void {}

  openModal(episode: Episode) {
    const data = {
      episode,
      title: 'Detalhes do episódio',
    };

    const modalRef = this.modalService.open(EpisodeDetailsModalComponent, {
      animation: true,
      size: 'lg',
    });

    console.log('parent | , ', data);

    modalRef.componentInstance.modalData = data;
  }

  ngOnDestroy(): void {}
}
