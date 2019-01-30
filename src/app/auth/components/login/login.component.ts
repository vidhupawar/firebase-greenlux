import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthSocialLink, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { Inject } from '@angular/core';
import { AuthService } from '../../backend/services/index';

@Component( {
    selector: 'page-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
} )
export class LoginComponent extends NbLoginComponent implements OnInit {

    redirectDelay: number;
    showMessages: any;
    errorMessage: string;
    strategy: string;
    errors: string[];
    messages: string[];
    user: any;
    submitted: boolean;
    socialLinks: NbAuthSocialLink[];
    rememberMe: boolean;
    error: string;


    constructor( private authService: AuthService, service: NbAuthService,
        @Inject( NB_AUTH_OPTIONS ) options: {}, cd: ChangeDetectorRef, router: Router ) {
        super( service, options, cd, router );
    }

    ngOnInit(): void {
        this.errors = this.messages = [];
        this.showMessages.error = false;
        this.showMessages.success = false;
        this.submitted = false;
    }


    login(): void {
        this.errors = this.messages = [];
        this.showMessages.error = false;
        this.showMessages.success = false;
        this.submitted = true;
        this.authService.doLogin( this.user ).then( res => {
            this.router.navigate( ['/pages'] );
            this.submitted = false;
            this.showMessages.error = false;
            this.showMessages.success = true;
            this.messages.push( 'Login Success' );
        }, err => {
            this.submitted = false;
            this.showMessages.error = true;
            this.showMessages.success = false;
            this.errors.push( err.message );
        } );
    }

    tryGoogleLogin() {
        this.authService.doGoogleLogin().then( res => {
            this.router.navigate( ['/pages'] );
        } );
    }

    getConfigValue( key: string ): any {
        return getDeepFromObject( this.options, key, null );
    }
}
