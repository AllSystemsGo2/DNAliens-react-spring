export const getPageId = (pathname) => {
  const t = pathname.split("/")
  if (t.length < 2) return "Global"
  return t.slice(1).join("/")
}


