// app/layout.tsx

import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Learning Loop AI</title>
      </head>
      <body>
        {children} {/* 渲染页面内容 */}
      </body>
    </html>
  );
}