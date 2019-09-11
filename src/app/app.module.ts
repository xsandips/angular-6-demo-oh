import { ProjectService } from './theme/controller/project/project.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { AuthModule } from './auth/auth.module';
import { ControllerModule } from './theme/controller/controller.module';
import { CommonService } from './base/_services/common.service';
import { FileOperationService } from './theme/controller/services/file-operation.service';



@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
  ],
  providers: [
    ScriptLoaderService,
    CommonService,
    FileOperationService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
