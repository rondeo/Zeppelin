// GLOBAL

// display debug to console?
// Função guarda pra imprimir em um TEXTAREA.
// Se true, já joga pro console.log
var console_debug = true;

///////////////////////////////////////////////////////////////////////////////////////////////////
// fly
///////////////////////////////////////////////////////////////////////////////////////////////////

window.fly={};
window.fly.c = { 	"token":"NO TOKEN",
					"device":0,
					"online":0
};

window.fly.data = {};
// url TO WEBSERVICES
window.fly.url="";

///////////////////////////////////////////////////////////////////////////////////////////////////
// INIT
window.fly.init = function(url) {
	// Cria os estilos para hide e show
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.flyJS_hideElem { visibility:hidden !important;	display:none !important; }';
	document.getElementsByTagName('head')[0].appendChild(style);

	// Acerta url
	if (url!==undefined) {
		window.fly.url = url;
		fly.d(9,"[CALL] init with url [" + url + "]");
	}
	else {
		fly.d(9,"[CALL] init without url");
	}

fly.c.ematendimento=0;
}

window.fly.dataTxt = function(dd)
{
	dd[10]='T'; // FOrça ISO
	var dt = new Date(dd);
	dia = dt.getDate();
	mes = dt.getMonth()+1;
	ano = dt.getFullYear();
	hora = dt.getHours();
	min = dt.getMinutes();
	if (min<10) {min = "0"+min;}
	return("" + dia + "/" + mes + "/" + ano + " " + hora + "h" + min);
}
window.fly.loadRequiredFiles = function (scripts, styles, callback) {
        // var scripts = ['xx.js', 'yy.js'];
        // var styles = ['zz.css'];
        var filesloaded = 0;
        var filestoload = scripts.length + styles.length;
        for (var i = 0; i < scripts.length; i++) {
            log('Loading script ' + scripts[i]);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scripts[i];
            script.onload = function () {
                log('Loaded script');
                log(this);
                filesloaded++;  // (This means increment, i.e. add one)
                finishLoad();
            };
            document.head.appendChild(script);
        }
        for (var i = 0; i < styles.length; i++) {
            log('Loading style ' + styles[i]);
            var style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = styles[i];
            style.type = 'text/css';
            style.onload = function () {
                log('Loaded style');
                log(this);
                filesloaded++;
                finishLoad();
            };
            document.head.appendChild(style);
        }
        function finishLoad() {
            if (filesloaded === filestoload) {
                callback();
            }
        }
    };


///////////////////////////////////////////////////////////////////////////////////////////////////
// DEBUG

//  Array com as classes de mensagens que devem ser mostradas
// 9 -> [CALL] debug messages
// 0 -> Error mesages
// default....
window.fly.levelToDisplay = [0,9]; //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Array base que armazena as mensagens
// Necessário pois muitas vezes num App usando Onsen, as coisas não estão criadas
// Permite "imprimir" o log em um controle do tipo TEXTAREA
window.fly.d_base = [];

// Função que cria entrada de LOG
// Tem que ir definindo "niveis" para depois ligar ou desligar
window.fly.d = function (level, txt) {

	if (fly.levelToDisplay.indexOf(level)!=-1) {
  		fly.d_base.push({"level":level, "txt":txt}) ;
  		if (console_debug) { console.log(txt); }
	}
};

window.fly.d_clear = function () {
  window.fly.d_base = [];
};

window.fly.d_print = function (dom, levels) {
	if (levels==undefined) {
		levels = fly.levelToDisplay;
	}
	var temp = document.getElementById(dom);
	if (temp==undefined)
	{
		console.log("fly.d_print\nNão tenho onde imprimir o log: em " + dom + "!");
	}
	else
	{
		temp.value = "Debug: " + Date();
		for (var i = 0; i <fly.d_base.length; i++) {
			if (levels.indexOf(fly.d_base[i].level)!=-1) {
				temp.value += "\n";
				temp.value += fly.d_base[i].txt;
			}
		}
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// TRADUTOR

window.fly.t_base = { 	"Voltar":{"pt-br":"Voltar", "en":"Back", "it":"Prima", "fr":"Arrière"},
						"Saída":{"pt-br":"Saída", "en":"Exit", "it":"Uscita", "fr":"Sortie"},
						"cadastrar-bt":{"pt-br":"Crie sua conta", "en":"Sign up", "it":"Creare account", "fr":"créer un compte"},
						"login-title":{"pt-br":"Terapeutas", "en":"Login", "it":"Creare account", "fr":"créer un compte"},
						"email-ph":{"pt-br":"Digite seu E-mail", "en":"E_mail", "it":"Creare account", "fr":"créer un compte"},
						"senhac-ph":{"pt-br":"Escolha a senha", "en":"Password", "it":"Creare account", "fr":"créer un compte"},
						"nomec-ph":{"pt-br":"DIgite seu Nome", "en":"Your Name", "it":"Creare account", "fr":"créer un compte"},
						"senha-ph":{"pt-br":"Digite sua senha", "en":"Password", "it":"Creare account", "fr":"créer un compte"},
						"login-bt":{"pt-br":"Fazer Login", "en":"Login", "it":"Creare account", "fr":"créer un compte"},



					};
String.prototype.t = function(lang, dom) {
	var finalString = this;
	if (fly.t_base[finalString]===undefined) {
		fly.d(1, "WARNING::tradutor::String.prototype.t\n\tString não encontrada: [" + finalString + "].");
	}
	else {
		if (lang!=undefined) {
			if (fly.t_base[finalString][lang]!==undefined) {
				finalString = fly.t_base[finalString][lang];
			}
			else {
				fly.d(1, "ERRO::tradutor::String.prototype.t\n\tIdioma [" + lang + "] não encontrado para: [" + finalString + "].");
			}
		}
	}
	if (dom===undefined) {
		document.write(finalString);
	}
	else {
		if (dom=="1") {
			return (finalString);
		}
		else {
			dom.innerHTML = finalString;
		}
	}
}

window.fly.traduzir = function (lang, page) {
	var x=0;
	// MOST TAGS EXCLUDING PLACEHOLDER and LABELs
	if (page!==undefined) {
		var el = document.getElementById(page);
		x = el.querySelectorAll("[data-t]:not(label):not(input):not(ons-input)");
	}
	else {
		x = document.querySelectorAll("[data-t]:not(label):not(input):not(ons-input)");
	}
	for (i = 0; i < x.length; i++) {
//		console.log("ALL");
//		console.log(x[i]);
	x[i].dataset.t.t(lang, x[i]); }

	// LABEL
	if (page!==undefined) {
		var el = document.getElementById(page);
		x = el.querySelectorAll("label[data-t]");
	}
	else {
		x = document.querySelectorAll("label[data-t]");
	}
	for (i = 0; i < x.length; i++) {
//		console.log("Label");
//		console.log(x[i]);
	x[i].innerHTML = x[i].dataset.t.t(lang, 1) + x[i].innerHTML; }

	// INPUT PLACEHOLDER
	if (page!==undefined) {
		var el = document.getElementById(page);
		x = el.querySelectorAll("input[data-t]");
	}
	else {
		x = document.querySelectorAll("input[data-t]");
	}
	for (i = 0; i < x.length; i++) {

//	console.log(x[i]);
	x[i].placeholder = x[i].dataset.t.t(lang, 1);	}

		// ONS-INPUT PLACEHOLDER
	if (page!==undefined) {
		var el = document.getElementById(page);
		x = el.querySelectorAll("ons-input[data-t]");
	}
	else {
		x = document.querySelectorAll("ons-input[data-t]");
	}

	for (i = 0; i < x.length; i++) {
		var zz = x.item(i).attributes;
			for (ii = 0; ii < zz.length; ii++) {
				if (zz[ii].name == "placeholder") {
					zz[ii].value=x[i].dataset.t.t(lang, 1);;
				}
			}
	}

}


/* Hide and Show an html element
 * It hides and shows again an element with given ID
 * NEEDS correct < style >
 *  .flyJS_hideElem {
 * 	   visibility:hidden !important;
 *	   display:none !important;;
 *  }
 */
window.fly.hideElem = function(id) { fly.d(9,'[CALL] flyJS_hideElem'); document.getElementById(id).classList.add('flyJS_hideElem'); };
window.fly.showElem = function(id) { fly.d(9,'[CALL] flyJS_showElem'); document.getElementById(id).classList.remove('flyJS_hideElem'); };

/* Converte string no formato
 * var1=val1;var2=val2;.....
 * em um formData Object para ser usado numa chamada Ajax
 */
window.fly.str2formdata = function (data) {
	var fd = new FormData();
	var blocos = data.split(";");
	blocos.forEach(function(o, index) {	var temp = o.split("="); fd.append( temp[0], temp[1] ); });
	console.log("FD: ")
	console.log(fd);
	return fd;
};

/* Converte obj
 * em um formData Object para ser usado numa chamada Ajax
 */
window.fly.obj2formdata = function (data) {
	var fd = new FormData();
 //resultado="";
	for (var i in data) {
		if (data.hasOwnProperty(i)) {
			//	resultado += "data." + i + " = " + data[i] + "\n";
				fd.append( i, data[i] );
		}
	}
	console.log("FD: ")
	console.log(fd);
	// var blocos = data.split(";");
	// blocos.forEach(function(o, index) {	var temp = o.split("="); fd.append( temp[0], temp[1] ); });
	return fd;
};
/* Faz Chamada Ajax usando apenas Javascript Puro
 * Não trata todas as situações, mas pelo menos
 * trata: mudança de status da chamada,
 * sucesso
 * falha
 * Exemplos abaixo das funções que tratam as mudanças de status e as falhas estão abaixo!
 *
 */
window.fly.data2Server = function (data, onChangeStatus, onSuccess, onFail) {
    var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) { onSuccess(xmlHttp); } else { onFail(xmlHttp.status); }
		}
		else {
			onChangeStatus(xmlHttp.readyState);
		}
	};
	xmlHttp.open("post", fly.url);
	xmlHttp.send(fly.str2formdata(data));
};


/* Faz Chamada Ajax usando apenas Javascript Puro
 * Não trata todas as situações, mas pelo menos
 * trata: mudança de status da chamada,
 * sucesso
 * falha
 * Exemplos abaixo das funções que tratam as mudanças de status e as falhas estão abaixo!
 *
 */
window.fly.obj2Server = function (data, onChangeStatus, onSuccess, onFail) {
    var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) { onSuccess(xmlHttp); } else { onFail(xmlHttp.status); }
		}
		else {
			onChangeStatus(xmlHttp.readyState);
		}
	};
	xmlHttp.open("post", fly.url);
	xmlHttp.send(fly.obj2formdata(data));
};

/*******************************
/ form2Server()
/ ******************************/
window.fly.form2Server = function (formName, onChangeStatus, onSuccess, onFail) {

	var oFormElement = document.getElementById(formName);
    var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) { onSuccess(xmlHttp); } else { onFail(xmlHttp.status); }
		}
		else {
			onChangeStatus(xmlHttp.readyState);
		}
	};
	xmlHttp.open("post", fly.url);
	xmlHttp.send(new FormData (oFormElement));
};




window.fly.data2Template = function (data, mask, template) {
	var base = template;
	var retorno = "";
	data.forEach( function (e,i) {
		e.forEach( function (ee, ii) {
			fly.d(9, ee + " : " + ii);
			base = base.replace("%"+mask[ii]+"%", ee);
		});
		retorno += base;
		base=template;
	});
	return retorno;
}

window.fly.json2Template = function (data, template) {
	var base = template;
	var retorno = "";
	data.forEach( function (e,i) {
		for (var ee in e) {
			console.log(ee);
			console.log(e[ee]);
			base = base.replace("%"+ee+"%", e[ee]);
		}
		retorno += base;
		base=template;
	});
	return retorno;
}

window.fly.json2Element = function (data, template, id) {
	var base = template;
	var retorno = "";

 //   var t = document.createElement('template');

// 	console.log("======================");
//	console.log(template);
//	console.log(template.tagName);

	data.forEach( function (e,i) {
		for (var ee in e) {
//			console.log(ee);
//			console.log(e[ee]);
			base = base.replace("%"+ee+"%", e[ee]);
//			console.log("b-" + base);
		}
//		var n = document.createElement(base);

		retorno+=base;
//		console.log("r-"+retorno);
		base=template;
	});
 //   t.innerHTML = retorno;

	document.getElementById(id).innerHTML = retorno;

//   t.content.childNodes.forEach(function(e) {
//	   console.log(e);
//		document.getElementById(id).innerHTML += e; //appendChild(e);
//   });
	return retorno;
}


window.fly.json2ElementFix = function (data, tfix, template, id) {
	var base = template;
	var retorno = tfix;
	data.forEach( function (e,i) {
		for (var ee in e) {
			base = base.replace("%"+ee+"%", e[ee]);
		}
		retorno+=base;
		base=template;
	});
	document.getElementById(id).innerHTML = retorno;
	return retorno;
}

window.fly.addHora = function(hrA, hrB, zerarHora) {
console.log(hrA);
console.log(hrB);
hrA = hrA.substr(0,5);
hrB = hrB.substr(0,5);


        if(hrA.length != 5 || hrB.length != 5) return "00:00";

        temp = 0;
        nova_h = 0;
        novo_m = 0;

        hora1 = hrA.substr(0, 2) * 1;
        hora2 = hrB.substr(0, 2) * 1;
        minu1 = hrA.substr(3, 2) * 1;
        minu2 = hrB.substr(3, 2) * 1;

        temp = minu1 + minu2;
        while(temp > 59) {
                nova_h++;
                temp = temp - 60;
        }
        novo_m = temp.toString().length == 2 ? temp : ("0" + temp);

        temp = hora1 + hora2 + nova_h;
        while(temp > 23 && zerarHora) {
                temp = temp - 24;
        }
        nova_h = temp.toString().length == 2 ? temp : ("0" + temp);

        return nova_h + ':' + novo_m;
			}

/*
var t1 = "<h1>%NOME%</h1><p>%FONE%</p>";
var tm1 = [ "NOME", "FONE" ] ;
var d1 =  [ ["Gustavo", "2134536"], ["José", "556353"] ];

console.log(FlyJS_data2Template(d1, tm1, t1));

var j1 = [
    {"NOME":"John", "FONE":"Doe"},
    {"NOME":"Anna", "FONE":"Smith"},
    {"NOME":"Peter", "FONE":"Jones"}
];

console.log(FlyJS_json2Template(j1, t1));
*/
/* Exemplo de uso
<body class="myBody">
<div id="teste" class="testHide">TESTE</div><br />
<br />
<a href="#" onClick="flyJS_hideElem('teste'); return false;"> Hide </a><br />
<a href="#" onClick="flyJS_showElem('teste'); return false;"> Show </a><br />
<br /><br />
<div class="center">
	<div class="myDiv1" id="div1">Div1</div>
	<div class="myDiv2" id="div2" onClick="flyJS_hideElem(this.id);">Div2</div>
</div>
<a href="#" onClick="flyJS_hideElemT('teste'); return false;"> Hide TRansition </a><br />
<a href="#" onClick="flyJS_showElemT('teste'); return false;">Show TRansition </a><br />
<div id="testejson"></div>
</body>
<script>
FlyJS_json2Element(j1, t1, "testejson");
</script>
*/
