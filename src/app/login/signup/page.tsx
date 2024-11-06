'use client';

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';

import { ILogin } from '../ILogin';
import { login } from '../login';
import { useLoginContext } from '../layout';

import styles from "../../page.module.css";
import stylesLogin from "../page.module.css";

import GoogleIcon from '@mui/icons-material/Google';
import GithubIcon from '@mui/icons-material/GitHub';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { TextField, Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';

export default function Signup(){

  const { validateField, validateForm } = useLoginContext();

  const { replace } = useRouter();

  const [formData, setFormData] = useState<ILogin>({} as ILogin);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [userInfo, setUserInfo] = useState<string>("");
  const [errors, setErrors] = useState<ILogin>({} as ILogin);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name as keyof ILogin, value)
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm(errors)) {
      const res = await login(formData, "/signup");

      res?.error ? setSuccessMsg(res?.error) : setSuccessMsg("Registrado com sucesso!");

      setUserInfo(JSON.stringify(res));

    } else {
      setSuccessMsg("Há campos inválidos, corrija por favor");
    }
  };

  return(
    <>
    <Card variant="outlined">
    <CardContent className="card">
      <Typography variant='h1' sx={{ '&' : {textAlign: 'center'} }}>Sign up here</Typography>
      <br />
      <Box className='loginForm' sx={{ '& > *': { width: '25ch' } }}>
        <Button type="submit" component='a' href={process.env.NEXT_PUBLIC_GOOGLE_URL}  variant="outlined" startIcon={<GoogleIcon />}>Google</Button>
        <Button type="submit" component='a' variant="outlined" startIcon={<GithubIcon />}> Github </Button>
      </Box>

      <Box component="form"
        className="loginForm"
        onSubmit={handleSubmit}
        sx={{ '& > *': { width: '25ch' } }}
        autoComplete="off"
      >
        <br />
        <Divider sx={{ '& > *': { width: '25ch' } }}>
          <span className={stylesLogin.dividerText}>OR</span>
        </Divider>
        <br />
        <TextField name="name" label="Name" value={formData.name || ""}
         error={!!errors.name} helperText={errors.name}
         required variant="outlined" onChange={handleChange}/>
        <TextField name="email" type="email" label="Email" value={formData.email || ""} 
         error={!!errors.email} helperText={errors.email}
         required variant="outlined" onChange={handleChange}/>
        <TextField name="password" type="password" label="Password" value={formData.password || ""}
         error={!!errors.password} helperText={errors.password}
         required variant="outlined" onChange={handleChange}/>
        <Button className="primary" type="submit" variant="contained">Sign up</Button>
        <span>{successMsg}</span>
      </Box>
      <br></br><br></br>

      <Box className={stylesLogin.nav} sx={{ '& > button': { m: 1, width: '25ch' } }}>
        <p>Já é cadastrado?       
          <a onClick={() => {replace("/login/signin")}}> Login</a>
        </p>
      </Box>
    </CardContent>
    </Card>

    <p className={stylesLogin.userInfo}>{userInfo}</p>
    </>
  );
};