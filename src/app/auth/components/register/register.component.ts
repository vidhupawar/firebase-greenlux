import { Component, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth';
import { AuthService } from '../../backend/services/index';

@Component( {
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
} )
export class RegisterComponent extends NbRegisterComponent implements OnInit {

    errorMessage: string = '';
    successMessage: string = '';

    redirectDelay: number;
    showMessages: any;
    strategy: string;
    submitted: boolean;
    errors: string[];
    messages: string[];
    user: any;
    socialLinks: NbAuthSocialLink[];

    constructor(
        public authService: AuthService,
        service: NbAuthService, @Inject( NB_AUTH_OPTIONS ) options: {}, cd: ChangeDetectorRef, router: Router,
    ) {
        super( service, options, cd, router );
    }

    ngOnInit(): void {
        this.errors = this.messages = new Array();
        this.showMessages.error = false;
        this.showMessages.success = false;
        this.submitted = false;
    }

    tryGoogleLogin() {
        this.errors = this.messages = new Array();
        this.showMessages.error = false;
        this.showMessages.success = false;
        this.submitted = true;
        this.authService.doGoogleLogin().then( res => {
            this.router.navigate( ['/pages'] );
        }, err => {
            this.submitted = false;
            this.showMessages.error = true;
            this.showMessages.success = false;
            this.errors.push( err.message );
        } );
    }

    register(): void {
        this.errors = this.messages = new Array();
        this.showMessages.error = false;
        this.showMessages.success = false;
        this.submitted = true;
        if ( this.user.password != this.user.confirmPassword ) {
            this.showMessages.error = true;
            this.showMessages.success = false;
            this.errors.push( 'Password and Repeat Password Not Same' );
        } else {
            this.authService.doRegister( this.user ).then( res => {
                this.router.navigate( ['/auth/login'] );
                this.submitted = false;
                this.showMessages.error = false;
                this.showMessages.success = true;
                this.messages.push( 'Your account has been created' );
            }, err => {
                this.submitted = false;
                this.showMessages.error = true;
                this.showMessages.success = false;
                this.errors.push( err.message );
            } );
        }
    }

}
