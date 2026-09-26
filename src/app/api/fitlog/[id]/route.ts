import { NextResponse } from "next/server";
import { FALLBACK_WORKOUTS } from "@/lib/fallbackData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const idStr = resolvedParams.id;
  const idNum = parseInt(idStr, 10);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${idStr}`, {
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
    return NextResponse.json(data);
  } catch (error) {
    console.warn(`Failed fetching remote fitlog item ${idStr}, using fallback:`, error);
    const fallbackItem = FALLBACK_WORKOUTS.find((item) => item.id === idNum) || null;
    if (fallbackItem) {
      return NextResponse.json(fallbackItem);
    }
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }
}
