"use client";
import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, ListItemText, Link as MuiLink } from "@mui/material";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";

import Link from "next/link";
import { LOCALES } from "@/const/locales";
import { usePathname } from "next/navigation";

export default function ToggleLanguageButton() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<Element>();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <Box component="span" displayPrint="none">
      <IconButton
        style={{ width: 40, height: 40, color: "text.primary" }}
        size="large"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <TranslateRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {LOCALES.map((locale) => (
          <MuiLink
            key={locale}
            component={Link}
            href={"/" + locale + "/" + pathname?.split("/").slice(2).join("/")}
            prefetch
            sx={{
              display: "flex",
              textDecoration: "none",
            }}
          >
            <MenuItem onClick={() => handleClose()}>
              <ListItemText>{locale}</ListItemText>
            </MenuItem>
          </MuiLink>
        ))}
      </Menu>
    </Box>
  );
}
