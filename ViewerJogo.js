import Status from "/Status.js";
import Jogo from "/Jogo.js";
import ViewerError from "/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerJogo {

  #ctrl;
  
  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar  = this.obterElemento('divNavegar'); 
    this.divComandos = this.obterElemento('divComandos'); 
    this.divAviso    = this.obterElemento('divAviso'); 
    this.divDialogo  = this.obterElemento('divDialogo');

    this.btPrimeiro  = this.obterElemento('btPrimeiro');
    this.btAnterior  = this.obterElemento('btAnterior');
    this.btProximo   = this.obterElemento('btProximo');
    this.btUltimo    = this.obterElemento('btUltimo');

    this.btIncluir   = this.obterElemento('btIncluir');
    this.btExcluir   = this.obterElemento('btExcluir');
    this.btAlterar   = this.obterElemento('btAlterar');
    this.btSair      = this.obterElemento('btSair');

    this.btOk        = this.obterElemento('btOk');
    this.btCancelar  = this.obterElemento('btCancelar');

    this.IdJogo = this.obterElemento('tfIdJogo');
    this.tfNome      = this.obterElemento('tfNome');
    this.tfPrecoAtual       = this.obterElemento('tfPrecoAtual');
    this.tfDescricao     = this.obterElemento('tfDescricao');
    this.tfAnoLancamento  = this.obterElemento('tfAnoLancamento');
      
    this.btPrimeiro.onclick = fnBtPrimeiro; 
    this.btProximo.onclick = fnBtProximo; 
    this.btAnterior.onclick = fnBtAnterior; 
    this.btUltimo.onclick = fnBtUltimo; 

    this.btIncluir.onclick = fnBtIncluir; 
    this.btAlterar.onclick = fnBtAlterar; 
    this.btExcluir.onclick = fnBtExcluir; 

    this.btOk.onclick = fnBtOk; 
    this.btCancelar.onclick = fnBtCancelar; 
  }

//------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if(elemento == null) 
      throw new ViewerError("Não encontrei um elemento com id '" + idElemento + "'");
    // Adicionando o atributo 'viewer' no elemento do Viewer. Isso permitirá
    // que o elemento guarde a referência para o objeto Viewer que o contém.
    elemento.viewer = this;
    return elemento;
  }

//------------------------------------------------------------------------//
  
  getCtrl() { 
    return this.#ctrl;
  }

//------------------------------------------------------------------------//
  
  apresentar(pos, qtde, aluno) {    
    
    this.configurarNavegacao( pos <= 1 , pos == qtde );   

    if(aluno == null) {
      this.IdJogo.value = "";
      this.tfNome.value       = "";
      this.tfPrecoAtual.value      = "";
      this.tfDescricao.value     = "";
      this.tfAnoLancamento.value  = "";
      this.divAviso.innerHTML = " Número de Jogos: 0";
    } else {
      this.IdJogo.value = aluno.getIdJogo();
      this.tfNome.value       = aluno.getNome();
      this.tfPrecoAtual.value      = aluno.getPrecoAtual();
      this.tfDescricao.value     = aluno.getDescricao();
      this.tfAnoLancamento.value  = aluno.getAnoLancamento();
      this.divAviso.innerHTML = "Posição: " + pos + " | Número de Jogos: " + qtde;
    }
  }

//------------------------------------------------------------------------//

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled   = flagFim;
    this.btProximo.disabled  = flagFim;
    this.btAnterior.disabled = flagInicio;
  }
  
//------------------------------------------------------------------------//
  
  statusEdicao(operacao) { 
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false; 
    
    if(operacao != Status.EXCLUINDO) {
      this.IdJogo.disabled = false;
      this.tfNome.disabled = false;
      this.tfPrecoAtual.disabled = false;
      this.tfAnoLancamento.disabled = false;
      this.tfDescricao.disabled = false;
      this.divAviso.innerHTML = "";      
    } else {
      this.divAviso.innerHTML = "Deseja excluir este jogo?";      
    }
    if(operacao == Status.INCLUINDO) {
      this.IdJogo.disabled = false;
      this.IdJogo.value = "";
      this.tfNome.value = "";
      this.tfPrecoAtual.value = "";
      this.tfAnoLancamento.value = "";
      this.tfDescricao.value = "";
    }
  }

//------------------------------------------------------------------------//
  
  statusApresentacao() { 
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true; 

    this.IdJogo.disabled = true;
    this.tfNome.disabled = true;
    this.tfPrecoAtual.disabled = true;
    this.tfAnoLancamento.disabled = true;
    this.tfDescricao.disabled = true;
  }

}

//------------------------------------------------------------------------//
// CALLBACKs para os Botões
//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarPrimeiro();
  
}

//------------------------------------------------------------------------//

function fnBtProximo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarProximo();
  
}

//------------------------------------------------------------------------//

function fnBtAnterior() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarAnterior();
  
}

//------------------------------------------------------------------------//

function fnBtUltimo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarUltimo();
  
}
//------------------------------------------------------------------------//

function fnBtIncluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarIncluir();
}

//------------------------------------------------------------------------//

function fnBtAlterar() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarAlterar();
  
}

//------------------------------------------------------------------------//

function fnBtExcluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarExcluir();
}

//------------------------------------------------------------------------//

function fnBtOk() {
  const idjogo = this.viewer.IdJogo.value;
  const nome = this.viewer.tfNome.value;
  const precoAtual = this.viewer.tfPrecoAtual.value;
  const descricao = this.viewer.tfDescricao.value;
  const anoLancamento = this.viewer.tfAnoLancamento.value;
    
  // Como defini que o método "efetivar" é um dos métodos incluir, excluir ou alterar
  // não estou precisando colocar os ninhos de IF abaixo.
  this.viewer.getCtrl().efetivar(idjogo, nome, precoAtual, descricao, anoLancamento); 

  // if(this.viewer.getCtrl().getStatus() == Status.INCLUINDO) {
  //  this.viewer.getCtrl().i(idJogoicula, cpf, nome, email, telefone); 
  //} else if(this.viewer.getCtrl().getStatus() == Status.ALTERANDO) {
  //  this.viewer.getCtrl().alterar(idJogoicula, cpf, nome, email, telefone); 
  //} else if(this.viewer.getCtrl().getStatus() == Status.EXCLUINDO) {
  //  this.viewer.getCtrl().excluir(idJogoicula, cpf, nome, email, telefone); 
  //}
}

//------------------------------------------------------------------------//

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar(); 
}

//------------------------------------------------------------------------//





