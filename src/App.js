import React, { Fragment, useState, useEffect} from 'react';
import Formulario from  './componentes/Formulario';
import Cita from  './componentes/Cita';

function App() {

  //citas en el local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales=[];
  }

//arreglo de citas
const [citas, guardarCitas] = useState(citasIniciales);

// use effect para realizar ciertas acciones cuando el estado cambia
useEffect( () => {
  if(citasIniciales){
    localStorage.setItem('citas', JSON.stringify(citas))
  } else{
    localStorage.setItem('citas', JSON.stringify([]));
  }
}, [citas, citasIniciales]);

//funcion que tome las citas actuales y agregue la nueva
const crearCita = cita =>{
  guardarCitas([...citas,cita]);
}

const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !== id);
  guardarCitas(nuevasCitas);
}

//Mensaje condicional
const titulo =citas.length ===0 ? 'No hay citas'
: 'Administra tus Citas';


  return (
   <>
   <Fragment>
    <h1>Administrador de Pacientes</h1>

    <div className="container">
    <div className="row">
      <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          >
          </Formulario>
      </div>
      <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita =>(
            <Cita
            key={cita.id}
            cita={cita}
            eliminarCita={eliminarCita}
            ></Cita>
          ))}
      </div>
    </div>
    </div>
    </Fragment>
    </>
  );
}

export default App;
