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
let eventos=data.events;
function imprimirTarjetas(array,contenedor) {
    let html = "";

    for(const evento of array){
        html += crearTarjeta(evento);
    }
    contenedor.innerHTML = html;
} 
imprimirTarjetas(eventos,contTarjetas);

function filtrarCategorias(data){
    let categoria="";
    let categorias = data.events.filter((evento, indice) => {
        
        if(indice==0){
            return categoria=evento.category;
        }
        if(categoria!=evento.category){
            return categoria=evento.category; 
        }
    })
    return categorias
}

function crearCheckBoxs(categoria){
   return   `<div class="ms-3 me-2 mb-3">
                <div class="form-check">
                <input class="form-check-input seleccion" type="checkbox" id="${categoria.category}">
                <label class="form-check-label" for="${categoria.category}">
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

imprimirCheckBoxs(filtrarCategorias(data),"categorias")

function obtenerCategorias(data){
    let categorias=document.querySelectorAll(".seleccion")
    categorias.forEach(categoria =>{
        categoria.addEventListener('input', () => {
            let checkedActivo = Array.from(categorias)
                .filter(categoria => categoria.checked)
                .map(categoria => categoria.id);

                if(checkedActivo.length>0){
                    imprimirTarjetas(categoriasSeleccionadas(data,checkedActivo),contTarjetas)
                }else{
                    imprimirTarjetas(eventos,contTarjetas)
                }       
        })
    })
}

function categoriasSeleccionadas(data,checkedActivo){
    if(checkedActivo){          
        return data.events.filter(evento => checkedActivo.includes(evento.category));
    }           
} 
obtenerCategorias(data)