import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input} from '@angular/core';
import { Buku } from '../buku.model';
import { BukuService } from '../buku.service';
import {FormGroup, FormControl, Validators , FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teman-add',
  templateUrl: './peminjamanBuku.component.html',
  styleUrls: ['./peminjamanBuku.component.css'],
  providers: [ BukuService ]
})

export class BukuAddComponent implements OnInit {

@Output()tambahBukuAdd = new EventEmitter<Buku>();
//inputInfo: Buku = new Buku();
@Input() tampilBuku: Buku[];
  inputForm: FormGroup;
  constructor(private temanservice: BukuService) { }
  ngOnInit() {
  this.inputForm = new FormGroup({
    isbn : new FormControl(null,
      [Validators.required, this.cekIsEmpty]),
    judul : new FormControl(null,
      [Validators.required]),
    qty : new FormControl(null,[Validators.required])
  });
  }
kirim(){
  const peminjamanBuku =  new Buku();
  // @ts-ignore
  peminjamanBuku.isbn =  this.inputForm.get('isbn');
  // @ts-ignore
  peminjamanBuku.judul = this.inputForm.get('judul');
  // @ts-ignore
  peminjamanBuku.qty =  this.inputForm.get('qty');

  this.tambahBukuAdd.emit(peminjamanBuku);
  console.log(peminjamanBuku);
  }

  cekIsEmpty(control: FormControl ): {[s: string ]: boolean } {
     if(control.value && control.value.trim().length === 0){
       return{'none': true};
     }
     return null;
  }
}
