<script>
import { TabComponents } from "@/components/tabs/tabs"
import TopbarCurrencies from "./components/TopbarCurrencies.vue";
import Tabs from "./components/tabs/Tabs.vue";
import ActiveChallenges from "./components/ActiveChallenges.vue";

export default {
  name: "App",
  data() {
    return {
      subtab: "mass",
    }
  },
  components: {
    ...TabComponents,
    TopbarCurrencies,
    Tabs,
    ActiveChallenges,
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    page() {
      return TabContents[this.$viewModel.subtab].component;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="view.initialized">
      <ActiveChallenges />
      <TopbarCurrencies />
      <br class="line">
      <Tabs />
      <component :is="page" />
    </div>
    <div id="notify"></div>
  </div>
</template>

<style scoped>
</style>
