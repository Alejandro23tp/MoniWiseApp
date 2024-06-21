import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetasPageRoutingModule } from './metas-routing.module';

import { MetasPage } from './metas.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetasPageRoutingModule,
    ComponentesModule
  ],
  declarations: [MetasPage]
})
export class MetasPageModule {}
