import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";
import { fetchProducts } from "@/lib/checkout";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([getPosts(), fetchProducts()]);
  const legalSlugs = getLegalSlugs();

  const staticRoutes = ["", "/shop", "/checkout", "/blog"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/product/${p.id}`,
    lastModified: new Date(),
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(),
  }));

  const legalRoutes = legalSlugs.map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...legalRoutes];
}
