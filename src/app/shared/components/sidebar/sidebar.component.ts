import { Component } from '@angular/core';
import { sidebarContent } from '../../data/sidebar-content';
import { Router, RouterModule } from '@angular/router';
import { SearchModalComponent } from '../modal-template/search-modal/search-modal.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, SearchModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private route: Router) {}

  navList = sidebarContent;

  isRouteActive(route: string) {
    return route === this.route.url;
  }

  hideHeader(): boolean {
    const hasRoutes = ['/characters', '/episodes'];
    return hasRoutes.includes(this.route.url);
  }
}
