let contTarjetas=document.getElementById("contTarjetas")
function crearTarjeta(evento) {
    return `<div class="card mb-3 me-3 ms-3">
              <div class="d-flex flex-column align-items-center">
                  <img src="${evento.image}" class="card-img-top img-card" alt="music concert">
                  <div class="card-body d-flex flex-column text-center">
                      <h3 class="card-title">${evento.name}</h3>
                      <p class="card-text">${evento.description}</p>
                  </div>
              </div>
              <div class="card-body body-bottom d-flex justify-content-between">
              <p>$${evento.price}</p>
              <a href="./assets/pages/details.html" class="btn-details btn btn-primary">Details</a>
              </div>
          </div>`;
}
function imprimirTarjetas(data,contenedor) {
    let html = "";
    for(const evento of data.events){
        html += crearTarjeta(evento);
    }
    contenedor.innerHTML = html;
} 
imprimirTarjetas(data,contTarjetas);