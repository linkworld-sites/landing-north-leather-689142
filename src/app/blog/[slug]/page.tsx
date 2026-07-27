import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
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
      </div>
    </main>
  );
}
