export const formatPublishedDate = (publishedDate: string) => {
  return new Date(publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
