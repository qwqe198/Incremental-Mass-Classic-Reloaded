<script>

export default {
    name: "OptionsTab",
    components: {
        
    },
    data() {
        return {
            notation: player.options.notation,
            massDisplay: player.options.massDis,
        }
    },
    methods: {
        save: function() {
            save()
        },
        exporty: function() {
            exporty()
        },
        export_copy: function() {
            export_copy()
        },
        importy: function() {
            importy()
        },
        importy_file: function() {
            importy_file()
        },
        wipe() {
            if (confirm("Are you sure you want to wipe your save?")) wipe(true);
        },

        update() {
            player.options.notation = parseInt(this.notation)
            player.options.massDis = parseInt(this.massDisplay)
        },
    },
}
</script>
<template>
    <div>
        <div class="o-options-grid">
            <button class="o-primary-btn" style="grid-row: 1 / 3; grid-column: 1 / 3;" @click="save">Save</button>
            <button class="o-primary-btn" style="grid-row: 1 / 2; grid-column: 3 / 5;" @click="exporty">Export as file</button>
            <button class="o-primary-btn" style="grid-row: 1 / 2; grid-column: 5 / 7;" @click="export_copy">Export to clipboard</button>
            <button class="o-primary-btn" style="grid-row: 2 / 3; grid-column: 3 / 5;" @click="importy_file">Import from file</button>
            <button class="o-primary-btn" style="grid-row: 2 / 3; grid-column: 5 / 7;" @click="importy">Import from prompt</button>
            <button class="o-primary-btn" style="grid-row: 1 / 3; grid-column: 7 / 9;" @click="wipe">WIPE!!!</button>
            <button class="o-primary-btn no-active" style="grid-row: 3 / 4; grid-column: 1 / 5;">
                Notation:<br><select class="o-options-select" v-model="notation">
                    <optGroup style="color:green" label="Serious">
                        <option value=0 style="color:green">Scientific</option>
                        <option value=1 style="color:green">Standard</option>
                        <option value=2 style="color:green">Default (Mixed-Scientific)</option>
                    </optGroup>
                </select>
            </button><button class="o-primary-btn no-active" style="grid-row: 3 / 4; grid-column: 5 / 9;">
                Mass Display:<br><select class="o-options-select" v-model="massDisplay">
                    <option value=0 style="color:green">Default</option>
                    <option value=1 style="color:green">Always Gramm</option>
                </select>
            </button>
        </div><div style="margin: 10px 0;">
            <p>Incremental Mass: Classic Reloaded - v1.2.1 - Made by MrRedShark77</p>
        </div>
    </div>
</template>
<style scoped>
.o-options-grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(8, 80px);
    grid-template-rows: repeat(3, 80px);
    grid-gap: 5px;
}

.o-options-select {
    width: calc(100% - 10px);
}
.o-options-select option, .o-options-select optGroup {
    text-align: left;
}
</style>