import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { productoInterface } from 'src/app/model/producto';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Observable, finalize, switchMap, take } from 'rxjs';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  producto:productoInterface={}
  path:string=""
  uploadPercent!:Observable<number | undefined>
  urlImage!:Observable<string>
  accion:string=""
  image:boolean=false
  @ViewChild('button') button!: ElementRef;
  constructor(private img:AngularFireStorage,private data:DataApiService,private router:Router,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0"){

      this.accion = "new";
    }else {
      this.accion = "update";
      this.getProducto(params['id']);
    }
  });
  this.image=false
  }
  getProducto(id:string){
   this.data.getProducto(id).subscribe(resp=>{
    this.producto=resp
    this.producto.id=id
   })
  }
  upload($event:any){
    this.path=$event.target.files[0]
  }
  uploadImg() {
    const id = Math.random().toString(36).substring(2);
    const filePath = `uploads/producto_${id}`;
    const ref = this.img.ref(filePath);
    const task = this.img.upload(filePath, this.path);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges()
      .pipe(finalize(() => this.urlImage = ref.getDownloadURL()))
      .subscribe();

    this.button.nativeElement.classList.add('active');

    this.uploadPercent.subscribe(percent => {
      if (percent !== undefined) {
        setTimeout(() => {
          this.button.nativeElement.classList.remove('active');
          const iconElement = document.querySelector('i');
          const buttonTextElement = document.querySelector('.button-text');
          if (iconElement && buttonTextElement) {
            iconElement.classList.replace('bx-cloud-upload','bx-check-circle');
            buttonTextElement.textContent = 'Imagen Subida';
          }
        }, 3000);
      }
    });
    this.image=true
  }
  onSubmit() {
    this.urlImage.pipe(
      take(1),
      switchMap(url => {
        this.producto.imagen = url;
        return this.data.agregarProducto(this.producto);
      })
    ).subscribe(resp => {
      this.router.navigate(['inicio']);
    });
  }
  modificar(){
    this.data.actualizarProducto(this.producto).then(resp=>{
      console.log("actualizacion exitosa");
      this.router.navigate(['inicio']);
    })
  }
}
