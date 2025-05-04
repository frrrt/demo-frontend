"use client";

import { useState, useEffect } from "react";
import * as parser from "@formatjs/icu-messageformat-parser";
import { TextField, Typography, Paper, Box } from "@mui/material";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { formatMessage } from "@/utils/intl";
import { Locale } from "@/const/locales";

interface Placeholder {
  name: string;
  type: "string" | "plural";
}

const extractPlaceholders = (ast: parser.MessageFormatElement[]): Placeholder[] => {
  const controls: Placeholder[] = [];

  const traverse = (
    element: parser.MessageFormatElement | parser.MessageFormatElement[] | null | undefined,
  ) => {
    if (Array.isArray(element)) {
      element.forEach(traverse);
    } else if (element && typeof element === "object") {
      if (element.type === 6) {
        controls.push({
          name: element.value,
          type: "plural",
        });
      }

      if (element.type === 1) {
        controls.push({
          name: element.value,
          type: "string",
        });
      }

      Object.values(element).forEach(traverse);
    }
  };

  traverse(ast);

  return Array.from(new Map(controls.map((c) => [c.name, c])).values());
};

export default function ICUMessagePreviewer({
  icuMessage,
  locale,
}: {
  icuMessage: string | undefined;
  locale: Locale;
}) {
  const [placeholders, setPlaceholders] = useState<Record<string, unknown>>({});
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data } = useLivePreview({
    initialData: { text: icuMessage },
    serverURL: String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST),
    depth: 0,
  });

  const message = data?.text ?? "-no string-";

  useEffect(() => {
    try {
      const initialValues: Record<string, unknown> = {};
      extractPlaceholders(parser.parse(message)).forEach((control) => {
        if (control.type === "plural") {
          initialValues[control.name] = 1;
        } else {
          initialValues[control.name] = `Value for ${control.name}`;
        }
      });
      setPlaceholders(initialValues);
      setError("");
    } catch (err: unknown) {
      setError(`Invalid ICU message format: ${err instanceof Error ? err.message : String(err)}`);
      setPlaceholders({});
    }
  }, [message]);

  useEffect(() => {
    try {
      setOutput(formatMessage(message, locale, placeholders));
      setError("");
    } catch (err: unknown) {
      setError(`Formatting error: ${err instanceof Error ? err.message : String(err)}`);
      setOutput("");
    }
  }, [message, locale, placeholders]);

  const handlePlaceholderChange = (name: string, value: unknown) => {
    setPlaceholders((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 4, backgroundColor: "#f5f5f5" }}>
        <Typography component="pre" sx={{ whiteSpace: "pre-wrap" }}>
          {message}
        </Typography>
      </Paper>

      <Typography variant="h4" gutterBottom>
        ICU Message Format Preview
      </Typography>

      {error && (
        <Paper style={{ padding: 16, marginTop: 16, backgroundColor: "#ffebee" }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {Object.keys(placeholders).map((name) => {
        const value = placeholders[name];
        const type = typeof value === "number" ? "plural" : "string";

        return (
          <div key={name} style={{ marginTop: 16 }}>
            <TextField
              fullWidth
              label={`${name} (${type})`}
              value={value}
              onChange={(e) => {
                const newValue = type === "plural" ? parseInt(e.target.value, 10) : e.target.value;
                handlePlaceholderChange(name, newValue);
              }}
              type={type === "plural" ? "number" : "text"}
            />
          </div>
        );
      })}

      {output && (
        <Paper sx={{ p: 2, mt: 3, backgroundColor: "#ccffcc" }}>
          <Typography variant="h6" gutterBottom>
            Output
          </Typography>
          <Typography>{output}</Typography>
        </Paper>
      )}

      {Object.keys(placeholders).some((name) => typeof placeholders[name] === "number") && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Plural Examples
          </Typography>
          {[0, 1, 4, 12].map((value) => {
            const exampleValues = { ...placeholders };
            Object.keys(placeholders).forEach((name) => {
              if (typeof placeholders[name] === "number") {
                exampleValues[name] = value;
              }
            });

            return (
              <Paper key={value} sx={{ p: 2, mt: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  value: {value}
                </Typography>
                <Typography>{formatMessage(message, locale, exampleValues)}</Typography>
              </Paper>
            );
          })}
        </Box>
      )}
    </>
  );
}
