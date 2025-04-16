import { Routes } from '@angular/router';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';

export const routes: Routes = [
  {
    path: 'characters',
    component: CharactersListComponent,
  },
  {
    path: 'character/:id',
    component: CharacterDetailsComponent,
  },
  {
    path: 'episodes',
    component: EpisodesListComponent,
  },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: '**', component: CharactersListComponent },
];
