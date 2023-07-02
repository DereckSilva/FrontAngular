import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  request: any;
  constructor() { }

  //abstrair esse service para que outros locais possa utilizar sem maiores problemas

  createIndex(table: string, value: {token: string}) {
    // requisitando um banco de dados
    let request = indexedDB.open('myDatabasess', 2)

    // Manipulação para a criação do banco de dados
    // cria a estrutura do banco
    request.onupgradeneeded = function(event:any) {
        let db = event.target.result;
  
        // Criando um uma store de objetos
        let loginStore = db.createObjectStore('logins', { keyPath: 'token' })
  
        loginStore.createIndex('tokenIndex', 'token', { unique: true })
      }
    request.onsuccess = function (event: any) {
      let db = event.target.result;

      let transaction = db.transaction([table], 'readwrite')
      let tokenStore = transaction.objectStore(table)

      let re = {
        token: value.token
      }
      let request = tokenStore.add(re)

      request.onsuccess = function(event:any) {
        console.log('Login adicionado com sucesso!');
      };

      request.onerror = (event: any) => {
        console.log('erro ao cadastrar o token ' + event.target.error)
      }
    }

  }

  findIndex(table: string, value:{token:string}) {
    let request = indexedDB.open('myDatabasess', 2)

      // Manipulação para a criação do banco de dados
    request.onupgradeneeded = function(event:any) {
        let db = event.target.result;
  
        // Criando um objeto dentro do indexDB, com nome do objeto e as "colunas"
        let loginStore = db.createObjectStore('login', { keyPath: 'token' })
  
        loginStore.createIndex('tokenIndex', 'token', { unique: true })
      }
    request.onsuccess = function (event: any) {
      let db = event.target.result;

      let transaction = db.transaction([table], 'readwrite')
      let tokenStore = transaction.objectStore(table)

      let result = tokenStore.get(value.token)

      result.onsuccess = (event:any) => {
        let login = event.target.result

        console.log(login)
      }
      result.onerror = (event:any) => {
        console.log('erro ' + event.target.error)
      }
    }
  }

  deleteIndex(index: string|number) {
    let request = indexedDB.open('myDatabasess', 2);

    request.onupgradeneeded = (event: any) => {
      let db = event.target.result

      let login = db.createObjectStore('login', {keypath: 'token'})

      login.createIndex('loginIndex', 'token', { unique: true })

    }

    request.onsuccess = (event:any) => {
      let db = event.target.result;

      let transaction = db.transaction(['login'], 'readwrite')
      let tokenStore = transaction.objectStore('login')

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
