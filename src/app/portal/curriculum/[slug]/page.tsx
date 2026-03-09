import { fetchWeekDetail } from "@/app/actions/curriculum-actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function WeekDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params?.slug;
  
  if (!slug) {
    notFound();
  }

  const result = await fetchWeekDetail(slug);
  
  if (!result.success) {
    return (
      <div style={{ padding: '50px' }}>
        <h1 style={{ color: 'red' }}>Fetch Error</h1>
        <pre>{JSON.stringify(result, null, 2)}</pre>
        <Link href="/portal/curriculum">Back</Link>
      </div>
    );
  }

  const { week, modules } = result.data || {};

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Debug: {slug}</h1>
      <Link href="/portal/curriculum">← Back</Link>
      <hr style={{ margin: '20px 0' }} />
      
      <h2>Week Object:</h2>
      <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
        {JSON.stringify(week, null, 2)}
      </pre>

      <h2>Modules ({modules?.length || 0}):</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {modules?.map((m: any) => (
          <div key={m.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <strong>{m.title}</strong> (slug: {m.slug})
            <br />
            <Link href={`/portal/curriculum/${slug}/${m.slug}`}>[View Unit]</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
