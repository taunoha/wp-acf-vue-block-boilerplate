# wp-acf-vue-block-boilerplate

This is a PHP-based [ACF Block](https://www.advancedcustomfields.com/resources/blocks/) that incorporates Vue.
The boilerplate helps you to use Vue in your custom block with minimal setup.

## Before you start

Please add a new folder to your theme folder and move the code into it. For example, `wp-conten/themes/my-theme/blocks/my-block`

To finish the setup, please follow these steps:

**Delete:**
* .git folder

## 👉  `npm install`
* Install the dependencies in the local node_modules folder.

## 👉  `npm run rename`
* Rename placeholder strings in files
* Copy or merge the content from the `example-functions.php` to your theme's `functions.php` file. You are free to delete the `example-functions.php` file.

## Development

## 👉  `npm run dev`
* Use to compile and run the code in development mode.
* Watches for any changes and reports back any errors in your code.
  
## 👉  `npm run lint`
* Check your source code for programmatic and stylistic errors. 
* Format your source code

## 👉  `npm run build`
- Builds production code inside `dist` folder.
- Will extract translatable strings from your code and generate the `languages/messages.php` file.

## i18n

Use the `__("Translatable string")` function in your SFC files to make strings translatable.

```html
<script setup>
import { __, _x, _n, _nx } from "@/utils/i18n";
const message = __("This is a message from i18n!");
</script>

<template>
  <h1>{{ __("Hello, World!") }}</h1>
  <p>{{ message }}</p>
  <p>{{ _n("%d person", "%d people", 2) }}</p>
  <p>{{ _nx("%d person", "%d people", 2, "different context") }}</p>
  <p>{{ _x("This is a message from i18n!", "different context") }}</p>
</template>
```
