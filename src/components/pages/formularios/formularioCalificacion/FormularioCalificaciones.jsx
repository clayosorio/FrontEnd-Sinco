import { AppBar, Toolbar, Typography, Button, Grid, TextField, IconButton, Paper, Snackbar, CircularProgress } from '@mui/material';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { apiURL } from '../../../../constants/constants';

const FormularioCalificaciones = () => {

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post(`${apiURL}api/Asignaturas/AddCalificacionWithProfesorAndAlumno`, data)
        .then(response => {
            console.log(response.data);
            setShowSuccess(true);
            navigate("/informenotas");
          })
          .catch(error => {
            console.error(error);
          }).finally(() => {
            setLoading(false);
          });;
    }

    const {handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            anoAcademico: "",
            identificacionAlumno: "",
            nombreAlumno: "",
            codigoAsignatura: "",
            nombreAsignatura: "",
            identificacionProfesor: "",
            nombreProfesor: "",
            calificacionFinal: 0

        },
        onSubmit: onSubmit
        ,  validationSchema: Yup.object({
            anoAcademico:  Yup.string().required("Debes ingresar un año Academico"),
            identificacionAlumno:  Yup.string().required("Debes ingresar una identificación alumno"),
            nombreAlumno:  Yup.string().required("Debes ingresar un nombre de alumno"),
            codigoAsignatura:  Yup.string().required("Debes un codigo de asignatura"),
            nombreAsignatura:  Yup.string().required("Debes ingresar un nombre de asignatura"),
            identificacionProfesor:  Yup.string().required("Debes ingresar una identificación de profesor"),
            nombreProfesor:  Yup.string().required("Debes ingresar un nombre de profesor"),
            calificacionFinal:  Yup.string().required("Debes ingresar una calificación final")
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
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '78vh',
        }}>
            <Paper elevation={3} square variant="elevation" style={{ width: '400px', textAlign: 'center', height: "750px"  }} className="form-container">
            <div style={{ display: '-ms-flexbox', justifyContent: 'center' }}>
                    <form className='form-container' onSubmit={ handleSubmit } style={{height:"50px", alignItems:"center"}}>
                            <Grid
                                container
                                direction="row"
                                alignItems={"center"}
                                justifyContent={'space-evenly'}
                                spacing={3}
                                sx={{ width: "100%", height: "00px" }}
                            >
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Año academico'
                                        variant='outlined'
                                        fullWidth
                                        name="anoAcademico"
                                        onChange={ handleChange }
                                        error={errors.anoAcademico}
                                        helperText={errors.anoAcademico}
                                        required={true}
                                        style={{width: "300", height: "100"}}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Identificación Alumno'
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
                                        label='Nombre Alumno'
                                        variant='outlined'
                                        fullWidth
                                        name="nombreAlumno"
                                        onChange={ handleChange }
                                        error={errors.nombreAlumno}
                                        helperText={errors.nombreAlumno}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Codigo Asignatura'
                                        variant='outlined'
                                        fullWidth
                                        name="codigoAsignatura"
                                        onChange={ handleChange }
                                        error={errors.codigoAsignatura}
                                        helperText={errors.codigoAsignatura}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Nombre Asignatura'
                                        variant='outlined'
                                        fullWidth
                                        name="nombreAsignatura"
                                        onChange={ handleChange }
                                        error={errors.nombreAsignatura}
                                        helperText={errors.nombreAsignatura}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item >
                                    <TextField 
                                        type='text'
                                        label='Identificación profesor'
                                        variant='outlined'
                                        fullWidth
                                        name="identificacionProfesor"
                                        onChange={ handleChange }
                                        error={errors.identificacionProfesor}
                                        helperText={errors.identificacionProfesor}
                                        required={true}
                                    />
                                     </Grid>
                                     <Grid item >
                                        <TextField 
                                        type='text'
                                        label='Nombre profesor'
                                        variant='outlined'
                                        fullWidth
                                        name="nombreProfesor"
                                        onChange={ handleChange }
                                        error={errors.nombreProfesor}
                                        helperText={errors.nombreProfesor}
                                        required={true}
                                    />
                                     </Grid>
                                     <Grid item >
                                        <TextField 
                                        type='text'
                                        label='Calificación final'
                                        variant='outlined'
                                        fullWidth
                                        name="calificacionFinal"
                                        onChange={ handleChange }
                                        error={errors.calificacionFinal}
                                        helperText={errors.calificacionFinal}
                                        required={true}
                                    />
                                     <Grid item >
                                     {loading && <CircularProgress />} {}
                                        <Button type="submit" variant='contained'>
                                         Crear Calificación
                                        </Button>
                                        <Snackbar
                                            open={showSuccess}
                                            autoHideDuration={3000}
                                            onClose={cardClose}
                                            message="Alumno eliminado exitosamente"
                                        />        
                                     </Grid>
                                </Grid>
                            </Grid>                  
                    </form>
                </div>
            </Paper>
    </div>
    </>
  );
}

export default FormularioCalificaciones