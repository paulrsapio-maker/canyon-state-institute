/** Renders schema.org structured data. JSON-LD scripts are data, not executable
 *  code — escaping `<` guards against `</script>` injection from content. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
