import { handleAuthRequest } from "@/lib/student-access/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const GET = handleAuthRequest;
export const POST = handleAuthRequest;
