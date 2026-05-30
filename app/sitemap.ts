import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akshat-thapliyal.vercel.app";

  const routes = [
    "",
    "/projects",
    "/game",
    "/game/tic-tac-toe",
    "/game/chess",
    "/game/snake",
    "/game/memory",
    "/socials",
    "/qualification",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/projects" ? "monthly" as const : "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/game") ? 0.6 : 0.8,
  }));
}
