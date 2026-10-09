import type { Metadata } from "next";
import { getFeature, type FeatureSlug } from "./features";

export function featureMetadata(slug: FeatureSlug): Metadata {
  const f = getFeature(slug);
  return {
    title: f.name,
    description: f.lede,
    openGraph: { title: `${f.name} — Concrete`, description: f.summary },
  };
}
