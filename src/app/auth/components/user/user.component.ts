import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import * as firebase from 'firebase/app';
import { NbThemeService } from '@nebular/theme';
import { FirebaseUserModel } from "../../backend/entity";
import { AuthService, UserService } from "../../backend/services";
@Component( {
    selector: 'page-user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
} )
export class UserComponent implements OnInit {

    user: FirebaseUserModel = new FirebaseUserModel();
    profileForm: FormGroup;
    item: any;
    userIdColor: any = 'corporate';
    constructor(
        public userService: UserService,
        public authService: AuthService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder,
        public fireDb: AngularFirestore,
        private themeService: NbThemeService
    ) {

    }

    ngOnInit(): void {
        this.route.data.subscribe( routeData => {
            let data = routeData['data'];
            if ( data ) {
                this.user = data;
                this.createForm( this.user.name );
            }
        } )

        this.item = this.fireDb.collection( 'setting' ).valueChanges();
        this.themeService.changeTheme( 'cosmic' );
        this.userService.getCurrentUser().then( user => {
            this.item.subscribe(( data: any ) => {
                data.map( ele => {
                    if ( ele.Site != ( null || "" ) ) {
                        ele.Site.map( element => {
                            if ( ( user.email ).toUpperCase() == ( element.email ).toUpperCase() ) {
                                this.themeService.changeTheme( element.colourCode );
                            }
                        } )
                    }
                } );
            } );
        } );
    }

    createForm( name ) {
        this.profileForm = this.fb.group( {
            name: [name, Validators.required]
        } );
    }

    save( value ) {
        this.userService.updateCurrentUser( value )
            .then( res => {
            }, err => {

            } );
    }

}
