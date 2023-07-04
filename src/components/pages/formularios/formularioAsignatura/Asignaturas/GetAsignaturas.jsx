import React from 'react'
import { Table, TableBody, TableCell, Snackbar, TableContainer, TableHead, TableRow, Checkbox, Button, AppBar, Toolbar, IconButton, Typography, DialogActions, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import axios from 'axios';
import { useEffect,useState } from 'react';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiURL } from '../../../../../constants/constants';

const GetAsignaturas = () => {

    const navigate = useNavigate();
    const [asignaturas, setAsignaturas] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        axios.get(`${apiURL}api/Asignaturas/GetAsignaturas`)
        .then(res => {
          setAsignaturas(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });

    }, [])
    const cardClose = () => {
      setShowSuccess(false);
    };

    const handleCheckboxChange = (codigoAsignatura) => {
      setAsignaturas((prevAsignaturas) =>
          prevAsignaturas.map((asignatura) =>
          asignaturas.codigoAsignatura === codigoAsignatura ? { ...asignatura, selected: !asignatura.selected } : asignatura
          )
        );
      };
    
      
  const onSubmit = async (data) => {
    try {
      const url = `${apiURL}api/Asignaturas/AsignarProfesorAAsignatura`;
      const params = {
        identificacionProfesor: data.identificacionProfesor,
        codigoAsignatura: data.codigoAsignatura,
      };
      const response = await axios.put(url, null, { params });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      codigoAsignatura: "",
      identificacionProfesor: "",
    }, 
    onSubmit: onSubmit,
    validationSchema: Yup.object().shape({
      codigoAsignatura: Yup.string().required("El código de asignatura es requerido"),
      identificacionProfesor: Yup.string().required("La identificación de profesor es requerida")
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
          <TableCell>Codigo Asginatura</TableCell>
          <TableCell>Nombre Asignatura</TableCell>
          <TableCell>Acción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {asignaturas.map((asignaturas) => (
          <TableRow key={asignaturas.codigoAsignatura}>
            <TableCell>
              <Checkbox
                checked={asignaturas.selected}
                onChange={() => handleCheckboxChange(asignaturas.codigoAsignatura)}
              />
            </TableCell>
            <TableCell>{asignaturas.codigoAsignatura}</TableCell>
            <TableCell>{asignaturas.nombre}</TableCell>
            <TableCell>
              <Button variant="contained" onClick={openModal} >Asignar Profesor</Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div>
     
    </div>
  </TableContainer>
  <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Código de Asignatura"
              name='codigoAsignatura'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.codigoAsignatura}
              helperText={errors.codigoAsignatura}  
              required={true} 
            />
            <TextField
              label="Identificación de Profesor"
              name='identificacionProfesor'
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.identificacionProfesor}
              helperText={errors.identificacionProfesor}  
              required={true}
            />
            <DialogActions>
              <Button onClick={closeModal} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Asignar profesor
              </Button>
              <Snackbar
                    open={showSuccess}
                    autoHideDuration={3000}
                    onClose={cardClose}
                    message="Asignatura registrada exitosamente"
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  </>
  )
}

export default GetAsignaturas