'use client';

import * as React from 'react';
import styles from "./page.module.css";
import { TextField, Box } from '@mui/material';

export default function NavPage() {

  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>

        </main>
      
        <Box>
          <TextField id="outlined-basic" label="Inserir texto" variant="outlined" />
        </Box>
      </div>
    </>
  );
}
