<script setup>
import { __, _x, _n, _nx } from "@/utils/i18n";
const message = __("This is a message from i18n!");
</script>

<template> 
  <h2>{{ __("Hello, World!") }}</h2>
  <p>{{ message }}</p>
  <p>{{ _n("%d person", "%d people", 2) }}</p>
  <p>{{ _nx("%d person", "%d people", 2, "different context") }}</p>
  <p>{{ _x("This is a message from i18n!", "different context") }}</p>
</template>
