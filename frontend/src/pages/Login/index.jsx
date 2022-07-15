import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form"

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";
import { useSelect } from "@mui/base";
import { Navigate } from "react-router-dom";

export const Login = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "testemail1211112@gmail.com",
      password: "test2",
    },
    mode: "onChange"
  })

  const onSubmit = async (data) => {

    const fetchedData = await dispatch(fetchAuth(data))

    if (!fetchedData.payload) {
      return alert("cannot log in")
    }


    if ("token" in fetchedData.payload) {
      localStorage.setItem('token', fetchedData.payload.token)
    }

    console.log(fetchedData)
    // dispatch(fetchUserData(data))
  }


  if (isAuth) {
    return <Navigate to="/" />
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} >
        <TextField
          className={styles.field}
          label="E-Mail"
          helperText={errors.email?.message}
          error={Boolean(errors.password?.message)}
          fullWidth
          {...register('email', { required: "Enter your email" })}
        />
        <TextField type="password" className={styles.field}
          label="Пароль" fullWidth
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register('password', { required: "Enter your password" })} />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>

    </Paper>
  );
};
