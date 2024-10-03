/** @odoo-module **/
import options from '@web_editor/js/editor/snippets.options';
import { _t } from '@web/core/l10n/translation';

options.registry.DynamicSnippetFlexible = options.Class.extend({
    /**
     * Initialize the widget.
     */
    init: function () {
        this._super(...arguments);
        this.orm = this.bindService('orm');
    },

    /**
     * Starts the widget.
     */
    start: function () {
        return this._super(...arguments);
    },
    /**
     * Sets the Limit value.
     */
    setLimit: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.limit = widgetValue;
        console.log('Limit set to:', widgetValue); // Log the limit value
    },

    /**
     * Sets the Model value.
     */
    setModel: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.model = widgetValue;
        console.log('Model set to:', widgetValue); // Log the model value
    },


    setChamps1: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.Champs1 = widgetValue;
        console.log('Champs1 set to:', widgetValue); // Log the model value
    },


    setChamps2: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.Champs2 = widgetValue;
        console.log('Champs2 set to:', widgetValue); // Log the model value
    },

    setChamps3: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.Champs3 = widgetValue;
        console.log('Champs3 set to:', widgetValue); // Log the model value
    },

    setChamps4: function (previewMode, widgetValue, params) {
        this.$target[0].dataset.Champs4 = widgetValue;
        console.log('Champs4 set to:', widgetValue); // Log the model value
    },


    /**
     * Computes the widget state based on the method called.
     */
    _computeWidgetState: function (methodName, params) {
        switch (methodName) {
            case 'setLimit': {
                const limit = this.$target[0].dataset.limit;
                console.log('Computed limit value:', limit); // Log the computed limit
                return limit;
            }
            case 'setModel': {
                const model = this.$target[0].dataset.model;
                console.log('Computed model value:', model); // Log the computed model
                return model;
            }
            case 'setChamps1': {
                const Champs1 = this.$target[0].dataset.Champs1;
                console.log('Computed Champs1 value:', Champs1); // Log the computed Title
                return Champs1;
            }
            case 'setChamps2': {
                const Champs2 = this.$target[0].dataset.Champs2;
                console.log('Computed Champs2 value:', Champs2); // Log the computed Body
                return Champs2;
            }
            case 'setChamps3': {
                const Champs3 = this.$target[0].dataset.Champs3;
                console.log('Computed Champs3 value:', Champs3); // Log the computed Body
                return Champs3;
            }

            case 'setChamps4': {
                const Champs4 = this.$target[0].dataset.Champs4;
                console.log('Computed Champs4 value:', Champs4); // Log the computed Body
                return Champs4;
            }

        }
        return this._super(...arguments);
    },
});
