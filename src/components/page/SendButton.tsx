"use client";

import { Box, Button } from "@mui/material";
import { useFormStatus } from "react-dom";
import SendIcon from "@mui/icons-material/Send";

export function SendButton({ children }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        disabled={pending}
      >
        {children}
      </Button>
    </Box>
  );
}
