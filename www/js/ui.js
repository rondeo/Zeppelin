/***************************************************
 * Função Revisada v1.0
 * Exibe os dados de profissionais recebidos do backend
 * Sempre as funções de chamada enviam a resposta do AJAX sem tratar
 * Assim, fica um padrão para as respostas completas e simplificadas
 *
 ***************************************************/
var uiProfStatus = function() {
  fly.d(9,"==>[UI]  uiProfStatus");
   var icone_sim = '<ons-icon icon="fa-check-circle" style="color:#4Ba4BD;margin-left:4px;"></ons-icon>'
   var icone_nao = '<ons-icon icon="fa-times-circle" style="color:#ff6600;margin-left:4px;"></ons-icon>'
   var icone_nom = '<ons-icon icon="fa-times-circle" style="color:#999999;margin-left:4px;"></ons-icon>';
// Acerta os STATUS
{
   if (window.fly.c.status.disponivel==0)
   {
     document.getElementById('status-disponivel').innerHTML = 'Disponível' + icone_nao ;
   }
   else
   {
     document.getElementById('status-disponivel').innerHTML = 'Disponível' + icone_sim ;
   }

   if (window.fly.c.status.auto_confirmar==0)
   {
     document.getElementById('status-autoConfirmar').innerHTML = 'Auto Confirmar' + icone_nao ;
   }
   else
   {
     document.getElementById('status-autoConfirmar').innerHTML = 'Auto Confirmar' + icone_sim ;
   }

   if (window.fly.c.status.pronto==0)
   {
     document.getElementById('status-pronto').innerHTML = 'Pronto' + icone_nao;
   }
   else
   {
     document.getElementById('status-pronto').innerHTML = 'Pronto' + icone_sim;
   }

   if (window.fly.c.status.maca==0)
   {
     document.getElementById('status-maca').innerHTML =  'Maca' + icone_nom;
   }
   else
   {
     if (window.fly.c.status.com_maca==0)
     {
       document.getElementById('status-maca').innerHTML = 'Maca' + icone_nao;
     }
     else
     {
       document.getElementById('status-maca').innerHTML = 'Maca' + icone_sim;
     }
   }
}

  byId("terapeuta_foto").src = "img/" +   parseInt(window.fly.c.uid) + ".jpg"; // window.fly.c.foto;
  byId("terapeuta_texto").innerHTML = window.fly.c.apelido;
  // Acerta o QR
  byId('qr_prof_id').innerHTML = "" + window.fly.c.apelido;// + "<br>ID: " + fly.c.pid + "";
  byId('qr_prof_pic').src = "img/qr_" + fly.c.pid + ".png";
  // Espera aparecer mesmo pra daí mostrar
  setTimeout(function(){ byId("waithome").style.display = "none"; }, 100);
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var uiShowAllSolicita = function (d) {
  var x = document.getElementById('lista_solicita')
  fly.d(9,"==>[UI]  uiShowAllSolicita");
  fly.d(9, d);

  if (d.res=="OK")
  {
    x.style.display = "block";
    console.log(d.dados);
    dd = JSON.parse(d.dados);
    $template = '<ons-list-item id="solicita_%status%" tappable modifier="longdivider" onClick="goSolicitaDetalhe(\'%aid%\',\'%id%\',\'%statu2%\');">';
    $template += '\n<span class="left"><ons-icon icon="%icon%"> </ons-icon>&nbsp; %data% - %local%</span>';
    $template += '\n</ons-list-item>';

    window.fly.json2Element(dd, $template, "lista_solicita");
    document.getElementById("waitsolicita").style.display = "none";
    //document.getElementById("waitsolicita").style.display = "block";

  }

}


function uiAgendamentoDetalhe(d) {
  dd = JSON.parse(d);

  d1 = dd.dados;
  dados = JSON.parse(d1);
  console.log("uiAgendamentodetalhes");

  document.getElementById('agendamento_detalhe_local').innerHTML = dados[0].local;
  document.getElementById('agendamento_detalhe_nome').innerHTML = dados[0].nome;
  document.getElementById('agendamento_detalhe_data').innerHTML = dados[0].data;
  // document.getElementById('agendamento_detalhe_endereco').innerHTML = dados[0].end;
  document.getElementById('agendamento_detalhe_tipo').innerHTML = dados[0].tipo;
  document.getElementById('agendamento_detalhe_duracao').innerHTML = dados[0].dura;
  document.getElementById('agendamento_detalhe_maca').innerHTML = dados[0].maca;
  // document.getElementById('solicitacao_hora').innerHTML = dados[0].;
  document.getElementById('agendamento_detalhe_obs').innerHTML = dados[0].obs;

  document.getElementById('agendamento_detalhe_status').innerHTML = dados[0].statustxt;
    document.getElementById('agendamento_detalhe_atende').innerHTML = dados[0].atendetxt;
}
/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var uiShowSolicitaLista = function (d) {
  fly.d(9,"==>[UI]  uiShowSolicitaLista");
  fly.d(9, d);
  var x = document.getElementById('lista_confirma');

  if (d.res=="OK")
  {
    x.style.display = "block";
    console.log(d.dados);
    dd = JSON.parse(d.dados);

    $template = ' <ons-list-item id="solicita_%status%" class="estoualerta" tappable modifier="longdivider" onClick="goSolicitaDetalhe(\'%aid%\',\'%id%\',\'%statu2%\');">';
    $template += '\n<span class="left">%data%  &nbsp; %local%</span>';
    $template += '\n</ons-list-item>';
    window.fly.json2Element(dd,  $template, "lista_confirma");
  }
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var uiShowAvisosLista = function (d) {
  fly.d(9,"==>[UI] uiShowAvisosLista");
  fly.d(9,d);

  var x = document.getElementById('lista_avisos')
  if (d.res=="OK")
  {
    x.style.display = "block";
    dd = JSON.parse(d.dados);

    $template = '';

    for (i=0; i<dd.length; i++)
    {
      if (dd[i].a==0) // TXT
      {
        toTxt = dd[i].b;
      }
      if (dd[i].a==1) // TXT
      {
        toTxt = "Atendimento Cancelado<br>"+dd[i].b;
        window.fly.c.atual_at_id = dd[i].c;
        toClick = "trataClickAviso('atendimento','" + dd[i].e + "');";

      }
      if (dd[i].a==2) // TXT
      {
        toTxt = "Atendimento Aceito (Auto Confirmar)<br>"+dd[i].b;
        toClick = "trataClickAviso('atendimento','" + dd[i].e + "', '" + dd[i].c + "');";
      }

      // $template += '\n<ons-list-item tappable modifier="longdivider" onClick="goAvisoDetalhe(\'' + toClick + '\');"><span class="left">'+ toTxt +'</span></ons-list-item>';
      $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt +'</span></ons-list-item>';
    }
    byId("lista_avisos").innerHTML = $template;
  }
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var uiShowProximoAtendimentoLista = function (d) {
  fly.d(9,"==>[UI] uiShowProximoAtendimentoLista");
  fly.d(9,d);

  var x = document.getElementById('lista_proximo_atendimento')
  if (d.res=="OK")
  {
    x.style.display = "block";
    dd = JSON.parse(d.dados);
    $template = '';

    for (i=0; i<dd.length; i++)
    {
      toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
      toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
      $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt +'</span></ons-list-item>';
    }
    x.innerHTML = $template;
  }
}

var uiShowPreview = function (sData, rd, uplan) {

  var title = document.getElementById("title");
  var rating = document.getElementById("rating");
  var readButton = document.getElementById("readButton");
  var callrec = document.getElementById("call-for-recommendation");
  console.log("aleh2");


    var dd = sData;
    title.innerHTML = dd.title;
    console.log("aleh2-nottitle");
    console.log("aleh2-notrating");
    document.getElementById("prereaddescription").innerHTML = dd.description;
    console.log("aleh2-notdescription");
    readButton.innerHTML = '<ons-button style="width:100%;" onclick="goToReadPage(\'' + dd.storyid + '\')" class="redbutton">Ler</ons-button>';

    var commentBtn = document.getElementById("commentbtn-preread");
    commentBtn.onclick = openComments;

    localforage.getItem('lc' + dd.storyid).then (function (item) {
      rating.innerHTML = '                <div class="rating"><div class="rating-num">'+ getRatingIcons(item.rating, item.num_rating) +
  '                  <u>' + getViewsText(item.views) + '</u>'+
  '              </div></div>';
    }).catch (function (err) {
      console.log(err);
    });

    loadImageForId("img-preread", dd.image);

  $template = '';
  $template = '<ons-carousel  id="recommendation-carousel" class="recommendation-c-container" direction="horizontal" auto-refresh swipeable overscrollable item-width="175px">';

  console.log("aleh3");

  //var rd = dd.recommendations;
  if (rd == null) {
    callrec.innerHTML = "";
    document.getElementById("myC").innerHTML = "";
    return;
  }

  if (rd.length > 0)
    callrec.innerHTML = "Nós achamos que você também pode gostar de:";

    console.log(uplan + "//**//**");
    var isSubs = (uplan!="N");

    for (i=0; i<rd.length; i++)
    {
      /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
      toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
      $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/
      $template += '<ons-carousel-item modifier="nodivider" class="recommendation-item" onclick="storyToggleVisibilityUplan(\'' + rd[i].storyid + '\', ' + rd[i].free + ', ' + isSubs + ');">'+
'                <p class="recommendation-title bold">' + rd[i].title + '</p>'+
'                <img id="img-recommendation-story-list-'+ rd[i].storyid + '" src="img/contog/blacklogo2.png"></img>'+
'                <div class="rating redtext" style="margin: 4px;"><div class="rating-num">'
                  + getRatingIcons(rd[i].rating, rd[i].num_rating) +'</div></div>'+
'              </ons-carousel-item>';
    }
    $template += '</ons-carousel>';
    document.getElementById("myC").innerHTML = $template;
    //recommendations.innerHTML = $template;

  var recommendations = document.getElementById("recommendation-carousel");
    recommendations.refresh();

    for (i=0; i<rd.length; i++)
    {
      loadImageForId('img-recommendation-story-list-' + rd[i].storyid, rd[i].image);
    }

    recommendations.refresh();

    console.log("aleh4");
};

var uiShowView = function (sData) {
  if (Math.random() < 0.3) {
    try {
      if(AdMob) AdMob.showInterstitial();
    } catch (e) {
      console.log(e);
    }
  }

  var content = document.getElementById ("reader-text");

    var dd = sData;
    content.innerHTML = dd.content;
    var wordnum = dd.content.split(' ').length;
    //console.log(wordnum);

    //console.log(dd);

    var commentBtn = document.getElementById("commentbtn");
    commentBtn.onclick = openComments;

    localforage.getItem('controle').then (function (item) {
        var ratingBtn = document.getElementById("prereadratingbtn");

        if (typeof item['ratings'] === "undefined" ||
            typeof item["ratings"]['' + dd.storyid] === "undefined") {
          ratingBtn.style.display = "block";
        } else {
          ratingBtn.style.display = "none";
        }
      }).catch (function (err) {
        console.log(err.message);
      });

    window.viewTimeout = setTimeout(function() {
      var sfDocRef = firebase.firestore().collection('listacontos').doc(dd.storyid);
      
      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  throw "Document does not exist!";
              }
              //console.log(sfDoc);
 
              var updatedStory = sfDoc.data();
              updatedStory.views = updatedStory.views + 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, updatedStory);

              localforage.setItem('lc' + dd.storyid, updatedStory);
          });
      }).then(function() {
          console.log("Transaction successfully committed - view added!");
      }).catch(function(error) {
          console.log("Transaction failed - view added: ", error.message);
      });

      var sfDocRef2 = firebase.firestore().collection('userviews').doc(firebase.auth().currentUser.uid);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef2).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  var uv = {};
                  uv['' + sData.storyid] = {};
                  uv['' + sData.storyid].views = 1;
                  firebase.firestore().collection('userviews').doc(firebase.auth().currentUser.uid).set(uv);
                  return;
              }
              //console.log(sfDoc);

              var updatedStory = sfDoc.data();
              if (updatedStory['' + sData.storyid])
                updatedStory['' + sData.storyid].views = updatedStory['' + sData.storyid].views + 1;
              else {
                updatedStory['' + sData.storyid] = {};
                updatedStory['' + sData.storyid].views = 1;
              }
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef2, updatedStory);
          });
      }).then(function() {
          console.log("Transaction successfully committed - view added!");
      }).catch(function(error) {
          console.log("Transaction failed - view added: ", error.message);
      });
    }, (wordnum * 150)); //250

  document.getElementById("story-player-title").innerHTML = dd.title;
}

var uiShowStories = function (sData) {
  var x = document.getElementById('story_list');

    x.innerHTML = "";
    //dd = JSON.parse(sData.dados);
    var dd = sData;
    $template = '';
    //console.log("ronaldo");

    var shuffleArray = [];

    for (var i in dd)
    {
      if (i == "length")
        continue;

      $template += getFreeStoryHTML(dd[i]);
    }
    x.innerHTML = $template;

    for (var i in dd)
    {
      if (i == "length")
        continue;
      loadImageForId('img-story-list-' + dd[i].storyid, dd[i].image);
    }
}

var uiNothingToHear = function () {
  var x = document.getElementById('audio_story_list');

  x.innerHTML = "<p class='centered-text'>Não há contos audíveis disponíveis no momento..</p>";
}

var uiNoFavorites = function () {
  var x = document.getElementById('favorites_list');

  x.innerHTML = "<p class='centered-text'>Não há contos favoritados..</p>";
}

var uiShowFavorites = function (sData, favorites) {
  var x = document.getElementById('favorites_list');

  console.log("favorites load");
  console.log(sData);
  console.log(favorites);

    x.innerHTML = "";
    //dd = JSON.parse(sData.dados);
    var dd = sData;
    $template = '';

    for (var i in dd)
    {
      if (i == "length")
        continue;
      if (favorites.indexOf(parseInt(dd[i].storyid.substring(1))) == -1) {
        console.log("Não foi");
        continue;
      }
      /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
      toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
      $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/

      $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
'            <div class="story-description">'+
'              <div class="story-img-container inline left"><img id="img-favorites-story-list-'+ dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + dd[i].title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(dd[i].rating, dd[i].num_rating) +
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
      if (favorites.indexOf(parseInt(dd[i].storyid.substring(1))) == -1) {
        continue;
      }
      loadImageForId('img-favorites-story-list-' + dd[i].storyid, dd[i].image);
    }
}

var uiShowFullListFavorites = function (flist) {
  addFullListGeneral (flist, 'favorites_list')
}

var uiShowListeners = function (sData) {
  var x = document.getElementById('audio_story_list');

    x.innerHTML = "";
    //dd = JSON.parse(sData.dados);
    var dd = sData;
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
'              <div class="story-img-container inline left"><img id="img-listeners-story-list-'+ dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + dd[i].title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(dd[i].rating, dd[i].num_rating) +
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
      loadImageForId('img-listeners-story-list-' + dd[i].storyid, dd[i].image);
    }
}

var uiShowStoriesSubscriber = function (sData) {
  var x = document.getElementById('story_list');

    x.innerHTML = "";
    //dd = JSON.parse(sData.dados);
    var dd = sData;
    console.log(dd);
    $template = '';

    var shuffleArray = [];

    for (var i in dd)
    {
      if (i == "length")
        continue;

      var aux = '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
'            <div class="story-description">'+
'              <div class="story-img-container inline left"><img id="img-story-list-'+ dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + dd[i].title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(dd[i].rating, dd[i].num_rating) +
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
      //$template += aux;
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
}

var uiShowStoriesSearch = function (sData) {
  var x = document.getElementById('searchresults');

  console.log(sData);

    x.innerHTML = "";
    //dd = JSON.parse(sData.dados);
    var dd = sData;

    var hasElement = false;
    for (var i in dd) {
      hasElement = true;
      break;
    }
    if (!hasElement) {
      x.innerHTML = "<p class='centered-text'>Não há contos que batem com a pesquisa..</p>";
      return;
    }

    $template = '';

    for (var i in dd)
    {
      /*toTxt = "" + fly.dataTxt(dd[i].data) + " - " + dd[i].local + "<BR>" + dd[i].cli + " - " + dd[i].dura + " - " + dd[i].tipo ;
      toClick = "trataClickProxAtend('" + dd[i].a_id + "');";
      $template += '\n<ons-list-item tappable modifier="longdivider" class="estoualerta" onClick="' + toClick+ '"><span class="left">'+ toTxt + '</span></ons-list-item>';*/
      //loadImageForId('img-search-story-list-' + dd[i].storyid, dd[i].image);

      $template += '<div class="text-container" onclick="goToPreviewPage(\'' + dd[i].storyid + '\')">'+
'            <div class="story-description">'+
'              <div class="story-img-container inline left"><img id="img-search-story-list-'+ dd[i].storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + dd[i].title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(dd[i].rating, dd[i].num_rating) +
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
      loadImageForId('img-search-story-list-' + dd[i].storyid, dd[i].image);
    }
}

var uiNoStories = function () {
  var x = document.getElementById('story_list');

  x.innerHTML = "<p class='centered-text'>Não há contos acessíveis no momento..</p>";
}

var uiUpdateToolbar = function (userInfo) {
  document.getElementById("personname").innerHTML = userInfo.apelido;
  //document.getElementById("personsign").innerHTML = userInfo.astral_sign;
  //document.getElementById("personplan").innerHTML = getUserPlanText(userInfo.uplan);
  //document.getElementById("personstate").innerHTML = userInfo.endereco.state;
}

var uiUpdatePerfilCall = function (userInfo) {

  /*document.getElementById("perfilusercall").innerHTML = "<b>" + userInfo.apelido + "</b>" + " " +
                                                        userInfo.astral_sign + " " + userInfo.endereco.state;*/
  document.getElementById("perfilusercall").innerHTML = "<b>" + getSignText(userInfo.astral_sign, userInfo.sexo) + "</b>";
  document.getElementById("perfil_nome").innerHTML = userInfo.nome;
  document.getElementById("perfil_pn").innerHTML = userInfo.apelido;

  if (userInfo.birthdate != "") {
    var bd = new Date(userInfo.birthdate);
    var month = bd.getMonth() + 1;
    var monthStr = "";
    if (month < 10)
      monthStr = "0" + month;
    else
      monthStr = month;

    document.getElementById("perfil_birthdate").innerHTML = bd.getDate() + "/" + monthStr + "/" + bd.getFullYear();
  } else {
    document.getElementById("perfil_birthdate").innerHTML = "";
  }
  //document.getElementById("perfil_cpf").innerHTML = userInfo.cpf;
  //document.getElementById("perfil_telefone").innerHTML = "(" + userInfo.telefone.areacode + ") " + userInfo.telefone.numero;
  //document.getElementById("perfil_email").innerHTML = userInfo.email;
  //document.getElementById("perfil_plan").innerHTML = getTextPlan(userInfo.uplan);

  /*if (userInfo.uplan == "N") {
    document.getElementById("perfil-show-plan").innerHTML = "<b>Nenhum Plano</b>";
    document.getElementById("perfil-call-change-plan").innerHTML = "Assinar!";
  } else {
    document.getElementById("perfil-show-plan").innerHTML = "Plano <b>" + getTextPlan(userInfo.uplan) + "</b>";
    document.getElementById("perfil-call-change-plan").innerHTML = "Trocar Plano";
  }*/
  document.getElementById("perfil_occupation").innerHTML = userInfo.profissao;

  /*document.getElementById("perfil_street").innerHTML = userInfo.endereco.street;
  document.getElementById("perfil_number").innerHTML = userInfo.endereco.number;
  document.getElementById("perfil_complement").innerHTML = userInfo.endereco.complement;
  document.getElementById("perfil_district").innerHTML = userInfo.endereco.district;
  document.getElementById("perfil_city").innerHTML = userInfo.endereco.city;
  document.getElementById("perfil_state").innerHTML = userInfo.endereco.state;
  if (userInfo.endereco.country == "") {
    document.getElementById("perfil_country").innerHTML = "-";
  } else {
    document.getElementById("perfil_country").innerHTML = userInfo.endereco.country;
  }
  if (userInfo.endereco.zipcode != "") {
    document.getElementById("perfil_zipcode").innerHTML = userInfo.endereco.zipcode;
  } else {
    document.getElementById("perfil_zipcode").innerHTML = "-";
  }
  if (userInfo.cartao['4dig'] == "") {
    document.getElementById("perfil_card_number").innerHTML = "-";
  } else {
    document.getElementById("perfil_card_number").innerHTML = "xxxx xxxx xxxx " + userInfo.cartao['4dig'];
  }*/
}

var uiUpdateFirstPaymentScreen = function (userInfo) {
  document.getElementById("payment-name").value = userInfo.nome;
  document.getElementById("payment-cpf").value = userInfo.cpf;
  document.getElementById("payment-telefone-ddd").value = userInfo.telefone.areacode;
  document.getElementById("payment-telefone-numero").value = userInfo.telefone.numero;
  var newD = new Date (userInfo.birthdate);
  document.getElementById("payment-birthdate").value = newD.toISOString().slice(0,10);
}

var uiUpdateAddressSecondScreen = function (userInfo) {
  document.getElementById("update-address-street").value = userInfo.endereco.street;
  document.getElementById("update-address-number").value = userInfo.endereco.number;
  document.getElementById("update-address-complement").value = userInfo.endereco.complement;
  document.getElementById("update-address-district").value = userInfo.endereco.district;
  document.getElementById("update-address-city").value = userInfo.endereco.city;
  document.getElementById("update-address-state").value = userInfo.endereco.state;
  document.getElementById("update-address-country").value = userInfo.endereco.country;
  document.getElementById("update-address-zipcode").value = userInfo.endereco.zipcode;
}

var uiUpdateToolbarAppend = function (userInfo, appendStr) {
  document.getElementById(appendStr+"personname").innerHTML = userInfo.apelido;
  //document.getElementById(appendStr+"personsign").innerHTML = userInfo.astral_sign;
  //document.getElementById(appendStr+"personplan").innerHTML = getUserPlanText(userInfo.uplan);
  //document.getElementById(appendStr+"personstate").innerHTML = userInfo.endereco.state;
}

var getUserPlanText = function (plan) {
  if (plan == "N") {
    return '';
  }
  else {
    return plan;
  }
}

var getRatingIcons = function (rating, num_rating) {
  var starsFilled = 0;
  if (num_rating > 0)
    rating = rating / num_rating;

  var ratingIcons = '';

  while (rating > 0) {
    if (rating > 0.75) {
      ratingIcons += '<ons-icon icon="md-star"></ons-icon>';
      starsFilled += 1;
      rating -= 1;
    } else if (rating > 0.25) {
      ratingIcons += '<ons-icon icon="md-star-half"></ons-icon>';
      starsFilled += 1;
      rating -= 1;
    } else {
      ratingIcons += '<ons-icon icon="md-star-outline"></ons-icon>';
      starsFilled += 1;
      rating -= 1;
    }
  }

  while (starsFilled < 5) {
    ratingIcons += '<ons-icon icon="md-star-outline"></ons-icon>';
    starsFilled += 1;
  }
  //ratingIcons += " (" +num_rating + ") ";

  return ratingIcons;
};

var getIndividualStarSource = function (num, rating, num_rating) {
  var r = rating / num_rating;
  r = r-num;

  if (r > 0.75) {
    return "md-star";
  } else if (r > 0.25) {
    return "md-star-half";
  } else {
    return "md-star-outline";
  }
}

var getCommentText = function (c) {
  if (c == 0) {
    return 'Sem Comentários';
  } else if (c == 1) {
    return '1 Comentário';
  } else {
    return c + ' Comentários';
  }
};

var getViewsText = function (v) {
  if (v == 0) {
    return 'Sem Visualizações';
  } else if (v == 1) {
    return '1 Visualização';
  } else {
    return v + ' Visualizações';
  }
}

var getFreeText = function (free) {
  if (free) {
    return 'Grátis!';
  } else {
    return '';
  }
}

function storyToggleVisibility (sid, isFree) {
  if (isFree == false) {
    //toggle_visibility('plan-presentation-' + sid);
    goToPlans();
  } else {
    //toggle_visibility('review-' + sid);
    goToPreviewPage(sid);
  }
};

function storyToggleVisibilityUplan (sid, isFree, isSubscriber) {
  if (isFree == false && isSubscriber == false) {
    //toggle_visibility('plan-presentation-' + sid);
    goToPlans();
  } else {
    //toggle_visibility('review-' + sid);
    goToPreviewPage(sid);
  }
};

function toggle_visibility(id) {
  var e = document.getElementById(id);
  /*if (e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';*/
  $( "#"+id ).slideToggle( "slow", function() {
    // Animation complete.
  });
};

function storyPlayerToggleVisibility () {
  if (window.media == null) {
    ons.notification.alert({messageHTML:"<font>Ou ainda não há gravações para esse conto ou não conseguimos baixar o audio a tempo :(</font>", title: "<b>Audio Conto Não Disponível</b>"});
    return;
  }

  var e = document.getElementById('story-player');
  /*if (e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';*/

  if (e.style.display == 'block') {
    pauseSound();
  }

  $( "#story-player" ).slideToggle( "slow", function() {
    // Animation complete.
  });
};

var uiIncreaseFont = function () {
  var text = document.getElementById("reader-text");

  style = window.getComputedStyle(text, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);

  if (currentSize < 40)
    text.style.fontSize = (currentSize + 2) + 'px';
};

var uiDecreaseFont = function () {
  var text = document.getElementById("reader-text");

  style = window.getComputedStyle(text, null).getPropertyValue('font-size');
  currentSize = parseFloat(style);

  if (currentSize > 10)
    text.style.fontSize = (currentSize - 2) + 'px';
};

var uiUpdatePlan = function (plan, name) {
  var p = document.getElementById("plan-" + plan);

  p.style.backgroundColor = "rgba(200, 200, 200, 0.8)";

  var btnp = document.getElementById("plan-btn-" + plan);
  //btnp.style.display = "none";
  btnp.style.backgroundColor = "rgba(200, 200, 200, 0.8)";
  btnp.innerHTML = "Cancel";
  btnp.onclick = cancelPlan;

  var txt = document.getElementById("plan-usertext");

  txt.innerHTML = "<b>Olá " + name + ", seu plano atual é o " + getTextPlan (plan) + ".</b><p>" +
                  getPlanMarketing (plan) + "</p>";
};

function cancelPlan () {
  ons.notification.alert({messageHTML:"<font>Plano Cancelado.</font>", title: "<b>Pronto!</b>"});
}

var getTextPlan = function (plan) {
  if (plan == "F")
    return "Fetish";
  else if (plan == "S")
    return "Sixty-Nine";
  else if (plan == "C")
    return "Big";
  return "";
};

var getPlanMarketing = function (plan) {
  return "Sinta-se a vontade para aprimorar seu plano e conseguir <b>mais benefícios</b>!";
};

var getFreeStoryHTML = function (dd) {
  //loadImageForId('img-story-list-' + dd.storyid, dd.image);
  var result = '<div class="text-container">'+
      '<div class="story-description">'+
      '              <div class="story-img-container inline left"><img id="img-story-list-'+ dd.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
      '              <div class="text-description inline right">'+
      '                <h4 class="redtext">' + dd.title + '</h4>'+
      '                <div class="rating"><div class="rating-num">'+ getRatingIcons(dd.rating, dd.num_rating) +
      '                  <u>' + getViewsText(dd.views) + '</u>'+
      '              </div></div>'+
      '                 <ons-button class="left redbutton" style="margin: 8px; margin-left: 0px;" onclick="storyToggleVisibility(' + dd.storyid + ', ' + dd.free + ')">'+
      /*'                  Review ' +*/ getFreeText(dd.free) +
      '                </ons-button>'+
      '              </div>'+
      '            </div>'+
      ''+
      '            <div id="review-' + dd.storyid + '" class="review" style="display: none;">'+
      '              <p>' + dd.description + '</p>'+
      ''+
      '              <div class="call-container">'+
      '                <div class="inline redtext">'+
      '                  <ons-icon icon="md-arrow-forward" size="40px"  style="vertical-align: middle;"></ons-icon>'+
      '                </div>'+
      '                <div class="inline">'+
      '                  <ons-button class="redbutton" onclick="goToPreviewPage(' + dd.storyid + ')">Continuar lendo</ons-button>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      ''+
      '            <div id="plan-presentation-'+ dd.storyid + '" style="display: none;">'+
      '              <p class="redtext red-left-border" style="font-size: 13px;">Para continuar tendo acesso a este e outros contos do Conto G, escolha agora seu plano!</p>'+
      '              '+
      '              <div class="call-selling">'+
      '                <h4 class="whitetext">PLANOS EXCLUSIVOS</h4>'+
      ''+
      '                <div class="plan-container">'+
      '                  <div class="plan-wrapper inline">'+
      '                    <div style="background: red;">'+
      '                      <div class="whitetext white-bottom-border">'+
      '                        <div class="inline" style="width: 20%; box-sizing: border-box; vertical-align: middle;"><h1><b>F</b></h1></div>'+
      '                        <div class="inline" style="width: 50%; vertical-align: middle;"><p>Plano <b>Fetish</b></p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="whitetext white-bottom-border">'+
      '                        <div><p><b>Ideal para você que prefere ter momentos a só.</b></p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="whitetext">'+
      '                        <div style="font-size: 10px;"><p><b>Plano Individual</b> (1 Acesso Simultâneo)</p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="redtext price-button">'+
      '                        <div class="inline">'+
      '                          <p>R$ <b>9</b>,90 Mensal</p>'+
      '                        </div>'+
      '                      </div>'+
      ''+
      '                      <div style="font-size: 1px;">'+
      '                        <br></br>'+
      '                      </div>'+
      '                    </div>'+
      ''+
      '                    <div style="margin: auto; margin-top: 4%; margin-bottom: 4%; width: 80%;">'+
      '                      <ons-button class="redbutton inline">Assinar</ons-button>'+
      '                    </div>      '+
      ''+
      '                  </div>'+
      '                  <div class="plan-wrapper inline">'+
      '                    <div style="background: #e01600;">'+
      '                      <div class="whitetext white-bottom-border">'+
      '                        <div class="inline" style="width: 20%; box-sizing: border-box; vertical-align: middle;"><h1><b>B</b></h1></div>'+
      '                        <div class="inline" style="width: 50%; vertical-align: middle;"><p>Plano <b>Big</b></p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="whitetext white-bottom-border">'+
      '                        <div><p><b>Ideal para você que gosta de ter companhia.</b></p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="whitetext">'+
      '                        <div style="font-size: 10px;"><p><b>Plano Casal</b> (até 3 Acessos Simultâneos)</p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="redtext price-button">'+
      '                        <div class="inline">'+
      '                          <p>R$ <b>19</b>,90 Mensal</p>'+
      '                        </div>'+
      '                      </div>'+
      ''+
      '                      <div style="font-size: 1px;">'+
      '                        <br></br>'+
      '                      </div>'+
      '                    </div>'+
      ''+
      '                    <div style="margin: auto; margin-top: 4%; margin-bottom: 4%; width: 80%;">'+
      '                      <ons-button class="redbutton inline">Assinar</ons-button>'+
      '                    </div>'+
      '                  </div>'+
      '                  <div class="plan-wrapper inline">'+
      '                    <div style="background: #c21502;">'+
      '                      <div class="whitetext white-bottom-border">'+
      '                        <div class="inline" style="width: 20%; box-sizing: border-box; vertical-align: middle;"><h1><b>S</b></h1></div>'+
      '                        <div class="inline" style="width: 50%; vertical-align: middle;"><p>Plano <b>Sixty-Nine</b></p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="whitetext white-bottom-border">'+
      '                        <div><p><b>Ideal para você que gosta de ter muitas e boas companhias.</b></p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="whitetext">'+
      '                        <div style="font-size: 10px;"><p><b>Plano Plus</b> (até 5 Acessos Simultâneos)</p></div>'+
      '                      </div>'+
      ''+
      '                      <div class="redtext price-button">'+
      '                        <div class="inline">'+
      '                          <p>R$ <b>69</b>,90 Mensal</p>'+
      '                        </div>'+
      '                      </div>'+
      ''+
      '                      <div style="font-size: 1px;">'+
      '                        <br></br>'+
      '                      </div>'+
      '                    </div>'+
      ''+
      '                    <div style="margin: auto; margin-top: 4%; margin-bottom: 4%; width: 80%;">'+
      '                      <ons-button class="redbutton inline">Assinar</ons-button>'+
      '                    </div> '+
      '                  </div>'+
      '                </div>'+
      '              </div>'+
      '            </div>'+
      '            </div>';

  return result;
}
