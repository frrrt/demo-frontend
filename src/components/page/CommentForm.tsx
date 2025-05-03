"use client";

import { Box, TextField, Paper, Stack, Typography } from "@mui/material";
import { useActionState } from "react";
import { SendButton } from "./SendButton";
import Notification, { CREATE_COMMENT_ERROR, CREATE_COMMENT_SUCCESS } from "./Notification";

export default function CommentForm({
  uistrings,
  createCommentAction,
}: {
  uistrings: Record<string, string>;
  createCommentAction: (
    prevState: {
      message: string;
    },
    formData: FormData,
  ) => Promise<{
    message: string;
  }>;
}) {
  const [state, formAction] = useActionState(createCommentAction, { message: "" });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, mt: 4 }}>
      <Typography variant="h6" component="div" gutterBottom>
        {uistrings["comment-form-title"]}
      </Typography>

      {state.message === CREATE_COMMENT_SUCCESS && (
        <Notification
          uistrings={uistrings}
          severity={CREATE_COMMENT_SUCCESS}
          title={uistrings["comment-form-success-title"]}
          message={uistrings["comment-form-success-message"]}
        />
      )}

      {state.message === CREATE_COMMENT_ERROR && (
        <Notification
          uistrings={uistrings}
          severity={CREATE_COMMENT_ERROR}
          title={uistrings["comment-form-error-title"]}
          message={uistrings["comment-form-error-message"]}
        />
      )}

      {state.message.length === 0 && (
        <form action={formAction}>
          <Stack spacing={3}>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                fullWidth
                label={uistrings["comment-form-name"]}
                variant="outlined"
                name="authorName"
                required
                size="small"
              />
              <TextField
                fullWidth
                label={uistrings["comment-form-email"]}
                type="email"
                name="authorEmail"
                variant="outlined"
                required
                size="small"
                helperText={uistrings["comment-form-email-helper"]}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label={uistrings["comment-form-comment"]}
                multiline
                minRows={3}
                variant="outlined"
                name="commentText"
                required
              />
            </Box>

            <SendButton>{uistrings["comment-form-button"]}</SendButton>
          </Stack>
        </form>
      )}
    </Paper>
  );
}
