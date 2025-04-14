import { Component } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.listCharacters();
  }

  listCharacters() {
    let data = {
      name: 'rick',
      page: 1,
    };

    this.contentService.listAllCharacters(data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.error('Erro ao realizar a chamad | ', error);
      },
    });
  }
}
