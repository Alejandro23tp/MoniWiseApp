import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { NgApexchartsModule } from "ng-apexcharts";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
    ComponentesModule,
    NgApexchartsModule

  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {}
