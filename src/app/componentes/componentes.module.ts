import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent, TabsComponent],
  exports: [HeaderComponent, TabsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentesModule { }
