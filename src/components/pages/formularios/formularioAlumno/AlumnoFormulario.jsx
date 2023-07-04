import { AppBar, Toolbar, Typography, Button, Grid, TextField, IconButton, Paper,Snackbar, CircularProgress } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { apiURL } from '../../../../constants/constants';


const AlumnoFormulario = () => {

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post(`${apiURL}api/Alumnos/AddAlumnos`, data)
        .then(response => {
            console.log(response.data);
            setShowSuccess(true);
            navigate(0);
          })
          .catch(error => {
            // Manejar el error
            console.error(error);
          }).finally(() => {
            setLoading(false);
          });;
    }

    const {handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            identificacionAlumno: "" ,
            nombre: "" ,
            apellido: "" ,
            edad: "" ,
            direccion: "" ,
            telefono: "" 

        },
        onSubmit:onSubmit
           ,validationSchema: Yup.object({
            identificacionAlumno: Yup.string().required("Debes ingresar una identificación"),
            nombre: Yup.string().required("Debes ingresar un nombre "),
            apellido: Yup.string().required("Debes ingresar un apellido"),
            edad: Yup.string().required("Debes ingresar una edad"),
            direccion: Yup.string().required("Debes ingresar una dirección"),
            telefono: Yup.string().required("Debes ingresar un telefono")
        })
    })

    const handleGoBack = (event) => {
        navigate("/home");
     };

     const cardClose = () => {
        setShowSuccess(false);
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
         <div>
            <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '78vh',
            }}>
            <Paper elevation={3} square variant="elevation" style={{ width: '300px', textAlign: 'center', height: "600px"  }} className="form-container">
            <div style={{ display: '-ms-flexbox', justifyContent: 'center' }}>
                    <form className='form-container' onSubmit={ handleSubmit } style={{height:"50px", alignItems:"center"}}>
                            <Grid
                                container
                                direction="column"
                                alignItems={"center"}
                                justifyContent={'space-evenly'}
                                spacing={2}
                                sx={{ width: "100%" }}
                            >
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Identificación alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="identificacionAlumno"
                                        onChange={ handleChange }
                                        error={errors.identificacionAlumno}
                                        helperText={errors.identificacionAlumno}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Nombre alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="nombre"
                                        onChange={ handleChange }
                                        error={errors.nombre}
                                        helperText={errors.nombre}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Apellido Alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="apellido"
                                        onChange={ handleChange }
                                        error={errors.apellido}
                                        helperText={errors.apellido}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Edad alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="edad"
                                        onChange={ handleChange }
                                        error={errors.edad}
                                        helperText={errors.edad}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Dirección alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="direccion"
                                        onChange={ handleChange }
                                        error={errors.direccion}
                                        helperText={errors.direccion}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Telfono alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="telefono"
                                        onChange={ handleChange }
                                        error={errors.telefono}
                                        helperText={errors.telefono}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                            {loading && <CircularProgress />} { `${loading && <p>Cargando...</p>}`  }
                            <Button type="submit" variant='contained' style={{  alignItems:"center", display:"inline-block"}}>
                                Guardar Alumno
                            </Button> 
                            <Snackbar
                                open={showSuccess}
                                autoHideDuration={3000}
                                onClose={cardClose}
                                message="Alumno eliminado exitosamente"
                            />                        
                    </form>
                </div>
            </Paper>
            </div>
        </div>
        </>
  );
}

export default AlumnoFormulario