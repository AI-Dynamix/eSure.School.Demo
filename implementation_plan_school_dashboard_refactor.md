# Implementation Plan: Refactor School Dashboard & Cleanup

This plan outlines the steps to correctly implement the Multi-level School Dashboard views and clean up unused features.

## User Objectives
1.  **Multi-level Reporting**: Ensure the School Dashboard correctly groups and displays data by 3 levels (Primary, Middle, High School) for inter-level schools (like Marie Curie).
2.  **Flexible Layout**: The design must work gracefully for both single-level and multi-level schools.
3.  **Cleanup**: Remove the unused `apps` feature.

## Proposed Changes

### 1. Fix School Dashboard Logic (Refactor)
-   **Current Issue**: User reports changes are not visible. This suggests the conditional rendering `levelChartsData.length > 1` might be evaluating to false, or the data generation isn't working as expected.
-   **Solution**:
    -   Verify `generateClasses` logic to ensure it actually produces classes across all 12 grades for 'Liên cấp'.
    -   Debug `levelChartsData` calculation.
    -   Add fail-safe rendering or debug indicators if needed temporarily.
    -   Enhance the UI for the "Level Breakdown" section to be distinct and visually appealing.

### 2. UI Enhancements
-   Add a clear section header for "Thống kê theo Cấp học" (Level Statistics) vs "Thống kê theo Khối" (Grade Statistics).
-   Ensure the Charts use the full `99%` width fix to avoid rendering issues.
-   Check the bottom Tabs (Detail Table). Currently, it has tabs for "Tiểu học", "THCS", "THPT". Ensure "Tất cả" tab aggregates data correctly.

### 3. Feature Cleanup
-   Delete `src/features/apps` directory.
-   Delete `src/routes/_authenticated/apps` directory.

## Implementation Steps

### Step 1: Clean Up Unused Features
-   Remove `src/features/apps`.
-   Remove `src/routes/_authenticated/apps`.
-   Verify build status to ensure no broken imports.

### Step 2: Debug and Refine School Dashboard Data
-   Review `src/data/mock-dashboard-data.ts` to confirm 'Liên cấp' generation logic.
-   Review `src/features/reports/dashboards/school-dashboard.tsx`.
-   **Action**: Force display of Level Charts or add console logs to debug if needed.
-   **Action**: Layout adjustment - Ensure the new Level Charts section has appropriate spacing (`mb-8`).

### Step 3: Verify and Polish
-   Check the dashboard as `school_admin`.
-   Ensure no charts are resizing incorrectly.
-   Ensure scrolling works (via `pb-20` added previously).

## Verification Plan
1.  Login as `school_admin` (Marie Curie school).
2.  Observe the presence of "Phân bổ theo Cấp học" charts.
3.  Verify that data exists for Grade 1-5, 6-9, and 10-12.
4.  Verify that `src/features/apps` is gone.
