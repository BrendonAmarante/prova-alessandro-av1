import ModelError from "/ModelError.js";

export default class Jogo {
    
  //
  // DECLARAÇÃO DE ATRIBUTOS PRIVADOS: Em JavaScript, se o nome do atributo tem # no início, isso 
  // indica que ele é privado. Também deve-se colocar a presença dele destacada, como está abaixo.
  //
  #idJogo;
  #nome;
  #precoAtual;
  #anoLancamento;
  #descricao;

  //-----------------------------------------------------------------------------------------//

  constructor(idjogo, nome, precoAtual, descricao, anoLancamento) {
    this.setIdJogo(idjogo);
    this.setNome(nome);
    this.setPrecoAtual(precoAtual);
    this.setDescricao(descricao);
    this.setAnoLancamento(anoLancamento);      
  }
  
  //-----------------------------------------------------------------------------------------//

  getIdJogo() {
    return this.#idJogo;
  }

  //-----------------------------------------------------------------------------------------//

  setIdJogo(idJogo) {
    if(!Jogo.validarIdJogo(idJogo))
      throw new ModelError("Identificação do jogo Inválido: " + idJogo);
    this.#idJogo = idJogo;
  }

  //-----------------------------------------------------------------------------------------//

  getPrecoAtual() {
    return this.#precoAtual;
  }

  //-----------------------------------------------------------------------------------------//

  setPrecoAtual(precoAtual) {
    if(!Jogo.validarPrecoAtual(precoAtual))
      throw new ModelError("Formato de Preço atual Inválido: " + precoAtual +"\nLembre-se o formato correto é 'R$99,00'");
    this.#precoAtual = precoAtual;
  }

  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }

  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Jogo.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.#nome = nome;
  }

  //-----------------------------------------------------------------------------------------//

  getDescricao() {
    return this.#descricao;
  }

  //-----------------------------------------------------------------------------------------//

  setDescricao(descricao) {
    if(!Jogo.validarDescricao(descricao))
      throw new ModelError("A Descrição passou do limite de 150 caracteres.");
    this.#descricao = descricao;
  }

  //-----------------------------------------------------------------------------------------//

  getAnoLancamento() {
    return this.#anoLancamento;
  }

  //-----------------------------------------------------------------------------------------//

  setAnoLancamento(anoLancamento) {
    if(!Jogo.validarAnoLancamento(anoLancamento))
      throw new ModelError("Ano Lançamento inválido: " + anoLancamento + "\nLembre-se: o formato para o ano é 'AAAA'");
    this.#anoLancamento = anoLancamento;
  }

  //-----------------------------------------------------------------------------------------//

  toJSON() {
    return '{' +
               '"idJogo" : "'+ this.#idJogo + '",' +
               '"precoAtual" :  "'     + this.#precoAtual       + '",' +
               '"descricao" : "'     + this.#descricao      + '",' +
               '"anoLancamento" : "'    + this.#anoLancamento     + '",' +
               '"nome" : "' + this.#nome  + '" ' + 
           '}';  
  }

  //-----------------------------------------------------------------------------------------//

  static assign(obj) {
    return new Jogo(obj.idJogo, obj.nome, obj.precoAtual, obj.descricao, obj.anoLancamento);
  }

  //-----------------------------------------------------------------------------------------//


  
  static deassign(obj) { 
    return JSON.parse(obj.toJSON());
  }

   //-----------------------------------------------------------------------------------------//

   static validarIdJogo(idJogo) {
    if(idJogo == null || idJogo == "" || idJogo == undefined)
      return false;
    const padraoMatricula = /[0-9]/;
    if (!padraoMatricula.test(idJogo))
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      return false;
    if (nome.length > 40) 
      return false;
    const padraoNome = /[A-Z][a-z] */;
    if (!padraoNome.test(nome)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarPrecoAtual(precoAtual) {
    if(precoAtual == null || precoAtual == "" || precoAtual == undefined)
      return false;
    const padraoprecoAtual = /^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/g;
    if (!padraoprecoAtual.test(precoAtual)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  static validarAnoLancamento(anoLancamento) {
    if(anoLancamento == null || anoLancamento == "" || anoLancamento == undefined)
      return false;
    if (anoLancamento.length > 4) 
      return false;
    const padraoprecoAtual = /\d{4,4}/g;
    if (!padraoprecoAtual.test(anoLancamento)) 
      return false;
    return true;
  }
  //-----------------------------------------------------------------------------------------//

  static validarDescricao(descricao) {
    if(descricao == null || descricao == "" || descricao == undefined)
      return false;
    if (descricao.length > 150) {
      return false;
  }
  return true;
}

  //-----------------------------------------------------------------------------------------//
   
  mostrar() {
    let texto = "Matrícula: " + this.idJogoicula + "\n";
    texto += "Nome: " + this.nome + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}