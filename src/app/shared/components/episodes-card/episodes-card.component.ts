import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Episode } from 'app/shared/utils/classes/episode';
import { formatSeason } from 'app/shared/utils/functions/format-season';
import { EpisodeDetailsModalComponent } from '../modal-template/episode-details-modal/episode-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes-card',
  standalone: true,
  imports: [EpisodeDetailsModalComponent],
  templateUrl: './episodes-card.component.html',
  styleUrl: './episodes-card.component.scss',
})
export class EpisodesCardComponent {
  constructor(private modalService: NgbModal, private router: Router) {}

  @Input() episode: Episode = new Episode();

  isModalOpen: boolean = false;

  getEpisode = formatSeason;

  openModal(episode: Episode) {
    const data = {
      episode,
      title: `Episódio: ${episode.name}`,
    };

    const modalRef = this.modalService.open(EpisodeDetailsModalComponent, {
      animation: true,
      size: 'lg',
    });

    modalRef.componentInstance.modalData = data;

    modalRef.closed.subscribe({
      next: (res) => {
        if (res.charId) {
          this.router.navigate([`/character/${res.charId}`]);
        }
      },
      error: (err) => {
        console.error(
          'Não foi possível encontrar o personagem selecionado. ',
          err
        );
      },
    });
  }

  ngOnDestroy(): void {}
}
