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

- Bundle components into separate files with separate packages. Ensure that all components are within their own directory with a package.json. Add a file like "scripts/build.js", update package.json build script to point to it. Use Vite and Rollup to build. See branch 'bundle-all-separate-package'.

- TODO - Bundle components into separate files with same package. Add a file like "scripts/build.js", update package.json build script to point to it. Use Vite and Rollup to build. See branch 'bundle-all-separate'.

### Resources

- [Multiple entry points/output in library mode?](https://github.com/vitejs/vite/discussions/1736)
- [jmlivingston/react-components-library - rollup.config.js](https://github.com/jmlivingston/react-components-library/blob/master/scripts/build/rollup.config.js)

