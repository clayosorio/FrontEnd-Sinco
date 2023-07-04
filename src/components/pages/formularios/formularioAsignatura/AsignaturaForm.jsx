import { Button, Grid,TextField, Typography, Paper,AppBar,IconButton,Toolbar, Snackbar,CircularProgress } from '@mui/material';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { apiURL } from '../../../../constants/constants';

const AsignaturaForm = () => {
    
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post(`${apiURL}api/Asignaturas/AddAsignaturas`, data)
        .then(response => {
            setShowSuccess(true)
            console.log(response.data);
            navigate(0);
          })
          .catch(error => {
            console.error(error);
          }).finally(() => {
            setLoading(false);
          });;
    }
    const cardClose = () => {
        setShowSuccess(false);
      };

    const {handleChange, handleSubmit, errors} = useFormik({
        initialValues: {
            codigoAsignatura: "",
            nombre: ""
        },
        onSubmit:onSubmit,
        validationSchema: Yup.object({
            codigoAsignatura: Yup.string().required("Debes ingresar un codigo de asignatura"),
            nombre: Yup.string().required("Debes ingresar un nombre de asignatura"),
        })
    })

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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={3} square variant="outlined" style={{ width: '300px', textAlign: 'center', height: "300px"}} className="form-container">
            <form  className='form-container' onSubmit={ handleSubmit }>
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
                            label='Codigo de asignatura'
                            variant='outlined'
                            fullWidth
                            name="codigoAsignatura"
                            onChange={ handleChange }
                            error={errors.codeAsignatura}
                            helperText={errors.codeAsignatura}
                            required={true}
                        />
                    </Grid>
                    <Grid item >
                        <TextField 
                            type='text'
                            label='Nombre de asignatura'
                            variant='outlined'
                            fullWidth
                            name='nombre'
                            onChange={ handleChange }
                            error={errors.nombreAsignatura}
                            helperText={errors.nombreAsignatura}  
                            required={true}              />
                    </Grid>
                </Grid>
                {loading && <CircularProgress />} { } 
                <Button type="submit" variant='contained'>
                    Guardar Asignatura
                    </Button>
                    <Snackbar
                    open={showSuccess}
                    autoHideDuration={3000}
                    onClose={cardClose}
                    message="Asignatura registrada exitosamente"
                    />
                </form>
            </Paper>
        </div>
        </>     
  );
}

export default AsignaturaForm