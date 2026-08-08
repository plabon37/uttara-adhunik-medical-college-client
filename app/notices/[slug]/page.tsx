import NoticeDetails from "@/components/home/NoticeDetails";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NoticeDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  return (
    <NoticeDetails slug={slug} />
  );
}