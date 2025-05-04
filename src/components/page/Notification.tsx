import React from "react";
import { Paper, Alert, Typography, Box, Button, type AlertColor } from "@mui/material";

export const CREATE_COMMENT_SUCCESS: AlertColor = "success";
export const CREATE_COMMENT_ERROR: AlertColor = "error";

export default function Notification({
  uistrings,
  severity,
  title,
  message,
}: {
  uistrings: Record<string, string>;
  severity: AlertColor;
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
            {uistrings["comment-form-reload"]}
          </Button>
        </Box>
      </Alert>
    </Paper>
  );
}
