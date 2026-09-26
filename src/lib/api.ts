import { Workout } from "@/types/workout";
import { FALLBACK_WORKOUTS } from "./fallbackData";

export async function fetchAllWorkouts(): Promise<Workout[]> {
  try {
    const url = typeof window !== "undefined"
      ? "/api/fitlog"
      : "https://api.abcz.workers.dev/api/fitlog";

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch workouts: ${response.statusText}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_WORKOUTS;
  } catch (error) {
    console.error("Error fetching workouts from API, using fallback list:", error);
    return FALLBACK_WORKOUTS;
  }
}

export async function fetchWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const url = typeof window !== "undefined"
      ? `/api/fitlog/${id}`
      : `https://api.abcz.workers.dev/api/fitlog/${id}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch workout details: ${response.statusText}`);
    }

    const data = await response.json();
    if (data && data.id) {
      return data;
    }
    const fallbackItem = FALLBACK_WORKOUTS.find((w) => w.id === Number(id));
    return fallbackItem || null;
  } catch (error) {
    console.error(`Error fetching workout ${id}, using fallback:`, error);
    const fallbackItem = FALLBACK_WORKOUTS.find((w) => w.id === Number(id));
    return fallbackItem || null;
  }
}
