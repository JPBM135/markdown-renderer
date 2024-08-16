export const HEAD_STYLES = /* html */ `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" rel="stylesheet">

  <style>
    :root {
      --primary-color: #f1f5f9;
      --secondary-color: #1e293b;
      --text-color: #020617;
      --link-color: #0ea5e9;
      --border-color: #444;
      --code-bg: #f1f5f9;
      --alert-bg-note: #E6F7FF;
      --alert-border-note: #135AC0;
      --alert-bg-tip: #E6FCF0;
      --alert-border-tip: #12b886;
      --alert-bg-important: #FCE4EC;
      --alert-border-important: #E51A80;
      --alert-bg-warning: #FFF4DE;
      --alert-border-warning: #FFAA00;
      --alert-bg-caution: #FFE8E8;
      --alert-border-caution: #FF3333;
    }

    body[data-theme="dark"] {
      --primary-color: #020617;
      --secondary-color: #334155;
      --text-color: #f1f5f9;
      --link-color: #0ea5e9;
      --border-color: #e0e0e0;
      --code-bg: #1e293b;
      --alert-bg-note: #212529;
      --alert-border-note: #135AC0;
      --alert-bg-tip: #212529;
      --alert-border-tip: #12b886;
      --alert-bg-important: #212529;
      --alert-border-important: #E51A80;
      --alert-bg-warning: #212529;
      --alert-border-warning: #FFAA00;
      --alert-bg-caution: #212529;
      --alert-border-caution: #FF3333;
    }

    * {
      font-family: 'Roboto', sans-serif;
    }

    body {
      background-color: var(--primary-color);
      color: var(--text-color);
    }

    a {
      color: var(--link-color);
    }

    p {
      margin: 6px 0px;
      padding: 0;
      font-size: 14px;
    }

    blockquote {
      border-left: 4px solid var(--secondary-color);
      margin: 0;
      padding: 0.1rem 1rem;
      border-radius: 4px;
      background-color: rgba(var(--secondary-color), 0.2);
    }

    code {
      background-color: var(--code-bg);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Roboto Mono', monospace;
    }

    pre {
      background-color: var(--code-bg);
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Roboto Mono', monospace;
      overflow-x: auto;
    }

    input[type="checkbox"] {
      pointer-events: none;
    }

    hr {
      border: 0;
      border-top: 1px solid var(--border-color);
    }

    /* Alerts */
    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
    }

    .color-markdown-alerts-note {
      color: var(--alert-border-note)
    }
    .color-markdown-alerts-tip {
      color: var(--alert-border-tip)
    }
    .color-markdown-alerts-important {
      color: var(--alert-border-important)
    }
    .color-markdown-alerts-warning {
      color: var(--alert-border-warning)
    }
    .color-markdown-alerts-caution {
      color: var(--alert-border-caution)
    }


    .markdown-alert {
      margin: 1rem 0;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }

    .markdown-alert-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .markdown-alert-warning {
      background-color: var(--alert-bg-warning);
      border-left: 4px solid var(--alert-border-warning);
    }

    .markdown-alert-important {
      background-color: var(--alert-bg-important);
      border-left: 4px solid var(--alert-border-important);
    }

    .markdown-alert-note {
      background-color: var(--alert-bg-note);
      border-left: 4px solid var(--alert-border-note);
    }

    .markdown-alert-tip {
      background-color: var(--alert-bg-tip);
      border-left: 4px solid var(--alert-border-tip);
    }

    .markdown-alert-caution {
      background-color: var(--alert-bg-caution);
      border-left: 4px solid var(--alert-border-caution);
    }
  </style>
`;
