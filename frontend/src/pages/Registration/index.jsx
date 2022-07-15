import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { fetchRegisterMe } from "../../redux/slices/auth";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)



  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "John",
      email: "test2352@gmail.com",
      password: "12345",
    },
    mode: "onChange"
  })


  const onSubmit = async (params) => {
    const data = await dispatch(fetchRegisterMe(params))

    if (!data.payload) {
      return alert('can\'t register')
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    }

    console.log(data)
  }

  if (isAuth) {
    return <Navigate to="/" />
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} >
        <TextField {...register('fullName', { required: "Enter your name" })}
          className={styles.field}
          label="Fullname"
          helperText={errors.password?.message}
          fullWidth
          error={Boolean(errors.fullname?.message)} />
        <TextField {...register('email', { required: "Enter your email" })}
          className={styles.field}
          label="E-Mail"
          fullWidth error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
        />
        <TextField {...register('password', { required: "Enter your password" })}
          className={styles.field}
          label="Password"
          fullWidth error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>


    </Paper>
  );
};
