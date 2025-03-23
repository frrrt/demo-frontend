"use client";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Error - Something went wrong</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            Something went wrong!
          </h1>

          <p
            style={{
              color: "#666",
              marginBottom: "1.5rem",
            }}
          >
            We apologize for the inconvenience. Please try again later.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#999",
                marginBottom: "1.5rem",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
