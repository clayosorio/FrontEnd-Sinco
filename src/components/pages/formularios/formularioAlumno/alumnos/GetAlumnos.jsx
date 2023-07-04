import React from 'react'
import { Table, TableBody, TableCell, Snackbar, TableContainer, TableHead, TableRow, Checkbox, Button, AppBar, Toolbar, IconButton, Typography, DialogActions, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from 'axios';
import { useEffect,useState } from 'react';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiURL } from '../../../../../constants/constants'

const GetAlumnos = () => {
    const navigate = useNavigate();
    const [alumnos, setAlumnos] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        axios.get(`${apiURL}api/Alumnos/GetAlumnos`)
        .then(res => {
            setAlumnos(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });

    }, [])
    const cardClose = () => {
      setShowSuccess(false);
    };

    const handleCheckboxChange = (identificacionAlumno) => {
        setAlumnos((prevAsignaturas) =>
          prevAsignaturas.map((alumno) =>
          alumnos.identificacionAlumno === identificacionAlumno ? { ...alumno, selected: !alumno.selected } : alumno
          )
        );
      };
    
      
  const onSubmit = async (data) => {
    try {
      const url = `${apiURL}api/Alumnos/UpdateAlumnos`;
      const params = {
        identificacionAlumno : data.identificacionAlumno,
        nombre : data.nombre,
        apellido : data.apellido,
        edad : data.edad,
        direccion : data.direccion,
        telefono : data.telefono,
      };
      const response = await axios.put(url, { params });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }

  const deleteAlumno = async (id) => {
    try {
        console.log(id);
        const url = `${apiURL}api/Alumnos/DeleteAlumnos`;
        const params = {
          identificacionAlumno: id
        };
        const response = await axios.delete(url, { params });
        console.log(response);
        navigate("/alumnos");
      } catch (error) {
        console.error(error);
      }
      
  }

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
    identificacionAlumno: "",
    nombre: "",
    apellido: "",
    edad: "",
    direccion: "",
    telefono: ""
    }, 
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
        identificacionAlumno: Yup.string().required("La identificación es requerido"),
        nombre: Yup.string().required("El nombre de alumno es requerida"),
        apellido: Yup.string().required("el apellido de alumno es requerida"),
        edad: Yup.string().required("La edad es requerido"),
        direccion: Yup.string().required("La dirección es requerido"),
        telefono: Yup.string().required("Telefono es requerida")
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
          <TableCell>Identificación Alumno</TableCell>
          <TableCell>Nombre Alumno</TableCell>
          <TableCell>Apellido Alumno</TableCell>
          <TableCell>Edad Alumno</TableCell>
          <TableCell>Dirección Alumno</TableCell>
          <TableCell>Telefono Alumno</TableCell>
          <TableCell>Acción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {alumnos.map((alumno) => (
          <TableRow key={alumno.identificacionAlumno}>
            <TableCell>
              <Checkbox
                checked={alumno.selected}
                onChange={() => handleCheckboxChange(alumno.identificacionAlumno)}
              />
            </TableCell>
            <TableCell>{alumno.identificacionAlumno}</TableCell>
            <TableCell>{alumno.nombre}</TableCell>
            <TableCell>{alumno.apellido}</TableCell>
            <TableCell>{alumno.edad}</TableCell>
            <TableCell>{alumno.direccion}</TableCell>
            <TableCell>{alumno.telefono}</TableCell>
            <TableCell>
              <Button variant="contained" onClick={openModal} >Actualizar Alumno</Button>
              <Button variant="contained" onClick={deleteAlumno} >Eliminar Alumno</Button>
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
              label="Identificación Alumno"
              name='identificacionAlumno'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.identificacionAlumno}
              helperText={errors.identificacionAlumno}  
              required={true} 
            />
            <TextField
              label="Nombre Alumno"
              name='nombre'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.nombre}
              helperText={errors.nombre}  
              required={true} 
            />
              <TextField
              label="Apellido Alumno"
              name='apellido'
              onChange={handleChange}
              fullWidth
              margin="apellido"
              error={errors.apellido}
              helperText={errors.apellido}  
              required={true} 
            />
            <TextField
              label="Edad Alumno"
              name='edad'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.edad}
              helperText={errors.edad}  
              required={true} 
            />
            <TextField
              label="Dirección Alumno"
              name='direccion'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.direccion}
              helperText={errors.direccion}  
              required={true} 
            />
            <TextField
              label="Telefono Alumno"
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
                    message="Alumno actualizado exitosamente"
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  </>
  )
}

export default GetAlumnos