import ServiceForm from "@/components/technician/services/ServiceForm";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;

  return <ServiceForm serviceId={id} />;
}
