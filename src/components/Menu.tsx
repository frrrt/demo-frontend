import { Box, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

export default async function Menu() {
  const response = await fetch(
    `${process.env.PAYLOAD_CMS_HOST}/api/pages?locale=en-US`
  );
  const result: { docs: { id: string; title: string }[] } =
    await response.json();

  return (
    <Box sx={{ display: "flex", "& > a": { ml: 4 } }}>
      {result.docs
        .filter(({ id }) => id !== "index")
        .map((page) => (
          <MuiLink key={page.id} component={Link} href={`/${page.id}`} passHref>
            <Typography variant="body1">{page.title}</Typography>
          </MuiLink>
        ))}
    </Box>
  );
}
