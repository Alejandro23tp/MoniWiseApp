import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis
} from "ng-apexcharts";
import { GraficosService } from 'src/app/servicios/graficos.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries | undefined;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
};
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("chart2") chart2: ChartComponent;
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;


  usuario_id: number = 0; // Cambia esto por el ID del usuario logueado


  constructor(private graficosService: GraficosService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    //Obtener el id deño usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado != null) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado).id;
      const usuarioLogueadoObj2 = JSON.parse(usuarioLogueado).tipo_usuario_id;
      this.usuario_id = usuarioLogueadoObj;
      console.log('usuario_id: ' + this.usuario_id);
 
    }
    this.graficosService.verPagosAhorroUsuarioDatos(this.usuario_id).subscribe((res: any) => {
      if (res.data && res.data.length > 0) {
        const data = res.data[0];
        
        const totalPagos = data.total_pagos;
        const pagosRealizados = data.pagos_realizados;
        const pagosPendientes = data.pagos_pendientes;
        const montoTotal = data.monto_total;
        const montoPagado = data.monto_pagado;
        const montoPendiente = data.monto_pendiente;

        this.chartOptions = {
          series: [totalPagos, pagosRealizados, pagosPendientes],
          chart: {
            height: 350,
            type: "radialBar",
            width: '100%'
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px"
                },
                value: {
                  fontSize: "16px"
                },
                total: {
                  show: true,
                  label: "Total Pagos",
                  formatter: function(w) {
                    return totalPagos.toString();
                  }
                }
              }
            }
          },
          labels: ["Total Pagos", "Pagos Realizados", "Pagos Pendientes"]
        };

        this.chartOptions2 = {
          series: [montoTotal, montoPagado, montoPendiente],
          chart: {
            height: 350,
            type: "radialBar",
            width: '100%'
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px"
                },
                value: {
                  fontSize: "16px"
                },
                total: {
                  show: true,
                  label: "Total Monto",
                  formatter: function(w) {
                    return montoTotal.toString();
                  }
                }
              }
            }
          },
          labels: ["Monto Total", "Monto Pagado", "Monto Pendiente"]
        };
      }
    });

    this.graficosService.verGastosPorCategoriaDatos(this.usuario_id).subscribe((res: any) => {
      if (res.data && res.data.length > 0) {
        const categorias = res.data.map((item: any) => item.nombre);
        const montos = res.data.map((item: any) => parseFloat(item.total_gasto));

        this.chartOptions3 = {
          series: [{
            name: "Gastos",
            data: montos
          }],
          chart: {
            type: "bar",
            height: 350,
            width: '100%'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: categorias
          }
        };
      }
    });
  }

}
