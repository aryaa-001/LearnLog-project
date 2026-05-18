const apiOrigin = new URL(import.meta.env.VITE_API_URL).origin;

export const getAssetUrl = (assetPath) => {
  if (!assetPath) return "";

  if (assetPath.startsWith("blob:") || assetPath.startsWith("data:")) {
    return assetPath;
  }

  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
    const url = new URL(assetPath);

    if (url.pathname.startsWith("/uploads/")) {
      return `${apiOrigin}${url.pathname}`;
    }

    return assetPath;
  }

  return `${apiOrigin}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};
