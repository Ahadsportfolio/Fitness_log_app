import { NextResponse } from "next/server";
import { FALLBACK_WORKOUTS } from "@/lib/fallbackData";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
      },
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Worker API error: ${response.status}`);
    }

    const data = await response.json();
    const workouts = Array.isArray(data) ? data : (data.workouts || data.data || FALLBACK_WORKOUTS);
    return NextResponse.json(workouts);
  } catch (error) {
    console.warn("Failed or timed out fetching remote fitlog API, using fallback data:", error);
    return NextResponse.json(FALLBACK_WORKOUTS);
  }
}
