"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { PlanItem, SavedItem, Workout } from "@/types/workout";
import { toast } from "sonner";

export interface PlanContextType {
  todayPlan: PlanItem[];
  savedList: SavedItem[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;
  toggleDone: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isInSaved: (workoutId: number) => boolean;
  totalExercises: number;
  totalMinutes: number;
  totalCalories: number;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const MAX_PLAN_CAP = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<PlanItem[]>([]);
  const [savedList, setSavedList] = useState<SavedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load initial data on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved_list");

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedList(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Persist state changes to localStorage after initial load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Failed to save plan to localStorage", e);
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_saved_list", JSON.stringify(savedList));
    } catch (e) {
      console.error("Failed to save saved list to localStorage", e);
    }
  }, [savedList, isLoaded]);

  // Helper checks
  const isInPlan = useCallback(
    (workoutId: number) => todayPlan.some((item) => item.workout.id === workoutId),
    [todayPlan]
  );

  const isInSaved = useCallback(
    (workoutId: number) => savedList.some((item) => item.workout.id === workoutId),
    [savedList]
  );

  // Action Handlers
  const addToPlan = useCallback(
    (workout: Workout): boolean => {
      let success = false;

      setTodayPlan((prev) => {
        if (prev.some((item) => item.workout.id === workout.id)) {
          toast.info(`"${workout.name}" is already in today's plan.`);
          return prev;
        }

        if (prev.length >= MAX_PLAN_CAP) {
          toast.error(`Today's plan is full! Maximum cap of ${MAX_PLAN_CAP} lifts reached.`);
          return prev;
        }

        const newItem: PlanItem = {
          workout,
          isDone: false,
          addedAt: Date.now(),
        };

        toast.success(`Added "${workout.name}" to today's plan!`);
        success = true;
        return [...prev, newItem];
      });

      return success;
    },
    []
  );

  const removeFromPlan = useCallback((workoutId: number) => {
    setTodayPlan((prev) => {
      const item = prev.find((i) => i.workout.id === workoutId);
      if (item) {
        toast.success(`Removed "${item.workout.name}" from today's plan.`);
      }
      return prev.filter((i) => i.workout.id !== workoutId);
    });
  }, []);

  const addToSaved = useCallback((workout: Workout): boolean => {
    let success = false;

    setSavedList((prev) => {
      if (prev.some((item) => item.workout.id === workout.id)) {
        toast.info(`"${workout.name}" is already saved for later.`);
        return prev;
      }

      const newItem: SavedItem = {
        workout,
        addedAt: Date.now(),
      };

      toast.success(`Saved "${workout.name}" for later!`);
      success = true;
      return [...prev, newItem];
    });

    return success;
  }, []);

  const removeFromSaved = useCallback((workoutId: number) => {
    setSavedList((prev) => {
      const item = prev.find((i) => i.workout.id === workoutId);
      if (item) {
        toast.success(`Removed "${item.workout.name}" from saved list.`);
      }
      return prev.filter((i) => i.workout.id !== workoutId);
    });
  }, []);

  const toggleDone = useCallback((workoutId: number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.workout.id === workoutId) {
          const nextState = !item.isDone;
          if (nextState) {
            toast.success(`Marked "${item.workout.name}" as completed! 💪`);
          } else {
            toast.info(`Marked "${item.workout.name}" as pending.`);
          }
          return { ...item, isDone: nextState };
        }
        return item;
      })
    );
  }, []);

  // Computed Values
  const totalExercises = todayPlan.length;
  const totalMinutes = useMemo(
    () => todayPlan.reduce((acc, item) => acc + (item.workout.duration || 0), 0),
    [todayPlan]
  );
  const totalCalories = useMemo(
    () => todayPlan.reduce((acc, item) => acc + (item.workout.caloriesBurned || 0), 0),
    [todayPlan]
  );

  // Memoized Context Value
  const value = useMemo(
    () => ({
      todayPlan,
      savedList,
      isLoaded,
      addToPlan,
      removeFromPlan,
      addToSaved,
      removeFromSaved,
      toggleDone,
      isInPlan,
      isInSaved,
      totalExercises,
      totalMinutes,
      totalCalories,
    }),
    [
      todayPlan,
      savedList,
      isLoaded,
      addToPlan,
      removeFromPlan,
      addToSaved,
      removeFromSaved,
      toggleDone,
      isInPlan,
      isInSaved,
      totalExercises,
      totalMinutes,
      totalCalories,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};