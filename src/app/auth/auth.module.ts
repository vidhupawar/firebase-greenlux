import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { CoreModule } from '../@core/core.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { NbAuthService } from '@nebular/auth';
import { APPLICATION_GUARD_PROVIDERS } from './backend/guards/index';
import { AUTH_RESOLVER_LIST } from './backend/resolvers/index';
import { APPLICATION_AUTH_SERVICE_PROVIDERS } from './backend/services/index';
import { AUTH_COMPONENT_LIST } from './components/index';

@NgModule( {
    declarations: [AUTH_COMPONENT_LIST],
    imports: [
        RouterModule,
        ThemeModule.forRoot(),
        AngularFireModule.initializeApp( environment.firebase ),
        AngularFirestoreModule,
        AngularFireAuthModule,
    ],
    providers: [APPLICATION_AUTH_SERVICE_PROVIDERS, APPLICATION_GUARD_PROVIDERS, AUTH_RESOLVER_LIST],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
} )
export class AuthModule {
}
