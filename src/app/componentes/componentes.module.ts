import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { ModalcontentComponent } from './modalcontent/modalcontent.component';
import { SeleccionarIngresoComponent } from './seleccionar-ingreso/seleccionar-ingreso.component';



@NgModule({
  declarations: [HeaderComponent, TabsComponent, ModalcontentComponent, SeleccionarIngresoComponent],
  exports: [HeaderComponent, TabsComponent, ModalcontentComponent, SeleccionarIngresoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentesModule { }
