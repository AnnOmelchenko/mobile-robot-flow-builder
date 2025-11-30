"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { RobotState, Location, DEFAULT_LOCATIONS, DEFAULT_ROBOT_STATE } from "../types/robot";

interface RobotContextType {
    robotState: RobotState;
    locations: Location[];
    updateRobotState: (updates: Partial<RobotState>) => void;
    addLocation: (location: Location) => void;
    updateLocation: (id: string, updates: Partial<Location>) => void;
    removeLocation: (id: string) => void;
}

const RobotContext = createContext<RobotContextType | undefined>(undefined);

export function RobotProvider({ children }: { children: ReactNode }) {
    const [robotState, setRobotState] = useState<RobotState>(DEFAULT_ROBOT_STATE);
    const [locations, setLocations] = useState<Location[]>(DEFAULT_LOCATIONS);

    const updateRobotState = (updates: Partial<RobotState>) => {
        setRobotState((prev) => ({ ...prev, ...updates }));
    };

    const addLocation = (location: Location) => {
        setLocations((prev) => [...prev, location]);
    };

    const updateLocation = (id: string, updates: Partial<Location>) => {
        setLocations((prev) =>
            prev.map((loc) => (loc.id === id ? { ...loc, ...updates } : loc))
        );
    };

    const removeLocation = (id: string) => {
        setLocations((prev) => prev.filter((loc) => loc.id !== id));
    };

    return (
        <RobotContext.Provider
            value={{
                robotState,
                locations,
                updateRobotState,
                addLocation,
                updateLocation,
                removeLocation,
            }}
        >
            {children}
        </RobotContext.Provider>
    );
}

export function useRobot() {
    const context = useContext(RobotContext);
    if (context === undefined) {
        throw new Error("useRobot must be used within a RobotProvider");
    }
    return context;
}
