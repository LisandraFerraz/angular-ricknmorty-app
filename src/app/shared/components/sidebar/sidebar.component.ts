import { Component } from '@angular/core';
import { sidebarContent } from '../../data/sidebar-content';
import { Router, RouterModule } from '@angular/router';
import { SearchModalComponent } from '../modal-template/search-modal/search-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, SearchModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private route: Router, private modalService: NgbModal) {}

  navList = sidebarContent;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.openModal();
  }

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
