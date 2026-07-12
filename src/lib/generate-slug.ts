export const GenerateSlug = (name?: string) => {
  const generatedSlug =
    name && name?.length > 0
      ? name
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "")
          ?.replaceAll("--", "-")
      : ""

  return generatedSlug
}
