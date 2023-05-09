// Allows us to import HTML files as text
declare module '*.html' {
  const content: string;
  export default content;
}
