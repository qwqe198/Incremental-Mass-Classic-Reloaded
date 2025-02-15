<script>
export default {
    name: "PrimaryButton",
    props: {
        enabled: {
            type: Boolean,
            required: false,
            default: true
        },
        bought: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    computed: {
        classObject() {
            return {
                "o-primary-btn--disabled": !this.bought && !this.enabled,
                "o-primary-btn--bought": this.bought,
            };
        },
    }
};
</script>

<template>
    <button
        class="o-primary-btn"
        :class="classObject"
    >
        <slot />
    </button>
</template>

<style scoped>

</style>