
let parametro= location.search;
let urlParametro= new URLSearchParams(parametro);
let idEvento=urlParametro.get("parametro")
console.log(idEvento)
let evento=data.events.find(evento => evento._id == idEvento);
let contDetalle=document.getElementById("contDetalle");

function crearDetalle(evento,contDetalle,data){
    contDetalle.innerHTML += 
            `<div class="tarjeta-detalles imagen-detalles card">
            <img class="imagen-detalles" src="${evento.image}" alt="music concert">
            </div>
            <article class="tarjeta-detalles card p-3">
                <h5 class="text-center">${evento.name}</h5>
                <p class="card-text">${evento.description}</p>
                <p><span>Date:</span> ${evento.date}</p>
                <p><span>Category:</span> ${evento.category}</p>
                <p><span>Place:</span> ${evento.place}</p>
                <p><span>Capacity:</span> ${evento.capacity}</p>
                <p id="asistencia"><span>Assistance:</span> ${evento.assistance}</p>
                <p id="estimado"><span>Estimate:</span> ${evento.estimate}</p>
                <p><span>Price:</span> $${evento.price}</p>
            </article>`
    
            validarEvento(evento,data)
}

function validarEvento(evento,data){
let asistencia=document.getElementById("asistencia")
let estimado=document.getElementById("estimado")
    if(evento.date<data.currentDate){
        estimado.classList.add("d-none")
    }else{
        asistencia.classList.add("d-none")
    }    
}

crearDetalle(evento,contDetalle,data)
