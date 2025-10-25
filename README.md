# **Contacts Manager App**
A modern React contacts manager app, this is my submission for the screening round for the role of Frontend Developer Intern at Tria

Live link:  (deployed on vercel)

## 🛠 Tech Stack & Tools

React (with Hooks): Used Reactjs to create a well separated codebase by creating different components adn using React hooks for state management.

Tailwind CSS: For Tailwind CSS, a great CSSS library for styling the whole app, used its in built classes for sections of different components and keeping the app responsive to varying device widths,

Transitions via React State: Used React State to add simple and smooth transitions for modals and components to animate their entry/exit.

React-hot-toast: Notifications/toasts for actions completion in the app.

AI-Assisted Development: Used AI to accelerate workflow by creating the basic skeleton through AI and then working on it as the base,  so that every design, logic, and style decision reflect my own best practices and judgment.

## ✨ Features

1. Add, Edit, Delete Contacts: Create new contacts, edit existing ones and delete an existing contact if needed, added form validation for differnt fields like phone, email etc.

2. Avatar Upload/Preview: User can upload local images from the system to set them as profile pictures.

3. Responsive Modal Design: Animates modal open/close actions, adapts UX for mobile.

4. Dark Mode: Dark mode toggle to easily switch from light mode to dark mode.

5. Instant Feedback: Toast notifications for key user actions.

6. Call/Email Actions: Direct actions via phone mailto/tel links.

7. Accessibility: ARIA roles, keyboard navigation, color contrast (Tailwind).

8. Data Consistency: Every user action translates instantly to visible change.

## 🧩 Project Structure & Maintainability

Component-based: Clear separation of concerns, props-driven, testable units.

State Management: Local state with React hooks—simple, scalable, easy to migrate to context or Redux if desired.

Helpers/Utils: All validation and transformation logic moved to dedicated utility files.

Minimal Mock Data: Clean structure, mock fetch simulates async loading.

## 🚀 Why This Approach?

Declarative Programming: Logic flows top-down and is easy to follow.

Utility-First Styling: Rapid prototype/evolve UI while keeping CSS bloat low.

Responsiveness & Accessibility: Good apps are usable by everyone, everywhere.

Smooth UX: Little details like entry/exit modal transitions matter for perceived quality.

AI Support: AI helped with rapid iteration, error-solving, and linting—but all code was written, validated, and understood personally.

## ⚡️ Installation & Usage
```
git clone https://github.com/yourusername/contacts-manager.git
cd contacts-manager
npm install
npm start
```

## 👑 Design Choices & AI Usage

Why React/Tailwind?
React makes UI logic organized and composable. Tailwind lets me focus on flow and accessibility without fiddling with CSS specificity.

AI Assistance:
Used AI for idea generation, refactoring suggestions, and boilerplate generation. Always reviewed, understood, and modified output for correctness, readability, and maintainability.

Animation Technique:
Used local state to manage modal visibility and animation, allowing both entry/exit transitions without complex dependencies.

## 🚧 Challenges Solved

Transition Edge Cases:
Ensured animations never get interrupted by parent state changes; delayed unmount for modal exit.

Avatar Consistency:
Refined add/edit logic so avatars persist across update actions.

Accessibility Concerns:
Used ARIA roles and keyboard navigation for better UX.

AI and Code Ownership:
Used AI as a productivity multiplier, but always maintained full ownership and clear understanding of code.

## 🚀 Learnings & Reflections

Combining AI-generated suggestions with personal review delivers code that’s both accurate and maintainable.

The key to standing out is custom logic, clean structure, and clear UX—not just flashy features.

Practiced iterative refactoring, rapid prototyping, and detailed code reviews.

## 🗂 Future Extensions

1. Sync to backend or cloud

2. Import/export vCards/CSV

3. Contact groups/tags

4. More advanced accessibility polish

