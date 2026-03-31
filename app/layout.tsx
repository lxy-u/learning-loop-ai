// app/layout.tsx

import React from "react";
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Learning Loop AI</title>
        {/* Plausible 数据统计 */}
        <Script
          async
          src="https://plausible.io/js/pa-1arve0NHxdQPee0jsNa42.js"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
              plausible.init()
            `
          }}
        />
      </head>
      <body>
        {children} {/* 渲染页面内容 */}
      </body>
    </html>
  );
}