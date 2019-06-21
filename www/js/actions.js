/* Trata o botão que fecha o dialogo de atualização de status
 * Chama a função callUpdateStatus que seta os status atuais para o Banco
 * Chama a função dentro do callAtualizaStatus que lê os status atuais do banco
 * Fecha o dialogo..
 */
var onButtonAtualizaStatus = function()
{
  fly.d(9,"==>[ACTIONS] onButtonAtualizaStatus");
  callUpdateStatus();
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var onCancelarAtendimento = function(qual)
{
  fly.d(9,"==>[ACTIONS] onButtonAtualizaStatus");
  fly.d(9,"qual: "+qual);
  callCancelar(qual);
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var onTelaMassagem = function(qual)
{
  fly.d(9,"==>[ACTIONS] onButtonAtualizaStatus");
  fly.d(9,"qual: "+qual);
  window.fly.c.actual_atendimento = qual;
  document.querySelector('#myNav').pushPage('pages/massagem.html', {
     animation: 'fade',
     callback: appEvents
   });
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var onIniciarAtendimento = function(qual)
{
  fly.d(9,"==>[ACTIONS] onIniciarAtendimento");
  fly.d(9,"qual: "+qual);
  window.fly.c.em_atendimento=1;
  callIniciar(qual);

}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var onEncerrarAtendimento = function()
{
  fly.d(9,"==>[ACTIONS] onEncerrarAtendimento");
  fly.d(9,"atendimento atual: "+ window.fly.c.actual_atendimento);
  window.fly.c.em_atendimento=0;
  callEncerrar(window.fly.c.actual_atendimento);

}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
var onPausarAtendimento = function()
{
  fly.d(9,"==>[ACTIONS] onPausarAtendimento");
  callPausar(window.fly.c.actual_atendimento);
}

/***************************************************
 * Função Revisada v1.0
 *
 ***************************************************/
 var onNovoBloqueio = function()
{
  fly.d(9,"==>[ACTIONS] onNovoBloqueio");
  window.fly.c.bloqueio_in_hora = document.getElementById('bi').value;
  window.fly.c.bloqueio_in_hora2 = document.getElementById('bf').value;

  callBloquear();
}

/***************************************************
 * Função Revisada v1.0
 * Trata o envio de dados de cadastro inicial do nome_do_cliente
 *
 ***************************************************/
var bt_cadastrar_user_click = function()
{
  // Verifica format
  if (trata_cadastro() == false)
    return;
  // verifica dados de E_mail
  //TODO
  // Verifica se está online
  // chama Backend
  //console.log("cadastrar_user");
  createLoadingDialog();
  call_cadastrar_user();
}

var onEnterCadastro = function()
{
  //console.log("******NO CADASTRO");
}

var onEnterComments = function () {
  createLoadingDialog();

  var storyId = window.currentStoryId;

  var commentsContainer = document.getElementById("commentcontainer");

  //commentsContainer.innerHTML = comments;

  try {
    var comments = firebase.firestore().collection('comments')
                          .where("lk", ">=", -1).where("sid", "==", storyId).orderBy("lk", "desc")
                          .limit(10);
    firebase.firestore().collection("userviews").doc(firebase.auth().currentUser.uid).get().then(function(docV) {
        if (docV.exists) {
            //console.log("Document data:", doc.data());
            comments.get().then(function(querySnapshot) {
              var str = "";
              var noComments = true;

              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  ////console.log(doc.id, " => ", doc.data());

                  var c = doc.data();
                  var date = c.timestamp.toDate();

                  str += "<ons-list-item>" + '<div class="center">' + 
        '<span class="list-item__title comment-content" style="text-weight: bold;">' + c.comment + '</span><br>' + 
        '<span class="list-item__subtitle"><div class="comment-rating" id="thumbsup-' + doc.id + '"><ons-icon icon="md-thumb-up"></ons-icon><span id="likecount-' + doc.id + '">' + c.lk + '</span></div><div class="comment-rating" id="thumbsdown-' + doc.id + '"><ons-icon icon="md-thumb-down"></ons-icon><span id="dislikecount-' + doc.id + '">' + c.dk + '</span></div></span></div>' +
         /* '<div class="right"><span class="list-item__subtitle">' + date.toLocaleDateString() + '</span></div>' +*/
        "</ons-list-item>";
                  noComments = false;
              });

              if (noComments) {
                str += "<ons-list-item>" + '<div class="center">' + 
                      '<span class="list-item__title comment-content" style="text-weight: bold;">Sem comentários nesse conto, por hora..</span><br>' + 
                      '</div>' + "</ons-list-item>";
              }


              commentsContainer.innerHTML = str;
              var dViews = docV.data();

              querySnapshot.forEach(function(doc) {
                  if (dViews[doc.id]) {
                    if (dViews[doc.id].t == 1) {
                      document.getElementById("thumbsup-" + doc.id).style.color = "#00F";
                    } else {
                      document.getElementById("thumbsdown-" + doc.id).style.color = "#F00";
                    }
                  }
                  document.getElementById("thumbsup-" + doc.id).onclick = function() {
                  localforage.getItem('comment' + doc.id).then(function(value) {
                      if (value!=null)
                      {
                        return;
                      }
                      else {
                        thumbsUpComment(doc.id);
                      }
                    }).catch(function(err) {
                    // This code runs if there were any errors
                        console.log("Error");
                        thumbsUpComment(doc.id);
                  });
                };
                document.getElementById("thumbsdown-" + doc.id).onclick = function() {
                  localforage.getItem('comment' + doc.id).then(function(value) {
                      if (value!=null)
                      {
                        return;
                      }
                      else {
                        thumbsDownComment(doc.id);
                      }
                    }).catch(function(err) {
                    // This code runs if there were any errors
                        console.log("Error");
                        thumbsDownComment(doc.id);
                  });
                };
              });

              hideAlertDialog();
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error.message);
              hideAlertDialog();
          });
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
            comments.get().then(function(querySnapshot) {
              var str = "";
              var noComments = true;

              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  ////console.log(doc.id, " => ", doc.data());

                  var c = doc.data();
                  var date = c.timestamp.toDate();

                  str += "<ons-list-item>" + '<div class="center">' + 
        '<span class="list-item__title comment-content" style="text-weight: bold;">' + c.comment + '</span><br>' + 
        '<span class="list-item__subtitle"><div class="comment-rating" id="thumbsup-' + doc.id + '"><ons-icon icon="md-thumb-up"></ons-icon><span id="likecount-' + doc.id + '">' + c.lk + '</span></div><div class="comment-rating" id="thumbsdown-' + doc.id + '"><ons-icon icon="md-thumb-down"></ons-icon><span id="dislikecount-' + doc.id + '">' + c.dk + '</span></div></span></div>' +
         /* '<div class="right"><span class="list-item__subtitle">' + date.toLocaleDateString() + '</span></div>' +*/
        "</ons-list-item>";
                  noComments = false;
              });

              if (noComments) {
                str += "<ons-list-item>" + '<div class="center">' + 
                      '<span class="list-item__title comment-content" style="text-weight: bold;">Sem comentários nesse conto, por hora..</span><br>' + 
                      '</div>' + "</ons-list-item>";
              }


              commentsContainer.innerHTML = str;

              querySnapshot.forEach(function(doc) {
                  document.getElementById("thumbsup-" + doc.id).onclick = function() {
                  localforage.getItem('comment' + doc.id).then(function(value) {
                      if (value!=null)
                      {
                        return;
                      }
                      else {
                        thumbsUpComment(doc.id);
                      }
                    }).catch(function(err) {
                    // This code runs if there were any errors
                        console.log("Error");
                        thumbsUpComment(doc.id);
                  });
                };
                document.getElementById("thumbsdown-" + doc.id).onclick = function() {
                  localforage.getItem('comment' + doc.id).then(function(value) {
                      if (value!=null)
                      {
                        return;
                      }
                      else {
                        thumbsDownComment(doc.id);
                      }
                    }).catch(function(err) {
                    // This code runs if there were any errors
                        console.log("Error");
                        thumbsDownComment(doc.id);
                  });
                };
              });

              hideAlertDialog();
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error.message);
              hideAlertDialog();
          });
        }
    }).catch(function(error) {
        //console.log("Error getting document:", error);
        comments.get().then(function(querySnapshot) {
            var str = "";
            var noComments = true;

            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                ////console.log(doc.id, " => ", doc.data());

                var c = doc.data();
                var date = c.timestamp.toDate();

                str += "<ons-list-item>" + '<div class="center">' + 
        '<span class="list-item__title comment-content" style="text-weight: bold;">' + c.comment + '</span><br>' + 
        '<span class="list-item__subtitle"><div class="comment-rating" id="thumbsup-' + doc.id + '"><ons-icon icon="md-thumb-up"></ons-icon><span id="likecount-' + doc.id + '">' + c.lk + '</span></div><div class="comment-rating" id="thumbsdown-' + doc.id + '"><ons-icon icon="md-thumb-down"></ons-icon><span id="dislikecount-' + doc.id + '">' + c.dk + '</span></div></span></div>' +
         /* '<div class="right"><span class="list-item__subtitle">' + date.toLocaleDateString() + '</span></div>' +*/
        "</ons-list-item>";
                noComments = false;
            });

            if (noComments) {
              str += "<ons-list-item>" + '<div class="center">' + 
                    '<span class="list-item__title comment-content" style="text-weight: bold;">Sem comentários nesse conto, por hora..</span><br>' + 
                    '</div>' + "</ons-list-item>";
            }

            commentsContainer.innerHTML = str;

            querySnapshot.forEach(function(doc) {
                document.getElementById("thumbsup-" + doc.id).onclick = function() {
                  localforage.getItem('comment' + doc.id).then(function(value) {
                      if (value!=null)
                      {
                        return;
                      }
                      else {
                        thumbsUpComment(doc.id);
                      }
                    }).catch(function(err) {
                    // This code runs if there were any errors
                        console.log("Error");
                        thumbsUpComment(doc.id);
                  });
                };
                document.getElementById("thumbsdown-" + doc.id).onclick = function() {
                  localforage.getItem('comment' + doc.id).then(function(value) {
                      if (value!=null)
                      {
                        return;
                      }
                      else {
                        thumbsDownComment(doc.id);
                      }
                    }).catch(function(err) {
                    // This code runs if there were any errors
                        console.log("Error");
                        thumbsDownComment(doc.id);
                  });
                };
            });

            hideAlertDialog();
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error.message);
            hideAlertDialog();
        });
    });
  } catch (e) {
    hideAlertDialog();
    console.log(e.message);
  }
}

var thumbsUpComment = function (commentId) {
  if (document.getElementById("thumbsdown-" + commentId).style.color == "rgb(255, 0, 0)" ||
      document.getElementById("thumbsup-" + commentId).style.color == "rgb(0, 0, 255)")
    return;
  document.getElementById("thumbsdown-" + commentId).style.color = document.getElementById("thumbsup-" + commentId).style.color;
  document.getElementById("thumbsup-" + commentId).style.color = "#00F";
  console.log(document.getElementById("likecount-" + commentId));
  var value = document.getElementById("likecount-" + commentId).textContent;
  console.log(value);
  value = parseInt(value, 10);
  document.getElementById("likecount-" + commentId).textContent = value + 1;
  var sfDocRef = firebase.firestore().collection('userviews').doc(firebase.auth().currentUser.uid);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  var uv = {};
                  uv['' + commentId] = {};
                  uv['' + commentId].t = 1;
                  increaseCommentThumbsUp(commentId);
                  firebase.firestore().collection('userviews').doc(firebase.auth().currentUser.uid).set(uv);
                  return;
              }
              //console.log(sfDoc);

              var uViews = sfDoc.data();
              if (uViews['' + commentId]) {
                if (uViews['' + commentId].t == -1) {
                  uViews['' + commentId].t = 1;
                  
                  decreaseCommentTDincreaseCommentTU (commentId);
                }
              } else {
                uViews['' + commentId] = {};
                uViews['' + commentId].t = 1;

                increaseCommentThumbsUp (commentId);
              }
              //var newPopulation = sfDoc.data().population + 1;
              localforage.setItem("comment" + commentId, 1);

              transaction.update(sfDocRef, uViews);
          });
      }).then(function(newUViews) {
          console.log("Transaction successfully committed - Thumbs Up!");
      }).catch(function(error) {
          document.getElementById("thumbsup-" + commentId).style.color = "";
          var value = document.getElementById("likecount-" + commentId).innerHTML;
          value = parseInt(value, 10);
          document.getElementById("likecount-" + commentId).innerHTML = value - 1;
          console.log("Transaction failed - Thumbs Up: ", error.message);
      });
}

var thumbsDownComment = function (commentId) {
  if (document.getElementById("thumbsdown-" + commentId).style.color == "rgb(255, 0, 0)" ||
      document.getElementById("thumbsup-" + commentId).style.color == "rgb(0, 0, 255)")
    return;
  document.getElementById("thumbsup-" + commentId).style.color = document.getElementById("thumbsdown-" + commentId).style.color;
  document.getElementById("thumbsdown-" + commentId).style.color = "#F00";
  var value = document.getElementById("dislikecount-" + commentId).innerHTML;
  value = parseInt(value, 10);
  document.getElementById("dislikecount-" + commentId).innerHTML = value + 1;
  var sfDocRef = firebase.firestore().collection('userviews').doc(firebase.auth().currentUser.uid);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  var uv = {};
                  uv['' + commentId] = {};
                  uv['' + commentId].t = -1;
                  increaseCommentsThumbsDown(commentId);
                  firebase.firestore().collection('userviews').doc(firebase.auth().currentUser.uid).set(uv);
                  return;
              }
              //console.log(sfDoc);

              var uViews = sfDoc.data();
              if (uViews['' + commentId]) {
                if (uViews['' + commentId].t == 1) {
                  uViews['' + commentId].t = -1;
                  increaseCommentTDdecreaseCommentTU (commentId);
                }
              } else {
                uViews['' + commentId] = {};
                uViews['' + commentId].t = -1;

                increaseCommentThumbsDown (commentId);
              }
              //var newPopulation = sfDoc.data().population + 1;
              localforage.setItem("comment" + commentId, -1);

              transaction.update(sfDocRef, uViews);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Down!");
      }).catch(function(error) {
          var value = document.getElementById("dislikecount-" + commentId).innerHTML;
          value = parseInt(value, 10);
          document.getElementById("dislikecount-" + commentId).innerHTML = value - 1;
          document.getElementById("thumbsdown-" + commentId).style.color = "";
          console.log("Transaction failed - Thumbs Down: ", error.message);
      });
}

var increaseCommentThumbsUp = function (commentId) {
  var sfDocRef = firebase.firestore().collection('comments').doc(commentId);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  return;
              }
              //console.log(sfDoc);

              var c = sfDoc.data();
              c.lk = c.lk + 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, c);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Up Increased!");
      });
}

var decreaseCommentThumbsUp = function (commentId) {
  var sfDocRef = firebase.firestore().collection('comments').doc(commentId);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  return;
              }
              //console.log(sfDoc);

              var c = sfDoc.data();
              if (c.lk > 0)
                c.lk = c.lk - 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, c);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Up Increased!");
      });
}

var increaseCommentThumbsDown = function (commentId) {
  var sfDocRef = firebase.firestore().collection('comments').doc(commentId);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  return;
              }
              //console.log(sfDoc);

              var c = sfDoc.data();
              c.dk = c.dk + 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, c);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Up Increased!");
      });
}

var decreaseCommentThumbsDown = function (commentId) {
  var sfDocRef = firebase.firestore().collection('comments').doc(commentId);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  return;
              }
              //console.log(sfDoc);

              var c = sfDoc.data();
              if (c.dk > 0)
                c.dk = c.dk - 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, c);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Up Increased!");
      });
}

var increaseCommentTDdecreaseCommentTU = function (commentId) {
  var sfDocRef = firebase.firestore().collection('comments').doc(commentId);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  return;
              }
              //console.log(sfDoc);

              var c = sfDoc.data();
              c.dk = c.dk + 1;
              c.lk = c.lk - 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, c);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Up Increased!");
      });
}

var decreaseCommentTDincreaseCommentTU = function (commentId) {
  var sfDocRef = firebase.firestore().collection('comments').doc(commentId);

      firebase.firestore().runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
              if (!sfDoc.exists) {
                  return;
              }
              //console.log(sfDoc);

              var c = sfDoc.data();
              c.dk = c.dk - 1;
              c.lk = c.lk + 1;
              //var newPopulation = sfDoc.data().population + 1;
              transaction.update(sfDocRef, c);
          });
      }).then(function() {
          console.log("Transaction successfully committed - Thumbs Up Increased!");
      });
}

var sendRating = function () {
  var commentText = document.getElementById("story-comment").value;

  if (window.rating == 0) {
    ons.notification.alert({messageHTML:"<font><br>"+ "Selecione uma Nota!" + "</font>", title: "<b>Espere, ainda não!</b>"});
    return;
  }
  else if (commentText.length > 200) {
    ons.notification.alert({messageHTML:"<font><br>"+ "Escreva um comentário mais curto (menos de 200 caracteres)!" + "</font>", title: "<b>Espere, ainda não!</b>"});
    return;
  } else {
    ons.notification.alert({messageHTML:"<font><br>Obrigado pela Avaliação!</font>", title: "<b>Obrigado!</b>"});
    //console.log("nota: " + window.rating);

    if (commentText.length != 0) {
      var csid = window.currentStoryId;
      var lu = { comment: commentText, timestamp: new Date(), sid: csid, lk: 0, dk: 0 };
      var np = {};

      firebase.firestore().collection('comments').doc(csid + "@" + firebase.auth().currentUser.uid).set(lu).then (function () {
        var sfDocRef = firebase.firestore().collection('listacontos').doc(csid);
        firebase.firestore().runTransaction(function(transaction) {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then(function(sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                //console.log(sfDoc);

                var updatedStory = sfDoc.data();
                updatedStory.num_comments = updatedStory.num_comments + 1;
                //var newPopulation = sfDoc.data().population + 1;
                transaction.update(sfDocRef, updatedStory);
            });
        }).then(function() {
            //console.log("Transaction successfully committed - comment added!");
        }).catch(function(error) {
            //console.log("Transaction failed - comment added: ", error);
        });
      }).catch(function (error) {
        ons.notification.alert({messageHTML:"<font>Comentário não pode ser adicionado.</font>", title: "<b>Falha no Envio de Comentário</b>"});
      });
    }

    var r = window.rating;
    var csd = window.currentStoryId;
    var cuser = firebase.auth().currentUser.uid;

    var sfDocRef = firebase.firestore().collection('listacontos').doc(csd);
    firebase.firestore().runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef).then(function(sfDoc) {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }
            ////console.log(sfDoc);

            var updatedStory = sfDoc.data();
            updatedStory.num_rating = updatedStory.num_rating + 1;
            updatedStory.rating = updatedStory.rating + r;
            //var newPopulation = sfDoc.data().population + 1;
            transaction.update(sfDocRef, updatedStory);

            localforage.setItem('lc' + csd, updatedStory);

            localforage.getItem('controle').then (function (item) {
                if (typeof item['ratings'] === "undefined") {
                  item['ratings'] = {};
                  item['ratings'][csd] = r;
                } else {
                  item['ratings'][csd] = r;
                }

                localforage.setItem('controle', item);

            		var pessoal = getUserDataObjPessoal(item);
            		var anonimo = getUserDataObjAnonimo(item);

                var database = firebase.firestore().collection('users').doc(cuser).set ({
                  p: pessoal,
                  a: anonimo
                }).then (function (d) {
                  trataSetPerfil();
                }).catch (function (error) {
                  var errorMessage = error.message;
                  //ons.notification.alert({messageHTML:"<font>" + errorMessage + "</font>", title: "<b>Falha no Cadastro</b>"});
                  //console.log(errorMessage);
                });
              }).catch (function (err) {
                //console.log(err);
              });
        });
    }).then(function() {
        //console.log("Transaction successfully committed - rating added!");
    }).catch(function(error) {
        //console.log("Transaction failed - rating added: ", error.message, error.stack);
    });
  }

  hideRatingDialog();
}

var sendNewInfo = function () {
  var value = document.getElementById("update-i-input").value;

  switch (window.field_name) {
    case "user_base_name":
      if (trataNome(value) == false) {
        return;
      }

      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = value;

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;

    case "user_base_pn":
      if (trataApelido(value) == false) {
        return;
      }

      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = value;

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;

    case "user_base_email":
        if (trataEmail(value) == false) {
          return;
        }

        //alert(window.field_name + " " + value);
        localforage.getItem('controle').then(function ( item ){
          item[window.control_field_name] = value;

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
            //console.log(errorMessage);
          });

          localforage.setItem('controle', item).then(callPerfilLoad);
        });
        hideUpdateDialog();
        break;
    case "user_base_cpf":
      if (trataCPF(value) == false) {
        return;
      }

      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = value;

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;

    case "user_birthdate":
      if (trataAniversario(value) == false) {
        return;
      }

      var auxDate = new Date(new Date(value).getTime() + 24 * 60 * 60 * 1000);
      var astral_value = zodiac(new Date(auxDate.getTime() + 24 * 60 * 60 * 1000).getDate(), new Date(auxDate.getTime() + 24 * 60 * 60 * 1000).getMonth()+1);

      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = auxDate.toString();
        item["astral_sign"] = astral_value;

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;

    case "user_base_telefone":
      if (trataTelefone(value) == false) {
        return;
      }

      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = value.replace(/\D/g,'');

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;

    case "user_occupation":
      if (trataProfissao(value) == false) {
        return;
      }

      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = value;

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;

    default:
      //alert(window.field_name + " " + value);
      localforage.getItem('controle').then(function ( item ){
        item[window.control_field_name] = value;

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
          //console.log(errorMessage);
        });

        localforage.setItem('controle', item).then(callPerfilLoad);
      });
      hideUpdateDialog();
      break;
  }
}

var sendNewTelefone = function () {
  var value = document.getElementById("update-telefone-input").value;
  var valueddd = document.getElementById("update-telefone-ddd").value;

  if (trataTelefoneDDD(value, valueddd) == false) {
    return;
  }

  //alert(window.field_name + " " + value);
  localforage.getItem('controle').then(function ( item ){
    item[window.control_field_name].numero = value.replace(/\D/g,'');
    item[window.control_field_name].areacode = valueddd;

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
      //console.log(errorMessage);
    });

    localforage.setItem('controle', item).then(callPerfilLoad);
  });
  hideUpdateTelefoneDialog();
}

var returnToMain = function () {
  document.querySelector('#myNav').popPage({ animation: 'slide' }).then(function() {
    createLoadingDialog();

    localforage.getItem('controle').then(function(value) {

      //console.log(value.uplan);
      if (value.uplan == "N") {
        //console.log("Epa");

        callUpdateBasicHomeData();
      }
      else {
        callUpdateberHomeData ();
      }
    }).catch(function(err) {
      // This code runs if there were any errors
      //console.log(err);
      hideAlertDialog();
    });
  });
}

var sendNewAddress = function () {
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

  //console.log(value);

  if (trataEndereco (value) == false) {
    return;
  }

  localforage.getItem('controle').then(function ( item ){
    item[window.control_field_name] = value;

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
      //console.log(errorMessage);
    });

    localforage.setItem('controle', item).then(callPerfilLoad);
  });
  goBack();
}

function clickFavorite (sid) {
  localforage.getItem('controle').then(function ( item ){
    var index = item.favoritos.indexOf(sid);
    if (index == -1) {
      item.favoritos.push(sid);
      document.getElementById("onlyread-fav-icon").style.display = "inline-block";
      document.getElementById("onlyread-notfav-icon").style.display = "none";
    } else {
      item.favoritos.splice(index, 1);
      document.getElementById("onlyread-notfav-icon").style.display = "inline-block";
      document.getElementById("onlyread-fav-icon").style.display = "none";
    }

    if (item.uplan != "N") {
      var auxf = [];
      for (var i = 0; i < item.favoritos.length; i++)
        auxf.push("C" + item.favoritos[i]);

      if (item.favoritos.length != 0) {
        uiShowFullListFavorites (auxf);
        //uiNoStories ();
      }
      else {
        uiNoFavorites ();
      }
    }

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
      //console.log(errorMessage);
    });

    localforage.setItem('controle', item);
  });
};

function clickShare (sid) {
  localforage.getItem('basicdata').then(function(value) {
        var description = value["C" + sid].description;
        ////console.log(title);

        window.plugins.socialsharing.share("Venha conhecer o nosso aplicativo!",
        'Conto G',
        'https://contog.app/img/contogvermelho2.png', // check the repo for other usages
        'https://play.google.com/store/apps/details?id=app.developer.contog');
      }).catch(function(err) {
        alert("Não conseguimos abrir o link para compartilhamento..");
      });

  //window.plugins.socialsharing.share('My message');
  //navigator.share(text,title,mimetype);
}

function loadImageForId (elemId, imgFile) {
  try {
    localforage.getItem('img' + imgFile).then(function(value) {
      if (value == 1) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
          fs.root.getFile(imgFile + '.jpg', {create: false},
            function(fileEntry) {
              //console.log(fileEntry.toURL());
              document.getElementById(elemId).src = fileEntry.toURL();
            },
            function (){
              localforage.setItem('img' + imgFile, 0);
                fs.root.getFile(imgFile + '.jpg', {create: true, exclusive: false}, function(fileEntry) {
                    var oReq = new XMLHttpRequest();
                    //console.log("uau");
                    // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                    var storage = firebase.storage();
                    var storageRef = storage.ref().child("images/" + imgFile + ".jpg");

                    storageRef.getDownloadURL().then(function(url) {
                        oReq.open("GET", url, true);
                        // Define how you want the XHR data to come back
                        oReq.responseType = "blob";
                        oReq.onload = function (oEvent) {
                            var blob = oReq.response; // Note: not oReq.responseText
                            if (blob) {
                                // Create a URL based on the blob, and set an <img> tag's src to it.
                                var url = window.URL.createObjectURL(blob);
                                //console.log("******************");
                                //console.log(url);
                                //console.log("******************");
                                //document.getElementById(elemId).src = url;
                                  fileEntry.createWriter(function(fileWriter) {

                                    fileWriter.seek(0); // Start write position at EOF.
                                    fileWriter.onerror = function (e) {
                                      fileEntry.remove(successRemoval, failRemoval);
                                      document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                    }
                                    fileWriter.onabort = function (e) {
                                      fileEntry.remove(successRemoval, failRemoval);
                                      document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                    }
                                    fileWriter.onwrite = function () {
                                      try {
                                        document.getElementById(elemId).src = fileEntry.toURL();
                                        localforage.setItem('img' + imgFile, 1);
                                      } catch (err) {
                                        fileEntry.remove(successRemoval, failRemoval);
                                        document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                      }
                                    }
                                    
                                    fileWriter.write(blob);

                                  }, function (err) {
                                    //console.log('we didnt get an XHR response!');
                                    fileEntry.remove(successRemoval, failRemoval);
                                    document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                  });
                            } else {
                              //console.log('we didnt get an XHR response!');
                              fileEntry.remove(successRemoval, failRemoval);
                              document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                            }
                        };
                        oReq.send(null);
                      }).catch(function(error) {
                        // Handle any errors
                        //console.log(error);
                        fileEntry.remove(successRemoval, failRemoval);
                        document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                      });
                  }
                );
            });
          }, function (err) { console.log('error getting persistent fs! ' + err.stack);
          document.getElementById(elemId).src = 'img/contog/blacklogo2.png'; });
      } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
          fs.root.getFile(imgFile + '.jpg', {create: false},
            function(fileEntry) {
              fileEntry.remove(successRemoval, failRemoval);
              document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
            },
            function (){
                fs.root.getFile(imgFile + '.jpg', {create: true, exclusive: false}, function(fileEntry) {
                    var oReq = new XMLHttpRequest();
                    //console.log("uau");
                    // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                    var storage = firebase.storage();
                    var storageRef = storage.ref().child("images/" + imgFile + ".jpg");

                    storageRef.getDownloadURL().then(function(url) {
                        oReq.open("GET", url, true);
                        // Define how you want the XHR data to come back
                        oReq.responseType = "blob";
                        oReq.onload = function (oEvent) {
                            var blob = oReq.response; // Note: not oReq.responseText
                            if (blob) {
                                // Create a URL based on the blob, and set an <img> tag's src to it.
                                var url = window.URL.createObjectURL(blob);
                                //console.log("******************");
                                console.log(url);
                                //console.log("******************");
                                document.getElementById(elemId).src = url;
                                  fileEntry.createWriter(function(fileWriter) {

                                    fileWriter.seek(0); // Start write position at EOF.
                                    fileWriter.onerror = function (e) {
                                      //console.log("Error" + imgFile);
                                      fileEntry.remove(successRemoval, failRemoval);
                                      document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                    }
                                    fileWriter.onabort = function (e) {
                                      //console.log("error" + imgFile);
                                      fileEntry.remove(successRemoval, failRemoval);
                                      document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                    }
                                    fileWriter.onwrite = function () {
                                      //console.log("Succeded " + imgFile);
                                      try {
                                        localforage.setItem('img' + imgFile, 1).then (function () {
                                          //console.log("OK for " + imgFile);
                                          document.getElementById(elemId).src = fileEntry.toURL();
                                        });
                                      } catch (err) {
                                        //console.log(err.message);
                                        fileEntry.remove(successRemoval, failRemoval);
                                        document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                                      }
                                    }
                                    
                                    fileWriter.write(blob);

                                  }, function (err) {
                                    //console.log('we didnt get an XHR response!');
                                    fileEntry.remove(successRemoval, failRemoval);
                                    document.getElementById(elemId).src = url;
                                  });
                            } else {
                              ////console.log('we didnt get an XHR response!');
                              fileEntry.remove(successRemoval, failRemoval);
                              document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                            }
                        };
                        oReq.send(null);
                      }).catch(function(error) {
                        // Handle any errors
                        //console.log(error);
                        fileEntry.remove(successRemoval, failRemoval);
                        document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
                      });
                  }
                );
            });
          }, function (err) { //console.log('error getting persistent fs! ' + err.stack);
          document.getElementById(elemId).src = 'img/contog/blacklogo2.png'; });
      }
    }).catch(function(err) {
      // This code runs if there were any errors
      ////console.log(err);
      document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
    });
  } catch (e) {
   // declarações para manipular quaisquer exceções
     ////console.log(e); // passa o objeto de exceção para o manipulador de erro
     document.getElementById(elemId).src = 'img/contog/blacklogo2.png';
  }
}

function loadMusic (file) {
  try {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      fs.root.getFile(file + '10.mp3', {create: false},
        function(fileEntry) {
          //console.log(fileEntry.toURL());
          try {
            //console.log("/8/8/8/98656555555555555555555555555555555555");
            resolveLocalFileSystemURL(fileEntry.toURL(), function(entry) {
              //console.log('cdvfile URI: ' + entry.toInternalURL());
              window.media = new Media (entry.toInternalURL(), onSuccess, onError);
            });
          	//window.media = new Media (fileEntry.toURL(), onSuccess, onError);
        	} catch (e) {
        		//console.log("error loading media");
        		alert(e.stack);
        		window.media = null;
        	}
         },
         function (){
           fs.root.getFile(file + '10.mp3', {create: true, exclusive: false}, function(fileEntry) {
                var oReq = new XMLHttpRequest();
                //console.log("uau");
                // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                var storage = firebase.storage();
                var storageRef = storage.ref().child("audios/" + file + ".mp3");

                storageRef.getDownloadURL().then(function(url) {
                    //console.log(url);
                    oReq.open("GET", url, true);
                    // Define how you want the XHR data to come back
                    oReq.responseType = "blob";
                    oReq.onerror = function (e) {
                                 alert("Error");
                                 window.media = new Media (url, onSuccess, onError);
                               }
                    oReq.onload = function (oEvent) {
                        //console.log("onload");
                        var blob = oReq.response; // Note: not oReq.responseText
                        if (blob) {
                            // Create a URL based on the blob, and set an <img> tag's src to it.
                            var url = window.URL.createObjectURL(blob);
                             fileEntry.createWriter(function(fileWriter) {
                               //console.log("writter created");
                               fileWriter.seek(0); // Start write position at EOF.
                               fileWriter.onwrite = function (e) {
                                 try {
                                   //alert ("OK Media");
                                   ons.notification.alert({messageHTML:"<font>Terminamos de baixar o áudio do conto '" + 
                                              file.toUpperCase().replace('_', ' ') +
                                              "', fique a vontade para escutá-lo!</font>", title: "<b>Áudio-Conto Baixado<b>"});
                                   resolveLocalFileSystemURL(fileEntry.toURL(), function(entry) {
                                     //console.log('cdvfile URI: ' + entry.toInternalURL());
                                     window.media = new Media (entry.toInternalURL(), onSuccess, onError);
                                   });
                                 	//window.media = new Media (fileEntry.toURL(), onSuccess, onError);
                               	} catch (e) {
                               		//console.log("error loading media");
                               		//alert(e.stack);
                               		window.media = null;
                               	}
                               }
                               fileWriter.onerror = function (e) {
                                 //alert("Error");
                                 ons.notification.alert({messageHTML:"<font>Por favor, verifique sua internet.</font>", title: "<b>Erro ao Baixar Áudio-Conto.<b>"})
                                 fileEntry.remove(successRemoval, failRemoval);
                                 window.media = new Media (url, onSuccess, onError);
                               }
                               fileWriter.onabort = function (e) {
                                 //alert("Error");
                                 ons.notification.alert({messageHTML:"<font>Por favor, verifique sua internet.</font>", title: "<b>Erro ao Baixar Áudio-Conto.<b>"})
                                 fileEntry.remove(successRemoval, failRemoval);
                                 window.media = new Media (url, onSuccess, onError);
                               }
                               fileWriter.write(blob);

                             }, function (err) {
                               //alert(err);
                               //console.log('we didnt get an XHR response!');
                               fileEntry.remove(successRemoval, failRemoval);
                               window.media = null;
                             });
                        } else {
                          //console.log('we didnt get an XHR response!');
                          fileEntry.remove(successRemoval, failRemoval);
                          window.media = null;
                        }
                    };
                    oReq.send(null);
                 }).catch(function(error) {
                   // Handle any errors
                   //console.log(error);
                   fileEntry.remove(successRemoval, failRemoval);
                   window.media = null;
                 });
              }
           );
         });
       }, function (err) {
         //console.log('error getting persistent fs! ' + err.stack);
         window.media = null;
       });
  } catch (e) {
   // declarações para manipular quaisquer exceções
     //console.log("Epa" + e); // passa o objeto de exceção para o manipulador de erro
     window.media = null;
  }
}

function successRemoval(entry) {
    //console.log("Removal succeeded");
}

function failRemoval(error) {
    //alert('Error removing file: ' + error.code);
    //console.log("error Removing file");
}
