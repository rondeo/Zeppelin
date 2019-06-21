function trata_entrar() {
  // Verifica format
  var email_value = document.getElementById("login_email").value;
  var senha_value = document.getElementById("login_senha").value;

  /*var constraints = {
    login_email: {
      email: true
    }
  };*/

  //validate ({login_email: email_value}, constraints);
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx");
console.log(email_value);
var email_value2 = document.getElementById("login_email");
console.log(email_value2);
  if (email_value == "") {
    ons.notification.alert({messageHTML:"<font><br>"+ "Email Precisa ser Preenchido."+ "</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }
  if (email_value.length > 150) {
    ons.notification.alert({messageHTML:"<font><br>Seu Email está muito longo!</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }
  if (senha_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Por favor, preencha a senha!</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_senha").focus();
    return false;
  }
  if (senha_value.length < 8) {
    ons.notification.alert({messageHTML:"<font><br>A senha precisa ter, pelo menos, 8 caracteres.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_senha").focus();
    return false;
  }
  if (senha_value.length > 30) {
    ons.notification.alert({messageHTML:"<font><br>Senha precisa ter menos de 30 caracteres.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_senha").focus();
    return false;
  }
  if (email_value.indexOf("@", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }
  if (email_value.indexOf(".", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }

  var atpos = email_value.indexOf("@");
  var dotpos = email_value.lastIndexOf(".");

  if (atpos < 1 || ( dotpos - atpos < 2 )) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus() ;
    return false;
  }

  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
  if (regEmail.test(email_value) == false) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }

  return true;
}

function trataEndereco () {
  var street = document.getElementById("update-address-street").value;
  var number = document.getElementById("update-address-number").value;
  var complemento = document.getElementById("update-address-complement").value;
  var district=document.getElementById("update-address-district").value;
  var city=document.getElementById("update-address-city").value;
  var state=document.getElementById("update-address-state").value;
  var country=document.getElementById("update-address-country").value;
  var zipcode=document.getElementById("update-address-zipcode").value;

  if (zipcode == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha seu CEP.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (zipcode.length > 10) {
    ons.notification.alert({messageHTML:"<font><br>CEP longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (/^[0-9]*$/.test(zipcode) == false) {
    ons.notification.alert({messageHTML:"<font><br>Ponha o CEP apenas com números, por favor.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (number == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha o número de sua residência.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (/^[0-9]*$/.test(number) == false) {
    ons.notification.alert({messageHTML:"<font><br>Número de residência inválido.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (number.length > 8) {
    ons.notification.alert({messageHTML:"<font><br>Número de residência longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (street == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha o campo 'rua'.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (street.length > 40) {
    ons.notification.alert({messageHTML:"<font><br>Nome de rua longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (complemento.length > 40) {
    ons.notification.alert({messageHTML:"<font><br>Complemento Longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (district == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha o Campo Distrito/Bairro.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (district.length > 40) {
    ons.notification.alert({messageHTML:"<font><br>Nome de Bairro longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (city == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha o campo cidade.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (city.length > 40) {
    ons.notification.alert({messageHTML:"<font><br>Nome de cidade longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (/^[A-Z]{2}$/.test(state) == false) {
    ons.notification.alert({messageHTML:"<font><br>Prencha a o Campo 'Estado' com a sigla correspondente.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (/^[A-Z]{3}$/.test(country) == false) {
    ons.notification.alert({messageHTML:"<font><br>Favor preencher com a sigla do seu País em formato ISO-alpha3. No caso do Brasil, preencha com 'BRA'.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function trataSearch (searchStr) {
  if (searchStr == "") {
    ons.notification.alert({messageHTML:"<font><br>Digite algo, para que possa obter resultados!</font>", title: "<b>Ops!</b>"});
    return false;
  }

  if (searchStr.length > 40) {
    ons.notification.alert({messageHTML:"<font><br>Tente com um número inferior de caracteres.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function trata_esqueceu() {
  // Verifica format
  var email_value = document.getElementById("forgot_email").value;

  /*var constraints = {
    login_email: {
      email: true
    }
  };*/

  //validate ({login_email: email_value}, constraints);
console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx");
console.log(email_value);
var email_value2 = document.getElementById("forgot_email");
console.log(email_value2);
  if (email_value == "") {
    ons.notification.alert({messageHTML:"<font><br>O Campo 'email' precisa ser preenchido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("forgot_email").focus();
    return false;
  }
  if (email_value.length > 150) {
    ons.notification.alert({messageHTML:"<font><br>Seu email está muito longo.</font>", title: "<b>Ops!</b>"});
    document.getElementById("forgot_email").focus();
    return false;
  }
  if (email_value.indexOf("@", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("forgot_email").focus();
    return false;
  }
  if (email_value.indexOf(".", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("forgot_email").focus();
    return false;
  }

  var atpos = email_value.indexOf("@");
  var dotpos = email_value.lastIndexOf(".");

  if (atpos < 1 || ( dotpos - atpos < 2 )) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("forgot_email").focus() ;
    return false;
  }

  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
  if (regEmail.test(email_value) == false) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }

  return true;
}

function trataNome (nome_value) {
  if (nome_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Nome precisa ser preenchido.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (nome_value.length > 150) {
    ons.notification.alert({messageHTML:"<font><br>Nome muito longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function trataApelido (pn_value) {
  if (pn_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Por favor, escreva sua preferência, para facilitar nossa comunicação!</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (pn_value.length > 15) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, escolha um apelido com um número inferior de caracteres.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function trataCPF (strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF.length == 0) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, preencha o CPF.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (/^[0-9]*$/.test(strCPF) == false) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, apenas a parte numérica do CPF.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (strCPF == "00000000000") {
    ons.notification.alert({messageHTML:"<font><br>CPF inválido.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) {
        ons.notification.alert({messageHTML:"<font><br>CPF inválido.</font>", title: "<b>Ops!</b>"});
       return false;
    }

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) {
      ons.notification.alert({messageHTML:"<font><br>CPF inválido.</font>", title: "<b>Ops!</b>"});
      return false;
    }

  return true;
}

function trataTelefone (tel_value) {
  const sanitizedPhone = tel_value.replace(/\D/g,'');
  if (sanitizedPhone.length < 10 || sanitizedPhone.length > 11) {
    ons.notification.alert({messageHTML:"<font><br>Preencha seu Telefone com DDD.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function trataTelefoneDDD (tel_value, ddd_value) {
  const sanitizedPhone = tel_value.replace(/\D/g,'');
  if (sanitizedPhone.length < 8 || sanitizedPhone.length > 9) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, preencha seu telefone com DDD no outro campo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (/^[0-9]{2}$/.test(ddd_value) ==  false) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um DDD válido (dois dígitos).</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function trataEmail (email_value) {
  if (email_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Email precisa ser preenchido.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (email_value.length > 150) {
    ons.notification.alert({messageHTML:"<font><br>Email está muito longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (email_value.indexOf("@", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (email_value.indexOf(".", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  var atpos = email_value.indexOf("@");
  var dotpos = email_value.lastIndexOf(".");

  if (atpos < 1 || ( dotpos - atpos < 2 )) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
  if (regEmail.test(email_value) == false) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }

  return true;
}

function trataAniversario (birthdate_value) {
  if (birthdate_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha a data de nascimento.</font>", title: "<b>Ops!</b>"});
    return false;
  }

  if (calculateAge(new Date(birthdate_value)) < 18) {
    ons.notification.alert({messageHTML:"<font><br>Você deve ser maior de idade para usar esse aplicativo..</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - (birthday.getTime() + 24 * 60 * 60 * 1000);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function zodiac(day, month) {
 // returns the zodiac sign according to day and month ( https://coursesweb.net/ )
 var zodiac =['', 'Capricórnio', 'Aquário', 'Peixes', 'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio'];
 var last_day =['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
 return (day > last_day[month]) ? zodiac[month*1 + 1] : zodiac[month];
}

function trataProfissao (occupation_value) {
  if (occupation_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Preencha com o nome de sua profissão.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (occupation_value.length > 20) {
    ons.notification.alert({messageHTML:"<font><br>O nome de sua profissão está longo.</font>", title: "<b>Ops!</b>"});
    return false;
  }
  return true;
}

function trata_cadastro () {
  var email_value = document.getElementById("cadastrar_email").value;
  var senha_value = document.getElementById("cadastrar_senha").value;
  var nome_value = document.getElementById("cadastrar_nome").value;
  var pn_value = document.getElementById("cadastrar_pn").value;
  var gender_value = document.forms["f_cadastrar_user"]["user_gender"].value;
  var age = document.getElementById("age-switch").checked;
  var term = document.getElementById("term-switch").checked;

  //console.log(gender_value);

  if (nome_value == "") {
    ons.notification.alert({messageHTML:"<font><br>O nome precisa ser preenchido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_nome").focus();
    return false;
  }
  if (pn_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha sua preferência de apelido (ou primeiro nome), para facilitar nossa comunicação!</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_pn").focus();
    return false;
  }
  if (pn_value.length > 15) {
    ons.notification.alert({messageHTML:"<font><br>Ponha um apelido de menos de 16 caracteres, por favor.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_pn").focus();
    return false;
  }
  if (nome_value.length > 150) {
    ons.notification.alert({messageHTML:"<font><br>Nome longo.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_nome").focus();
    return false;
  }
  if (email_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Email precisa ser preenchido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_email").focus();
    return false;
  }
  if (email_value.length > 150) {
    ons.notification.alert({messageHTML:"<font><br>Email excessivamente longo.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_email").focus();
    return false;
  }
  if (email_value.indexOf("@", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_email").focus();
    return false;
  }
  if (email_value.indexOf(".", 0) < 0)
  {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_email").focus();
    return false;
  }
  if (senha_value == "") {
    ons.notification.alert({messageHTML:"<font><br>Senha precisa ser preenchida.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_senha").focus();
    return false;
  }
  if (senha_value.length < 8) {
    ons.notification.alert({messageHTML:"<font><br>Senha precisa ter, pelo menos, 8 caracteres.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_senha").focus();
    return false;
  }
  if (senha_value.length > 30) {
    ons.notification.alert({messageHTML:"<font><br>Sua senha precisa ter menos de 30 caracteres.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_senha").focus();
    return false;
  }

  var atpos = email_value.indexOf("@");
  var dotpos = email_value.lastIndexOf(".");

  if (atpos < 1 || ( dotpos - atpos < 2 )) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("cadastrar_email").focus();
    return false;
  }

  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
  if (regEmail.test(email_value) == false) {
    ons.notification.alert({messageHTML:"<font><br>Por favor, ponha um email válido.</font>", title: "<b>Ops!</b>"});
    document.getElementById("login_email").focus();
    return false;
  }

  if (age != true) {
    ons.notification.alert({messageHTML:"<font><br>Você precisa ser maior de idade para ter acesso aos nossos conteúdos!</font>", title: "<b>Ops!</b>"});
    return false;
  }
  if (term != true) {
    ons.notification.alert({messageHTML:"<font><br>Você deve concordar com nossos termos de uso para ter acesso à nossa plataforma!</font>", title: "<b>Ops!</b>"});
    return false;
  }

  return true;
}

var trataLogin = function (d) {
  getPerfilData (d);
}

function getPerfilData (data) {
  //var dd = JSON.parse(data);
  /*var dd = {"r":0, "d":[{"uid": 1, "pid": 1, "tkn": "eeee", "pn": "Chico", "nome": "Chico dos Coei", "logado": 1, "uplan": "F", "astral_sign": "Capricórnio", "state": "CE", "birthdate": "2012-04-23T18:25:43.511Z", "cpf": "xxx.xxx.xxx-yy", "image": "", "telefone": {"numero":"99XXXXXX","areacode":"85"}, "email": "chicodoscoei@gmail.com", "profissao": "poker", "sexo": "M",
            "endereco":{
              "street": "Rua Nome da Rua",
              "number": "100",
              "complement": "Casa",
              "district": "Nome do Bairro",
              "city": "São Paulo",
              "state": "SP",
              "country": "BRA",
              "zipcode": "05015010"}}]};*/

    /*var dd = {"r":0, "d":[{
              "pessoal":{"nome":"Chico dos Coei", "email":"chicodoscoei@gmail.com", "pn":"Chico", "endereco":{
                                                                                                    "street": "Rua Nome da Rua",
                                                                                                    "number": "100",
                                                                                                    "complement": "Casa",
                                                                                                    "district": "Nome do Bairro",
                                                                                                    "city": "São Paulo",
                                                                                                    "state": "SP",
                                                                                                    "country": "BRA",
                                                                                                    "zipcode": "05015010"},
                          "telefone": {"numero":"99XXXXXX","areacode":"85"},
                          "cpf":"1234567890",
                          "image":""},
              "anonimo":{"uplan":"F", "logado": "1", "birthdate":"2012-04-23T18:25:43.511Z", "cartao":{"hash":"xxx", "4dig":"4521"}, "astral_sign":"Capricórnio", "profissao":"poker", "sexo":"M", "favoritos":[1, 2]}}]};
*/
    console.log(data);
      console.log("entrou aquiiiiii");
        //var d = dd.dados[0];
        var personalData = data.p;
        var anonmData = data.a;
        console.log(personalData);
        console.log(anonmData);
        //var d = dd.d[0];
        window.fly.c.apelido = personalData.pn;
        window.fly.c.nome = personalData.n;
        window.fly.c.uplan = anonmData.uplan;
        window.fly.c.astral_sign = anonmData.as;
        window.fly.c.birthdate = anonmData.b;
        window.fly.c.telefone = personalData.t;
        window.fly.c.email = personalData.email;
        window.fly.c.profissao = anonmData.p;
        window.fly.c.sexo = anonmData.s;
        window.fly.c.cpf = personalData.cpf;
        window.fly.c.image = personalData.i;
        window.fly.c.endereco = personalData.e;
        window.fly.c.favoritos = anonmData.f;
        window.fly.c.cartao = anonmData.c;
        window.fly.c.freeMonthReceived = anonmData.fmr;
        window.fly.c.ratings = anonmData.ratings;
        window.fly.c.online = 1;
        window.fly.c.creationDate = anonmData.cd;

        // GUSTAVO console.log("STORE LOCAL CONTROLE...");
        localforage.setItem('controle', window.fly.c, function (err) {
          hideAlertDialog();
          // if err is non-null, we got an error
          if (err) {
            // GUSTAVO console.log("STORE LOCAL CONTROLE FAIL:");
            // GUSTAVO console.log(err);
          }
          else
          {
            // GUSTAVO
            console.log("STORE LOCAL CONTROLE OK");
            goApp();
          }
        });
}

function subscriberHomeListaTrata (d){
  console.log("Teste de get for site");
  var dd = JSON.parse(d.d[0].anonimo);

  //var dd = {"r":0, "d":[{"storyid": 1, "views": 10, "music": "simpleplanperfect.mp3", "title": "O melhor sexo da minha vida", "description": "Uma história muito interessante e blablabla <b>Ronaldo Bold</b>.", "rating":4.5, "num_comments": 42, "free": true, "image": ""}, {"storyid": 2,"views": 18, "music": "alarme.mp3", "title": "Um conto não gratuito", "description": "Uma história muito interessante e blablabla <b>Ronaldo Bold</b>.", "rating":5, "num_comments": 78, "free": false, "image": ""}, {"storyid": 3,"views": 16, "music": "", "title": "Janaina em casa", "description": "Uma história muito interessante e blablabla <b>Ronaldo Bold</b>.", "rating":3.25, "num_comments": 1, "free": false, "image": ""}]};
  //data.response = null;
  console.log(dd);

  if (d.r!="0") {
    alert("Não conseguimos pegar informacoes no servidor.");
    localforage.getItem('basicdata').then(function(value) {
      if (value.length != 0) {
        uiShowStoriesSubscriber (value);
        //uiNoStories ();
      }
      else {
        uiNoStories ();
      }

      var listeners = getListeners (value);
      console.log(listeners.length);
      if (listeners.length != 0) {
        uiShowListeners (listeners);
      } else {
        uiNothingToHear ();
      }

      localforage.getItem('controle').then(function(valueFav) {

        if (value.length != 0 && valueFav.favoritos.length != 0) {
          uiShowFavorites (value, valueFav.favoritos);
          //uiNoStories ();
        }
        else {
          uiNoFavorites ();
        }
        hideAlertDialog();
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
        hideAlertDialog();
      });
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
      hideAlertDialog();
    });
    return;
  }

  localforage.setItem("basicdata", dd);

  if (dd.length != 0) {
    uiShowStoriesSubscriber (dd);
    //uiNoStories ();
  }
  else {
    uiNoStories ();
  }

  var listeners = getListeners (dd);
  console.log(listeners.length);
  if (listeners.length != 0) {
    uiShowListeners (listeners);
  } else {
    uiNothingToHear ();
  }

  localforage.getItem('controle').then(function(value) {

    if (dd['length'] != 0 && value.favoritos.length != 0) {
      uiShowFavorites (dd, value.favoritos);
      //uiNoStories ();
    }
    else {
      uiNoFavorites ();
    }
    hideAlertDialog();
  }).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
    hideAlertDialog();
  });
}

function basicHomeListaTrata (d) {
  var dd = JSON.parse(d.d[0].anonimo);
  console.log("Lista de Contos trata");
  console.log(dd);
  //var dd = {"r":0, "d":[{"storyid": 1, "views": 10, "music": "simpleplanperfect.mp3", "title": "O melhor sexo da minha vida", "description": "Uma história muito interessante e blablabla <b>Ronaldo Bold</b>.", "rating":4.5, "num_comments": 42, "free": true, "image": ""}, {"storyid": 2,"views": 18, "music": "alarme.mp3", "title": "Um conto não gratuito", "description": "Uma história muito interessante e blablabla <b>Ronaldo Bold</b>.", "rating":5, "num_comments": 78, "free": false, "image": ""}, {"storyid": 3,"views": 16, "music": "", "title": "Janaina em casa", "description": "Uma história muito interessante e blablabla <b>Ronaldo Bold</b>.", "rating":3.25, "num_comments": 1, "free": false, "image": ""}]};
  //data.response = null;

  localforage.setItem("basicdata", dd);

  if (dd.length != 0) {
    uiShowStories (dd);
    //uiNoStories ();
  }
  else {
    uiNoStories ();
  }

  /*if (data.response != 0)
  {
    count=0;
    //console.log(data.response);
    //console.log(JSON.parse(data.response));
    //trataUpdateStatus(data.response);
    //console.log("epa");
  }
  else{
    console.log(data);
    console.log("BEEP");

    /*var x = document.getElementById('lista_atendimentos')
    x.innerHTML =  '<ons-list-item tapable modifier="longdivider" onclick="goSolicita();">\
                Nenhuma solicitação pendente!\
              </ons-list-item>';*/
    //  x.style.display = "none";
  //}

  hideAlertDialog();
}

function basicHomeErrorTrata (data) {
  console.log(data);

  localforage.getItem('basicdata').then(function(value) {
    if (value.length != 0) {
      uiShowStories (value);
      //uiNoStories ();
    }
    else {
      uiNoStories ();
    }
  }).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });

  hideAlertDialog();
}

function subscriberHomeErrorTrata (data) {
  console.log(data);

  localforage.getItem('basicdata').then(function(value) {
    if (value.length != 0) {
      uiShowStoriesSubscriber (value);
      //uiNoStories ();
    }
    else {
      uiNoStories ();
    }

    var listeners = getListeners (value);
    console.log(listeners.length);
    if (listeners.length != 0) {
      uiShowListeners (listeners);
    } else {
      uiNothingToHear ();
    }

    localforage.getItem('controle').then(function(valueFav) {

      if (value.length != 0 && valueFav.favoritos.length != 0) {
        uiShowFavorites (value, valueFav.favoritos);
        //uiNoStories ();
      }
      else {
        uiNoFavorites ();
      }
      hideAlertDialog();
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
      hideAlertDialog();
    });
  });
}

function storyGetDataTrata (dd) {

  /*firebase.firestore().collection('contos').doc(dd.storyid).set (dd).then (function (d) {
    console.log("added");
  }).catch (function (error) {
    var errorMessage = error.message;
    //ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Falha no Cadastro</b>"});
    console.log(errorMessage);
  });*/
    localforage.setItem('story' + dd.storyid, dd);

    var recommendations = [];

    playMusic(dd.music);

    localforage.getItem('controle').then (function (valueP) {

      localforage.getItem('basicdata').then(function(value) {
        var i = 0;
        for (var key in value) {
          if (key == "length")
            continue;
          if (i < 5) {
            i++;
            recommendations.push(value[key]);
          } else {
            break;
          }
        }
        console.log(recommendations);
        if (recommendations.length == 0)
          recommendations = null;
        uiShowPreview (dd, recommendations, valueP.uplan);
        callUpdateToolbarAppend("preread");
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
        uiShowPreview (dd, null, valueP.uplan);
        callUpdateToolbarAppend("preread");
      });
    }).catch (function (err) {
      console.log(err);
      uiShowPreview (dd, null, "N");
      callUpdateToolbarAppend("preread");
    });
    //uiNoStories ();
}

function storyGetDataErrorTrata (data) {
  console.log(data);
  goBack();
  hideAlertDialog();
}
