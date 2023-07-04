import React from 'react'
import { Table, TableBody, TableCell, Snackbar, TableContainer, TableHead, TableRow, Checkbox, Button, AppBar, Toolbar, IconButton, Typography, DialogActions, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from 'axios';
import { useEffect,useState } from 'react';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiURL } from '../../../../../constants/constants'

const GetProfesors = () => {
    const navigate = useNavigate();
    const [profesores, setProfesores] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        axios.get(`${apiURL}api/Profesores/GetProfesores`)
        .then(res => {
          setProfesores(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });

    }, [])
    const cardClose = () => {
      setShowSuccess(false);
    };

    const handleCheckboxChange = (identificacionProfesor) => {
        setProfesores((prevAsignaturas) =>
          prevAsignaturas.map((profesor) =>
          profesores.identificacionAlumno === identificacionProfesor ? { ...profesor, selected: !profesor.selected } : profesor
          )
        );
      };
    
      
  const onSubmit = async (data) => {
    try {
      const url = `${apiURL}api/Profesores/UpdateProfesores`;
      const params = {
        identificacionProfesor : data.identificacionProfesor,
        nombre : data.nombre,
        apellido : data.apellido,
        edad : data.edad,
        direccion : data.direccion,
        telefono : data.telefono,
      };
      const response = await axios.put(url, { params });
      setModalOpen(true);
      navigate("/profesores");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
    identificacionProfesor: "",
    nombre: "",
    apellido: "",
    edad: "",
    direccion: "",
    telefono: ""
    }, 
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
        identificacionProfesor: Yup.string().required("La identificació es requerido"),
        nombre: Yup.string().required("El nombre del profesor es requerida"),
        apellido: Yup.string().required("El apellido del profesor es requerida"),
        edad: Yup.string().required("La edad es requerida"),
        direccion: Yup.string().required("Dirección es requerida"),
        telefono: Yup.string().required("Telefono es requerido")
    })
  });

  const handleGoBack = (event) => {
    navigate("/home");
  };

   const openModal = () => {
    setModalOpen(true);
   };    

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleGoBack}>
            <ArrowBackIosNewSharpIcon  />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Notas</Typography>
        </Toolbar>
    </AppBar>
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Seleccionar</TableCell>
          <TableCell>Identificación Profesor</TableCell>
          <TableCell>Nombre Profesor</TableCell>
          <TableCell>Apellido Profesor</TableCell>
          <TableCell>Edad Profesor</TableCell>
          <TableCell>Dirección Profesor</TableCell>
          <TableCell>Telefono Profesor</TableCell>
          <TableCell>Acción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {profesores.map((profesor) => (
          <TableRow key={profesor.identificacionProfesor}>
            <TableCell>
              <Checkbox
                checked={profesor.selected}
                onChange={() => handleCheckboxChange(profesor.identificacionProfesor)}
              />
            </TableCell>
            <TableCell>{profesor.identificacionProfesor}</TableCell>
            <TableCell>{profesor.nombre}</TableCell>
            <TableCell>{profesor.apellido}</TableCell>
            <TableCell>{profesor.edad}</TableCell>
            <TableCell>{profesor.direccion}</TableCell>
            <TableCell>{profesor.telefono}</TableCell>
            <TableCell>
              <Button variant="contained" onClick={openModal} >Actualizar Profesor</Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div>
     
    </div>
  </TableContainer>
  <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>Actualizar Alumno</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Identificación Profesor"
              name='identificacionAlumno'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.identificacionProfesor}
              helperText={errors.identificacionAlumno}  
              required={true} 
            />
            <TextField
              label="Nombre Profesor"
              name='nombre'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.nombre}
              helperText={errors.nombre}  
              required={true} 
            />
            <TextField
              label="Apellido Profesor"
              name='apellido'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.apellido}
              helperText={errors.apellido}  
              required={true} 
            />
            <TextField
              label="Edad Profesor"
              name='edad'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.edad}
              helperText={errors.edad}  
              required={true} 
            />
            <TextField
              label="Dirección Profesor"
              name='direccion'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.direccion}
              helperText={errors.direccion}  
              required={true} 
            />
            <TextField
              label="Telefono Profesor"
              name='telefono'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.telefono}
              helperText={errors.telefono}  
              required={true}
            />
            <DialogActions>
              <Button onClick={closeModal} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
               Actualizar Alumno
              </Button>
              <Snackbar
                    open={showSuccess}
                    autoHideDuration={3000}
                    onClose={cardClose}
                    message="Profesor actualizado exitosamente"
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  </>
  )
}

export default GetProfesors