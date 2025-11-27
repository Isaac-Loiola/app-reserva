import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.page.html',
  styleUrls: ['./reservas-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReservasListPage implements OnInit {

  reservas: any[] = [];

  constructor(private router: Router, private alertCtrl: AlertController) { }

  // hook - elemento de ciclo da vida do Ionic = evento no C# (load)
  ionViewWillEnter(){
    this.loadReservas();
  }

  loadReservas(){
    const data = localStorage.getItem('reservas'); // obter item do localStorage
    this.reservas = data ? JSON.parse(data) : [];
  }

  editar(id: number){
    this.router.navigate(['/editar-reserva', id]); // $_GET[]
  }

  async excluir(id: number){
    const alert = await this.alertCtrl.create({
      header: "Excluir Reserva",
      message: "Deseja realmente excluir a reserva ?",
      buttons: [
        {text:'cancelar', role:'cancel'},
        {
          text:'Excluir', 
          handler:() =>{
            this.reservas = this.reservas.filter(r => r.index !== id);
            localStorage.setItem('reservas', JSON.stringify(this.reservas));
          }
        }
      ]

    });
    await alert.present();
  }


  // hook - evento (click, Mouseup, Load)
  ngOnInit() {
  }

}
