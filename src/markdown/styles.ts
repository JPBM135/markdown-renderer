export const HEAD_STYLES = /* html */ `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">

  <style>
    * {
      font-family: 'Roboto', sans-serif;
    }

    p {
      margin: 0;
      padding: 0;
    }

    blockquote {
      border-left: 4px solid #e0e0e0;
      margin: 0;
      padding: 0.5rem 1rem;
    }

    code {
      background-color: #f5f5f5;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Roboto Mono', monospace;
    }

    pre {
      background-color: #f5f5f5;
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
      border-top: 1px solid #e0e0e0;
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
      color: #135AC0
    }
    .color-markdown-alerts-tip {
      color: #12b886
    }
    .color-markdown-alerts-important {
      color: #E51A80
    }
    .color-markdown-alerts-warning {
      color: #E2772E
    }
    .color-markdown-alerts-caution {
      color: #FF3333
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
      background-color: #FFF4DE;
      border-left: 4px solid #FFAA00;
    }

    .markdown-alert-important {
      background-color: #FCE4EC;
      border-left: 4px solid #E51A80;
    }

    .markdown-alert-note {
      background-color: #E6F7FF;
      border-left: 4px solid #135AC0;
    }

    .markdown-alert-tip {
      background-color: #E6FCF0;
      border-left: 4px solid #12b886;
    }

    .markdown-alert-caution {
      background-color: #FFE8E8;
      border-left: 4px solid #FF3333;
    }

  </style>
`;
