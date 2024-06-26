import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private api: ApiService, private auth: AuthenticationService, private alert: AlertService){}

  createAccountIcon = faUserPlus;
  loginIcon = faRightToBracket;

  password: any = '';
  phone: string = '';
  loading: boolean = false;

  redirect(url: string){
    const navigationDetails: string[] = [url];
    this.router.navigate(navigationDetails);
  }

  doLogin(){
    this.api.GetMethod('https://alumnos.nlared.com/login.php?user=' + this.phone +'&pass=' + this.password)
      .subscribe(x =>{
        if(x.error == "error en datos"){
          this.alert.error("Datos incorrectos", "");
        }else{
          this.auth.setUser(x.token);
          this.alert.success('Bienvenido de nuevo','')
          this.redirect('/pages')
        }
      }, error =>{
        this.alert.error('Error del servidor, intente de nuevo mas tarde','')
      })
  }
}
