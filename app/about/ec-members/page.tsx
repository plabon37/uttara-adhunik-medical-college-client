
import Admission from "@/components/home/Admission";
import InnerPageBanner from "@/components/shared/common/InnerPageBanner";
import AboutNavigation from "@/components/shared/common/AboutNavigation";
export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
     <InnerPageBanner
        title="About"
        highlightedTitle="UAMC"
        breadcrumbs={[
          {
            label: "Home",
          },
          {
            label: "About UAMC",
          },
          {
            label: "EC Members",
            active: true,
          },
        ]}
        decorationImage="/images/inner-page-bg.png"
  logoImage="/images/uamc-logo.png"
      />

      {/* About page content */}
        <AboutNavigation/>
      
      
      <Admission/>
     
    </main>
  );
}