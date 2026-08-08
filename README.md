# Week 2 Mission: React Todo List

CEOS 23rd Frontend Study — Week 2 mission, refactoring the Week 1 vanilla JS to-do list into React.

🔗 [Try it out](https://ceos-week2-react-todo-23rd-five.vercel.app)

## Deadline

- Saturday, March 21, 2026, 23:59 KST

## Preview
<img width="800" height="" alt="image" src="https://github.com/user-attachments/assets/e552e8a1-1d56-4a42-b1b2-d58da23c5768" />
<img width="800" height="" alt="image" src="https://github.com/user-attachments/assets/5bc22015-1f91-4510-8162-945b22d03ea7" />
<img width="800" height="" alt="image" src="https://github.com/user-attachments/assets/cc0e88b0-7637-46f2-a5e8-973effef3bc0" />

## Getting Started

```bash
npm install
npm run dev
```

This starts the Vite dev server — any changes you save will hot-reload automatically.

## About

This mission was about taking the vanilla JS to-do list from Week 1 and rebuilding it in React — same functionality, new architecture. The goal was to feel firsthand why React's approach (component-based, state-driven UI) is more efficient than manually manipulating the DOM.

## Features

- All Week 1 functionality reimplemented in React (todo/done count included)
- Built with Vite as the project scaffolding tool
- Styled with Tailwind CSS
- State managed entirely with React Hooks (no external state library)
  
## Stack

- React (via Vite)
- TypeScript
- Tailwind CSS

## Getting Started

​```bash
npm install
npm run dev
​```

This starts the Vite dev server — any changes you save will hot-reload automatically.

## Reflection

While working on this mission, I first built out the full project, then went back and re-organized my commits by feature rather than just leaving them as one large chunk of progress. Up through Week 2 these were individual assignments, but it made me realize that in upcoming collaborative missions, commits aren't just a record of what changed — they're how teammates follow the project's progress. Breaking commits down by feature also helped me understand the flow of the project itself, not just the end result.

## Review Questions

**1.What is the Virtual DOM, and what are the benefits of using it?**

The Virtual DOM is an in-memory representation of the actual DOM. Instead of manipulating the real DOM directly, React updates this virtual copy first, figures out what actually changed, and only applies those specific changes to the real DOM. For example, when a single todo's status changes, React doesn't re-render the entire list — only that specific `TodoItem` gets updated. This reduces unnecessary DOM operations, improves performance, and makes it easier to write UI code declaratively based on state.

**2.Explain the rendering optimizations available through `React.memo()`, `useMemo()`, and `useCallback()`. Feel free to mention other approaches too.**

React provides several tools to reduce unnecessary re-renders:

- `React.memo()` prevents a component from re-rendering if its props haven't changed.
- `useMemo()` memoizes an expensive computed value so it isn't recalculated on every render.
- `useCallback()` memoizes a function so it isn't recreated on every render — useful when passing callbacks down to child components.

Beyond these, keeping state as minimal and localized as possible, and splitting components thoughtfully, also helps with rendering performance.

**3.Explain the React component lifecycle.**

React components generally go through three phases: Mount, Update, and Unmount.

- **Mount**: when a component is first created and rendered.
- **Update**: when state or props change, triggering a re-render.
- **Unmount**: when a component is removed from the DOM.

In function components, `useEffect` is used to hook into this lifecycle — for example, updating `localStorage` when a specific value changes, or fetching data on initial mount.

## Links & References

- [create react app (CRA)](https://create-react-app.dev/docs/getting-started/)
- [React Docs — Main Concepts 1–12](https://react.dev/learn)
- [React Docs — Hooks 1–3](https://react.dev/reference/react)
- [A Complete Guide to useEffect (Korean)](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
- [JavaScript Naming Conventions for Components (Korean)](https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8)
- [useState, useEffect Hooks (Korean)](https://velog.io/@velopert/react-hooks#1-usestate)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation/using-vite)
- [VS Code Prettier Setup (Korean)](https://velog.io/@gangk_99/VS-Code-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [CRA Deprecation — Official Announcement](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) 
- [CRA Deprecation Discussion (Korean, OKKY Community)](https://okky.kr/articles/1527414) 
- [Starting a React Project with Vite Instead of CRA (Korean)](https://www.daleseo.com/vite-react/) 
- [Practical Vite Adoption Notes (Korean)](https://blog.hectodata.co.kr/bonjour-vite/)
