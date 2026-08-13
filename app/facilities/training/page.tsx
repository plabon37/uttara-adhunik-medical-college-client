

import InnerPageBanner from "@/components/shared/common/InnerPageBanner";
import FacilitiesNavigation from "@/components/shared/common/FacilitiesNavigation";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
     <InnerPageBanner
        title="Facilities"
        highlightedTitle="UAMC"
        breadcrumbs={[
          {
            label: "Home",
          },
          {
            label: "Facilities",
          },
          {
            label: "Training",
            active: true,
          },
        ]}
        decorationImage="/images/inner-page-bg.png"
  logoImage="/images/uamc-logo.png"
      />
     <FacilitiesNavigation/>
    </main>
  );
}