"use client";

import { Box, TextField, Paper, Stack, Typography } from "@mui/material";
import createComment from "@/mutate/createComment";
import { Page } from "@/payload-types";
import { useActionState } from "react";
import { SendButton } from "./SendButton";
import Notification, { CREATE_COMMENT_SUCCESS } from "./Notification";

export default function CommentForm({
  uistrings,
  pageId,
}: {
  uistrings: Record<string, string>;
  pageId: Page["id"];
}) {
  const createCommentWithPageId = createComment.bind(null, pageId);
  const [state, formAction] = useActionState(createCommentWithPageId, { message: "" });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, mt: 4 }}>
      <Typography variant="h6" component="div" gutterBottom>
        {uistrings["comment-form-title"]}
      </Typography>

      {state.message.length > 0 ? (
        <>
          {state.message === CREATE_COMMENT_SUCCESS ? (
            <Notification
              severity="success"
              title="Comment Received"
              message="We received your comment, it will be published after moderation."
            />
          ) : (
            <Notification
              severity="error"
              title="Error Occurred"
              message="We could not process your comment. Please try again later."
            />
          )}
        </>
      ) : (
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
