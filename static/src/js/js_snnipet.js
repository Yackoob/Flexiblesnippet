/** @odoo-module */
import PublicWidget from "@web/legacy/js/public/public_widget";
import {jsonrpc} from "@web/core/network/rpc_service";
import {renderToElement} from "@web/core/utils/render";
import PublicRoot from "@web/legacy/js/public/public_root";



// maintenant je veux hérité une fonction "_onDisableOnClick"  de path :
// C:\Users\HP\Desktop\odoo\odoo-17.0\addons\web\static\src\legacy\js\public\public_root.js

// JavaScript pour afficher les données du backend sur le site web
var DynamicFlexibleSnippet = PublicWidget.Widget.extend({
    selector: '.dynamic_snippet_flexible', // 1 : viser la classe définie dans le fichier XML


    read_events: {
        'click .js_precedent': '_onClickPrecedent',
        'click .js_next': '_onClickNext',
        'click .js_download': '_Ondownload',
        'click .js_lire_en_plus': '_lire_en_plus',

    },

    willStart: async function () {
        await this.fetchData(1);
    },


    async fetchData(page) {

        console.log("==========================>")
        console.log(page)
        console.log("==========================>")

        const limit = this.el.dataset.limit;  // aprends depuis snnipet
        console.log("this.limit : " + limit)

        const model_name = this.el.dataset.model;
        console.log("this.model : " + model_name)

        const Champs1_name = this.el.dataset.Champs1;
        console.log("this.Champs1 : " + Champs1_name)

        const Champs2_name = this.el.dataset.Champs2;
        console.log("this.Champs2 : " + Champs2_name)

        const Champs3_name = this.el.dataset.Champs3;
        console.log("this.Champs3 : " + Champs3_name)

        const Champs4_name = this.el.dataset.Champs4;
        console.log("this.Champs4 : " + Champs4_name)


        // const limit = parseInt(activeButton.attr('data-value'), 10);
        try {
            // Appel JSON-RPC à la route pour récupérer les dernières actualités
            //let model_name = 'flexible__snippet'


            const result = await jsonrpc(`/flexible_snippet/data`, { model_name, Champs1_name, Champs2_name, Champs3_name,page, limit});

            const { data, fields_map, total_pages  } = result;
            console.log("Fetch model validé:   data =>> " ,data );

            Object.assign(this, {
                data,
                fields_map,
                total_pages,



                Champs1_name,
                Champs2_name,
                Champs3_name

            });
             // Log des résultats pour vérification
        console.log("Fetch model validé:", {
            data,
            fields_map,
            total_pages,
            Champs1_name,
            Champs2_name,
            Champs3_name
        });

            // Vous pouvez faire quelque chose avec `actualites` et `total_pages` ici
        } catch (error) {
            console.error('Fetch error message....................:', error);
        }


        // });
    },


    start: function () { // 3 : Rendu du widget avec les données récupérées
        console.log("Pass  .");
        const refEl = this.$el.find("#flexible_data");
        console.log("Pass lowel.");
        const {data, fields_map, total_pages,   Champs1_name, Champs2_name, Champs3_name} = this;
        console.log("Pass lowel.");
        const currentPage = 1;
        // Utiliser le bon template pour afficher les actualités

        console.log("type of result111111111")
        console.log("Data:", data);
        console.log("Fields Map:", fields_map);
        console.log("Total Pages:", total_pages);

        // Assurez-vous que les données ne sont pas undefined
        if (!data || !fields_map || !total_pages ) {
            console.error("Les données requises ne sont pas définies.");
            return;
        }
        else {
            console.log("Les données est définies.");
        }



        // Validation de la structure des données
        if (!Array.isArray(data)) {
            console.error("La donnée 'data' n'est pas un tableau.");
            return;
        }
        else {
            console.log("Les données est un tableau.");
        }
        if (data.length > 0 && !data[0].hasOwnProperty('id')) {
            console.error("Les objets dans 'data' ne possèdent pas la propriété 'id'.");
            return;
        }
        else {
            console.log("Les données est posséde un id.");
        }


        console.error(currentPage,"Les données est posséde un id.");
        // Essayez d'utiliser un template de test ou un modèle simple pour vérifier
        try {
            refEl.html(renderToElement('snippet_flexible.template', {
                data,
                fields_map,
                total_pages,
                currentPage,

                Champs1_name,
                Champs2_name,
                Champs3_name

            }));

            console.log("data envoyé au xml :", {
            data,
            fields_map,
            total_pages,
            Champs1_name,
            Champs2_name,
            Champs3_name
        });

        } catch (error) {
            console.error("Erreur lors du rendu du template..............:", error);
        }



    },




        async _onClickPrecedent(ev) {
            let { data, fields_map, total_pages } = this;
            console.log("Nombre total de pages :", total_pages);

            const refEl = this.$el.find("#act_current_page");
            console.log("Référence élément :", refEl);

            if (refEl.length) {
                console.log("Page actuelle validée");

                // Extraire et vérifier le texte de l'élément
                let currentPageText = refEl.text().trim();
                console.log("Texte de la page actuelle :", currentPageText);

                let currentPage = parseInt(currentPageText, 10);
                console.log("Page actuelle convertie en entier :", currentPage);

                if (isNaN(currentPage)) {
                    console.error("Erreur : La page actuelle n'est pas un nombre valide.");
                    return;
                }

                if (currentPage > 1) {
                    console.log("Décrémentation de la page");

                    // Décrémenter la page et mettre à jour le DOM
                    refEl.html((--currentPage).toString());

                    try {
                        // Récupérer les nouvelles données pour la page précédente
                        await this.fetchData(currentPage);
                        console.log("Données mises à jour :", this.data);

                        // Mettre à jour l'affichage avec les nouvelles données
                        const elContainer = this.$el.find("#flexible_data");

                        // Afficher les données avant le rendu
                        console.log("Données pour le template :", {
                            data: this.data,
                            fields_map: this.fields_map,
                            total_pages: this.total_pages,
                            currentPage,
                            Champs1_name: this.Champs1_name,
                            Champs2_name: this.Champs2_name,
                            Champs3_name: this.Champs3_name
                        });

                        // Utiliser le template pour afficher les données
                        elContainer.html(renderToElement('snippet_flexible.template', {
                            data: this.data,
                            fields_map: this.fields_map,
                            total_pages: this.total_pages,
                            currentPage,
                            Champs1_name: this.Champs1_name,
                            Champs2_name: this.Champs2_name,
                            Champs3_name: this.Champs3_name
                        }));

                        console.log("Template mis à jour.");

                    } catch (error) {
                        console.error("Erreur lors de la mise à jour des données :", error);
                    }
                } else {
                    console.log("Aucune page précédente disponible.");
                }
            } else {
                console.error("Élément de page actuelle non trouvé.");
            }
        },









        async _onClickNext(ev) {
            let { data, fields_map, total_pages } = this;
            console.log("Nombre total de pages :", total_pages);

            const refEl = this.$el.find("#act_current_page");
            if (refEl.length) {
                let currentPage = parseInt(refEl.text());
                console.log("Page actuelle :", currentPage);

                if (currentPage < total_pages) {
                    console.log("Page suivante autorisée.");

                    refEl.html((++currentPage).toString());

                    try {
                        await this.fetchData(currentPage);
                        console.log("Données mises à jour :", this.data);

                        const elContainer = this.$el.find("#flexible_data");

                        // Affichez les données avant le rendu
                        console.log("Données pour le template :", {
                            data: this.data,
                            fields_map: this.fields_map,
                            total_pages: this.total_pages,
                            currentPage,
                            Champs1_name: this.Champs1_name,
                            Champs2_name: this.Champs2_name,
                            Champs3_name: this.Champs3_name
                        });

                        // Mettez à jour le contenu de l'élément avec le rendu du template
                        elContainer.html(renderToElement('snippet_flexible.template', {
                            data: this.data,
                            fields_map: this.fields_map,
                            total_pages: this.total_pages,
                            currentPage,
                            Champs1_name: this.Champs1_name,
                            Champs2_name: this.Champs2_name,
                            Champs3_name: this.Champs3_name
                        }));

                        console.log("Template mis à jour.");
                    } catch (error) {
                        console.error("Erreur lors de la mise à jour des données :", error);
                    }
                } else {
                    console.log("Page suivante non autorisée.");
                }
            } else {
                console.error("Élément de page actuelle non trouvé.");
            }
        },




         async _Ondownload(ev) {


                 const Champs4_name = this.el.dataset.Champs4;
                 console.log("this.Champs4 : " + Champs4_name)

                 const model_name = this.el.dataset.model;
                 console.log("this.model : " + model_name)

               console.log("on download id =>>>>>>>>>>>>>>>>>>>>>>", model_name);
                console.log("on download id =>>>>>>>>>>>>>>>>>>>>>>", Champs4_name);

                const link = ev.currentTarget;

                // Trouvez l'élément enfant contenant l'ID
                const itemIdElement = link.querySelector('.item-id');

                if (!itemIdElement) {
                    console.error("ID element not found");
                    return;
                }

                // Récupérez la valeur de l'élément
                const itemId = itemIdElement.textContent.trim();

                // Convertissez l'ID en entier
                const ids = parseInt(itemId, 10);

                console.log("on download id =>>>>>>>>>>>>>>>>>>>>>>", ids);

                // Vérifiez si ids est un nombre valide avant de l'utiliser
                if (isNaN(ids)) {
                    console.error("Invalid ID:", itemId);
                    return; // Arrête la fonction si l'ID n'est pas valide
                }



                 // await jsonrpc(`/flexible_snippet/download`,{ids, model_name, Champs4_name});
                window.location = `/flexible_snippet/download/${ids}/${model_name}/${Champs4_name}`;
                // console.log("Page suivante  autorisée.",result);
                // const  document  = result;
                // if(document)
                //     console.log("Page suivante non autorisée.",document);



        },




            async _lire_en_plus(ev) {

                const model_name = this.el.dataset.model;
                console.log("this.model : " + model_name)

                const link = ev.currentTarget;

                // Trouver l'élément parent le plus proche qui contient l'ID
                const itemIdElement = link.closest('.field-value').querySelector('.item-id');

                // Vérifier si l'élément existe
                if (itemIdElement) {
                    const itemId = itemIdElement.textContent; // Récupérer l'ID
                     const ids = parseInt(itemId, 10);
                    console.log("Item ID from span:", ids);

                     window.location = `/lire_en_plus/${ids}/${model_name}`;


                } else {
                    console.log("ID not found");
                }


            },































});

PublicWidget.registry.DynamicFlexibleSnippet = DynamicFlexibleSnippet;
return DynamicFlexibleSnippet;