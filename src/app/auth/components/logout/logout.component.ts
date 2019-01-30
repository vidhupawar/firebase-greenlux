import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthSocialLink, NbAuthService, NB_AUTH_OPTIONS, NbLogoutComponent } from '@nebular/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { Inject } from '@angular/core';
import { AuthService } from '../../backend/services/index';


@Component( {
    selector: 'page-logout',
    templateUrl: 'logout.component.html',
} )
export class LogoutComponent extends NbLogoutComponent implements OnInit {

    errorMessage: string;


    constructor( private authService: AuthService, service: NbAuthService, @Inject( NB_AUTH_OPTIONS ) options: {}, router: Router ) {
        super( service, options, router );
    }

    ngOnInit(): void {
        this.logout( '' );
    }

    logout( strategy: string ): void {
        this.authService.doLogout().then( res => {
            this.router.navigate( ['/auth/login'] );
        }, err => {
            console.log( err );
            this.router.navigate( ['/auth/login'] );
        } );
    }

}
