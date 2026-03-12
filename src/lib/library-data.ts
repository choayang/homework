import librariesData from "@/data/libraries.json";

export interface Library {
  id: string;
  name: string;
  region: string;
  city: string;
  type: string;
  address: string;
}

export const libraries: Library[] = librariesData as Library[];

export function getLibrariesByRegion(region?: string, type?: string): Library[] {
  return libraries.filter((lib) => {
    if (region && lib.region !== region) return false;
    if (type && lib.type !== type) return false;
    return true;
  });
}

export function getRegionCounts(): { region: string; count: number }[] {
  const counts: Record<string, number> = {};
  libraries.forEach((lib) => {
    counts[lib.region] = (counts[lib.region] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count);
}
