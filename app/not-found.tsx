import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section" style={{ borderTop: 0 }}>
      <div className="wrap" style={{ display: "grid", gap: 32, justifyItems: "start" }}>
        <p className="index">404</p>
        <h1 className="display">Not found.</h1>
        <p className="lede">This page isn&apos;t part of the system.</p>
        <Link href="/" className="btn btn--solid">
          Back to the index <span className="arrow"><Icon name="arrow" /></span>
        </Link>
      </div>
    </section>
  );
}
