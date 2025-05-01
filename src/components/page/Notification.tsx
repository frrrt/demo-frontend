import React from "react";
import { Paper, Alert, Typography, Box, Button } from "@mui/material";

export const CREATE_COMMENT_SUCCESS = "success"; // TODO: type as severity from MUI
export const CREATE_COMMENT_ERROR = "error";

export default function Notification({
  severity,
  title,
  message,
}: {
  severity: typeof CREATE_COMMENT_SUCCESS | typeof CREATE_COMMENT_ERROR;
  title: string;
  message: string;
}) {
  return (
    <Paper>
      <Alert severity={severity}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>{message}</Typography>
        <Box>
          <Button variant="outlined" size="small" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Box>
      </Alert>
    </Paper>
  );
}
