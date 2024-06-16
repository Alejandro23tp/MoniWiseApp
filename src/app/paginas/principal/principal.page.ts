import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  handleRefresh(event: any) {
    setTimeout(() => {
     
      
      event.target.complete();
      
    }, 2000);
  }
}
