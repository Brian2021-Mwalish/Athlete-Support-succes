# Dashboard Animation Task

## Task Description
Implement animation for dashboard metrics (stars/counters) to count up from zero to their current range when the dashboard tab is clicked, and maintain the values until the user logs out.

## Completed Steps
- [x] Add `animateDashboard` state to control animation trigger
- [x] Modify `useEffect` to animate only when `animateDashboard` is true
- [x] Reset animated values to 0 before starting animation
- [x] Update dashboard button click handler to set `animateDashboard` to true
- [x] Ensure animation persists until component unmount (logout)

## Pending Steps
- [ ] Test the animation behavior on dashboard click
- [ ] Verify values remain after animation completes
- [ ] Confirm animation resets on next dashboard click
- [ ] Ensure logout clears the animation state

## Notes
- Animation targets: training load, stress level, recovery score, calories, protein, carbs, fats, water intake
- Animation starts from 0 and counts up to target values over 100 steps
- Values persist in component state until logout (component unmount)
