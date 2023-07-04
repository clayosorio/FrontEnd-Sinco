import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Menu, MenuItem } from '@mui/material';

function Home() {
  const [anchorElAsignatura, setAnchorElAsignatura] = React.useState(null);
  const [anchorElAlumno, setAnchorElAlumno] = React.useState(null);
  const [anchorElProfesor, setAnchorElProfesor] = React.useState(null);
  const [anchorElInforme, setanchorElInforme] = React.useState(null);


  const handleMenuOpen = (event, anchorElSetter) => {
    anchorElSetter(event.currentTarget);
  };

  const handleMenuClose = (anchorElSetter) => {
    anchorElSetter(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PT SINCOSOFT</Typography>
          <div style={{ flexGrow: 1 }}></div>
          <div>
            <Button color="inherit" onClick={(event) => handleMenuOpen(event, setAnchorElAsignatura)}>
              Asignatura
            </Button>
            <Menu
              anchorEl={anchorElAsignatura}
              keepMounted
              open={Boolean(anchorElAsignatura)}
              onClose={() => handleMenuClose(setAnchorElAsignatura)}
            >
              <MenuItem component={Link} to="/asignatura">
                Asignatura Formlario
              </MenuItem>
              <MenuItem component={Link} to="/asignaturas">
                Lista Asignaturas
              </MenuItem>
            </Menu>
          </div>
          <div>
            <Button color="inherit" onClick={(event) => handleMenuOpen(event, setAnchorElAlumno)}>
              Alumno
            </Button>
            <Menu
              anchorEl={anchorElAlumno}
              keepMounted
              open={Boolean(anchorElAlumno)}
              onClose={() => handleMenuClose(setAnchorElAlumno)}
            >
              <MenuItem component={Link} to="/alumno">
                Alumno Formulario
              </MenuItem>
              <MenuItem component={Link} to="/alumnos">
                Lista Alumnos
              </MenuItem>
            </Menu>
          </div>
          <div>
            <Button color="inherit" onClick={(event) => handleMenuOpen(event, setAnchorElProfesor)}>
              Profesor
            </Button>
            <Menu
              anchorEl={anchorElProfesor}
              keepMounted
              open={Boolean(anchorElProfesor)}
              onClose={() => handleMenuClose(setAnchorElProfesor)}
            >
              <MenuItem component={Link} to="/profesor">
                Profesor Formulario
              </MenuItem>
              <MenuItem component={Link} to="/profesores">
                Lista Profesor
              </MenuItem>
            </Menu>
          </div>
          <div>
            <Button color="inherit" onClick={(event) => handleMenuOpen(event, setanchorElInforme)}>
              Informe
            </Button>
            <Menu
              anchorEl={anchorElInforme}
              keepMounted
              open={Boolean(anchorElInforme)}
              onClose={() => handleMenuClose(setanchorElInforme)}
            >
              <MenuItem component={Link} to="/informenotas">
                Informe Notas
              </MenuItem>
              <MenuItem component={Link} to="/formcalificacion">
                Crear nota estudiante
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
            Prueba técnica Sincosoft Front end
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>

        </Typography>
      </Container>
    </div>
  );
}

export default Home;