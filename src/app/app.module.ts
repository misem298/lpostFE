import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
//import {DataTablesModule} from 'angular-datatables';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { RegionsComponent } from './regions.component';
@NgModule({
  declarations: [
    AppComponent,
    //RegionsComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    //ReactiveFormsModule,
    //FormsModule,
    HttpClientModule,

    // DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
