# Vite Storybook Library


## Instructions for creating a project like this

- Install vite for React

```npm init vite@latest```

- Install Storybook using storybook-builder-vite

```npx sb@next init --builder storybook-builder-vite```

- Clean up any junk Storybook or vite added

- Update vite.config.js based on the [Library Mode](https://vitejs.dev/guide/build.html#library-mode) instructions.

### Options

- Bundle all components into a single entry point. Add a file like "scripts/build.js" that imports then exports all components. See branch - 'bundle-all'