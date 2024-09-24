'use client';

import * as React from 'react';
import DrawerContent from "./DrawerContent";
import styles from "./page.module.css";

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Menu } from '@mui/icons-material';

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          <Button onClick={toggleDrawer(true)}><Menu></Menu></Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <DrawerContent />
          </Drawer>
        </main>
      </div>
    </>
  );
}
