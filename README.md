# React + TypeScript + Vite

This is a pixel-accurate implementation of the Affliate Dashboard based on the provided Figma screens.
The project follows a clean component-driven architecture using modern React, TypeScript, and Tailwind CSS v4.

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- React Router for navigations

## Project Structure

src/
 ├── components/               
 │    ├── layout/              → Topbar, Sidebar, MainLayout
 │    ├── common/              → Reusable UI elements (Tabs, Table, Cards, Inputs, Buttons)
 │    └── affiliate/           → Affiliate-specific shared components
 │
 ├── pages/                    
 │    └── affiliate/           
 │          ├── Dashboard.tsx    
 │          ├── ReferralTool.tsx 
 │          └── EarningHistory.tsx 
 │
 ├── store/                    → Zustand store for managing global UI state
 │    └── sidebar.ts           
 │
 └── styles/                   # Global and utility styling configurations
      └── index.css

## Highlights

- Matches Figma design precisely (spacing, typography, colors, layout)
- Sidebar works as an accordion with proper active states
- Tabs styled with card background and active underline per Figma
- Reusable components built to scale

## pnpm Requirements

This project uses **pnpm** as the package manager for faster installs & better performance.

Install pnpm globally:
npm install -g pnpm

## Running the Project

pnpm install
pnpm dev
