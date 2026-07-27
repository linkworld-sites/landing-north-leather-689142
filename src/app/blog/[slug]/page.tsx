import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";
import { getSiteMeta } from "@/lib/site-meta";
import { SITE_URL } from "@/lib/site";

const FAQ_SLUG = "2026-07-27-shipping-delivery-returns-faq";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || undefined,
    datePublished: post.date || undefined,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: "North Leather" },
    publisher: { "@type": "Organization", name: "North Leather" },
  };

  const siteMeta = getSiteMeta();
  const faq =
    post.slug === FAQ_SLUG
      ? siteMeta?.faq ?? []
      : siteMeta?.faqPages?.[post.slug] ?? [];
  const faqJsonLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="mx-auto max-w-2xl">
        <Link href="/blog" className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink">
          ← All posts
        </Link>
        <h1 className="mt-8 font-display text-[2.5rem] font-light leading-tight text-ink md:text-[3.25rem]">
          {post.title}
        </h1>
        {post.date && (
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/40">{post.date}</p>
        )}
        <article
          className="post-body mt-12 text-ink/80"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {faq.length > 0 && (
          <section className="mt-16 border-t border-hairline pt-12">
            <h2 className="font-display text-[1.75rem] font-light leading-tight text-ink">
              Frequently asked questions
            </h2>
            <dl className="mt-8 space-y-8">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="text-[15px] font-medium text-ink">{item.q}</dt>
                  <dd className="mt-2 text-ink/70">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </main>
  );
}
