import { getRegionCounts, getLibrariesByRegion } from "@/lib/library-data";
import { DashboardClient } from "@/components/dashboard-client";

export default function DashboardPage() {
  const regionCounts = getRegionCounts();
  const allLibraries = getLibrariesByRegion();

  return (
    <DashboardClient
      regionCounts={regionCounts}
      initialLibraries={allLibraries}
      totalCount={allLibraries.length}
    />
  );
}
