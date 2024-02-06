import { type Preview, setup, Decorator } from "@storybook/vue3";
import { watch, type App, ref } from "vue";
import { createPinia } from "pinia";

import skLocale from "../src/locales/sk.json";
import enLocale from "../src/locales/en.json";
import { createI18n, useI18n } from "vue-i18n";




const pinia = createPinia();

setup((app: App) => {

  const i18n = createI18n({
    locale: "sk",
    messages: {
      sk: skLocale,
      en: enLocale,
    },
  
    legacy: false,
  });
  app.use(pinia);
  app.use(i18n);
});

const withLocale: Decorator = (Story, context) => {
  context.globals.locale = ref(context.globals.locale);
  watch(
    () => context.globals.locale.value,
    (newLocale) => (useI18n().locale = newLocale),
    { immediate: true }
  );

  return {
    components: { Story },

    template: `<story />`,
  };
};



const preview: Preview = {
  decorators: [withLocale],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "background",
      values: [{ name: "background", value: "#F0F0F0" }],
    }
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          {
            value: "sk",
            title: "Slovak",
          },
          {
            value: "en",
            title: "English",
          },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;