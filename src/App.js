import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/pages/home/Home';
import AsignaturaForm from './components/pages/formularios/formularioAsignatura/AsignaturaForm';
import AlumnoFormulario from "./components/pages/formularios/formularioAlumno/AlumnoFormulario";
import ProfesorFormulario from "./components/pages/formularios/formularioProfesor/ProfesorFormulario";
import InformeCalificaciones from "./components/common/views/InformeCalificaciones";
import GetAsignaturas from "./components/pages/formularios/formularioAsignatura/Asignaturas/GetAsignaturas";
import GetAlumnos from "./components/pages/formularios/formularioAlumno/alumnos/GetAlumnos";
import GetProfesors from "./components/pages/formularios/formularioProfesor/profesor/GetProfesors";
import FormularioCalificaciones from "./components/pages/formularios/formularioCalificacion/FormularioCalificaciones";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path='/' element={ <Home /> }/>
              <Route path='/home' element={ <Home /> }/>
              <Route path='/asignatura' element={ <AsignaturaForm /> }/>
              <Route path='/alumno' element={ <AlumnoFormulario /> }/>
              <Route path='/profesor' element={ <ProfesorFormulario /> }/>
              <Route path='/informenotas' element={ <InformeCalificaciones /> }/>
              <Route path='/asignaturas' element={ <GetAsignaturas /> }/>
              <Route path='/alumnos' element={ <GetAlumnos /> }/>
              <Route path='/profesores' element={ <GetProfesors /> }/>
              <Route path='/formcalificacion' element={ <FormularioCalificaciones /> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
