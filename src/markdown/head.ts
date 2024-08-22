export const HEAD_STYLES = (nonce: string) => /* html */ `
  <base href=".">
  <link nonce="nonce-${nonce}" rel="stylesheet" href="/public/styles.css">
  <script nonce="nonce-${nonce}" type="module" defer src="/public/scripts.mjs"></script>
`;
