'use client';
import React from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import DrawerContent from "./nav/DrawerContent";
import { Menu } from '@mui/icons-material';

export const Header = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <header>
        <Button onClick={toggleDrawer(true)}> <Menu /> </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <DrawerContent />
        </Drawer>
      </header>
      {children}
    </>
  );
};