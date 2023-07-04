import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableRow, TableCell, TableBody, AppBar, Toolbar , IconButton,Typography } from "@mui/material";
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

const InformeCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("https://localhost:7297/api/Asignaturas/GetReporteNotas")
      .then(res => {
        setCalificaciones(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleGoBack = (event) => {
     navigate("/home");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleGoBack}>
            <ArrowBackIosNewSharpIcon  />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Informe de Calificaciones</Typography>
        </Toolbar>
      </AppBar>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ fontSize: "small" }}>Ano Académico</TableCell>
          <TableCell style={{ fontSize: "small"}}>Identificación del Alumno</TableCell>
          <TableCell style={{ fontSize: "small"}}>Nombre del Alumno</TableCell>
          <TableCell style={{ fontSize: "small"}}>Código de la Asignatura</TableCell>
          <TableCell style={{ fontSize: "small"}}>Nombre de la Asignatura</TableCell>
          <TableCell style={{ fontSize: "small"}}>Identificación del Profesor</TableCell>
          <TableCell style={{ fontSize: "small"}}>Nombre del Profesor</TableCell>
          <TableCell style={{ fontSize: "small"}}>Calificación Final</TableCell>
          <TableCell style={{ fontSize: "small"}}>Aprobó</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {calificaciones.map((row, index) => (
          <TableRow key={index}>
            <TableCell style={{ fontSize: "small"}}>{row.anoAcademico}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.identificacionAlumno}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.nombreAlumno}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.codigoAsignatura}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.nombreAsignatura}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.identificacionProfesor}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.nombreProfesor}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.calificacionFinal}</TableCell>
            <TableCell style={{ fontSize: "small"}}>{row.aprobo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
};

export default InformeCalificaciones;