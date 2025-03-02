import React from "react";
import Image from "next/image";
import { Box, SxProps, Theme } from "@mui/material";
import { breakpoints, spacing } from "@/styles/consts";

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  sx = {},
  ...rest
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box
      sx={{
        "& > img": { width: "100%", height: "auto" },
        ...sx,
      }}
      {...rest}
    >
      <Image
        src={src}
        alt={alt || ""}
        width={width}
        height={height}
        sizes={`(max-width: ${breakpoints.sm}px) calc(100vw - ${
          spacing * 6
        }px), (max-width: ${breakpoints.md}px) calc(100vw - ${spacing * 8}px), 852px`}
        priority={priority}
        quality={quality}
      />
    </Box>
  );
};

export default ResponsiveImage;
