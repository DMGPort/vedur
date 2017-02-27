import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig, FirebaseAuthGoogleConfig } from './firebase-config';

import { AppRoutingModule } from './app-routing.module';
import { StationService } from './station.service';
import { AccountService } from './account.service';

//admin
import { AdminComponent } from './admin-section/admin/admin.component';
import { StationFormComponent } from './admin-section/station-form/station-form.component';
import { PlaceFormComponent } from './admin-section/place-form/place-form.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { StationComponent } from './station/station.component';
import { StationSelectComponent } from './station-select/station-select.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StationPreviewComponent } from './station-preview/station-preview.component';
import { StationCollectionComponent } from './station-collection/station-collection.component';
import { DynoDialogComponent } from './dyno-dialog/dyno-dialog.component';
import { LoginComponent } from './login/login.component';
import { SearchStationsComponent } from './search-stations/search-stations.component';
import { SearchPipe } from './search-stations/search-filter.pipe';

@NgModule({
  declarations: [
    SearchPipe,
    AppComponent,
    StationComponent,
    StationSelectComponent,
    StationFormComponent,
    PlaceFormComponent,
    AdminComponent,
    HomeComponent,
    NavigationComponent,
    StationPreviewComponent,
    StationCollectionComponent,
    DynoDialogComponent,
    LoginComponent,
    SearchStationsComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(FirebaseConfig, FirebaseAuthGoogleConfig),
    AppRoutingModule
  ],
  providers: [ StationService, AccountService ],
  bootstrap: [AppComponent],
  entryComponents: [
    DynoDialogComponent,
    LoginComponent
  ]
})
export class AppModule { }
