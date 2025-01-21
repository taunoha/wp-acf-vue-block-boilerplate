# Vue with ACF Block in WordPress

This is a PHP-based [ACF Block](https://www.advancedcustomfields.com/resources/blocks/) boilerplate that incorporates [Vuejs](https://vuejs.org).
The boilerplate helps you to use Vuejs in your custom block with minimal setup.

The block makes use of the new [Interactive API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/#server-functions) introduced in WordPress 6.5.
The solution depends on the `wp_interactivity_config` server function to set initial values and/or configuration.

## Before you start

> [!NOTE]
> Prerequisites
> * Familiarity with the command line
> * Install [Node.js](https://nodejs.org/en) version 20.0 (LTS) or higher LTS

Please add a new folder to your theme folder and move the code into it.

For example: `wp-content/themes/my-theme/blocks/my-block`

To finish the setup, go to the newly created folder and follow these steps:

**Remove:**
* .git folder

### 👉  `npm install`
* Install the dependencies in the local node_modules folder.

### 👉  `npm run rename`
* Rename placeholder strings in files
* Copy or merge the content from the `example-functions.php` to your theme's `functions.php` file. You are free to delete the `example-functions.php` file.

## Development

### 👉  `npm run dev`
* Use to compile and run the code in development mode.
* Watches for any changes and reports back any errors in your code.
  
### 👉  `npm run lint`
* Check your source code for programmatic and stylistic errors. 
* Format your source code

### 👉  `npm run build`
- Builds production code inside `dist` folder.
- Will extract translatable strings from your code and generate the `languages/messages.php` file.

## 🌶️ Auto-imports

I have set up auto-imports for components, composables, Vue.js APIs, and your utilities inside the ``utils`` folder. You can use these in your application without explicitly importing them.

Contrary to a classic global declaration, it will preserve typings, IDEs completions and hints, and only includes what is used in your code.

## &lt;ErrorBoundary&gt; component

This component handles errors happening in its default slot. It will prevent the error from bubbling up to the top level, and will render the #error slot instead.
It uses Vue's [`onErrorCaptured`](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured) hook under the hood.

```html
<script setup>
function handleErrorLog(err) {
  console.log(err);
}
</script>
<template>
  <ErrorBoundary @error="handleErrorLog">
    <!-- --- -->
    <template #error="{ error, clearError }">
      <p>{{ error }}</p>
      <button @click="clearError">Try Again</button>
    </template>
  </ErrorBoundary>
</template>
```

## i18n

To make strings translatable, use the `__("Translatable string")` function in your SFC files.

```html
<script setup>
const message = __("This is a message from i18n!");
</script>

<template>
  <article>
    <h1>{{ __("Hello, World!") }}</h1>
    <p>{{ message }}</p>
    <p>{{ _n("%d person", "%d people", 2) }}</p>
    <p>{{ _nx("%d person", "%d people", 2, "different context") }}</p>
    <p>{{ _x("This is a message from i18n!", "different context") }}</p>
  </article>
</template>
```

### Translation Plugin Compatibility

This plugin is compatible with popular WordPress translation plugins like WPML, Polylang, or TranslatePress. The translation functions (`__()`, `_n()`, `_x()`, etc.) integrate with WordPress's translation ecosystem, allowing you to:

- Extract translatable strings using the plugins' string scanning features
- Manage translations through the plugins' translation interfaces
- Use the plugins' language switching functionality
- Maintain translations across different language versions of your site
