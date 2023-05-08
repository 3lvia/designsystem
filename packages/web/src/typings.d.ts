// Allows us to import HTML files as text
declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.ts' {
  const content: string;
  export default content;
}
