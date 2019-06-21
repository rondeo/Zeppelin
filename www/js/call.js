

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var mudasenha = function() {

  createLoadingDialog();
  localforage.getItem('controle').then(function(value) {
    firebase.auth().sendPasswordResetEmail(value.email).then(function () {
  		hideAlertDialog();
  		ons.notification.alert({messageHTML:"<font><br>Um email foi enviado para que a troca de senha seja completa!</font>", title: "<b>Email Enviado!</b>"}).then(goBack);
  	});
  }).catch(function(err) {
    // This code runs if there were any errors
    //console.log(err);
    hideAlertDialog();
  });

}; // callSolicita







var call_cadastrar_user = function()
{
  fly.c.firsttime=1;
  localforage.setItem('firstTime',1);

  //console.log("Entrou no Cadastra user");

  var email_value = document.getElementById("cadastrar_email").value;
  var senha_value = document.getElementById("cadastrar_senha").value;
  var nome_value = document.getElementById("cadastrar_nome").value;

  firebase.auth().createUserWithEmailAndPassword(email_value, senha_value).then(function (value) {
    firebase.auth().onAuthStateChanged(function(user) {
      user.sendEmailVerification();
    });
    var nome_value = document.getElementById("cadastrar_nome").value;
    var pn_value = document.getElementById("cadastrar_pn").value;
    var email_value = document.getElementById("cadastrar_email").value;
    var gender_value = document.forms["f_cadastrar_user"]["user_gender"].value;
    var creation_date = new Date().getTime();

    var database = firebase.firestore().collection('users').doc(value.user.uid).set ({
      p: {
        n:nome_value, pn:pn_value, e:{street: "",
                                                number: "",
                                                complement: "",
                                                district: "",
                                                city: "",
                                                state: "",
                                                country: "",
                                                zipcode: ""},
                    t: {numero:"",areacode:""},
                    cpf:"",
                    i:"",
                    email:email_value
      },
      a: {
        uplan:"F", l: "1", b:"", c:{hash:"", fourdigit:""},
        as:"", p:"", s:gender_value, f:[], fmr:false, cd: creation_date
      }
    }).then (function (d) {
      hideAlertDialog();
      ons.notification.alert({messageHTML:"<font><br>Cadastro realizado com sucesso!<br>Por favor, acesse seu email para confirmar o cadastro dentro de 3 dias! Pode usufruir de nosso produto nesse meio tempo, sem necessidade de confirmação de email.</font>", title: "<b>Obrigado!</b>"}).then(function() {
  			fromCadastroToLogin();
    	});
    }).catch (function (error) {
      var errorMessage = error.message;
      hideAlertDialog();
      ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Falha no Cadastro</b>"});
    });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    hideAlertDialog();
    ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Falha no Cadastro</b>"});
    // ...
  });
};

function trataAddictionalCadastro (d) {
  //console.log("CallBack do Set Perfil");
  //console.log(d);
  hideAlertDialog();

  if (d.r != 0) {
    ons.notification.alert({messageHTML:"<font>Erro no cadastro, ao enviar informações adicionais ao servidor.</font>", title: "<b>Opa!</b>"});
  } else {
    ons.notification.alert({messageHTML:"<font><br>Cadastro realizado com sucesso!<br>Por favor, acesse seu email para confirmar o cadastro!</font>", title: "<b>Obrigado!</b>"}).then(function() {
			fromCadastroToLogin();
  		});
    return;
  }
}

var callUpdateToolbar = function () {
  localforage.getItem('controle').then(function(value) {
      //console.log(value);
      uiUpdateToolbar(value);
    }).catch(function(err) {
      alert(err);
      ons.notification.alert({messageHTML:"<font>" + err + "</font>", title: "<b>Falha Na Interface</b>"});
  });
};

var callUpdateAndCallToolbar = function () {
  localforage.getItem('controle').then(function(value) {
      //console.log(value);
      uiUpdateToolbar(value);

      document.getElementById("userhomecall").innerHTML = value.apelido;
    }).catch(function(err) {
      ons.notification.alert({messageHTML:"<font>" + err + "</font>", title: "<b>Falha Na Interface</b>"});
  });
};

var callUpdateToolbarAppend = function (appendStr) {
  localforage.getItem('controle').then(function(value) {
      //console.log(value);
      uiUpdateToolbarAppend(value, appendStr);
      hideAlertDialog();
    }).catch(function(err) {
      hideAlertDialog();
      ons.notification.alert({messageHTML:"<font>" + err + "</font>", title: "<b>Falha Na Interface</b>"});
  });
};

var callUpdateBasicHomeData = function () {
  callUpdateAndCallToolbar();

  firebase.firestore().collection('listacontos').get().then(function (doc) {
    var dd = doc.data();
    localforage.setItem("basicdata", dd);

    

    if (dd.length != 0) {
      uiShowStories (dd);
      //uiNoStories ();
    }
    else {
      uiNoStories ();
    }
  }).catch (function (error) {
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
      //console.log(err);
    });

    hideAlertDialog();
  });
};

var callUpdateSubscriberHomeData = function () {
  callUpdateToolbar();

  try {
    var pullHook = document.getElementById('pull-hook');

    $('.scrollable').pullToRefresh({
        callback: function () {
            window.def = $.Deferred();

            document.getElementById("story-genders").innerHTML = "";

            firebase.firestore().collection("listas").doc("alllists").get().then(function (doc) {
              var l = doc.data().nl;

              localforage.setItem("lists", l);

              updateSubscriberLists(l);
            }).catch(function (error) {
              localforage.getItem('lists').then(function(l) {
                updateSubscriberLists(l);
              }).catch(function(err) {
                // This code runs if there were any errors
                //console.log(err);
               try {
                  window.def.resolve();
                } catch (e) {
                  
                }
              });
            });

            updateNewStoriesList ();
            updateMostRatedStoriesList ();

            localforage.getItem('controle').then(function(valueFav) {
              var auxf = [];
              for (var i = 0; i < valueFav.favoritos.length; i++)
                auxf.push("C" + valueFav.favoritos[i]);

              if (valueFav.favoritos.length != 0) {
                uiShowFullListFavorites (auxf);
                //uiNoStories ();
              }
              else {
                uiNoFavorites ();
              }
            }).catch(function(err) {
              // This code runs if there were any errors
              //console.log(err);
              uiNoFavorites ();
            });

            var query = firebase.firestore().collection("listacontos").where("musicRecorded", "==", true);
            query.get().then(function(querySnapshot) {
              var str = "";

              querySnapshot.forEach(function(doc) {
                var sdata = doc.data();

                localforage.setItem("lc" + sdata.storyid, sdata);

                str += '<div class="text-container" onclick="goToPreviewPage(\'' + sdata.storyid + '\')">'+
          '            <div class="story-description">'+
          '              <div class="story-img-container inline left"><img id="img-story-listeners-'+ sdata.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
          '              <div class="text-description inline right">'+
          '                <h4 class="redtext">' + sdata.title + '</h4>'+
          '                <div class="rating"><div class="rating-num">'+ getRatingIcons(sdata.rating, sdata.num_rating) +
          '                  <u>' + getViewsText(sdata.views) + '</u>'+
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
              });

              document.getElementById("audio_story_list").innerHTML = str;

              querySnapshot.forEach(function(doc) {
                var sdata = doc.data();
                loadImageForId('img-story-listeners-'+ sdata.storyid, sdata.image);
              });
              //deferred.resolve();
            }).catch(function(error) {
              //console.log("Error getting documents: ", error.message);
              //hideAlertDialog();
              uiNothingToHear ();
              //deferred.resolve();
            });

            return window.def.promise();
        }
    });

    if (AdMob)
      AdMob.createBanner( {
            adId: window.admobid.banner, 
            isTesting: false,
            overlap: false,
            offsetTopBar: false, 
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black'
        });
  } catch (e) {
    console.log(e);
  }

  /*firebase.firestore().collection('listacontos').doc('allstories').get().then(function (doc) {
    var dd = doc.data();
    localforage.setItem("basicdata", dd);

    if (dd.length != 0) {
      uiShowStoriesSubscriber (dd);
      //uiNoStories ();
    }
    else {
      uiNoStories ();
    }

    var listeners = getListeners (dd);
    //console.log(listeners.length);
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
      //console.log(err);
      hideAlertDialog();
    });
  }).catch (function (error) {
    //console.log(error);
    localforage.getItem('basicdata').then(function(value) {
      if (value.length != 0) {
        uiShowStoriesSubscriber (value);
        //uiNoStories ();
      }
      else {
        uiNoStories ();
      }

      var listeners = getListeners (value);
      //console.log(listeners.length);
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
        //console.log(err);
        hideAlertDialog();
      });
    });
  });*/

  document.getElementById("story-genders").innerHTML = "";

  firebase.firestore().collection("listas").doc("alllists").get().then(function (doc) {
    var l = doc.data().nl;

    localforage.setItem("lists", l);

    updateSubscriberLists(l);
  }).catch(function (error) {
    localforage.getItem('lists').then(function(l) {
      updateSubscriberLists(l);
    }).catch(function(err) {
      // This code runs if there were any errors
      //console.log(err);
      hideAlertDialog();
    });
  });

  updateNewStoriesList ();
  updateMostRatedStoriesList ();

  localforage.getItem('controle').then(function(valueFav) {
    var auxf = [];
    for (var i = 0; i < valueFav.favoritos.length; i++)
      auxf.push("C" + valueFav.favoritos[i]);

    if (valueFav.favoritos.length != 0) {
      uiShowFullListFavorites (auxf);
      //uiNoStories ();
    }
    else {
      uiNoFavorites ();
    }
  }).catch(function(err) {
    // This code runs if there were any errors
    //console.log(err);
    uiNoFavorites ();
  });

  var query = firebase.firestore().collection("listacontos").where("musicRecorded", "==", true);
  query.get().then(function(querySnapshot) {
    var str = "";

    querySnapshot.forEach(function(doc) {
      var sdata = doc.data();

      localforage.setItem("lc" + sdata.storyid, sdata);

      str += '<div class="text-container" onclick="goToPreviewPage(\'' + sdata.storyid + '\')">'+
'            <div class="story-description">'+
'              <div class="story-img-container inline left"><img id="img-story-listeners-'+ sdata.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + sdata.title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(sdata.rating, sdata.num_rating) +
'                  <u>' + getViewsText(sdata.views) + '</u>'+
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
    });

    document.getElementById("audio_story_list").innerHTML = str;

    querySnapshot.forEach(function(doc) {
      var sdata = doc.data();
      loadImageForId('img-story-listeners-'+ sdata.storyid, sdata.image);
    });
  }).catch(function(error) {
    //console.log("Error getting documents: ", error.message);
    //hideAlertDialog();
    uiNothingToHear ();
  });
};

function updateNewStoriesList () {
  var citiesRef = firebase.firestore().collection("listacontos")
                          .orderBy("ld", "desc").limit(5);

  citiesRef.get()
    .then(function(querySnapshot) {
        var str = "";
        var received = false;

        querySnapshot.forEach(function(doc) {
            received = true;
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var sdata = doc.data();

            localforage.setItem("lc" + sdata.storyid, sdata);

            str += '<ons-carousel-item modifier="nodivider" class="recommendation-item" onclick="storyToggleVisibilityUplan(\'' + sdata.storyid + '\', ' + sdata.free + ', false);">'+
      '                <p class="recommendation-title bold">' + sdata.title + '</p>'+
      '                <img id="img-story-list-recent-' + sdata.storyid + '" src="img/contog/blacklogo2.png"></img>'+
      '                <div class="rating redtext" style="margin: 4px;"><div class="rating-num">'
                        + getRatingIcons(sdata.rating, sdata.num_rating) +'</div></div>'+
      '              </ons-carousel-item>';
        });

        if (received)
          document.getElementById("story-genders").innerHTML += '<ons-list-header class="category_list_header">' + "Contos Recentes" + '</ons-list-header>' +
            '<ons-list-item class="carousel_category"><ons-carousel class="recommendation-c-container" direction="horizontal" auto-refresh swipeable overscrollable item-width="175px">' + str + "</ons-carousel></ons-list-item>";

        querySnapshot.forEach(function(doc) {
          var sdata = doc.data();
          try{
            loadImageForId('img-story-list-' + "recent" + '-' + sdata.storyid, sdata.image);
          } catch(e) {
            
          }
        });
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function updateMostRatedStoriesList () {
  var citiesRef = firebase.firestore().collection("listacontos")
                          .orderBy("rating", "desc").limit(5);

  citiesRef.get()
    .then(function(querySnapshot) {
        var str = "";
        var received = false;

        querySnapshot.forEach(function(doc) {
            received = true;
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var sdata = doc.data();

            localforage.setItem("lc" + sdata.storyid, sdata);

            str += '<ons-carousel-item modifier="nodivider" class="recommendation-item" onclick="storyToggleVisibilityUplan(\'' + sdata.storyid + '\', ' + sdata.free + ', false);">'+
      '                <p class="recommendation-title bold">' + sdata.title + '</p>'+
      '                <img id="img-story-list-toprated-' + sdata.storyid + '" src="img/contog/blacklogo2.png"></img>'+
      '                <div class="rating redtext" style="margin: 4px;"><div class="rating-num">'
                        + getRatingIcons(sdata.rating, sdata.num_rating) +'</div></div>'+
      '              </ons-carousel-item>';
        });

        if (received)
          document.getElementById("story-genders").innerHTML += '<ons-list-header class="category_list_header">' + "Mais Avaliados" + '</ons-list-header>' +
            '<ons-list-item class="carousel_category"><ons-carousel class="recommendation-c-container" direction="horizontal" auto-refresh swipeable overscrollable item-width="175px">' + str + "</ons-carousel></ons-list-item>";

        querySnapshot.forEach(function(doc) {
          var sdata = doc.data();
          try{
            loadImageForId('img-story-list-' + "toprated" + '-' + sdata.storyid, sdata.image);
          } catch(e) {
            
          }
        });
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function updateSubscriberLists (l) {
  for (var i = 0; i < l.length; i++) {
    var atuIndex = l[i];
    console.log("646545465465/////////////// " + l[i])
    firebase.firestore().collection("listas").doc(l[i]).get().then(function (doc) {
      var li = doc.data();

      console.log("li" + li);

      localforage.setItem("l" + atuIndex, li);

      addSubscriberList(li, atuIndex);
    }).catch (function (error) {
      localforage.getItem('l' + atuIndex).then(function(li) {
        addSubscriberList(li, atuIndex);
      }).catch(function(err) {
        hideAlertDialog();
        try {
            window.def.resolve();
          } catch (e) {
            
          }
      });
    })
  }
}

function addSubscriberList (li, id) {
  var imgAux = [];
  li.l = fisherYates(li.l);
  recSolveGetListStr(li, 0, "", id, imgAux);
};

var recSolveGetListStr = function (li, atuPos, str, id, imgAux) {
  firebase.firestore().collection("listacontos").doc(li.l[atuPos]).get().then(function (doc) {
      var sdata = doc.data();

      localforage.setItem("lc" + sdata.storyid, sdata);

      str += '<ons-carousel-item modifier="nodivider" class="recommendation-item" onclick="storyToggleVisibilityUplan(\'' + sdata.storyid + '\', ' + sdata.free + ', false);">'+
'                <p class="recommendation-title bold">' + sdata.title + '</p>'+
'                <img id="img-story-list-' + id + '-' + li.l[atuPos] + '" src="img/contog/blacklogo2.png"></img>'+
'                <div class="rating redtext" style="margin: 4px;"><div class="rating-num">'
                  + getRatingIcons(sdata.rating, sdata.num_rating) +'</div></div>'+
'              </ons-carousel-item>';

      imgAux.push(sdata.image);
      
      if (atuPos == li.l.length - 1 || atuPos == 4) {
        document.getElementById("story-genders").innerHTML += '<ons-list-header class="category_list_header">' + li.n + '</ons-list-header>' +
           '<ons-list-item class="carousel_category"><ons-carousel class="recommendation-c-container" direction="horizontal" auto-refresh swipeable overscrollable item-width="175px">' + str + "</ons-carousel></ons-list-item>" + 
           '<ons-list-item class="fulllist-btn" id="btn-to-fulllist-' + id + '" tappable>Todos os Contos</ons-list-item>';

        for (i=0; i<li.l.length && i <= 4; i++)
        {
          try{
            loadImageForId('img-story-list-' + id + '-' + li.l[i], imgAux[i]);
          } catch(e) {
            
          }
        }

        document.getElementById("btn-to-fulllist-" + id).onclick = function () {
          goToFullList (id);
        };

        hideAlertDialog();
        try {
            window.def.resolve();
          } catch (e) {
            
          }
      } else {
        recSolveGetListStr(li, atuPos + 1, str, id, imgAux);
      }
  }).catch (function (error) {
      console.log(error.message);
      localforage.getItem('lc' + li.l[atuPos]).then(function(sdata) {
        str += '<ons-carousel-item modifier="nodivider" class="recommendation-item" onclick="storyToggleVisibilityUplan(\'' + sdata.storyid + '\', ' + sdata.free + ', false);">'+
  '                <p class="recommendation-title bold">' + sdata.title + '</p>'+
  '                <img id="img-story-list-' + id + '-' + li.l[atuPos] + '" src="img/contog/blacklogo2.png"></img>'+
  '                <div class="rating redtext" style="margin: 4px;"><div class="rating-num">'
                    + getRatingIcons(sdata.rating, sdata.num_rating) +'</div></div>'+
  '              </ons-carousel-item>';

        imgAux.push(sdata.image);
        
        if (atuPos == li.l.length - 1 || atuPos == 4) {
          document.getElementById("story-genders").innerHTML += '<ons-list-header>' + li.n + '</ons-list-header>' +
            '<ons-list-item><ons-carousel class="recommendation-c-container" direction="horizontal" auto-refresh swipeable overscrollable item-width="175px">' + str + "</ons-carousel></ons-list-item>" + 
            '<ons-list-item id="btn-to-fulllist-' + id + '" tappable>Todos os Contos</ons-list-item>';

          for (i=0; i<li.l.length && i <= 4; i++)
          {
            try{
              loadImageForId('img-story-list-' + id + '-' + li.l[i], imgAux[i]);
            } catch(e) {
              
            }
          }

          document.getElementById("btn-to-fulllist-" + id).onclick = function () {
            goToFullList (id);
          };

          hideAlertDialog();
          try {
            window.def.resolve();
          } catch (e) {

          }
        } else {
          recSolveGetListStr(li, atuPos + 1, str, id, imgAux);
        }
      }).catch(function(err) {
        if (atuPos == li.l.length - 1 || atuPos == 4) {
          document.getElementById("story-genders").innerHTML += '<ons-list-header>' + li.n + '</ons-list-header>' +
            '<ons-list-item><ons-carousel class="recommendation-c-container" direction="horizontal" auto-refresh swipeable overscrollable item-width="175px">' + str + "</ons-carousel></ons-list-item>" + 
            '<ons-list-item id="btn-to-fulllist-' + id + '" tappable>Todos os Contos</ons-list-item>';

          for (i=0; i<li.l.length && i <= 4; i++)
          {
            try{
              loadImageForId('img-story-list-' + id + '-' + li.l[i], imgAux[i]);
            } catch(e) {
              
            }
          }

          document.getElementById("btn-to-fulllist-" + id).onclick = function () {
            goToFullList (id);
          };

          hideAlertDialog();
          try {
            window.def.resolve();
          } catch (e) {
            
          }
        } else {
          recSolveGetListStr(li, atuPos + 1, str, id, imgAux);
        }
      });
  });
}

var callFullList = function (lid) {
  window.currentListId = lid;

    firebase.firestore().collection("listas").doc(lid).get().then(function (doc) {
      var li = doc.data();

      console.log("li" + li);

      localforage.setItem("l" + lid, li);

      addFullList(li, lid);
    }).catch (function (error) {
      localforage.getItem('l' + lid).then(function(li) {
        addFullList(li, lid);
      }).catch(function(err) {
         ons.notification.alert({messageHTML:"<font><br>Não conseguimos baixar a lista..</font>", title: "<b>Opa!</b>"}).then(goBack);
      });
    });
};

var addFullList = function (li, id) {
  var imgAux = [];
  li.l = fisherYates(li.l);
  recSolveGetFullListStr(li, 0, "", id, imgAux);
};

var recSolveGetFullListStr = function (li, atuPos, str, id, imgAux) {
  firebase.firestore().collection("listacontos").doc(li.l[atuPos]).get().then(function (doc) {
      var sdata = doc.data();
      console.log(sdata.storyid);

      localforage.setItem("lc" + sdata.storyid, sdata);

      str += '<div class="text-container" onclick="goToPreviewPage(\'' + sdata.storyid + '\')">'+
'            <div class="story-description">'+
'              <div class="story-img-container inline left"><img id="img-story-fulllist-'+ sdata.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + sdata.title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(sdata.rating, sdata.num_rating) +
'                  <u>' + getViewsText(sdata.views) + '</u>'+
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

      imgAux.push(sdata.image);
      
      if (atuPos == li.l.length - 1) {
        document.getElementById("story_fulllist").innerHTML = str;

        for (i=0; i<li.l.length; i++)
        {
          try {
            loadImageForId('img-story-fulllist-'+ li.l[i], imgAux[i]);
          } catch (e) {

          }
        }
        callUpdateToolbarAppend("fulllist");
      } else {
        recSolveGetFullListStr(li, atuPos + 1, str, id, imgAux);
      }
  }).catch (function (error) {
      console.log(error.message);
      localforage.getItem('lc' + li.l[atuPos]).then(function(sdata) {
        str += '<div class="text-container" onclick="goToPreviewPage(\'' + sdata.storyid + '\')">'+
  '            <div class="story-description">'+
  '              <div class="story-img-container inline left"><img id="img-story-fulllist-'+ sdata.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
  '              <div class="text-description inline right">'+
  '                <h4 class="redtext">' + sdata.title + '</h4>'+
  '                <div class="rating"><div class="rating-num">'+ getRatingIcons(sdata.rating, sdata.num_rating) +
  '                  <u>' + getViewsText(sdata.views) + '</u>'+
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

        imgAux.push(sdata.image);
        
        if (atuPos == li.l.length - 1) {
          document.getElementById("story_fulllist").innerHTML = str;

          for (i=0; i<li.l.length; i++)
          {
            try {
              loadImageForId('img-story-fulllist-'+ li.l[i], imgAux[i]);
            } catch (e) {

            }
          }
          callUpdateToolbarAppend("fulllist");
        } else {
          recSolveGetFullListStr(li, atuPos + 1, str, id, imgAux);
        }
      }).catch(function(err) {
        if (atuPos == li.l.length - 1) {
          document.getElementById("story_fulllist").innerHTML = str;

          for (i=0; i<li.l.length; i++)
          {
            try {
              loadImageForId('img-story-fulllist-'+ li.l[i], imgAux[i]);
            } catch (e) {

            }
          }
          callUpdateToolbarAppend("fulllist");
        } else {
          recSolveGetFullListStr(li, atuPos + 1, str, id, imgAux);
        }
      });
  });
}

var addFullListGeneral = function (lid, containerId) {
    addFullListGeneral (lid, containerId);
};

var addFullListGeneral = function (li, containerId) {
  var imgAux = [];
  //li.l = fisherYates(li.l);
  recSolveGetFullListGeneralStr(li, 0, "", containerId, imgAux);
};

var recSolveGetFullListGeneralStr = function (li, atuPos, str, containerId, imgAux) {
  firebase.firestore().collection("listacontos").doc(li[atuPos]).get().then(function (doc) {
      var sdata = doc.data();
      console.log(sdata.storyid);

      localforage.setItem("lc" + sdata.storyid, sdata);

      str += '<div class="text-container" onclick="goToPreviewPage(\'' + sdata.storyid + '\')">'+
'            <div class="story-description">'+
'              <div class="story-img-container inline left"><img id="img-story-fulllist-' + containerId + sdata.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
'              <div class="text-description inline right">'+
'                <h4 class="redtext">' + sdata.title + '</h4>'+
'                <div class="rating"><div class="rating-num">'+ getRatingIcons(sdata.rating, sdata.num_rating) +
'                  <u>' + getViewsText(sdata.views) + '</u>'+
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

      imgAux.push(sdata.image);
      
      if (atuPos == li.length - 1) {
        document.getElementById(containerId).innerHTML = str;

        for (i=0; i<li.length; i++)
        {
          try {
            loadImageForId('img-story-fulllist-'+ containerId + li[i], imgAux[i]);
          } catch (e) {

          }
        }
      } else {
        recSolveGetFullListGeneralStr(li, atuPos + 1, str, containerId, imgAux);
      }
  }).catch (function (error) {
      console.log(error.message);
      localforage.getItem('lc' + li[atuPos]).then(function(li) {
        str += '<div class="text-container" onclick="goToPreviewPage(\'' + sdata.storyid + '\')">'+
  '            <div class="story-description">'+
  '              <div class="story-img-container inline left"><img id="img-story-fulllist-' + containerId + sdata.storyid + '" src="img/contog/blacklogo2.png"></img></div>'+
  '              <div class="text-description inline right">'+
  '                <h4 class="redtext">' + sdata.title + '</h4>'+
  '                <div class="rating"><div class="rating-num">'+ getRatingIcons(sdata.rating, sdata.num_rating) +
  '                  <u>' + getViewsText(sdata.views) + '</u>'+
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

        imgAux.push(sdata.image);
        
        if (atuPos == li.length - 1) {
          document.getElementById(containerId).innerHTML = str;

          for (i=0; i<li.length; i++)
          {
            try {
              loadImageForId('img-story-fulllist-'+ containerId + li[i], imgAux[i]);
            } catch (e) {

            }
          }
        } else {
          recSolveGetFullListGeneralStr(li, atuPos + 1, str, containerId, imgAux);
        }
      }).catch(function(err) {
        if (atuPos == li.length - 1) {
          document.getElementById(containerId).innerHTML = str;

          for (i=0; i<li.length; i++)
          {
            try {
              loadImageForId('img-story-fulllist-'+ containerId + li[i], imgAux[i]);
            } catch (e) {

            }
          }
        } else {
          recSolveGetFullListGeneralStr(li, atuPos + 1, str, containerId, imgAux);
        }
      });
  });
}

var callSearchStories = function (searchstr) {
  localforage.getItem('basicdata').then(function(value) {
    if (value == null) {
      localforage.getItem('basicdata').then(function(value) {
        callUpdateSubscriberHomeData();
        createLoadingDialog();

        if (value == null) {
          alert ("Não foi possivel conectar ao servidor para pesquisa");
          hideAlertDialog();
        } else {
          var searchres = getSearchRes (searchstr, value);
          uiShowStoriesSearch (searchres);
          hideAlertDialog();
        }
      });
    } else {
      var searchres = getSearchRes (searchstr, value);
      uiShowStoriesSearch (searchres);

      hideAlertDialog();
    }
  });
};

var callStoryPreread = function (sId) {
  window.currentStoryId = sId;
  localforage.getItem('story'+sId).then(function(value) {
    //console.log(value);
      if (value!=null)
      {
        //console.log("Found Story in Local Storage");
        var recommendations = [];

        playMusic(value.music);

        localforage.getItem('controle').then (function (valueP) {

          localforage.getItem('basicdata').then(function(valueR) {
            var i = 0;
            for (var key in valueR) {
              if (key == "length")
                continue;
              if (i < 5) {
                i++;
                recommendations.push(valueR[key]);
              } else {
                break;
              }
            }
            //console.log(recommendations);
            if (recommendations.length == 0)
              recommendations = null;
            uiShowPreview (value, recommendations, valueP.uplan);
            callUpdateToolbarAppend("preread");
          }).catch(function(err) {
            // This code runs if there were any errors
            //console.log(err);
            uiShowPreview (value, null, valueP.uplan);
            callUpdateToolbarAppend("preread");
          });
        }).catch (function (err) {
          //console.log(err);
          uiShowPreview (value, null, "N");
          callUpdateToolbarAppend("preread");
        });
      }
      else {
        firebase.firestore().collection('contos').doc(sId).get().then(function (doc) {
    			var data = doc.data();
    			storyGetDataTrata(data);
    		}).catch(function (error) {
          alert ("Conto não pôde ser carregado..");
          goBack();
          hideAlertDialog();
    		});
      }
    }).catch(function(err) {
      //console.log("o erro foi aqui mesmo");
      hideAlertDialog();
      alert(err + err.stack);

      goBack();
  });
};

var callPerfilLoad = function () {
  localforage.getItem('controle').then(function(value) {
      uiUpdatePerfilCall(value);

      hideAlertDialog();
    }).catch(function(err) {
      alert(err);

      hideAlertDialog();
  });
}

var callSecondPScreenAddressLoad = function () {
  createLoadingDialog();
  localforage.getItem("controle").then(function (value) {
    uiUpdateAddressSecondScreen(value);

    hideAlertDialog();
  }).catch(function(err) {
    alert(err);
    hideAlertDialog();
  });
}

var callStoryRead = function (sId) {
  document.getElementById("onlyread-fav-btn").setAttribute("onclick", "clickFavorite(" + sId.substring(1) + ")");
  document.getElementById("onlyread-share-btn").setAttribute("onclick", "clickShare(" + sId.substring(1) + ")");

  localforage.getItem('controle').then(function(value) {
    /*//console.log("hjdsnsdjncjndkamkjsn82197318273918728937893718");
    //console.log(value);
    //console.log("hjdsnsdjncjndkamkjsn82197318273918728937893718");*/
    if (value.favoritos.indexOf(parseInt(sId.substring(1))) == -1) {
      document.getElementById("onlyread-fav-icon").style.display = "none";
      document.getElementById("onlyread-notfav-icon").style.display = "inline-block";
    } else {
      document.getElementById("onlyread-notfav-icon").style.display = "none";
      document.getElementById("onlyread-fav-icon").style.display = "inline-block";
    }

  }).catch(function(err) {
    document.getElementById("onlyread-fav-icon").style.display = "none";
    document.getElementById("onlyread-notfav-icon").style.display = "inline-block";
  });

  localforage.getItem('story'+sId).then(function(value) {
    //console.log(value);
      if (value!=null)
      {
        //console.log("Found Story in Local Storage");
        uiShowView (value);

        hideAlertDialog();
      }
      else {
        hideAlertDialog();
        goBack();
      }
    }).catch(function(err) {
      hideAlertDialog();
      alert(err);
      goBack();
  });
};

var callPlanUpdate = function () {
  localforage.getItem('controle').then(function(value) {
        //console.log(value);
          if (value!=null)
          {
            // Náo é a primeir
            if (value.uplan == "N") {
              var txt = document.getElementById("plan-usertext");

              txt.innerHTML = "<b>Olá " + value.apelido + ". Você, atualmente, não está cadastrada(o) em nenhum plano..</b><p>" +
                              "Mas que tal ver nossos possíveis planos, para que possas aproveitar nossa plataforma ao máximo?</p>";

              if (value.freeMonthReceived == false) {
                txt.innerHTML += "<p><b>Damos 30 dias para experimentar sua assinatura, de graça!</b></p>";
              }
              hideAlertDialog();
              return;
            } else {
              //console.log(value.uplan);
              uiUpdatePlan (value.uplan, value.apelido);
              hideAlertDialog();
            }
            //goCadastro();
          }
          else {
            // É a primeira vez
            //document.querySelector('#myNav').pushPage('pages/contog/login.html');
            //console.log("No User");
            hideAlertDialog();
            // document.querySelector('#myNav').pushPage('pages/cadastro.html?v=7');
            // localforage.setItem('firstTime',1);
          }
        }).catch(function(err) {
        // This code runs if there were any errors
            //console.log("Error");
            hideAlertDialog();
      });
}
