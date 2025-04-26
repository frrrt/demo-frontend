"use client";
import { Box, TextField, Button, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createComment } from "@/mutate/createComment";
import { Page } from "@/payload-types";

export default function CommentForm({
  uistrings,
  pageId,
}: {
  uistrings: Record<string, string>;
  pageId: Page["id"];
}) {
  const createCommentWithPageId = createComment.bind(null, pageId);

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, mt: 4 }}>
      <Typography variant="h6" component="div" gutterBottom>
        {uistrings["comment-form-title"]}
      </Typography>

      <form action={createCommentWithPageId}>
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

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
              {uistrings["comment-form-button"]}
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}
