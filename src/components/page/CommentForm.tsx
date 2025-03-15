"use client";
import { useState } from "react";
import { Box, TextField, Button, Avatar, Paper, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface CommentFormProps {
  uistrings: Record<string, string>;
  userAvatar?: string;
  onSubmit?: (comment: string) => void;
}

export default function CommentForm({ uistrings, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && onSubmit) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {uistrings["comment-form-title"]}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField
              fullWidth
              label={uistrings["comment-form-name"]}
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size="small"
            />
            <TextField
              fullWidth
              label={uistrings["comment-form-email"]}
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="small"
              helperText={uistrings["comment-form-email-helper"]}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar alt="User" sx={{ display: { xs: "none", sm: "flex" }, mt: 1 }}>
              {name ? name.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <TextField
              fullWidth
              label={uistrings["comment-form-comment"]}
              multiline
              minRows={3}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              disabled={!comment.trim() || !name.trim() || !email.trim()}
            >
              {uistrings["comment-form-button"]}
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}
