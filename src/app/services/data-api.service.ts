import { Injectable } from '@angular/core';
import { productoInterface } from '../model/producto';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc, doc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  constructor(private firestore: Firestore) {}

  getTodosLosProductos(): Observable<productoInterface[]> {
    const producRef = collection(this.firestore, 'productos');
    return collectionData(producRef, { idField: 'id' }) as Observable<
      productoInterface[]
    >;
  }

  agregarProducto(producto: productoInterface) {
    const producRef = collection(this.firestore, 'productos');
    return addDoc(producRef, producto);
  }

  getProducto(id: string): Observable<productoInterface> {
    const productRef = doc(this.firestore, `productos/${id}`);
    return new Observable<productoInterface>((observer) => {
      getDoc(productRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            observer.next(docSnapshot.data() as productoInterface);
          } else {
            observer.error(new Error('Producto no encontrado'));
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  actualizarProducto(producto: productoInterface) {
    const productRef = doc(this.firestore, `productos/${producto.id}`);
    const productToUpdate = { ...producto };
    delete productToUpdate.id; // Eliminamos la propiedad "id" para evitar conflictos en la actualización
    return updateDoc(productRef, productToUpdate);
  }

  borrarProducto(producto: productoInterface) {
    const producRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(producRef);
  }
}
