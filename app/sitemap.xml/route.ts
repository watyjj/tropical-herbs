import { getSitemapXml, getMinimalSitemapXml } from '@/lib/sitemap-xml';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  let xml: string;
  try {
    xml = await getSitemapXml();
  } catch {
    xml = getMinimalSitemapXml();
  }

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
