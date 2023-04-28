// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB1DUZcSEcBT6ysJpytnZTQk68DKH5fsIk",
    authDomain: "chesstext-594a1.firebaseapp.com",
    databaseURL: "https://chesstext-594a1-default-rtdb.firebaseio.com/",
    projectId: "chesstext-594a1",
    storageBucket: "chesstext-594a1.appspot.com",
    messagingSenderId: "271783630148",
    appId: "1:271783630148:web:3cc0e135d6eb2566bff311"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
usuario=localStorage.getItem("usuario");
document.getElementById("usuario_saludo").innerHTML="!Hola "+usuario+"¡";

function sala_nueva(){
    sala_nombre=document.getElementById("sala_nombre").value;
    localStorage.setItem("sala",sala_nombre);
    firebase.database().ref("/").child(sala_nombre).update({
        purpose: "añadir sala"
    });
    window.location.replace("chess_text_pagina.html")
}


sala_nombre=localStorage.getItem("sala");

function obtener_datos(){
    firebase.database().ref("/"+sala_nombre).on('value',function(snapshot){
        document.getElementById("salida").innerHTML="";
        snapshot.forEach(function (childSnapshot) {
             childKey = childSnapshot.key; 
             childData = childSnapshot.val();
              if (childKey != "purpose") {
                 firebase_message_id = childKey;
                  message_data = childData;

                  console.log(firebase_message_id);
                  console.log(message_data);
                  nombre=message_data['nombre'];
                  mensaje=message_data['mensaje'];
                  like=message_data['like'];

                  nombre="<h4 id='nombre'>"+nombre+"</h4>";
                  mensaje_tag="<h4 class='message_h4'>"+mensaje+"</h4>";
                  like_boton="<button class='btn btn-warning' id='"+firebase_message_id+"' value="+like+" onclick='actualizarlike(this.id)'>";
                  like_boton2="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><br>";

                  mostrar_mensajes=nombre+mensaje_tag+like_boton+like_boton2;
                  document.getElementById("salida").innerHTML+=mostrar_mensajes;

              }
            });
    });
  }

  obtener_datos();

function salir(){
    localStorage.removeItem("usuario");
    localStorage.removeItem("sala");
    window.location.replace("index.html");
}
