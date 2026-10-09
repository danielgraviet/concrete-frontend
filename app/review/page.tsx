import type { Metadata } from "next";
import { FeaturePage } from "@/components/FeaturePage";
import { featureMetadata } from "@/lib/metadata";

export const metadata: Metadata = featureMetadata("review");

export default function Page() {
  return <FeaturePage slug="review" />;
}
