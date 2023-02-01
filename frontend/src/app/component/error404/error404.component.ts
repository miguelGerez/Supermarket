import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  constructor(    private router: Router
    ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigate(['/pages']);
      // And any other code that should run only after 5s
    }, 5000);
  }





}
