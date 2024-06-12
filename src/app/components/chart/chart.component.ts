import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonRestService } from 'src/app/service/common-rest.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  public chartOptions: Partial<ChartOptions>;
  constructor(private commonRestService:CommonRestService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
){
  this.chartOptions = {
    series: [
      {
        name: 'Cost',
        data: []
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    title: {
      text: 'Monthly Costs'
    },
    xaxis: {
      categories: []
    },
    dataLabels: {
      enabled: false
    }
  };
}
  ngOnInit(): void {
    this.generateChart();
  }

  generateChart():void{
    this.commonRestService.get("chart/v1/list").subscribe(
      (response:any)=>{
        console.log(response);
        this.chartOptions.series = [
          {
            name: 'Cost',
            data: response.map(item => item.cost)
          }
        ];
        this.chartOptions.xaxis = {
          categories: response.map(item => item.month)
        };
      }
    );
  }

}
