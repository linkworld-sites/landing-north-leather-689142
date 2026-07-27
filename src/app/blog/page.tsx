import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Journal — North Leather",
  description: "Notes on materials, craft and the bench behind North Leather's full-grain bags.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">North Leather</p>
        <h1 className="mt-4 font-display text-[2.75rem] font-light leading-tight text-ink md:text-[3.5rem]">
          Journal
        </h1>
        {posts.length === 0 ? (
          <p className="mt-10 text-ink/60">New notes from the bench are on the way.</p>
        ) : (
          <ul className="mt-16 divide-y divide-hairline/50 border-t border-hairline/50">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block py-8">
                  {p.date && (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40">{p.date}</p>
                  )}
                  <h2 className="mt-2 font-display text-[1.75rem] font-light text-ink group-hover:text-primary">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink/60">
                      {p.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-16">
          <Link href="/" className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink">
            ← Home
          </Link>
        </p>
      </div>
    </main>
  );
}
