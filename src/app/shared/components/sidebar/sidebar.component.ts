import { Component, OnInit } from '@angular/core';
import { sidebarContent } from '../../data/sidebar-content';
import { Router, RouterModule } from '@angular/router';
import { SearchModalComponent } from '../modal-template/search-modal/search-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CharactersService } from 'app/services/characters.service';

interface IHeaderConfig {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor(
    private route: Router,
    private modalService: NgbModal,
    public charState: CharactersService
  ) {
    this.charState.setActiveChar();
  }

  navList = sidebarContent;

  activeColor: string = '';
  randomIcon: IHeaderConfig = { title: '', icon: '' };

  ngOnInit(): void {}

  isRouteActive(route: string) {
    return route === this.route.url;
  }

  hideHeader(): boolean {
    const hasRoutes = ['/characters', '/episodes'];
    return hasRoutes.includes(this.route.url);
  }

  openModal() {
    this.modalService.open(SearchModalComponent, {
      animation: true,
      size: 'lg',
    });
  }
}
