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
    for(const evento of eventosProximos){
        html+=crearTarjeta(evento);
    }
    contTarjetas.innerHTML = html;
} 
function filtrar(data){
    let eventosProximos=[];
    for(const evento of data.events){
        if(data.currentDate<evento.date){
            eventosProximos.push(evento);
        }
    }
    return eventosProximos;
} 
imprimirTarjetas(filtrar(data),"contTarjetas");

function filtrarCategorias(data){
    let categoria="";
    let categorias = data.events.filter((evento, indice) => {
        
        if(indice==0){
            categoria=evento.category;
            return categoria;
        }
        if(categoria!=evento.category){
            categoria=evento.category;
            return categoria;
        }
    })
    return categorias
}

function crearCheckBoxs(categoria){
   return   `<div class="ms-3 me-2 mb-3">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineFormCheck2">
                <label class="form-check-label" for="inlineFormCheck2">
                    ${categoria.category}
                </label>
                </div>
            </div>`
}

function imprimirCheckBoxs(categorias, contenedorCb){
    let contCheckBoxs= document.getElementById(contenedorCb);
    let contenidoHtml="";

    categorias.forEach(categoria => {
        contenidoHtml+=crearCheckBoxs(categoria);
    })

    contCheckBoxs.innerHTML=contenidoHtml;
}

imprimirCheckBoxs(filtrarCategorias(data),"categoriasUe")