import ModelError from "/ModelError.js";

export default class Aluno {
    
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

  constructor(idJogo, precoAtual, nome, descricao, anoLancamento) {
    this.setIdJogo(idJogo);
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
    if(!Aluno.validarIdJogo(idJogo))
      throw new ModelError("Identificação do jogo Inválido: " + idJogo);
    this.#idJogo = idJogo;
  }
  
  //-----------------------------------------------------------------------------------------//

  getPrecoAtual() {
    return this.#precoAtual;
  }
  
  //-----------------------------------------------------------------------------------------//

  setPrecoAtual(precoAtual) {
    
    this.#precoAtual = precoAtual;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.#nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!Aluno.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.#nome = nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  getDescricao() {
    return this.#descricao;
  }
  
  //-----------------------------------------------------------------------------------------//

  setDescricao(descricao) {
    this.#descricao = descricao;
  }
  
  //-----------------------------------------------------------------------------------------//

  getAnoLancamento() {
    return this.#anoLancamento;
  }
  
  //-----------------------------------------------------------------------------------------//

  setAnoLancamento(anoLancamento) {
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
    return new Aluno(obj.idJogo, obj.precoAtual, obj.nome, obj.descricao, obj.anoLancamento);
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

  static validarCpf(strCpf) {
    let soma;
    let resto;
    let i;

    soma = 0;
    strCpf = strCpf.replace(".", "");
    strCpf = strCpf.replace(".", "");
    strCpf = strCpf.replace("-", "");

    if (strCpf == "00000000000") return false;

    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCpf.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCpf.substring(10, 11))) return false;
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

  static validarEmail(email) {
    if(email == null || email == "" || email == undefined)
      return false;

    const padraoEmail = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}/;
    if (!padraoEmail.test(email)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//

  static validarTelefone(telefone) {
    if(telefone == null || telefone == "" || telefone == undefined)
      return false;

    const padraoTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    if (!padraoTelefone.test(telefone)) 
      return false;
    return true;
  }

  //-----------------------------------------------------------------------------------------//
   
  mostrar() {
    let texto = "IdJogo: " + this.idJogo + "\n";
    texto += "Nome: " + this.nome + "\n";
      
    alert(texto);
    alert(JSON.stringify(this));
  }
}