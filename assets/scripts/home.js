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

function filtrarCategorias(){
    let categoria="";
    let categorias = eventos.filter(evento => {
        if(categoria!=evento.category){
            return categoria=evento.category; 
        }
    })
    return categorias
}

function crearCheckBoxes(categoria){
   return   `<div class="ms-3 me-2 mb-3">
                <div class="form-check">
                <input class="form-check-input seleccion" type="checkbox" id="${categoria.category}">
                <label class="form-check-label" for="${categoria.category}">
                    ${categoria.category}
                </label>
                </div>
            </div>`
}

function imprimirCheckBoxes(categorias, contenedorCb){
    let contCheckBoxes= document.getElementById(contenedorCb);
    let contenidoHtml="";

    categorias.forEach(categoria => {
        contenidoHtml+=crearCheckBoxes(categoria);
    })

    contCheckBoxes.innerHTML=contenidoHtml;
}

imprimirCheckBoxes(filtrarCategorias(),"categorias")

let categorias=document.querySelectorAll(".seleccion")

function obtenerCategorias(){
    categorias.forEach(categoria =>{
        categoria.addEventListener('input', () => {
            let checkedActivo = Array.from(categorias)
                .filter(categoria => categoria.checked)
                .map(categoria => categoria.id);
                
                if(checkedActivo.length>0){
                    imprimirTarjetas(categoriasSeleccionadas(checkedActivo),contTarjetas)
                    if(entradatexto.length>0){filtrarPorBuscador(entradatexto)}
                }else{
                    imprimirTarjetas(eventos,contTarjetas)
                }       
        })
    })
}

function categoriasSeleccionadas(checkedActivo){
    if(checkedActivo.length>0){          
        return eventos.filter(evento => checkedActivo.includes(evento.category));
    }           
} 

obtenerCategorias()

function borrarChecks(){
    Array.from(categorias).filter(categoria => categoria.checked).map(categoria => categoria.checked=false);  
}

let entradatexto= document.getElementById("buscador");

function obtenerEntradaBuscador(){
    let valorTexto;
    entradatexto.addEventListener('input',(e)=>{
        valorTexto=e.target.value;
        if(valorTexto.length>0){
            filtrarPorBuscador(valorTexto);
        }else{
            imprimirTarjetas(eventos,contTarjetas);
            borrarChecks();
        }
    })
}
obtenerEntradaBuscador()

let formBuscador= document.getElementById("formularioBusqueda");

function filtrarPorBuscador(valor){
    formBuscador.addEventListener('submit',(e) => {
    e.preventDefault()

    let valorBusqueda=valor;
    let tarjetasFiltradas=eventos.filter(evento=>evento.description.toLocaleLowerCase().includes(valorBusqueda)||evento.name.toLocaleLowerCase().includes(valorBusqueda))

        if(tarjetasFiltradas.length>0){
            imprimirTarjetas(tarjetasFiltradas,contTarjetas)
        }else{
            contTarjetas.innerHTML=`<p class="text-center fs-2 text-light">No information was found under those search criteria</p>`
            let main=document.querySelector('main')
            main.classList.remove("justify-content-between")
            contTarjetas.classList.add("flex-grow-1", "mt-5")
        }
    
    })
}