function agregar() {
    usuario=document.getElementById("usuario").value;
    localStorage.setItem("usuario",usuario);
    window.location="chess_text.html";
}