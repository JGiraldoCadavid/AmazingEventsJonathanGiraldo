function crearTarjeta(eventosPasados) {
    return `<div class="card mb-3 me-3 ms-3">
              <div class="d-flex flex-column align-items-center">
                  <img src="${eventosPasados.image}" class="card-img-top img-card" alt="music concert">
                  <div class="card-body d-flex flex-column text-center">
                      <h3 class="card-title">${eventosPasados.name}</h3>
                      <p class="card-text">${eventosPasados.description}</p>
                  </div>
              </div>
              <div class="card-body body-bottom d-flex justify-content-between">
              <p>$${eventosPasados.price}</p>
              <a href="./details.html" class="btn-details btn btn-primary">Details</a>
              </div>
          </div>`;
}
function imprimirTarjetas(eventosPasados,idContenedor) {
    let contTarjetas=document.getElementById(idContenedor)
    let html = "";
    for (let i = 0; i < eventosPasados.length; i++) {
      html += crearTarjeta(eventosPasados[i]);
    }
    contTarjetas.innerHTML = html;
} 
function filtrar(data){
    let eventosPasados=[];
    for (let i = 0; i < data.events.length; i++) {
           if(data.currentDate>data.events[i].date){
                eventosPasados.push(data.events[i]);
           }    
    }
    return eventosPasados;
}
imprimirTarjetas(filtrar(data),"contTarjetas");