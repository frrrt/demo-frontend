import React, { Fragment } from "react";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

export type RichTextType = {
  type: string;
  children: RichTextType[];
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  linkType?: "internal" | "custom";
  doc?: {
    relationTo: string;
    value: {
      slug: string;
    };
  };
  newTab?: boolean;
  url?: string;
  text?: string;
};

export default function convertToRichText(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: { [k: string]: any }[],
  firstLevel: boolean = false
) {
  if (!children) {
    return;
  }

  return children.map((node, i) => {
    if (!node) {
      return;
    }

    if (typeof node.text === "string") {
      let text = <span dangerouslySetInnerHTML={{ __html: node.text }} />;

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = (
          <Typography
            key={i}
            component="code"
            style={{
              color: "darkred",
              backgroundColor: "#d3d3d370",
              padding: "0px 4px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          >
            {text}
          </Typography>
        );
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.strikethrough) {
        text = <del key={i}>{text}</del>;
      }

      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      // Handle other leaf types here...
      return <Fragment key={i}>{text}</Fragment>;
    }

    switch (node.type) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        return (
          <Typography variant={node.type} key={i} gutterBottom sx={{ mt: 4 }}>
            {convertToRichText(node.children)}
          </Typography>
        );
      }
      case "blockquote": {
        return (
          <blockquote key={i}>{convertToRichText(node.children)}</blockquote>
        );
      }
      case "ul": {
        return (
          <Box key={i} component="ul" sx={{ m: 0, pl: 4, mb: 1 }}>
            {convertToRichText(node.children)}
          </Box>
        );
      }
      case "ol": {
        return <ol key={i}>{convertToRichText(node.children)}</ol>;
      }
      case "li": {
        return (
          <Box key={i} component="li" sx={{ pt: 0.25 }}>
            {convertToRichText(node.children)}
          </Box>
        );
      }
      case "indent": {
        return (
          <Box key={i} sx={{ pl: 2 }}>
            {convertToRichText(node.children)}
          </Box>
        );
      }
      case "link": {
        if (node.linkType === "internal" && node.doc?.value) {
          let link;
          if (node.doc?.relationTo === "articles") {
            link = `/blog/${node.doc.value.slug}`;
          } else {
            throw new Error("Unknown relationTo");
          }

          return (
            <MuiLink
              href={link}
              component={Link}
              target={node.newTab ? "_blank" : undefined}
              rel="noopener"
              key={i}
            >
              {convertToRichText(node.children)}
            </MuiLink>
          );
        }
        return (
          <MuiLink
            href={node.url ?? "/"}
            component={Link}
            target={node.newTab ? "_blank" : undefined}
            rel="noopener"
            key={i}
          >
            {convertToRichText(node.children)}
          </MuiLink>
        );
      }

      default: {
        return (
          <Typography key={i} gutterBottom={firstLevel}>
            {convertToRichText(node.children)}
          </Typography>
        );
      }
    }
  });
}
