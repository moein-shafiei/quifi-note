import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of your context
interface SettingsContextType {
  message: string;
  setMessage: (value: string) => void;
}

// Create the context with a default value (use `null` if no default)
const SettingsContext = createContext<SettingsContextType | null>(null);