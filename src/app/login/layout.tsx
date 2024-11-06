'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import styles from "../page.module.css";
import { ILogin } from './ILogin';

interface ILoginContext {
  validateField: (field: keyof ILogin, value: string) => string;
  validateForm: (errors: ILogin) => boolean;
}

const LoginContext = createContext<ILoginContext | undefined>(undefined);

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("Ambiente fora de useLoginContext");
  }
  return context;
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const validateForm = (errors: ILogin): boolean => {
    return Object.values(errors).every(value => value === "");
  }
  
  const validateField = (fieldName: keyof ILogin, value: string) => { 
    var error = "";
    if (value.trim() === ""){
      error = `${fieldName} is required.`;
    }
    if (fieldName === "email" && !/\S+@\S+\.\S+/.test(value)){
      error = "Email is not valid.";
    }
    if (fieldName === "password" && value.length < 8){
      error = "Password must be at least 8 characters long.";
    }
    
    return error;
  };

  return (
    <LoginContext.Provider value={{ validateField, validateForm }}>
      <div className={styles.page}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </LoginContext.Provider>
  );
}