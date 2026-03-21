export const useAsset = () => {
  const config = useRuntimeConfig();
  const baseURL = config.app.baseURL;

  const resolvePath = (path: string) => {
    if (!path) return "";
    if (path.startsWith(baseURL)) return path;

    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseURL}${cleanPath}`;
  };

  return {
    resolvePath,
  };
};
