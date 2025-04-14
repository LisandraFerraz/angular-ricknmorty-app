import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { EpisodesListComponent } from './pages/episodes-list/episodes-list.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'characters',
    component: CharactersListComponent,
  },
  {
    path: 'episodes',
    component: EpisodesListComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
