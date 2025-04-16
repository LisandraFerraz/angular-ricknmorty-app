import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EpisodeQuery } from 'app/shared/utils/classes/queries';

@Component({
  selector: 'app-search-episode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-episode.component.html',
  styleUrl: './search-episode.component.scss',
})
export class SearchEpisodeComponent {
  @Input() query: EpisodeQuery = new EpisodeQuery();
}
