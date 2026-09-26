"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlanItem, SavedItem, Workout } from "@/types/workout";
import { toast } from "sonner";

interface PlanContextType {
  todayPlan: PlanItem[];
  savedList: SavedItem[];
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

  // Load initial data from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved_list");

      if (storedPlan) {
        setTodayPlan(JSON.parse(storedPlan));
      }
      if (storedSaved) {
        setSavedList(JSON.parse(storedSaved));
      }
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state to localStorage whenever it changes after initial load
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

  const isInPlan = (workoutId: number) => {
    return todayPlan.some((item) => item.workout.id === workoutId);
  };

  const isInSaved = (workoutId: number) => {
    return savedList.some((item) => item.workout.id === workoutId);
  };

  const addToPlan = (workout: Workout): boolean => {
    if (isInPlan(workout.id)) {
      toast.info(`"${workout.name}" is already in today's plan.`);
      return false;
    }

    if (todayPlan.length >= MAX_PLAN_CAP) {
      toast.error(`Today's plan is full! Maximum cap of ${MAX_PLAN_CAP} lifts reached.`);
      return false;
    }

    const newItem: PlanItem = {
      workout,
      isDone: false,
      addedAt: Date.now(),
    };

    setTodayPlan((prev) => [...prev, newItem]);
    toast.success(`Added "${workout.name}" to today's plan!`);
    return true;
  };

  const removeFromPlan = (workoutId: number) => {
    const item = todayPlan.find((i) => i.workout.id === workoutId);
    setTodayPlan((prev) => prev.filter((i) => i.workout.id !== workoutId));
    if (item) {
      toast.success(`Removed "${item.workout.name}" from today's plan.`);
    }
  };

  const addToSaved = (workout: Workout): boolean => {
    if (isInSaved(workout.id)) {
      toast.info(`"${workout.name}" is already saved for later.`);
      return false;
    }

    const newItem: SavedItem = {
      workout,
      addedAt: Date.now(),
    };

    setSavedList((prev) => [...prev, newItem]);
    toast.success(`Saved "${workout.name}" for later!`);
    return true;
  };

  const removeFromSaved = (workoutId: number) => {
    const item = savedList.find((i) => i.workout.id === workoutId);
    setSavedList((prev) => prev.filter((i) => i.workout.id !== workoutId));
    if (item) {
      toast.success(`Removed "${item.workout.name}" from saved list.`);
    }
  };

  const toggleDone = (workoutId: number) => {
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
  };

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, item) => acc + (item.workout.duration || 0), 0);
  const totalCalories = todayPlan.reduce((acc, item) => acc + (item.workout.caloriesBurned || 0), 0);

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,
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
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
