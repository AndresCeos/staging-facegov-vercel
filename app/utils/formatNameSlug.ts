export default function formatNameSlug(name: string): string {
  return name.toLowerCase().replace(/ /g, '-').replace(/á/g, 'a').replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');
}
