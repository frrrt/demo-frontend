import React from "react";
import { Box, Typography, Avatar, Divider, Paper, List, ListItem } from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { fetchComments } from "@/fetch/fetchComments";
import type { Locale } from "@/const/locales";
import fetchUiStrings from "@/fetch/fetchUistrings";

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default async function CommentList({ pageId, locale }: { pageId: string; locale: Locale }) {
  const uistrings = await fetchUiStrings(["comment-list-no-comments"], locale);

  const comments = await fetchComments(pageId, locale);

  if (comments.length === 0) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {uistrings["comment-list-no-comments"]}
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="section" aria-label="Comments" sx={{ my: 4 }}>
      <Typography variant="h2" gutterBottom>
        Comments ({comments.length})
      </Typography>

      <Paper sx={{ mt: 2 }}>
        <List disablePadding>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              {index > 0 && <Divider />}
              <ListItem alignItems="flex-start" sx={{ py: 2, px: 3 }}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Avatar
                    sx={{ display: { xs: "none", md: "flex" }, bgcolor: "secondary.main", mr: 2 }}
                  >
                    {getInitials(comment.authorName)}
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "center" },
                        flexDirection: { xs: "column", md: "row" },
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        {comment.authorName}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(comment.createdAt), "MMM d, yyyy • h:mm a")}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                      {comment.commentText}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
