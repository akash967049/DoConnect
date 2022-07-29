import { Component, OnInit } from '@angular/core';
import { AuthRouteGaurd } from './shared/guards/auth.route.guards';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoConnect';


  constructor(public authRoute:AuthRouteGaurd, public authService: AuthService) { }

  
}
