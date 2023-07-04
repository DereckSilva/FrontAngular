import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IndexedDBService {
  constructor() { }

  // cria a store para o armazenamento
  createStore(nameBase: string, nameTable: string, version: number, path: string, index: string): IDBOpenDBRequest {
    let request = indexedDB.open(nameBase, version)

    request.onupgradeneeded = (event: any) => {
      let db = event.target.result;

      let tableStore = db.createObjectStore(nameTable, { keyPath: path });
      tableStore.createIndex(index, { unique: true });
    }

    request.onerror = (event: any) => {
        return console.log('Erro ao criar a store ' + event.target.error)
    }

    return request
  }

  createIndex(table: string, value: {token?: string, tokenUser?: string}, request: IDBOpenDBRequest) {
    let values = ''
    if (value.token !== undefined) {
      values = value.token
    }
    let findIndex = this.findIndex('myDatabasess', { token: values }, request)
    
    request.onsuccess = function (event: any) {
      let db = event.target.result;

      let transaction = db.transaction([table], 'readwrite')
      let tokenStore = transaction.objectStore(table)

      if (findIndex !== '') {
        return console.log('Esse token já foi criado')
      }

      let request = tokenStore.add(value)

      request.onsuccess = function(event:any) {
        console.log('Login adicionado com sucesso!');
      };

      request.onerror = (event: any) => {
        console.log('erro ao cadastrar o token ' + event.target.error)
      }
    }

  }

  findIndex(table: string, value:{token:string}, request: IDBOpenDBRequest): object|string {
    let login = ''

    request.onsuccess = function (event: any) {
      let db = event.target.result;
      let transaction = db.transaction([table], 'readwrite')
      let tokenStore = transaction.objectStore(table)

      let result = tokenStore.get(value.token)

      result.onsuccess = (event:any) => {
        let login = event.target.result
        return (login !== undefined) ? alert('Logado') : null
      }
      result.onerror = (event:any) => {
        console.log('erro ' + event.target.error)
      }
    }

    return login
  }

  deleteIndex(table: string, index: string|number, request: IDBOpenDBRequest) {

    request.onsuccess = (event:any) => {
      let db = event.target.result;

      let transaction = db.transaction([table], 'readwrite')
      let tokenStore = transaction.objectStore(table)

      let request = tokenStore.delete(index)

      request.onsuccess = () => {
        console.log('index excluido com sucesso')
      }

      request.onerror = (event:any) => {
        console.log('erro ao excluir o index ' + event.target.error)
      }
    }
  }
}
