"use strict";

import ModelError from "/ModelError.js";
import Jogo from "/Jogo.js";

export default class DaoJogo {
  
  //-----------------------------------------------------------------------------------------//

  static conexao = null;

  constructor() {
    this.arrayJogos = [];
    this.obterConexao();
  }

  //-----------------------------------------------------------------------------------------//
  
  /*
   *  Devolve uma Promise com a referência para o BD
   */ 
  async obterConexao() {
    if(DaoJogo.conexao == null) {
      DaoJogo.conexao = new Promise(function(resolve, reject) {
        let requestDB = window.indexedDB.open("JogoDB", 1); 

        requestDB.onupgradeneeded = (event) => {
          let db = event.target.result;
          let store = db.createObjectStore("JogoST", {
            autoIncrement: true
          });
          store.createIndex("idxJogo", "idJogo", { unique: true });
        };

        requestDB.onerror = event => {
          reject(new ModelError("Erro: " + event.target.errorCode));
        };

        requestDB.onsuccess = event => {
          if (event.target.result) {
            // event.target.result apontará para IDBDatabase aberto
            resolve(event.target.result);
          }
          else 
            reject(new ModelError("Erro: " + event.target.errorCode));
        };
      });
    }
    return await DaoJogo.conexao;
  }
  
  //-----------------------------------------------------------------------------------------//

  async obterJogos() {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      let indice;
      try {
        transacao = connection.transaction(["JogoST"], "readonly");
        store = transacao.objectStore("JogoST");
        indice = store.index('idxJogo');
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }
      let array = [];
      indice.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {        
          const novo = Jogo.assign(cursor.value);
          array.push(novo);
          cursor.continue();
        } else {
          resolve(array);
        }
      };
    });
    this.arrayJogos = await promessa;
    return this.arrayJogos;
  }

  //-----------------------------------------------------------------------------------------//

  

  //-----------------------------------------------------------------------------------------//
  
  async obterJogoPelaMatricula(idJogo) {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      let indice;
      try {
        transacao = connection.transaction(["JogoST"], "readonly");
        store = transacao.objectStore("JogoST");
        indice = store.index('idxJogo');
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }

      let consulta = indice.get(idJogo);
      consulta.onsuccess = function(event) { 
        if(consulta.result != null)
          resolve(Jogo.assign(consulta.result)); 
        else
          resolve(null);
      };
      consulta.onerror = function(event) { reject(null); };
    });
    let aluno = await promessa;
    return aluno;
  }

  //-----------------------------------------------------------------------------------------//

  async obterJogosPeloAutoIncrement() {
    let connection = await this.obterConexao();      
    let promessa = new Promise(function(resolve, reject) {
      let transacao;
      let store;
      try {
        transacao = connection.transaction(["JogoST"], "readonly");
        store = transacao.objectStore("JogoST");
      } 
      catch (e) {
        reject(new ModelError("Erro: " + e));
      }
      let array = [];
      store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {        
          const novo = Jogo.assign(cursor.value);
          array.push(novo);
          cursor.continue();
        } else {
          resolve(array);
        }
      };
    });
    this.arrayJogos = await promessa;
    return this.arrayJogos;
  }

  //-----------------------------------------------------------------------------------------//

  async incluir(aluno) {
    
    let connection = await this.obterConexao();      
    let resultado = new Promise( (resolve, reject) => {
      let transacao = connection.transaction(["JogoST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível incluir o aluno", event.target.error));
      };
      let store = transacao.objectStore("JogoST");
      let requisicao = store.add(Jogo.deassign(aluno));
      requisicao.onsuccess = function(event) {
          resolve(true);              
      };
    });
    return await resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async alterar(aluno) {
    let connection = await this.obterConexao();      
    let resultado = new Promise(function(resolve, reject) {
      let transacao = connection.transaction(["JogoST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível alterar o aluno", event.target.error));
      };
      let store = transacao.objectStore("JogoST");     
      let indice = store.index('idxJogo');
      var keyValue = IDBKeyRange.only(aluno.getIdJogo());
      indice.openCursor(keyValue).onsuccess = event => {
        const cursor = event.target.result;
        console.log(cursor);
        if (cursor) {
          if (cursor.value.idJogo == aluno.getIdJogo()) {
            const request = cursor.update(Jogo.deassign(aluno));
            request.onsuccess = () => {
              console.log("[DaoJogo.alterar] Cursor update - Sucesso ");
              resolve("Ok");
              return;
            };
          } 
        } else {
          reject(new ModelError("Jogo com a idJogo " + aluno.getIdJogo() + " não encontrado!",""));
        }
      };
    });
    return await resultado;
  }
  
  //-----------------------------------------------------------------------------------------//

  async excluir(aluno) {
    let connection = await this.obterConexao();      
    let transacao = await new Promise(function(resolve, reject) {
      let transacao = connection.transaction(["JogoST"], "readwrite");
      transacao.onerror = event => {
        reject(new ModelError("Não foi possível excluir o aluno", event.target.error));
      };
      let store = transacao.objectStore("JogoST");
      let indice = store.index('idxJogo');
      var keyValue = IDBKeyRange.only(aluno.getIdJogo());
      indice.openCursor(keyValue).onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.idJogo == aluno.getIdJogo()) {
            const request = cursor.delete();
            request.onsuccess = () => { 
              resolve("Ok"); 
            };
            return;
          }
        } else {
          reject(new ModelError("Jogo com a idJogoícula " + aluno.getIdJogo() + " não encontrado!",""));
        }
      };
    });
    return false;
  }

  //-----------------------------------------------------------------------------------------//
}
