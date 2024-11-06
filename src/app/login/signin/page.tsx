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

    validateField(name as keyof ILogin, value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm(errors)) {
      const res = await login(formData, "/signin");

      res?.error ? setSuccessMsg(res?.error) : setSuccessMsg("Registrado com sucesso!");
        
      setUserInfo(JSON.stringify(res));
    
    } else {
      setSuccessMsg("Há campos inválidos, corrija por favor!");
    }
  };

  return(
    <>
    <Card variant="outlined">
    <CardContent className="card">
      <Typography variant='h1' sx={{ '&' : {textAlign: 'center'} }}>Sign in here</Typography>
      <br></br>
      <Box className='loginForm' sx={{ '& > *': { m: 1, width: '25ch' } }}>
        <Button type="submit" component='a' href={process.env.NEXT_PUBLIC_GOOGLE_URL} 
         variant="outlined" startIcon={<GoogleIcon />}>Google</Button>
        <Button variant="outlined" component='a' startIcon={<GithubIcon/>}>Github</Button>
      </Box>

      <Box
        component='form'
        className='loginForm'
        onSubmit={handleSubmit}
        sx={{ '& > *': { m: 1, width: '25ch' } }}
        autoComplete="off"
      >
        <br></br>
        <Divider sx={{ '& > *': { m: 1, width: '25ch' } }}>
          <span className={stylesLogin.dividerText}>OR</span>
        </Divider>
        <br></br>

        <TextField name="email" type="email" label="Email" value={formData.email || ""} 
         error={!!errors.email} helperText={errors.email}
         required variant="outlined" onChange={handleChange}/>
        <TextField name="password" type="password" label="Password" value={formData.password || ""}
         error={!!errors.password} helperText={errors.password}
         required variant="outlined" onChange={handleChange}/>         
        <Button type="submit" variant="contained">Sign in</Button>
        <span>{successMsg}</span>
      </Box>
      <br></br><br></br><br></br>

      <Box className={stylesLogin.nav} sx={{ '& > button': { m: 1, width: '25ch' } }}>
        <p>Novo por aqui?       
          <a onClick={() => { replace("/login/signup") }}> Registre-se</a>
        </p>
      </Box>

    </CardContent>
    </Card>

    <p className={stylesLogin.userInfo}>{userInfo}</p>
    </>
  );
};