var lastPage=-100;

function clearOldArchives () {
  
}

function fisherYates ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }

   return myArray;
}

// Funções genéricas de suporte a App

var toastOn = function(txt) {
	document.getElementById("toast-txt").innerHTML = txt;
    document.getElementById('toast').show();
}

var toastOff = function() {
    document.getElementById('toast').hide();
}

var showDialog = function (id, txt) {
	localforage.removeItem('msgInfo').then(function() {
		// Run this code once the key has been removed.
		fly.d(9,id + "-txt");
		fly.d(9,txt);
			  document.getElementById(id + "-txt").innerHTML = txt;
			  document
		.getElementById(id)
		.show();

		fly.d(9,'Key is cleared!');
	}).catch(function(err) {
		// This code runs if there were any errors
		fly.d(9,err);
	});
};

var hideDialog = function (id) {
  document
    .getElementById(id)
    .hide();
};

String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
    return this.split(needle).join(replacement);
};


var ligaWait = function()
{
	// Seta variável global
		window.fly.c.wait = 1;
	//	document.querySelector("page__background").style.zindez=3000;
	// Exibe o wait
		//byId("wait").style.display = "block";
		document.querySelector(".wait").style.display = "block";
}

var desligaWait = function()
{
	// Seta variável global
		window.fly.c.wait = 0;
	// Exibe o wait
	//document.querySelector("page__background").style.zindez=-1;
	//	byId("wait").style.display = "none";
	document.querySelector(".wait").style.display = "none";
}
// window.page = {};
//
// window.page.agenda = {};
//
// window.page.agenda.massagens = [ {id: 1,start: 30, end:80, text:"Michael - Relaxante - 50 min", color:"red"}, {id: 2,start: 80, end:110, text:"Michael - Relaxante - +30min", color:"red"}, {id:3, start: 540, end: 600, text:"Vinicius - Shiatsu", color:"green"},{id:4, start: 610, end: 670, text:"Gustavo  - Shiatsu", color:"green"} ];
//
// window.page.agenda.data = "19102018";


// window.horarios = [
//   {
//     "horario":"19",
//     "tipo":"Terapêutica",
//     "nome":"Michael",
//     "endereco":"Avenida X",
//     "ranking":"3",
//     "maca":"Levar maca",
//     "obs":"O nome dele se fala Maicou e não Michael"
//   },
//   {
//     "horario":"30",
//     "tipo":"Esportiva",
//     "nome":"Gustavo",
//     "endereco":"Avenida Y",
//     "ranking":"4",
//     "maca":"Não levar maca",
//     "obs":"Não fale mal de star wars para ele"
//   },
//   {
//     "horario":"23",
//     "tipo":"Shiatsu",
//     "nome":"Vinicius",
//     "endereco":"Avenida Z",
//     "ranking":"5",
//     "maca":"Levar maca",
//     "obs":"Estagiario que toma café e programa"
//   }
// ];

// Default AJAX callbacks
var onSuccess = function(data)
{
  fly.d(9,"onSuccess callback");
	fly.d(9,data.responseText);
}

var onFail = function(data)
{
  fly.d(9,"onFail callback");
	fly.d(9, data);
	var t="";
	switch (data)
	{
		case 403:
					t="Forbidden";
					break;
		case 404:
					t="Page not found";
					break;
		default:
					t="Erro desconhecido!";
	}
	fly.d(1, ">> FAIL - Ajax Callback : " + t);
  fly.d(1, data);
	ons.notification.alert({messageHTML:"<font><br>" + t + "</font>", title: "<b>Ops!</b>"});
}

var onChangeStatus = function(s)
{
	var t="";
	switch (s)
	{
		case 0:
				t="request not initialized";
				break;
		case 1:  t="server connection established"; break;
		case 2:  t="request received "; break;
		case 3:  t="processing request "; break;
		case 4:  t="request finished and response is ready"; break;
		default: t="Other: "+s; break;
	}
	fly.d(2, ">> Change Ajax Status : " + t);
}
















//////////////////////////////////////////////////////////////
// TRATAR CADASTRAR USER
var cadastrar_user_sucess = function(data) {
	onSuccess(data);
		//var d = JSON.parse(data.response)[0];
		var d = {"r":0, "t":"Verifique seu email para recuperar a senha!"};
	// GUSTAVO console.log(d.res);
	if (d.r!=0)
	{
    hideAlertDialog();
	  ons.notification.alert({messageHTML:"<font><br>" + d.t + "</font>", title: "<b>Ops!</b>"});
	}
	else
	{
    hideAlertDialog();
		ons.notification.alert({messageHTML:"<font><br>Cadastro realizado com sucesso!<br>Por favor, acesse seu email para confirmar o cadastro!<br>Pode demorar um tempinho para que o email chegue..</font>", title: "<b>Obrigado!</b>"})
		.then(function(name) {
			fromCadastroToLogin();
  		});
	}
}

var cadastrar_user_fail = function(data) {
  hideAlertDialog();
	onFail(data);
}

var bt_cadastrar_user_click_old = function() {
	document.getElementById('mbt').style.display='none';
  createLoadingDialog();
	fly.form2Server('f_cadastrar_user', onChangeStatus, cadastrar_user_sucess, cadastrar_user_fail);
}
// FIM - TRATAR CADASTRAR USER
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// TRATAR LOGIN USER

var entrar_user_sucess = function(data) {
  // Faz o print no console
  onSuccess(data);
	console.log(data);

	if (data != 0) {
		trataLogin(data);
	}
	else {
		ons.notification.alert({messageHTML:"<font>Algo Inesperado Ocorreu..</font>", title: "<b>Ops!</b>"});
		return;
	}

}

var entrar_user_fail = function(data) {
  hideAlertDialog();
	onFail(data);
}

var bt_entrar_user_click = function() {
  console.log("entrar_user_click");
  var email_value = document.getElementById("login_email").value;
  var senha_value = document.getElementById("login_senha").value;
  console.log(email_value);

  if (trata_entrar() == false)
    return;
	//document.getElementById('mbt').style.display='none';
  createLoadingDialog();

	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email_value, senha_value).then(function () {
			firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(function (doc) {
				var data = doc.data();

        if (firebase.auth().currentUser.emailVerified) {
          trataLogin(data);
          return;
        }

        var creationDate = new Date(data.a.cd);
        var currentDate = new Date();
        var timeDiff = Math.abs(currentDate.getTime() - creationDate.getTime());
        var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        /*console.log(data.a.cd);
        console.log(currentDate);
        console.log(dayDifference);*/
        if (dayDifference < 3) {
          trataLogin(data);
          return;
        }

        if (!firebase.auth().currentUser.emailVerified) {
          hideAlertDialog();
          ons.notification.alert({messageHTML:"<font>Por favor, veja o email de verificação enviado. Já se passaram 3 dias e você não confirmou.</font>", title: "<b>Erro no Login!</b>"}).then(logout);
          return;
        }
			}).catch(function (error) {
				var errorMessage = error.message;
				firebase.auth().signOut();
				hideAlertDialog();
				ons.notification.alert({messageHTML:"<font>Não tivemos acesso às suas informações, cheque sua conexão.</font>", title: "<b>Erro no Login!</b>"});
			});
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
			hideAlertDialog();
			ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Erro no Login!</b>"});
		  // ...
		});
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
		hideAlertDialog();
		ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title:"<b>Erro ao Conectar com Servidor</b>"})
  });
}

var bt_entrar_facebook_click = function () {
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({
	  'display': 'popup'
	});

	provider.addScope('user_birthday');
	provider.addScope('email');
	provider.addScope('user_gender');

	firebase.auth().signInWithPopup(provider).then(function(result) {
		if (result.credential) {
			createLoadingDialog();
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
			console.log(user);
		  // ...
			firebase.firestore().collection('users').doc(user.uid).get().then(function (doc) {
				var data = doc.data();
				if (!data.pessoal) {
					trataLogin(data);
				} else {

				}
			}).catch(function (error) {
				var errorMessage = error.message;
				firebase.auth().signOut();
				hideAlertDialog();
				ons.notification.alert({messageHTML:"<font>Não tivemos acesso às suas informações, cheque sua conexão.</font>", title: "<b>Erro no Login!</b>"});
			});
		}
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
		ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title:"Login com Facebook"});
	});
}

var bt_forgot_password = function () {
  console.log("forgot_password_click");
  var email_value = document.getElementById("forgot_email").value;
  console.log(email_value);

  if (trataEmail(email_value) == false)
    return;
	createLoadingDialog();
	firebase.auth().sendPasswordResetEmail(email_value).then(function () {
		hideAlertDialog();
		ons.notification.alert({messageHTML:"<font><br>Um email foi enviado para que a troca de senha seja completa!</font>", title: "<b>Email Enviado!</b>"}).then(goBack);
	});
}

var forgot_pass_sucess = function(data) {
  // Faz o print no console
  onSuccess(data);

  // Obtem o valor de retorno da função de login
	//var dd = JSON.parse(data.response)[0];
  var dd = {"r":0, "t":"Verifique seu email para recuperar a senha!"};

	console.log(dd);
	console.log("["+dd.r+"]");
	if (dd.r!=0)
	{
    hideAlertDialog();
	  ons.notification.alert({messageHTML:"<font><br>" + dd.t + "</font>", title: "<b>Ops!</b>"});
	}
	else
	{
    hideAlertDialog();
    ons.notification.alert({messageHTML:"<font><br>" + dd.txt + "</font>", title: "<b>Enviamos o email!</b>"});
    goBack();
	}
}

var forgot_pass_fail = function(data) {
  hideAlertDialog();
	onFail(data);
}

// FIM - TRATAR LOGIN USER
//////////////////////////////////////////////////////////////

var showStatus = function() {
	alert(StratusBar);
	StatusBar.show();
}

var showStatus2 = function() {
	alert(device);
	StatusBar.hide();
	alert(	cordova.platformId );
}

var goCadastro = function() {
    document.querySelector('#myNav').pushPage('pages/contog/cadastro_1.html', {
			 animation: 'fade'/*,
			 callback: onEnterCadastro*/
		 }).then(function () {onEnterCadastro();});
    //setTimeout(toastOff, 3000);
}
var goLogin = function() {
    document.querySelector('#myNav').pushPage('pages/contog/login.html', {
			 animation: 'fade'
		 });
    //setTimeout(toastOff, 3000);
}

var openComments = function () {
  document.querySelector('#myNav').pushPage('pages/contog/commentpage.html', {
			 animation: 'fade'/*,
			 callback: onEnterCadastro*/
		 }).then(function () {onEnterComments();});
}

var fromCadastroToLogin = function () {
  fly.d(9,"fromCadastroToLogin");

  if (fly.c.firsttime==0) {
        fly.d(9,"primeira vez");
        localforage.setItem ('firstTime', 1).then(goLogin);
  } else {
        fly.d(9,"não é primeira vez");
        goBack();
      }

}

var goSolicitaDetalhe = function(a,b,c) {
	fly.d(9,"==>goSolicitaDetalhe");
	fly.d(9,"AID:" + a + "PID:" + b +"STATUS:" + c );
  window.fly.c.atual_ag_id = a;
  window.fly.c.atual_so_id = b;
  window.fly.c.atual_ag_st = c;
    document.querySelector('#myNav').pushPage('pages/agendamento_detalhe.html', {
			 animation: 'fade',
			 callback: appEvents
		 });
    //setTimeout(toastOff, 3000);
}
var goAtendimentoDetalhe = function() {
    document.querySelector('#myNav').pushPage('pages/atendimento_detalhe.html', {
			 animation: 'fade',
			 callback: appEvents
		 });
    //setTimeout(toastOff, 3000);
}

var goNovoBoqueio = function(a,b) {
  window.fly.c.bloqueio_in_data = a;
  window.fly.c.bloqueio_in_hora = b;
    document.querySelector('#myNav').pushPage('pages/bloqueio.html', {
			 animation: 'fade',
			 callback: appEvents
		 });
    //setTimeout(toastOff, 3000);
}

var goBloqueioDetalhe = function() {
    document.querySelector('#myNav').pushPage('pages/bloqueio_detalhes.html', {
			 animation: 'fade',
			 callback: appEvents
		 });
    //setTimeout(toastOff, 3000);
}
var goAddBloqueio = function() {
    document.querySelector('#myNav').pushPage('pages/bloqueio.html', {
			 animation: 'fade',
			 callback: appEvents
		 });
    //setTimeout(toastOff, 3000);
}

var goApp = function() {
    /*document.querySelector('#myNav').pushPage('home_splitter.html', {
			 animation: 'fade',
			 callback: appEvents
		 });*/

     localforage.getItem('controle').then(function(value) {
        console.log(value);
          if (value!=null)
          {
            // Náo é a primeir
						// Maybe Try to Get Updated User Data
            if (value.uplan == "N") {
              document.querySelector('#myNav').pushPage('pages/contog/basichome.html', {
                animation: 'slide'
              }).then(function () {appBasicHomeLoad();});
            } else {
              document.querySelector('#myNav').pushPage('pages/contog/subscriber_home.html', {
                animation: 'slide'
              }).then(function () {appSubscriberHomeLoad();});
            }
            //goCadastro();
          }
          else {
            // É a primeira vez
            //document.querySelector('#myNav').pushPage('pages/contog/login.html');
            console.log("No User");
            // document.querySelector('#myNav').pushPage('pages/cadastro.html?v=7');
            // localforage.setItem('firstTime',1);
          }
        }).catch(function(err) {
        // This code runs if there were any errors
            console.log("Error");
      });
    //setTimeout(toastOff, 3000);
}

var appBasicHomeLoad = function () {
  createLoadingDialog();

  callUpdateBasicHomeData ();
};

var appSubscriberHomeLoad = function () {
  createLoadingDialog();

  callUpdateSubscriberHomeData ();
}

var goAgenda = function(){
	document.querySelector('#myNav').pushPage('pages/agenda.html', {
		animation:'fade',
		callback: agendaEvents
	});
}

var goMassagem = function(){
	document.querySelector('#myNav').pushPage('pages/massagem.html', {
		animation:'fade',
		callback: massagemEvents
	});
}

var openPref = function() {
    document.getElementById('myTab').setActiveTab(0);
}
var goAtende = function() {
    document.getElementById('myTab').setActiveTab(1);
}

// OPENMENU()
// Abre o Menu
var openMenu = function() {
    document.querySelector('#menu').open();
}


var goOutCadastro = function() {
	document.querySelector('#myNav').popPage({ animation: 'fade' });
}

var goBack = function () {
  console.log("GO BAAAAAAAAAAAAAAAAAAAAK");
  document.querySelector('#myNav').popPage({ animation: 'slide' });
}


var byId = function(id) {
	return document.getElementById(id);
}

	var carregaInfoProf=function()
	{
		byId("profNome").innerHTML =  fly.c.apelido;

	}

var goSolicita = function(i) {
  document.getElementById('myTab').setActiveTab(2);
}



var mostrarDialog = function(dialogo) {

  var dialog = document.getElementById(dialogo);

  if (dialog) {
    dialog.addEventListener('prehide', function() { fly.d(9,"PREHIDE"); });
    dialog.show();
    if (fly.c.status.disponivel==0){
		  byId('switch-disponivel').checked = false;
		}else {
			byId('switch-disponivel').checked = true;
		}
		if (fly.c.status.auto_confirmar==0){
			byId('switch-autoConfirmar').checked = false;
		}else {
			byId('switch-autoConfirmar').checked = true;
		}
		if (fly.c.status.pronto==0){
			byId('switch-pronto').checked = false;
		}else {
			byId('switch-pronto').checked = true;
		}
		if (fly.c.status.maca==0){
			byId('switch-maca').disabled = true;
		}else {
		  if (fly.c.status.com_maca==0)
		  {
			byId('switch-maca').checked = false;
		  }else {
			byId('switch-maca').checked = true;
		  }
    }
    byId("statusDialog").addEventListener("posthide",uiProfStatus);
  }
};

function onSwitchDisponivel()
{
  if (byId('switch-disponivel').checked)
  {
    window.fly.c.status.disponivel=1;
  }
  else {
    window.fly.c.status.disponivel=0;
  }
  // GUSTAVO console.log(window.fly.c.status.disponivel);
}

function mudarStatus(status){
   // var status = window.fly.c.status + statusNome;
   // GUSTAVO console.log(status);
   // GUSTAVO console.log(window.fly.c.status);
   switch (status) {
    case "disponivel":
    // GUSTAVO console.log("Abrir bloqueio de agenda");
      if (window.fly.c.status.disponivel == 1){
       window.fly.c.status.disponivel=0;
       // GUSTAVO console.log("desliga " + status);
      }else{
       window.fly.c.status.disponivel=1;
       // GUSTAVO console.log("liga " + status);
      }
      break;

    case "auto_confirmar":
      if (window.fly.c.status.auto_confirmar == 1){
       window.fly.c.status.auto_confirmar = 0;
       // GUSTAVO console.log("desliga " + status);
      }else{
       window.fly.c.status.auto_confirmar = 1;
          // GUSTAVO console.log("liga " + status);
      }
      break;

    case "pronto":
      if (window.fly.c.status.pronto == 1){
       window.fly.c.status.pronto=0;
       // GUSTAVO console.log("desliga " + status);
      }else{
       window.fly.c.status.pronto=1;
          // GUSTAVO console.log("liga " + status);
      }
      break;

    case "maca":
      if (window.fly.c.status.com_maca == 1){
       window.fly.c.status.com_maca=0;
       // GUSTAVO console.log("desliga " + status);
      }else{
       window.fly.c.status.com_maca=1;
          // GUSTAVO console.log("liga " + status);
      }
      break;
   }
      // GUSTAVO console.log(window.fly.c.status);
}



  //////////////////////////////////////////////////////////////
  // EVENTOS


  var agendaEvents = function(page){
    fly.data2Server("service=56;id="+window.fly.c.uid, function (e) {
      // GUSTAVO console.log(e);
    }, function (e) {
      // GUSTAVO console.log(e.response);
      let resp = JSON.parse(e.response);
      // GUSTAVO console.log(resp.d);
      let horario = JSON.parse(resp.d);
      // GUSTAVO console.log(horario);
      horario.forEach(function(el){
        json2Horario(el);
      });
    }, function (e) {
      // GUSTAVO console.log(e);
    });

    // GUSTAVO console.log("AgendaEvent");
    fill_calendar('agenda_w');

    document.querySelectorAll(".agenda_atendimento").forEach(function(e){
      e.addEventListener('click', function(event){
        let horario = getParent(event.target, 'ONS-LIST-ITEM').getAttribute('horario');
        document.getElementById('myNav').pushPage("pages/atender.html", {
          data:{horario:horario},
          callback:initialize_atender
        })
      });
    });
  }

  var initBloqueio = function (page) {
    // GUSTAVO console.log(page);
  }

  var initBloqueioDetalhes = function (page) {
    // GUSTAVO console.log(page);
  }

  var initAgenda = function (page) {

    var picker = new MaterialDatetimePicker({
      container:document.getElementById('agenda_toolbar')
    })
      .on('submit', function(d) {
          // output.innerText = d;
          // GUSTAVO console.log(calendar2date(d));
          document.getElementById('data').innerText = calendar2date(d);
      });

    document.getElementById('toolbar_calendar').addEventListener('click', function(e){
      // GUSTAVO console.log('ok');
      picker.open();
    }, false);

    agenda = new Agenda({
      containerHeight:document.querySelector('#agenda_events').offsetHeight,
      containerWidth:document.querySelector('#agenda_events').offsetWidth,
      timingsWidth: document.querySelector('#agenda_timings').offsetWidth
    });

    agenda.layOutDay(massagens);

    document.querySelectorAll('.agenda_event').forEach(function (agenda_event) {
      agenda_event.addEventListener('click', function (event) {
        // GUSTAVO console.log(getParent(event.target, 'DIV'));
        // GUSTAVO console.log(event.target.value);
        massagemId = event.target.value;
        goBloqueioDetalhes();
      });
    });

    document.getElementById('agenda_events').addEventListener('click', function (event) {
      // GUSTAVO console.log(event);
      // window.page.bloqueio.x = event.pageX;
      // window.page.bloqueio.y = event.pageY;
      // GUSTAVO console.log("Esse é o Y da pagina, olhe no lib/agenda.js para ver a função de transformar minutos em 'y': "+event.pageY);
      goBloqueio();
    });
  }

  var terapiasEvents = function(json){
    document.getElementById('terapia_terapeuta_switch').checked = json.pronto;
    document.getElementById('massagem_terapeutica_switch').checked = json.terapeutica;
    document.getElementById('massagem_relaxante_switch').checked = json.relaxante;
    document.getElementById('massagem_drenagem_switch').checked = json.drenagem;
    document.getElementById('massagem_shiatzu_switch').checked = json.shiatzu;
    document.getElementById('massagem_ayurvetica_switch').checked = json.ayurvetica;
    document.getElementById('massagem_esportiva_switch').checked = json.esportiva;
    document.getElementById('maca_switch').checked = json.maca;
    document.getElementById('tempo_pronto').innerText = json.tempo_pronto;
    document.getElementById('tempo_disponivel').innerText = json.tempo_disponivel;
  }

var goToPreviewPage = function (sId) {
  createLoadingDialog();

  if (document.getElementById('prereadpersonname') == null) {
    console.log(document.getElementById('prereadpersonname') + "aleh");
    document.getElementById('myNav').pushPage("pages/contog/prereadpage.html", {
            animation: 'slide',
            data:{sid: sId}/*,
            callback:callStoryPreread (sId)*/
    }).then(function (sid) {callStoryPreread(sId);});
  } else {
    callStoryPreread (sId);
  }
}

var goToFullList = function (lid) {
  createLoadingDialog();

  document.getElementById('myNav').pushPage("pages/contog/fulllist.html", {
            animation: 'slide',
    }).then(function () {callFullList(lid);});  
}

var goToPayment = function (value, planName) {
  document.getElementById('myNav').pushPage("pages/contog/paymentscreen1.html", {
            animation: 'slide'/*,
            data:{sid: sId},
            callback:callStoryPreread (sId)*/
  }).then(function () {
		window.sign_plan_value = value;
		window.sign_plan_name = planName;

		createLoadingDialog();
	  localforage.getItem("controle").then(function (value) {
	    uiUpdateFirstPaymentScreen(value);

	    hideAlertDialog();
	  }).catch(function(err) {
	    ons.notification.alert({messageHTML:"<font><br>" + err + "</font>", title: "<b>Ops!</b>"});
	    hideAlertDialog();
	  });
	});
}

var goToTerms = function () {
  document.getElementById('myNav').pushPage("pages/contog/termsheet.html", {
            animation: 'slide'
    });
}

var goToSecondPaymentPhase = function () {
	var nome_value = document.getElementById("payment-name").value;
	var cpf_value = document.getElementById("payment-cpf").value;
	var telefone_ddd_value = document.getElementById("payment-telefone-ddd").value;
	var telefone_number_value = document.getElementById("payment-telefone-numero").value;
	var birthdate_value = document.getElementById('payment-birthdate').value;
	console.log(birthdate_value);

  if (trataNome(nome_value) == false) {
    return;
  }
	if (trataCPF(cpf_value) == false) {
		return;
	}
	if (trataTelefoneDDD(telefone_number_value, telefone_ddd_value) == false) {
		return;
	}
	if (trataAniversario(birthdate_value) == false) {
		return;
	}

  localforage.getItem('controle').then(function ( item ){
    item['nome'] = nome_value;
		item.cpf = cpf_value;
		var auxDate = new Date(new Date(birthdate_value).getTime() + 24 * 60 * 60 * 1000);
		item.birthdate = auxDate.toString();
		var astral_value = zodiac(new Date(auxDate.getTime() + 24 * 60 * 60 * 1000).getDate(), new Date(auxDate.getTime() + 24 * 60 * 60 * 1000).getMonth()+1);
		item.astral_sign = astral_value;
		item.telefone.numero = telefone_number_value;
		item.telefone.areacode = telefone_ddd_value;

		var pessoal = getUserDataObjPessoal(item);
		var anonimo = getUserDataObjAnonimo(item);

		var database = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set ({
			p: pessoal,
			a: anonimo
		}).then (function (d) {
			trataSetPerfil();
		}).catch (function (error) {
			var errorMessage = error.message;
			//ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Falha no Cadastro</b>"});
			console.log(errorMessage);
		});

    localforage.setItem('controle', item).then(
			function () {
				document.getElementById('myNav').pushPage("pages/contog/paymentscreen2.html", {
			            animation: 'slide'/*,
			            data:{sid: sId},
			            callback:callStoryPreread (sId)*/
			  }).then(function () {
					//localforage.getItem('controle')
					//callSecondPScreenAddressLoad();
					createLoadingDialog();
				  localforage.getItem("controle").then(function (value) {
				    uiUpdateAddressSecondScreen(value);

				    hideAlertDialog();
				  }).catch(function(err) {
				    ons.notification.alert({messageHTML:"<font><br>"+ err + "</font>", title: "<b>Ops!</b>"});
				    hideAlertDialog();
				  });
				});
			}
		);
  });
}

var goToThirdPaymentPhase = function () {
	var value = JSON.parse('{'+
    '"street":"'+document.getElementById("update-address-street").value+'",'+
    '"number":"'+document.getElementById("update-address-number").value+'",'+
  '  "complement":"'+document.getElementById("update-address-complement").value+'",'+
    '"district":"'+document.getElementById("update-address-district").value+'",'+
    '"city":"'+document.getElementById("update-address-city").value+'",'+
    '"state":"'+document.getElementById("update-address-state").value+'",'+
    '"country":"'+document.getElementById("update-address-country").value+'",'+
    '"zipcode":"'+document.getElementById("update-address-zipcode").value+'"'+
  '}');


  console.log(value);

  if (trataEndereco() == false) {
    return;
  }

  localforage.getItem('controle').then(function ( item ){
    item['endereco'] = value;

		var pessoal = getUserDataObjPessoal(item);
		var anonimo = getUserDataObjAnonimo(item);

		var database = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set ({
			p: pessoal,
			a: anonimo
		}).then (function (d) {
			trataSetPerfil();
		}).catch (function (error) {
			var errorMessage = error.message;
			//ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Falha no Cadastro</b>"});
			console.log(errorMessage);
		});

    localforage.setItem('controle', item).then(
			function () {
				document.getElementById('myNav').pushPage("pages/contog/paymentscreen3.html", {
			            animation: 'slide'/*,
			            data:{sid: sId},
			            callback:callStoryPreread (sId)*/
			  }).then(function () {
					document.getElementById("payment-plan-value").innerHTML = window.sign_plan_value.toString().replace('.', ',');
					document.getElementById("payment-plan-name").innerHTML = window.sign_plan_name;
				});
			}
		);
  });
}

var goToPerfil = function () {
  createLoadingDialog();

  document.getElementById('myNav').pushPage("pages/contog/perfil.html", {
          animation: 'customDropAnimation'/*,
          callback:callPerfilLoad ()*/
  }).then(function () {callPerfilLoad();});
}

var goToPlans = function () {
  createLoadingDialog();

  document.getElementById('myNav').pushPage("pages/contog/myplanpage.html", {
          animation: 'slide'/*,
          callback: callPlanUpdate*/
  }).then(function () {callPlanUpdate();});
}

var goToReadPage = function (sId) {
  createLoadingDialog();
  document.getElementById('myNav').pushPage("pages/contog/onlyreadpage.html", {
          animation: 'slide',
          data:{sid: sId}/*,
          callback:callStoryRead (sId)*/
  }).then(function (sid) {callStoryRead(sId);});
}

var appEvents = function(page){
	/*document.getElementById('fab_plus').addEventListener('click', function(event){
		// goAgenda();
    goAtende();
	});*/
}

var initialize_atender = function(page){
  // GUSTAVO console.log(page.data);
}

var massagemEvents = function(page){
	// GUSTAVO console.log('pagina de massagem');
}

// FIM - EVENTOS
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// FUNCTIONS

function calendar2date(date) {
  let mes2number = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
  let data = date.toString().split(' ');
  let dia = data[2];
  let mes = data[1];
  let ano = data[3];

  // console.log();
  return dia+"/"+mes2number[mes]+"/"+ano;
}

function calendar2Server(date) {
	let mes2number = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
	let data = date.toString().split(' ');
	let dia = data[2];
	let mes = data[1];
	let ano = data[3];

	return ano+'-'+mes2number[mes]+'-'+dia;
}

function setLayOutBloqueios(bloqueios) {
	window.agenda.layOutDay(bloqueios);

	var massagens = document.getElementById('agenda_events').childNodes;

	massagens.forEach(function(massagem){
		// GUSTAVO console.log("ok");
		massagem.addEventListener('click', function(event){
			// window.page.massagem.cliente
			// document.getElementById('myNavigator').pushPage('pages/massagem.html');
			goMassagem();
			// console.log(event.target.value);
		});
	});
}

var setAgendaC = function(){
	// Aqui será setado as variaveis de controle da agenda
}

var clickCalendar = function (el){
	// GUSTAVO console.log(el);
	// GUSTAVO console.log("ID: "+ el.id);
}

var fill_calendar = function(el){

  var x='';
	var inicio=9;
	var step=30; // Tem que ser 10, 15, 20 ou 30 (divisor inteiro de 60)
	var final=22;
	var id_ini = inicio*(60/step);
	var id = id_ini;
  for (i=inicio;i<final;i++)
  {
		for (j=0; j<(60/step);j++)
		{
			if (i<10) hora = '0'; else hora='';
			hora += i	+'h'+(j*step);
			if (j==0) hora +='0';
    	x += '<ons-list-item id="'+id+'" class="agenda_horario" expandable>\
        <div class="left">'+hora+'</div>\
        <div class="center"><span class="tipo_da_massagem"></span><span class="nome_do_cliente"></span></div>\
        <ons-list class="expandable-content" modifier="noborder">\
              This gets shown when Im expanded\
        </ons-list>\
      </ons-list-item>\
      ';
			id++
		}
    }
  document.getElementById(el).innerHTML = x;
}

var json2Horario = function(json){
  let el = document.getElementById(json.horario);
  let tipo = el.querySelector(".tipo_da_massagem");
  let nome = el.querySelector(".nome_do_cliente");
  let expandable = el.querySelector(".expandable-content");

  tipo.innerText = json.tipo;
  nome.innerText = json.nome;

  expandable.innerHTML = '<ons-list-item>\
    <div class="left">Nome do cliente</div>\
    <div class="right"><span >'+json.nome+'</span></div>\
  </ons-list-item>\
  <ons-list-item>\
    <div class="left">Endereço: </div>\
    <div class="right"><span >'+json.endereco+'</span></div>\
  </ons-list-item>\
  <ons-list-item>\
    <div class="left">Ranking</div>\
    <div class="right"><span >'+json.ranking+'</span></div>\
  </ons-list-item>\
  <ons-list-item>\
    <div class="center"><span >'+json.maca+'</span></div>\
  </ons-list-item>\
  <ons-list-item>\
    <div class="center"><span >'+json.obs+'</span></div>\
  </ons-list-item>\
  <ons-list-item class="agenda_atendimento" horario="'+json.horario+'">\
    <div class="center"><span >Iniciar atendimento</span></div>\
  </ons-list-item>';
}


var fill_calendar_w = function(el){

  var x='';
	var inicio=9;
	var step=30; // Tem que ser 10, 15, 20 ou 30 (divisor inteiro de 60)
	var final=22;
	var id_ini = inicio*(60/step);
	var id = id_ini;

	x = '<ons-row class="calendar_w_header">\
		<ons-col width="20%">Hora</ons-col>\
		<ons-col width="10%">Seg</ons-col>\
		<ons-col width="10%">Ter</ons-col>\
		<ons-col width="10%">Qua</ons-col>\
		<ons-col width="10%">Qui</ons-col>\
		<ons-col width="10%">Sex</ons-col>\
		<ons-col width="10%">Sáb</ons-col>\
		<ons-col width="10%">Dom</ons-col>\
	</ons-row>\
	';

  for (i=inicio;i<final;i++)
  {
		for (j=0; j<(60/step);j++)
		{
			if (i<10) hora = '0'; else hora='';
			hora += i	+'h'+(j*step);
			if (j==0) hora +='0';
			d1 = ' class="b_green" onClick="alert(\'Aqui: d1 '+ hora +'\')"';
			d2 = ' ';
			d3 = ' ';
			d4 = ' ';
			d5 = ' ';
			d6 = ' ';
			d7 = ' ';
    	x += '<ons-row class="calendar_w">\
			  <ons-col width="20%">' + hora + '</ons-col>\
				<ons-col width="10%" ' + d1 + '></ons-col>\
				<ons-col width="10%"></ons-col>\
				<ons-col width="10%"></ons-col>\
				<ons-col width="10%"></ons-col>\
				<ons-col width="10%"></ons-col>\
				<ons-col width="10%"></ons-col>\
				<ons-col width="10%"></ons-col>\
			</ons-row>\
      ';
			id++
		}
    }
  document.getElementById(el).innerHTML = x;
}

var getParent = function(el,parent){
  if (el.tagName != parent) {
    return getParent(el.parentElement, parent);
  }
  return el;
}



// FIM - FUNCTIONS
//////////////////////////////////////////////////////////////

//  cronometro //
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
function inicio () {
  // GUSTAVO console.log("INICIO");
	control = setInterval(cronometro,10);
	document.getElementById("inicio").disabled = true;
	document.getElementById("parar").disabled = false;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = false;
}
function parar () {
  // GUSTAVO console.log("PARAR");
  onEncerrarAtendimento();

	clearInterval(control);
	document.querySelector(".page__background").style.backgroundColor = "#efeff4";
	document.querySelector(".comecar").style.visibility = "hidden";
	document.querySelector(".finalizar").innerHTML = "OK";
	document.querySelector(".cronometro").classList.add("piscar");

	// document.getElementById("parar").disabled = true;
	// document.getElementById("continuar").disabled = false;
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas == 10) { centesimas = "0"+centesimas }
		// Centesimas.innerHTML = ": "+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}

	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}
}

function trocar(e){
// GUSTAVO console.log("TROCAR");
// GUSTAVO console.log(window.fly.c.actual_atendimento)
  onIniciarAtendimento(window.fly.c.actual_atendimento);

	fundo = document.querySelector('.page__background');

  // console.log(window.page.massagem.cliente);

	if(e.classList.contains("comecou")){
		clearInterval(control);
		e.classList.remove("comecou");
		e.innerHTML = "INICIAR";
		fundo.style.backgroundColor = "#ffff00";
		fundo.style.opacity = 0.7;
	}else{
		control = setInterval(cronometro,10);
		e.classList.add("comecou");
		e.innerHTML = "PAUSAR";
		fundo.style.backgroundColor = "#1bc455";
		fundo.style.opacity = 0.5;
		document.querySelector(".finalizar").style.visibility = "visible";
	}
}


//===================
var lista_atende = function (d) {
var x = document.getElementById('lista_atende')
// GUSTAVO console.log(d);
if (d.res=="OK")
{
  x.style.display = "block";
  // GUSTAVO console.log(d.dados);
  dd = JSON.parse(d.dados);

  $template = '<ons-list-item id="atende_%status%" expandable modifier="longdivider">\
    <span class="left"><ons-icon icon="%icon%"> </ons-icon> &nbsp; %local%</span>\
    <span class="right">%data%</span>\
    <div class="expandable-content">%adicional%<br>\
    <br>Valor: R$ %preco%,00\
    <br>Tipo: %tipo% - %dura%\
    <br>Nome: %cli% - %ref%\
    <br>obs: %obs%\
    <br>\
    <ons-button style="display:%d1%" class="bg_azul_ispa" onClick="iniciar(%a_id%)">Iniciar Atendimento</ons-button>\
    <ons-button style="display:%d2%"  class="bg_laranja_ispa" onClick="cancelar(%idd%)">Cancelar</ons-button>\
    <ons-button style="display:%d3%"  class="bg_laranja_ispa" onClick="encerrar(%b_id%)">Finalizar</ons-button>\
    </div>\
    <br>\
  </ons-list-item>';



  window.fly.json2Element(dd, $template, "lista_atende");
  //x.innerHTML = dd.nome;
}

}


      function mostrarStatusDialog() {

        var dialog = document.getElementById('statusDialog');

        if (dialog) {
          dialog.show();
          if (window.fly.c.status.disponivel==0){
      		  document.getElementById('switch-disponivel').checked = false;
      		}else {
      			document.getElementById('switch-disponivel').checked = true;
      		}
      		if (window.fly.c.status.auto_confirmar==0){
      			document.getElementById('switch-autoConfirmar').checked = false;
      		}else {
      			document.getElementById('switch-autoConfirmar').checked = true;
      		}
      		if (window.fly.c.status.pronto==0){
      			document.getElementById('switch-pronto').checked = false;
      		}else {
      			document.getElementById('switch-pronto').checked = true;
      		}
      		if (window.fly.c.status.maca==0){
      			document.getElementById('switch-maca').disabled = true;
      		}else {
      		  if (window.fly.c.status.com_maca==0)
      		  {
      			document.getElementById('switch-maca').checked = false;
      		  }else {
      			document.getElementById('switch-maca').checked = true;
      		  }
          }
          document.getElementById("statusDialog").addEventListener("posthide", uiProfStatus);
        }
      };

      // var carregarStatus = function(){
      //   console.log("CARREGAR_STATUS");
      //   var icone_sim = '<ons-icon icon="fa-check-circle" style="color:#4Ba4BD;margin-left:4px;"></ons-icon>'
      //   var icone_nao = '<ons-icon icon="fa-times-circle" style="color:#ff6600;margin-left:4px;"></ons-icon>'
      //   var icone_nom = '<ons-icon icon="fa-times-circle" style="color:#999999;margin-left:4px;"></ons-icon>';
      //   if (window.fly.c.status.disponivel==0){
      //     document.getElementById('status-disponivel').innerHTML = 'Disponível' + icone_nao ;
      //   }else {
      //     document.getElementById('status-disponivel').innerHTML = 'Disponível' + icone_sim ;
      //   }
      //   if (window.fly.c.status.auto_confirmar==0){
      //     document.getElementById('status-autoConfirmar').innerHTML = 'Auto Confirmar' + icone_nao ;
      //   }else {
      //     document.getElementById('status-autoConfirmar').innerHTML = 'Auto Confirmar' + icone_sim ;
      //   }
      //   if (window.fly.c.status.pronto==0){
      //     document.getElementById('status-pronto').innerHTML = 'Pronto' + icone_nao;
      //   }else {
      //     document.getElementById('status-pronto').innerHTML = 'Pronto' + icone_sim;
      //   }
      //   if (window.fly.c.status.maca==0){
      //     document.getElementById('status-maca').innerHTML =  'Maca' + icone_nom;
      //   }else {
      //     if (window.fly.c.status.com_maca==0)
      //     {
      //     document.getElementById('status-maca').innerHTML = 'Maca' + icone_nao;
      //     }else {
      //     document.getElementById('status-maca').innerHTML = 'Maca' + icone_sim;
      //     }
      //   }
      // }


// função toca!

      var count=0;
      var tocando=0;
			var solicita=0;

      function toca(ja)
      {
				// Bloqueio aqui o aviso
				if (window.fly.c.em_atendimento==0)
				{


					  if ( (tocando==0) || (ja==1) )
		        {
		          tocando=1;
		          // GUSTAVO console.log("Toca: " + count);
		        // playSound('bump');
							if (fly.c.device==1)
							{
								if (ja==0)
								{
//									navigator.notification.beep(2);
									navigator.vibrate(2000);
								}
							} // no device
					    playSound('jump');
		          if (count<=10) {
								setTimeout(function(){ count++; toca(1); }, 500);
								} else {
								count=0;
								tocando=0;
								if (solicita>0)
								{
									setTimeout(function(){ toca(0); }, 5000);
								}
							}
		        }
					} // Em atendimento
      }


var logout = function()
{
	firebase.auth().signOut();
	window.fly.c = {
        "logado":   0,
        "uid":      "0",
        "tkn":      "NO TOKEN",
        "apelido":  "Apelido",
        "nome":     "Nome Completo",
        "foto":     "/img/no.png",
        "device":0,
        "online":0,
        "em_atendimento":0,
        "status": {
            "disponivel":0,
            "auto_confirmar":1,
            "pronto":0,
            "maca":0,
            "com_maca":0
          }
        }; // window.fly.c

				localforage.clear().then(function() {
				    // Run this code once the database has been entirely deleted.
						location.href='index.html';
            localforage.setItem ('firstTime', 1);
				}).catch(function(err) {
				    // This code runs if there were any errors
						alert("Aconteceu um erro no Logout")
				});

}

function openBloqueio(hora)
{
  var data = $('#calendar').fullCalendar('getDate');
  goNovoBoqueio(data.format(), hora);
}

var setupCalendar = function() {
      var m = moment();
      window.fly.atendimentos = [];

      $('#calendar').fullCalendar({
          header: {
             left: 'prev',
             center: 'title',
             right: 'next'
          },
          locale:"pt-br",
          navLinks: false, //true, // can click day/week names to navigate views
          editable: true, //true,
          eventLimit: true, // allow "more" link when too many events
          height: "parent", //650,
          minTime:"09:00:00",
          maxTime:"23:00:00",
          events: window.fly.atendimentos,
          eventClick: function(event) {
            if (event.aid) {
              if (event.aid!=0)
              {
                // GUSTAVO console.log("fire event: " + event.aid);
                window.fly.c.atual_at_id = event.aid;
                goAtendimentoDetalhe();
              }
              else
              {
                // GUSTAVO console.log("TRATAR BLOQUEIO");
                var resp = confirm("Deseja liberar este bloqueio?");
                if (resp==true)
                {
                  callLiberaBloqueio(event.id);

                }
              }
              //return false;
            }
          }
        });
        $('#calendar').fullCalendar('changeView', 'agendaDay');
        $('#calendar tbody').on('click', 'tr', function (e) {
        if (this.dataset.time)
        {
          openBloqueio(this.dataset.time);
          return false;
        }
      }); // calendar
      // GUSTAVO console.log('CALENDAR');
			//document.getElementById("waitsolicita").style.display = "none";
			document.getElementById("waitatende").style.display = "none";
    }
//////////////////////////////////////////////////////////
// POSTCHANGE
// Fazer um pra cada página
var onPostChange = function(e) {
  var page = e.target;
  fly.d(8,"(*) postChange:" + page.id)
  fly.d(8,e);

  if (page.id=='carousel')
  {
      fly.d(9,'Carousel changed to ' + e.activeIndex)
  }

// Trata mudanças no TabBar
  if (page.id=='myTab')
  {

    // Trata saídas
    if (lastPage==1)
    {
        //			fly.d(8,"Saí do Updates. Deve ter mudado cartão de alguêm...");
        //			data2Server("service=10;uid="+uid+";tkn="+tkn, tratarGetOther, falha);
    }
    lastPage = e.index;

    // Trata entradas
    if (e.index==0)
    { // A HOME aqui é sempre a VOLTA usando a TabBar
      // No caso da primeira entrada, usar o {pushpage splitter}

        fly.d(9,"Estou na home");
        uiProfStatus();
    }


          if (e.index==1)
          { // Página de listagem das SOLICITAÇÕES
						//document.getElementById("waitsolicita").style.display = "none";
						// document.getElementById("waitatende").style.display = "block";
            fly.d(9,"Estou na Solicitações")
            fly.d(9,"Chamando serviço solicitações");

            callAtende();
            setupCalendar();

          }

      if (e.index==2)
      { // Página de listagem das SOLICITAÇÕES
				//document.getElementById("waitsolicita").style.display = "none";
				document.getElementById("waitsolicita").style.display = "block";
        fly.d(9,"Estou na Solicitações")
        fly.d(9,"Chamando serviço solicitações");
        callSolicita();



			  //carregaInfoProf();
        //console.log('ok');
      }
      //
      // if (e.index == 4) {
      //   window.fly.data2Server("service=33",function(data){
      //     console.log(data);
      //   }, function(data){
      //     terapiasEvents(JSON.parse(JSON.parse(data.response).dados));
      //   }, function(data){
      //     console.log(data);
      //   });
      // }

      fly.d(9,"Mudou a tab: " + e.index);

    }; //if (page.id=='myTab')
}; //onPostChange


var onPagePush = function(event)
{
  fly.d(9, "On [onPagePush] bla");
  fly.d(9, event.enterPage.id);

  if ("cadastro"==event.enterPage.id)
  {
    fly.d(9, "Cadastro");
    fly.d(9, "LocalForage Test");

    localforage.getItem('cordova').then(function(value) {
      fly.d(9, value);
      fly.d_print("debug");
    }).catch(function(err) {
      // This code runs if there were any errors
      fly.d(0, "Erro getItem cordova");
      fly.d_print("debug");
    });

    fly.traduzir("pt-br", "cadastro");
  }

  if ("agendamento"==event.enterPage.id)
  {
    fly.d(9,"Estou nos detalhes de agendamento");
		ligaWait();
    callAgendamentoDetalhe();
  }

  if ("atendimento"==event.enterPage.id)
  {
    fly.d(9,"Estou nos detalhes de atendimento111");
		ligaWait();
		callAtendimentoDetalhe();
		callAvisos();
  }

  if ("novoBloqueio"==event.enterPage.id)
  {
    // GUSTAVO console.log(window.fly.c.bloqueio_in_data);
    // GUSTAVO console.log(window.fly.c.bloqueio_in_hora);
      document.getElementById('novoBloqueioData').value = window.fly.c.bloqueio_in_data;
      document.getElementById('bi').value = window.fly.c.bloqueio_in_hora;

      novaHora = window.fly.addHora(window.fly.c.bloqueio_in_hora, "02:00", false);
      document.getElementById('bf').value = novaHora;

  }

  if ("home_splitter"==event.enterPage.id)
  {
    fly.d(9,"Estou na home_splitter");

    callUpdate();
    call_com_uid( 55 /*getProf*/, atualiza_status_prof);

    window.fly.getup = setInterval(function(){ callUpdate(); },20000); // GUSTAVO
    setInterval(function(){ call_com_uid( 55 /*getProf*/, atualiza_status_prof); },91300); // GUSTAVO
    setInterval(function(){ callAvisos(); },92300); // GUSTAVO
    setInterval(function(){ callProxAtende() },111300); // GUSTAVO

  }
}; //onPagePush


var onPagePop = function(event)
{
  fly.d("On [onPagePop] bla");
  fly.d("Página = " + event.leavePage.id );
  //	fly.d(9,event);
  fly.d(event.leavePage.id);
  // Verifica qual página está sendo deixada e age!
  if ("cadastro"==event.leavePage.id)
  {
    //  fly.d(9,"VOLTAR");
    // form2Server('doshare', tratarGetShares, onFailCadastrar);
  }
  if ("massagem"==event.leavePage.id)
  {
    callAtendimentoDetalhe();
    //  fly.d(9,"VOLTAR");
    // form2Server('doshare', tratarGetShares, onFailCadastrar);
  }


}; //onPagePop


var createLoadingDialog = function() {
  var dialog = document.getElementById('my-alert-dialog');
	window.loadingTimeout = setTimeout(function() {
		hideAlertDialog();
		ons.notification.alert({messageHTML:"<font>Não conseguimos nos conectar com o servidor ou a conexão está fraca.</font>", title: "<b>Conexão Lenta</b>"});
	}, 30000);

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('pages/contog/loadingdialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var hideAlertDialog = function() {
	var dialog = document.getElementById('my-alert-dialog');

	clearInterval(window.loadingTimeout);

	if (dialog)
		dialog.hide();
};

var createRatingDialog = function() {
  var dialog = document.getElementById('my-rating-dialog');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('pages/contog/evaluatedialog.html', { append: true })
      .then(function(dialog) {
        starRatingClear();
        dialog.show();
      });
  }
};

var createUpdateDialog = function (title, field_name, control_field_name) {
  var dialog = document.getElementById('update-info-dialog');

  if (dialog) {
    document.getElementById("update-info-title").innerHTML = "<b>" + title + "</b>";

    if (control_field_name == 'birthdate') {
      document.getElementById("update-i-input").setAttribute("type", "date");
      //changeInputType(document.getElementById("update-i-input"), "date");
    } else {
      document.getElementById("update-i-input").setAttribute("type", "text");
      //changeInputType(document.getElementById("update-i-input"), "text");
    }

    window.field_name = field_name;
    window.control_field_name = control_field_name;
    dialog.show();
  } else {
    ons.createElement('pages/contog/updateInfo.html', { append: true })
      .then(function(dialog) {
        updateInfoClear();

        if (control_field_name == 'birthdate') {
          document.getElementById("update-i-input").setAttribute("type", "date");
          //changeInputType(document.getElementById("update-i-input"), "date");
        } else {
          document.getElementById("update-i-input").setAttribute("type", "text");
          //changeInputType(document.getElementById("update-i-input"), "text");
        }

        window.field_name = field_name;
        window.control_field_name = control_field_name;
        document.getElementById("update-info-title").innerHTML = "<b>" + title + "</b>";
        dialog.show();
      });
  }
}

var createUpdateAddressDialog = function (field_name, control_field_name) {
  /*var dialog = document.getElementById('update-address-dialog');

  if (dialog) {
    window.field_name = field_name;
    window.control_field_name = control_field_name;
    dialog.show();
  } else {*/
    /*ons.createElement('pages/contog/updateAddressDialog.html', { append: true })
      .then(function(dialog) {
        updateAddressClear();

        window.field_name = field_name;
        window.control_field_name = control_field_name;
        dialog.show();
      });*/

			document.querySelector('#myNav').pushPage('pages/contog/addressCaptation.html').then(function () {
				updateAddressClear();

        window.field_name = field_name;
        window.control_field_name = control_field_name;
			});
  //}
}

function createUpdateTelefoneDialog (field_name, control_field_name) {
	var dialog = document.getElementById('update-info-telefone-dialog');

  if (dialog) {
    window.field_name = field_name;
    window.control_field_name = control_field_name;
    dialog.show();
  } else {
    ons.createElement('pages/contog/updateInfoTelefone.html', { append: true })
      .then(function(dialog) {
        updateInfoTelefoneClear();

        window.field_name = field_name;
        window.control_field_name = control_field_name;
        dialog.show();
      });
  }
}

function changeInputType(oldObject, oType) {
    var newObject = ons.createElement('updateinfoinput.html');
    newObject.type = oType;
    if(oldObject.size) newObject.size = oldObject.size;
    if(oldObject.value) newObject.value = oldObject.value;
    if(oldObject.name) newObject.name = oldObject.name;
    if(oldObject.id) newObject.id = oldObject.id;
    if(oldObject.className) newObject.className = oldObject.className;
    if(oldObject.style) newObject.style = oldObject.style;
    oldObject.parentNode.replaceChild(newObject,oldObject);
    return newObject;
};

var hideRatingDialog = function() {
  starRatingClear();

  document
    .getElementById('my-rating-dialog')
    .hide();
};

var hideUpdateDialog = function () {
  updateInfoClear();

  document
    .getElementById('update-info-dialog')
    .hide();
}

var hideUpdateTelefoneDialog = function () {
  updateInfoTelefoneClear();

  document
    .getElementById('update-info-telefone-dialog')
    .hide();
}

/*var hideAddressDialog = function () {
	updateAddressClear();

	document.getElementById('update-address-dialog').hide();
}*/

var openMenu = function (target) {
  console.log("openmenu");

  if (document.getElementById('popoverbasic') != null &&
      document.getElementById('popoverbasic').style.display == 'none') {
    document.getElementById('popoverbasic').show(target);
  }
  else {
    ons.createElement('pages/contog/popmenu.html', {append: true}).then(function(popover) {
      console.log("ronaldo");

      try {
        popover.show(target);
        console.log("ok - menu");
      } catch (e) {
        console.log("erro - " + e);
      }
    });
  }
};

var openIntroPopup = function () {
	var dialog = document.getElementById('intro-dialog');

  if (dialog) {
		createLoadingDialog();
		localforage.getItem('controle').then(function(value) {
					console.log(value);
						if (value!=null)
						{
							document.getElementById("intro-dialog-name").innerHTML = " " + value.apelido;
							hideAlertDialog();
							dialog.show();
						}
						else {
							// É a primeira vez
							//document.querySelector('#myNav').pushPage('pages/contog/login.html');
							hideAlertDialog();
							dialog.show();
							// document.querySelector('#myNav').pushPage('pages/cadastro.html?v=7');
							// localforage.setItem('firstTime',1);
						}
					}).catch(function(err) {
					// This code runs if there were any errors
							hideAlertDialog();
							dialog.show();
				});
  } else {
    ons.createElement('pages/contog/intro_popup.html', { append: true })
      .then(function(dialog) {
				createLoadingDialog();
				localforage.getItem('controle').then(function(value) {
			        console.log(value);
			          if (value!=null)
			          {
									document.getElementById("intro-dialog-name").innerHTML = " " + value.apelido;
									hideAlertDialog();
									dialog.show();
			          }
			          else {
			            // É a primeira vez
			            //document.querySelector('#myNav').pushPage('pages/contog/login.html');
			            hideAlertDialog();
			            dialog.show();
			            // document.querySelector('#myNav').pushPage('pages/cadastro.html?v=7');
			            // localforage.setItem('firstTime',1);
			          }
			        }).catch(function(err) {
			        // This code runs if there were any errors
									hideAlertDialog();
									dialog.show();
			      });
      });
  }
};

var openSpecificIntroPopup = function (idHtml, fileHtml) {
	var dialog = document.getElementById(idHtml);

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('pages/contog/' + fileHtml, { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
}

var closeIntroPopup = function (idDialog) {
	var dialog = document.getElementById(idDialog);

  if (dialog) {
    dialog.hide();
  }
}

var closeMenu = function (popoverId) {
  document.getElementById(popoverId).hide();
};

var updateSearch = function (searchstr) {
  createLoadingDialog();

	if (trataSearch (searchstr) == false) {
		hideAlertDialog();
		return;
	}

  callSearchStories (searchstr);
};

var categorySelector = function (selector) {

}

var categoryBasicSelector = function (selector) {

}

var filterBasicSelector = function (selector) {
  switch (selector.value) {
    case "f":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          var dd = getBasicFreeRes (value);
          $template = '';

          for (var i in dd)
          {
						if (i == "length")
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/
            $template += getFreeStoryHTML(dd[i]);
          }
          x.innerHTML = $template;

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    case "s":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          var dd = getBasicListeners (value);
          $template = '';

          for (var i in dd)
          {
						if (i == "length")
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/
            $template += getFreeStoryHTML(dd[i]);
          }
          x.innerHTML = $template;

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    default:
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          var dd = value;
          $template = '';

          for (var i in dd)
          {
						if (i == "length")
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/
            $template += getFreeStoryHTML(dd[i]);
          }
          x.innerHTML = $template;

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
  }
  document.getElementById("choose-sel-order").selectedIndex = "0";
}

var filterSelector = function (selector) {
  switch (selector.value) {
    case "f":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          var dd = getFreeRes (value);
          $template = '';

          for (var i in dd)
          {
						if (i == "length")
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/
            $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid +'" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';
          }
          x.innerHTML = $template;

					for (var i in dd)
			    {
						if (i == "length")
							continue;
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    case "s":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          var dd = getListeners (value);
          $template = '';

          for (var i in dd)
          {
						if (i == "length")
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';
          }
          x.innerHTML = $template;

					for (var i in dd)
			    {
						if (i == "length")
							continue;
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    default:
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          var dd = value;
          $template = '';
          var shuffleArray = [];

          for (var i in dd)
          {
						if (i == "length")
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            var aux = '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';

            shuffleArray.push(aux);
          }

          shuffleArray = fisherYates(shuffleArray);

          for (var i = 0; i < shuffleArray.length; i++) {
              $template += shuffleArray[i];
          }
          x.innerHTML = $template;

					for (var i in dd)
			    {
						if (i == "length")
							continue;
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
  }
  document.getElementById("choose-sel-order").selectedIndex = "0";
}

var filterForOrdering = function (value) {
  var selector = document.getElementById("choose-sel-filter").value;

  switch (selector) {
    case "f":
      return getFreeRes (value);
    case "s":
      return getListeners (value);
    default:
			result = {};

			for (var i in value) {
				if (i == "length")
					continue;

				result[i] = value[i];
			}
      return result;
  }
}

var filterBasicForOrdering = function (value) {
  var selector = document.getElementById("choose-sel-filter").value;

  switch (selector) {
    case "f":
      return getBasicFreeRes (value);
    case "s":
      return getBasicListeners (value);
    default:
      return value;
  }
}

var orderSelector = function (selector) {
  switch (selector.value) {
    case "v":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterForOrdering(value);
          var dd = getSortingViewRes (value);
          $template = '';

          for (i=0; i<dd.length; i++)
          {
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';
          }
          x.innerHTML = $template;

					for (i=0; i<dd.length; i++)
			    {
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    case "r":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');

          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterForOrdering(value);
          var dd = getSortingRatingRes (value);
          $template = '';

          for (i=0; i<dd.length; i++)
          {
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';
          }
          x.innerHTML = $template;

					for (i=0; i<dd.length; i++)
			    {
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    case "newest":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterForOrdering(value);
          var dd = getSortingNewestRes (value);
          $template = '';

          for (i=0; i<dd.length; i++)
          {
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';
          }
          x.innerHTML = $template;

					for (i=0; i<dd.length; i++)
			    {
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    default:
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterForOrdering(value);
          var dd = value;
          $template = '';
          var shuffleArray = [];

          for (var i in dd)
          {
						if (i == length)
							continue;
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            var aux = '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
      '            <div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-' + dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd[i].title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(value[dd[i].storyid].rating, value[dd[i].storyid].num_rating) +
      '                  <u>' + getViewsText(dd[i].views) + '</u>'+
      '              </div></div>'+
      '                <div style="width: 100%; vertical-align: middle;">'+
      '                  <div class="left inline" style="width: 30%; vertical-align: middle;">'+
      /*'                    <p class="redtext bold">Review</p>'+*/
      '                  </div>'+
      '                  <div class="right redtext inline" style="width: 50%; vertical-align: middle;">'+
//'                    <ons-icon class="music-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
/*'                    <ons-icon class="play-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+
'                    <ons-icon class="heart-outline-icon-red" fixed-width="true" style="vertical-align: middle; display: inline-block;margin: 0px 2px; width: 25px; height: 25px;" size="25px"></ons-icon>'+*/
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '          </div>';

            shuffleArray.push(aux);
          }

          shuffleArray = fisherYates(shuffleArray);

          for (var i = 0; i < shuffleArray.length; i++) {
              $template += shuffleArray[i];
          }
          x.innerHTML = $template;

					for (var i in dd)
			    {
						if (i == length)
							continue;
			      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
			    }

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
  }
}

var orderBasicSelector = function (selector) {
  switch (selector.value) {
    case "v":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterBasicForOrdering(value);
          var dd = value.sort(cmpView);
          $template = '';

          for (i=0; i<dd.length; i++)
          {
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += getFreeStoryHTML(dd[i]);
          }
          x.innerHTML = $template;

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    case "r":
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterBasicForOrdering(value);
          var dd = value.sort(cmpRating);
          $template = '';

          for (i=0; i<dd.length; i++)
          {
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += getFreeStoryHTML(dd[i]);
          }
          x.innerHTML = $template;

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
    default:
      localforage.getItem('basicdata').then(function(value) {
        createLoadingDialog();

        if (value == null) {
          uiNoStories();
          hideAlertDialog();
        } else {
          var x = document.getElementById('story_list');
          x.innerHTML = "";
          //dd = JSON.parse(sData.dados);
          value = filterBasicForOrdering(value);
          var dd = value;
          $template = '';

          for (i=0; i<dd.length; i++)
          {
            /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
            toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
            $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

            $template += getFreeStoryHTML(dd[i]);
          }
          x.innerHTML = $template;

          if (dd.length == 0) {
            uiNoStories();
          }

          hideAlertDialog();
        }
      });
      break;
  }
}

var cmpRating = function(a, b) {
	var avgA;
	if (a.num_rating > 0)
		avgA = a.rating / a.num_rating;
	else avgA = 0;
	var avgB;
	if (b.num_rating > 0) avgB = b.rating / b.num_rating;
	else avgB = 0;
  if (avgA < avgB)
    return 1;
  if (avgA > avgB)
    return -1;
  return 0;
}

var cmpView = function(a, b) {
  if (a.views < b.views)
    return 1;
  if (a.views > b.views)
    return -1;
  return 0;
}

var cmpNewest = function (a, b) {
  var timestampa = new firebase.firestore.Timestamp (a.ld.seconds, a.ld.nanoseconds);
  var ta = timestampa.toDate();
  var timestampb = new firebase.firestore.Timestamp (b.ld.seconds, b.ld.nanoseconds);
  var tb = timestampb.toDate();
  return ta>tb ? -1 : ta<tb ? 1 : 0;
}

var getSortingRatingRes = function (data) {
  var result = [];

	var array_values = [];

	for (var key in data) {
		if (key  == "length") {
			continue;
		}
		array_values.push(data[key]);
	}
	console.log(array_values);

  result = array_values.sort(cmpRating);

  return result;
}

var getSortingNewestRes = function (data) {
  var result = [];

	var array_values = [];

	for (var key in data) {
		if (key  == "length") {
			continue;
		}
		array_values.push(data[key]);
	}
  console.log("newest")
	console.log(array_values);

  try {
    result = array_values.sort(cmpNewest);
    console.log("Ronaldo")
  } catch (e) {
    console.log(e.message);
  }

  return result;
}

var getSortingViewRes = function (data) {
  var result = [];

	var array_values = new Array();

	for (var key in data) {
		if (key  == "length") {
			continue;
		}
	  array_values.push(data[key]);
	}

  result = array_values.sort(cmpView);

  return result;
}

var playMusic = function (srcFile) {
  console.log("========================================entrei no play music");


  /*if (srcFile == "") {
    //srcFile = "/assets/sounds/simpleplanperfect.mp3";
    window.media = null;
    return;
  }*/
	//var srcFile = "simpleplanperfect.mp3";
  //var mediafile = getPath() + "/assets/sounds/" + srcFile;
	/*try {
		var mediafile = "https://www.contog.com.br/php/getAudio.php?chave=TAUADISNEY&id=" + srcFile;
		//var mediafile = "./assets/sounds/simpleplanperfect.mp3";
  	window.media = new Media (mediafile, onSuccess, onError);
	} catch (e) {
		//console.log("error loading media");
		//alert(e.stack);
		window.media = null;
	}*/
	loadMusic(srcFile);
}

function onSuccess(){
    console.log("Successfully initialize a media file.");
}

function onError(error){
    console.log("Failed to initialize a media file. [ Error code: " + error.code + ", Error message: " + error.message + "]");
		window.media = null;
}

function getPath() {
    var str = location.pathname;
    var i = str.lastIndexOf('/');
    return str.substring(0,i+1);
}

function playSound(){
    // play the media file one time.
    window.media.play({numberOfLoops: 0});
    document.getElementById('playController').style.display="none";
    document.getElementById('pauseController').style.display="block";

    // start the timer
    if (window.mediaTimer == null) {
      window.mediaTimer = setInterval(function() {
        // Return a current playback position
        window.media.getCurrentPosition(
          //A Callback function if it's success
          function(position) {
            fly.c.pos=position;
                if (position > -1) {
                    //If the playback stops at "-0.001" position, set the timer to 0.
                    if(position == -0.001){
                      position = 0;
                    }
                    var duration = window.media.getDuration();
                    setAudioPosition(position, duration);
                }
          },
          //A callback function in case of failure
          function(error) {
            console.log("Error getting pos=" + error);
            setAudioPosition(0, "Erro");
          }
        );
      }, 1000);
    }
};

function onSlideController () {
  if (media) {
    pauseSound();
    var duration = window.media.getDuration();
    var newValue = document.getElementById('rangeController').value * (duration + 1) / 100;
    window.media.seekTo((newValue - 1) * 1000); // Needs to be defined in miliseconds, so we must multiply the value by 1000
    playSound();
  }
}

function pauseSound(){
  if (window.media) {
      document.getElementById('playController').style.display="block";
      document.getElementById('pauseController').style.display="none";
      window.media.pause();
  }
}

function stopSound(){
  if (window.media) {
  //    window.media.stop();
  window.media.pause();
      clearInterval(window.mediaTimer);
      window.mediaTimer=null;
  }
}

function setAudioPosition(position, duration) {
    document.getElementById('audio_position').innerHTML = getDurationText(duration);
    document.getElementById('rangeController').value = 100*((position + 1) / (duration+1));
}

function getDurationText (duration) {
  var text = "";

  duration = Math.floor(duration);

  text += (duration%60);
  if (duration < 10)
    text = "0" + text;

  duration = Math.floor(duration / 60);
  text = (duration%60) + ":" + text;
  if (duration < 10)
    text = "0" + text;

  duration = Math.floor(duration / 60);
  text = (duration%60) + ":" + text;

  return text;
}

var starRatingClick = function (rating) {
  var i = 1;
  window.rating = rating;

  while (i <= rating) {
    document.getElementById('starEval' + i).style.color = "#d00";

    i++;
  }
  while (i <= 5) {
    document.getElementById('starEval' + i).style.color = "#ccc";

    i++;
  }
}

var starRatingClear = function () {
  var i = 1;
  window.rating = 0;
  document.getElementById("story-comment").value = "";

  while (i <= 5) {
    document.getElementById('starEval' + i).style.color = "#ccc";

    i++;
  }
}

var updateInfoClear = function () {
  window.field_name = "";
  document.getElementById("update-info-title").innerHTML = "";
  document.getElementById("update-i-input").value = "";
}

var updateInfoTelefoneClear = function () {
  window.field_name = "";
  document.getElementById("update-telefone-ddd").value = "";
  document.getElementById("update-telefone-input").value = "";
}

var updateAddressClear = function () {
	window.field_name = "";
}

var getListeners = function (data) {
  var result = {};

  for (var i in data) {
		if (i == "length")
			continue;
    if (data[i].musicRecorded != undefined &&
				data[i].musicRecorded != null &&
        data[i].musicRecorded != false) {
          result[i] = data[i];
        }
  }

  return result;
}

var getBasicListeners = function (data) {
  var result = {};

	for (var i in data) {
		if (i == "length")
			continue;
    if (data[i].musicRecorded != undefined &&
				data[i].musicRecorded != null &&
        data[i].musicRecorded != false) {
          result[i] = data[i];
        }
  }

  return result;
}

var getFreeRes = function (data) {
  var result = {};

  for (var i in data) {
		if (i == "length")
			continue;
    if (data[i].free) {
      result[i] = data[i];
    }
  }

  return result;
}

var getBasicFreeRes = function (data) {
  var result = {};

  for (var i in data) {
		if (i == "length")
			continue;
    if (data[i].free) {
      result[i] = data[i];
    }
  }

  return result;
}

var getSearchRes = function (str, data) {
  var result = {};
  str = str.toLowerCase();

  for (var i in data) {
		if (i == "length")
			continue;
    if (data[i].title.toLowerCase().includes(str) ||
        data[i].description.toLowerCase().includes(str)) {
          result[i] = data[i];
        }
  }

  return result;
}

var openAppRating = function () {
  AppRate.preferences.storeAppURL = {
    android: 'market://details?id=app.developer.contog'
  };
  AppRate.preferences.useLanguage = 'br';
  
  AppRate.promptForRating();
}



    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('update-address-street').value=(conteudo.logradouro);
            document.getElementById('update-address-district').value=(conteudo.bairro);
            document.getElementById('update-address-city').value=(conteudo.localidade);
            document.getElementById('update-address-state').value=(conteudo.uf);
						document.getElementById('update-address-country').value="BRA";
        } //end if.
        else {
            //CEP não Encontrado.
            //updateAddressClear();
            ons.notification.alert({messageHTML:"<font><br>"+ "CEP Não Encontrado" + "</font>", title: "<b>Ops!</b>"});
        }
    }

    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('update-address-street').value="...";
                document.getElementById('update-address-district').value="...";
                document.getElementById('update-address-city').value="...";
                document.getElementById('update-address-state').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
								//updateAddressClear();
                //alert("Formato de CEP inválido, não reconhecido no Brasil.");
								ons.notification.alert({messageHTML:"<font><br>Formato de CEP inválido, não reconhecido no Brasil</font>", title: "<b>Ops!</b>"});
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            updateAddressClear();
        }
    };


function getUserDataObjPessoal (item) {
	var pessoal = {"n":item.nome, "pn":item.apelido, "e":item.endereco,
              "t": item.telefone,
              "cpf":item.cpf,
              "i":item.image};


	return pessoal;
}

function getUserDataObjAnonimo (item) {
	var anonimo = {"uplan":item.uplan, "l": "1", "b":item.birthdate, "c":item.cartao,
                  "as":item.astral_sign, "p":item.profissao, "s":item.sexo, "f":item.favoritos,
									"fmr":item.freeMonthReceived};

	if (typeof item["ratings"] !== "undefined")
		anonimo['ratings'] = item["ratings"];

	return anonimo;
}


/*
	AdMob functions
*/

    function initAds() {
			try {
	      if (admob) {
	        var adPublisherIds = {
	          ios : {
	            banner : "ca-app-pub-7052027143959248/4554923886",
	            interstitial : "ca-app-pub-7052027143959248/1663847298"
	          },
	          android : {
	            banner : "ca-app-pub-7052027143959248/8670897324",
	            interstitial : "ca-app-pub-7052027143959248/5086875536"
	          }
	        };

	        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

	        admob.setOptions({
	          publisherId:          admobid.banner,
	          interstitialAdId:     admobid.interstitial,
	          autoShowBanner:       true,
	          autoShowInterstitial: false,
	          autoShowRewarded:     false,
	          tappxIdiOS:           "pub-47436-ios-5026",
	          tappxIdAndroid:       "pub-47435-android-4926",
	          tappxShare:           0.5,
	        });

	        registerAdEvents();

	      } else {
	        alert('AdMobAds plugin not ready');
	      }
			} catch (error) {
				console.log(error);
			}
    }

    function onAdLoaded(e) {
      if (isAppForeground) {
        if (e.adType === admob.AD_TYPE.AD_TYPE_BANNER) {
          console.log("New banner received");
        } else if (e.adType === admob.INTERSTITIAL) {
          console.log("An interstitial has been loaded and autoshown. If you want to automatically show the interstitial ad, set 'autoShowInterstitial: true' in admob.setOptions() or remove it");
          admob.showInterstitialAd();
        } else if (e.adType === admob.AD_TYPE_REWARDED) {
          console.log("New rewarded ad received");
          admob.showRewardedAd();
        }
      }
    }

    function onPause() {
      if (isAppForeground) {
        admob.destroyBannerView();
        isAppForeground = false;
      }
    }

    function onResume() {
      if (!isAppForeground) {
        setTimeout(admob.createBannerView, 1);
        setTimeout(admob.requestInterstitialAd, 1);
        isAppForeground = true;
      }
    }

    // optional, in case respond to events
    function registerAdEvents() {
      document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
      document.addEventListener(admob.events.onAdFailedToLoad, function (e) {});
      document.addEventListener(admob.events.onAdOpened, function (e) {});
      document.addEventListener(admob.events.onAdClosed, function (e) {});
      document.addEventListener(admob.events.onAdLeftApplication, function (e) {});

      document.addEventListener("pause", onPause, false);
      document.addEventListener("resume", onResume, false);
    }

var getSignText = function (sign, sex) {
  if (sign == "")
    return sign;

  var zodiac =['', 'Capricórnio', 'Aquário', 'Peixes', 'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio'];

  var res = "";
  console.log(sex);
  switch (sign) {
    case "Libra":
      res = "Libr";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Escorpião":
      res = "Escorp";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Sargitário":
      res = "Sargitár";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Capricórnio":
      res = "Capricórn";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Aquário":
      res = "Aquar";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Peixes":
      res = "Piscin";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Áries":
      res = "Ár";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Touro":
      res = "Taur";
      if (sex == "M") res += "ino";
      else if (sex == "F") res += "ina";
      else res += "inx";
      break;
    case "Gêmeos":
      res = "Gemin";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Câncer":
      res = "Cancer";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    case "Leão":
      res = "Leon";
      if (sex == "M") res += "ino";
      else if (sex == "F") res += "ina";
      else res += "inx";
      break;
    case "Virgem":
      res = "Virgin";
      if (sex == "M") res += "iano";
      else if (sex == "F") res += "iana";
      else res += "ianx";
      break;
    default:
      break;
  }

  return res;
}