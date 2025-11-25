import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class ReservaPage implements OnInit {

  reservaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefone: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    data: new FormControl('', Validators.required),
    hora: new FormControl('', [Validators.required]),
    pessoas: new FormControl('2', [Validators.min(1)]),
    preferencia: new FormControl(''),
    ocasiao: new FormControl(''),
    observacoes: new FormControl('')
  }); 

  constructor(private toastCtrl : ToastController){ }

  async confirmaReserva(){
    if(this.reservaForm.invalid){
      this.mostrarToast('Preencha todos os campos obrigatórios.');
      return
    }
    const novaReserva = {
      ...this.reservaForm.value,
      criadoEm: new Date().toISOString
    }
    const reservasSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservasSalvas.push(novaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservasSalvas));

    await this.mostrarToast("Reserva registrada com sucesso!");
    
    this.reservaForm.reset({
      // pessoas: 2
    })
  }
  async mostrarToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: 'primary',
      position: 'middle'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
