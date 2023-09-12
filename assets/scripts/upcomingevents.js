let eventos=data.events;
let contTarjetas=document.getElementById("contTarjetas")
let categorias=document.querySelectorAll(".seleccion")
let contCajasVerificacion= document.getElementById("contCajasVerificacion");
let entradaTexto= document.getElementById("buscador");
let botonBusqueda= document.querySelector(".lupa")

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
              <a href="./details.html?parametro=${eventosProximos._id}" class="btn-details btn btn-primary">Details</a>
              </div>
          </div>`;
}

function imprimirTarjetas(eventos,contenedor) {
    if (eventos.length>0) {
        let html = "";

        for(const evento of eventos){
            html += crearTarjeta(evento);
        }
        contenedor.innerHTML = html;
    } else {
        contenedor.innerHTML = `<p class="text-center fs-2 text-light">No information was found under those search criteria</p>`;
        let main = document.querySelector("main");
        main.classList.remove("justify-content-between");
        contenedor.classList.add("flex-grow-1", "mt-5");
    }
} 
function filtrarEventosFuturos(data){
    let eventosProximos=[];
    for(const evento of data.events){
        if(data.currentDate<evento.date){
            eventosProximos.push(evento);
        }
    }
    return eventosProximos;
} 
imprimirTarjetas(filtrarEventosFuturos(data),contTarjetas);

function filtrarCategorias(eventos){
    const categorias=eventos.map(evento => evento.category);
    const arrayCategoriasSinRepetir= Array.from(new Set(categorias));
    
    return arrayCategoriasSinRepetir;
}

function crearCajasVerificacion(categoria){
    return   `<div class="ms-3 me-2 mb-3">
                 <div class="form-check">
                 <input class="form-check-input seleccion" type="checkbox" id="${categoria}">
                 <label class="form-check-label" for="${categoria}">
                     ${categoria}
                 </label>
                 </div>
             </div>`
 }

 function imprimirCajasVerificacion(categorias, contCajasVerificacion){
    let contenidoHtml="";
    
    categorias.forEach(categoria => {
        contenidoHtml+=crearCajasVerificacion(categoria);
    })

    contCajasVerificacion.innerHTML=contenidoHtml;
}

imprimirCajasVerificacion(filtrarCategorias(eventos), contCajasVerificacion)

contCajasVerificacion.addEventListener('input', () => {
    let filtCajasVerificacion= filtrarCruzado(filtrarEventosFuturos(data),entradaTexto, contTarjetas)
    imprimirTarjetas(filtCajasVerificacion,contTarjetas)
})

function filtrarPorCajasVerificacion(eventos,contTarjetas){
    let valoresSeleccionados= Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.id)

    if(valoresSeleccionados.length>0){
        return eventos.filter(evento => valoresSeleccionados.includes(evento.category));
    }else{
        return eventos
    }
    
}

botonBusqueda.addEventListener('click', () => {
    let filtBuscador= filtrarCruzado(filtrarEventosFuturos(data),entradaTexto, contTarjetas)
    imprimirTarjetas(filtBuscador,contTarjetas)
})

function filtrarPorBuscador(eventos, entradaTexto, contTarjetas){
    let valorBusqueda=entradaTexto.value

    let valoresSeleccionados = eventos.filter(evento => evento.name.toLocaleLowerCase().includes(valorBusqueda.toLocaleLowerCase()))  

    if(valoresSeleccionados.length>0){
        return valoresSeleccionados
    }else{
        return []
    }
}

function filtrarCruzado(eventos,entradaTexto,contTarjetas){
    const filtroBuscador= filtrarPorBuscador(eventos,entradaTexto,contTarjetas)
    const filtroCajasVerificacion= filtrarPorCajasVerificacion(filtroBuscador,contTarjetas)
    return filtroCajasVerificacion
}