import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of your context
export interface Settings {
  intervals: number;
}

// Simulate persistent storage (replace with AsyncStorage or API in real app)
let settingsStore: Settings = { intervals: 60000 };

export async function getSettings(): Promise<Settings> {
  // Simulate async fetch
  return new Promise((resolve) => setTimeout(() => resolve(settingsStore), 300));
}

export async function saveSettings(newSettings: Settings): Promise<void> {
  // Simulate async save
  return new Promise((resolve) => setTimeout(() => {
    settingsStore = { ...settingsStore, ...newSettings };
    resolve();
  }, 300));
}

// Remove unused SettingsContextType and SettingsContext