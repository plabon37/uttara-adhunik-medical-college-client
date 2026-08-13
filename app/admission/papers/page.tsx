

import InnerPageBanner from "@/components/shared/common/InnerPageBanner";
import AdmissionNavigation from "@/components/shared/common/AdmissionNavigation";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
     <InnerPageBanner
        title="Admission"
        highlightedTitle="UAMC"
        breadcrumbs={[
          {
            label: "Home",
          },
          {
            label: "Admission",
          },
          {
            label: "Papers",
            active: true,
          },
        ]}
        decorationImage="/images/inner-page-bg.png"
  logoImage="/images/uamc-logo.png"
      />
        <AdmissionNavigation/>
    </main>
  );
}