import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'

export const state = {
  view: {
    initialized: false,
    subtab: "mass",
  }
}

Vue.mixin({
  computed: {
    $viewModel() {
      return state.view;
    }
  },
  created() {
    if (this.update) {
      this.on$(GAME_EVENT.UPDATE, this.update);
      if (GameUI.initialized) {
        this.update();
      }
    }

    // Following is used to force the recomputation of computed values
    // from this fiddle https://codepen.io/sirlancelot/pen/JBeXeV
    const recomputed = Object.create(null);
    const watchers = this._computedWatchers;

    if (!watchers) return;

    for (const key in watchers) makeRecomputable(watchers[key], key, recomputed);

    this.$recompute = key => recomputed[key] = !recomputed[key];
    Vue.observable(recomputed);
  },
  destroyed() {
    EventHub.ui.offAll(this);
  },
  methods: {
    on$(event, fn) {
      EventHub.ui.on(event, fn, this);
    },
    format(ex, acc, max) { return format(ex, acc, max) },
    formatGain(ex, gain, mass) { return formatGain(ex, gain, mass) },
    formatMult(ex, acc) { return formatMult(ex, acc) },
    formatPow(ex, acc) { return formatPow(ex, acc) },
    formatPercent(ex, acc) { return formatPercent(ex, acc) },
    formatReduction(ex, acc) { return formatReduction(ex, acc) },
    formatMass(mass) { return formatMass(mass) },
  }
});

// This function is also from the fiddle above
function makeRecomputable(watcher, key, recomputed) {
  const original = watcher.getter;
  recomputed[key] = true;

  // eslint-disable-next-line no-sequences
  watcher.getter = vm => (recomputed[key], original.call(vm, vm));
}

export const GameUI = {
  events: [],
  flushPromise: undefined,
  initialized: false,
  globalClickListener: null,
  touchDevice: ("ontouchstart" in window ||
    window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0 ||
    (window.DocumentTouch && document instanceof DocumentTouch)),
  dispatch(event, args) {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    if (event !== GAME_EVENT.UPDATE) {
      this.events.push([event, args]);
    }
    if (this.flushPromise) return;
    this.flushPromise = Promise.resolve()
      .then(this.flushEvents.bind(this));
  },
  flushEvents() {
    this.flushPromise = undefined;
    for (const event of this.events) {
      EventHub.ui.dispatch(event[0], event[1]);
    }
    EventHub.ui.dispatch(GAME_EVENT.UPDATE);
    this.events = [];
  },
  update() {
    this.dispatch(GAME_EVENT.UPDATE);
  }
};

(function() {
  const methodStrategy = Vue.config.optionMergeStrategies.methods;
  // eslint-disable-next-line max-params
  Vue.config.optionMergeStrategies.methods = (parentVal, childVal, vm, key) => {
    const result = methodStrategy(parentVal, childVal, vm, key);
    const hasUpdate = val => val && val.update;
    if (!hasUpdate(parentVal) || !hasUpdate(childVal)) return result;
    result.update = function() {
      parentVal.update.call(this);
      childVal.update.call(this);
    };
    return result;
  };
}());

export const app = new Vue({
  el: "#app",
  data: state,
  components: { App },
  render: (h) => h(App),
})
