/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { jsonrpc } from "@web/core/network/rpc_service";

export class ModelFieldsSelector extends Component {
    setup() {
        /**
         * @type {string}
         */
        this.modelName = "";
        /**
         * @type {Object.<string, string>}
         */
        this.fieldsMap = {};
        this.selectedFields = []; // Store selected fields
        this.fetchModels(); // (Optional: Fetch models if needed)

        this.watch("modelName", (modelName) => {
            if (modelName) {
                this.fetchFields(modelName);
            }
        });

        $('#model-select').on('change', function () {
            this.modelName = $(this).val(); // Update component state
            if (this.modelName) {
                this.fetchFields(modelName);
            }
        });
    }

    async fetchFields(modelName) {
        try {
            const { fields_map } = await jsonrpc("/flexible_snippet/data", {

                page: this.page,
                limit: this.limit,
                Champs1: this.Champs1,
                Champs2: this.Champs2,
                Champs3: this.Champs3,
                model_name: modelName,
            });
            this.fieldsMap = fields_map;

            // Update the fields select element dynamically
            $('#field-select').empty();
            for (const field in fieldsMap) {
                const button = $('<we-button>').text(fieldsMap[field]).attr('data-field', field);
                button.on('click', () => { // Handle field selection on click
                    const isSelected = this.selectedFields.includes(field);
                    if (isSelected) {
                        this.selectedFields = this.selectedFields.filter(f => f !== field);
                    } else {
                        this.selectedFields.push(field);
                    }
                });
                $('#field-select').append(button);
            }
        } catch (error) {
            console.error("Error updating fields:", error);
        }
    }

    applySelections = () => {
        console.log("Selected fields:", this.selectedFields);
        // Perform actions with the selected fields (e.g., send to server)
        // ... (your implementation)
    };
}

// Spécification du template associé à ce composant
ModelFieldsSelector.template = 'flexible__snippet.ModelFieldsSelector';
// Enregistrement du composant dans le registre des actions d'Odoo
registry.category('actions').add('flexible__snippet.model_fields_selector', ModelFieldsSelector);
