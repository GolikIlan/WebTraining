import { NgModule, ModuleWithProviders } from "@angular/core";
import { CdkTableModule } from '@angular/cdk/table';
import { SaveDialogComponent } from "./save-dialog/save-dialog.component";
import { TitleCasePipe, CommonModule } from "@angular/common";
import { ShowOnClickDialogProviderDirective } from "./directives/show-dialog-on-click-directive";
import { FormsModule } from "@angular/forms";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { LogoutComponent } from "./logout/logout.component";
import { LocalizationPipe } from "./localization/localization.pipe";
import { NumberValidationDirective } from "./directives/number-validation-directive";
import { TargetDirective } from "./directives/target-id-directive";
import { SaveOnClickDialogProviderDirective } from "./directives/save-on-click-dialog-provider-directive";
import { SendOnClickDialogProviderDirective } from "./directives/send-on-click-dialog-provider-directive";
import { OnLoadListenerDirective } from "./directives/on-load-listener-directive";
import { EndoflinebuttonComponent } from "./endoflinebutton/endoflinebutton.component";
import { ClosebuttonComponent } from "./closebutton/closebutton.component";
import { AnchorwrapperComponent } from "./anchorwrapper/anchorwrapper.component";
import { MenuComponent } from "./menu/menu.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { HeaderComponent } from "./header/header.component";
import { SendMessageComponent } from "./send-message/send-message.component";
import { CanExitNotSavedRouteGuard } from "./guards/can-exit-add-new-route.guard";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
class OwnMatCombiningModule{
}

@NgModule({
    exports: [
    HomeComponent, 
    SendMessageComponent,
    AboutComponent, 
    ContactsComponent,
    LogoutComponent,
    PageNotFoundComponent,
    MenuComponent,
    HeaderComponent,
    ClosebuttonComponent,
    AnchorwrapperComponent,
    EndoflinebuttonComponent,
    LocalizationPipe,
    LoginComponent,
    NumberValidationDirective,
    TargetDirective,
    SaveDialogComponent,
    SaveOnClickDialogProviderDirective,
    SendOnClickDialogProviderDirective,
    ShowOnClickDialogProviderDirective,
    OnLoadListenerDirective,
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    ],
    imports:[
      CommonModule, 
      OwnMatCombiningModule,
      FormsModule,
      AngularFontAwesomeModule,
      RouterModule,  
    ],
    declarations: [
      SendMessageComponent,
      SaveDialogComponent,
      HomeComponent, 
      AboutComponent, 
      ContactsComponent,
      LogoutComponent,
      PageNotFoundComponent,
      MenuComponent,
      HeaderComponent,
      ClosebuttonComponent,
      AnchorwrapperComponent,
      EndoflinebuttonComponent,
      LocalizationPipe,
      LoginComponent,
      NumberValidationDirective,
      TargetDirective,
      SaveDialogComponent,
      SaveOnClickDialogProviderDirective,
      SendOnClickDialogProviderDirective,
      ShowOnClickDialogProviderDirective,
      OnLoadListenerDirective,
    ],
    entryComponents: [
      SaveDialogComponent,
    ]
  })
  export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [
          TitleCasePipe,
          ShowOnClickDialogProviderDirective,
          CanExitNotSavedRouteGuard,
        ]
      };
    }
  }