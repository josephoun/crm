import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import pageSettings from '../../config/page-settings';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user.model';
import {RoleModel} from '../../models/role.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  @Input() pageSidebarTwo;
	@Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
	@Output() toggleMobileSidebar = new EventEmitter<boolean>();
	@Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
	pageSettings = pageSettings;
  currentUser: UserModel;

  constructor(private renderer: Renderer2, private authenticationService: AuthenticationService, private router:  Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  mobileSidebarToggle() {
		this.toggleMobileSidebar.emit(true);
  }
  mobileRightSidebarToggle() {
		this.toggleMobileRightSidebar.emit(true);
  }
	toggleSidebarRight() {
		this.toggleSidebarRightCollapsed.emit(true);
	}

	mobileTopMenuToggle() {
	  this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
	}

	mobileMegaMenuToggle() {
	  this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
	}

	ngOnDestroy() {
	  this.pageSettings.pageMobileTopMenuToggled = false;
	  this.pageSettings.pageMobileMegaMenuToggled = false;
	}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login/v1']);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === RoleModel.Admin;
  }
}
