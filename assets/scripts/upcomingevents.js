function crearTarjeta(eventosProximos) {
    return `<div class="card mb-3 me-3 ms-3">
              <div class="d-flex flex-column align-items-center">
                  <img src="${eventosProximos.image}" class="card-img-top img-card" alt="music concert">
                  <div class="card-body d-flex flex-column text-center">
                      <h3 class="card-title">${eventosProximos.name}</h3>
                      <p class="card-text">${eventosProximos.description}</p>
                  </div>
              </div>
              <div class="card-body body-bottom d-flex justify-content-between">
              <p>$${eventosProximos.price}</p>
              <a href="./details.html" class="btn-details btn btn-primary">Details</a>
              </div>
          </div>`;
}
function imprimirTarjetas(eventosProximos,idContenedor) {
    let contTarjetas=document.getElementById(idContenedor)
    let html = "";
    for (let i = 0; i < eventosProximos.length; i++) {
      html += crearTarjeta(eventosProximos[i]);
    }
    contTarjetas.innerHTML = html;
} 
function filtrar(data){
    let eventosProximos=[];
    for (let i = 0; i < data.events.length; i++) {
           if(data.currentDate<data.events[i].date){
            eventosProximos.push(data.events[i]);
           }     
    }
    return eventosProximos;
}
imprimirTarjetas(filtrar(data),"contTarjetas");