# -*- coding: utf-8 -*-
import base64
from multiprocessing import Array

from _cffi_backend import typeof

from odoo import http
from odoo.http import request, _logger, Response
import math

from odoo.tools import mimetypes
from odoo import http
from odoo.http import request, Response
import base64
import mimetypes


class FlexibleSnippetController(http.Controller):

    @http.route('/flexible_snippet/data', type="json", auth="public")
    def fetch_data(self, model_name, Champs1_name,  Champs2_name ,Champs3_name ,page=1, limit=2,   **args):
        try:
            limit = int(limit)
        except ValueError:
            return {'error': 'Invalid limit value'}

        _logger.info( f"Model: {model_name}, Limit: {limit}, Champs1: {Champs1_name} , Champs2: {Champs2_name} , Champs3: {Champs3_name}")

        # Vérifier les modèles disponibles
        available_models = list(request.env.keys())
        _logger.info(f"Available models: {available_models}")

        # Vérifier si le modèle existe dans la liste des modèles disponibles
        if model_name  in available_models:
            _logger.info(f"Model {model_name}  exist.")

        model = request.env[model_name].sudo()
        _logger.info(f"query: {model}  exist.")

        # Obtenir les noms des champs du modèle
        fields = model.fields_get()
        field_names = list(fields.keys())
        _logger.info(f"Fields retrieved: {field_names}")

        # "======================================================"
        # "======================================================"
        # Déterminer les champs à retourner
        requested_fields = []
        for champ in [Champs1_name, Champs2_name, Champs3_name]:
            if champ in field_names:
                requested_fields.append(champ)
                _logger.info(f"Added field: {champ} to requested_fields.")
            else:
                _logger.info(f"Field: {champ} does not exist in the model.")

        _logger.info(f"Requested fields: {requested_fields}")


        # Utiliser les noms des champs pour rechercher les données

        #data = request.env[model_name].sudo().search.read(
        data = model.search_read(
            [], requested_fields,
            limit=limit,
            offset=(page - 1) * limit,
            order='create_date desc',
        )
        _logger.info(f"Data fetched: {data}")

        data_count = model.search_count([])
        _logger.info(f"Total records count: {data_count}")

        total_pages = math.ceil(data_count / limit)
        _logger.info(f"Total pages calculated: {total_pages}")

        # fields_map = {}
        # for field in fields:
        #     fields_map[field] = fields[field].get('string', field)

       # fields_map = {field: fields[field].get('string', field) for field in fields}
        fields_map = {field: fields[field].get('string', field) for field in requested_fields}

        # Retourner un dictionnaire avec les données
        return {
            'data': data,
            'fields_map': fields_map,
            'total_pages': total_pages,
            'Champs1_name': Champs1_name,
            'Champs2_name': Champs2_name,
            'Champs3_name': Champs3_name
        }








    # @http.route('/flexible_snippet/data', type="json", auth="public")
    # def fetch_data(self, model_name, page=1, limit=2, **args):
    #     try:
    #         limit = int(limit)
    #     except:
    #         limit = 2
    #     _logger.info(f"Model: {model_name}, Limit: {limit}, Page: {page}")
    #
    #     # pour vérifier les ereurs de frappe
    #     if not model_name :
    #         error_message = f"{model_name} non trouvé parmi les modèles Odoo."
    #         A = f"la requette n'est pas encore faite"
    #         _logger.info(error_message)
    #         _logger.info(A)
    #         return {'error': error_message}
    #
    #
    #     model = request.env[model_name].sudo()
    #
    #
    #
    #     # Obtenir les noms des champs du modèle
    #     fields = model.fields_get()
    #     field_names = list(fields.keys())
    #     _logger.info(f"Fields retrieved: {field_names}")
    #
    #     # Utiliser les noms des champs pour rechercher les données
    #     data = model.search_read(
    #         [], field_names,
    #         limit=limit,
    #         offset=(page - 1) * limit,
    #         order='create_date desc',
    #     )
    #     _logger.info(f"Data fetched: {data}")
    #
    #     data_count = model.search_count([])
    #     _logger.info(f"Total records count: {data_count}")
    #
    #     total_pages = math.ceil(data_count / limit)
    #     _logger.info(f"Total pages calculated: {total_pages}")
    #
    #     # fields_map = {}
    #     # for field in fields:
    #     #     fields_map[field] = fields[field].get('string', field)
    #
    #     fields_map = {field: fields[field].get('string', field) for field in fields}
    #
    #     # Retourner un dictionnaire avec les données
    #     return {
    #         'data': data,
    #         'fields_map': fields_map,
    #         'total_pages': total_pages
    #     }

#
    #@http.route('/flexible_snippet/download', type='http', auth='public', methods=['GET'])
    @http.route('/flexible_snippet/download/<int:id>/<string:model_name>/<string:Champs4_name>', type='http', auth='public')
    def _downloadfile(self, id, model_name, Champs4_name, **kwargs):

        if not Champs4_name or not model_name:
            _logger.info("Le champ ou le modèle n'existe pas.")
            return {'error': 'Le champ ou le modèle n\'existe pas.'}

        _logger.info("Modèle: %s, Champ: %s, ID: %s", model_name, Champs4_name, id)


        # Vérifier le type de chaque arguments
        _logger.info('IDs Type: >>>>>>>>>>>>>>>>>> %s', 'Array' if isinstance(id, list) else type(id).__name__)
        _logger.info('Model Name Type:>>>>>>>>>>>>>>>>>> %s', type(model_name).__name__)
        _logger.info('Champs Name Type: >>>>>>>>>>>>>>>>>> %s', type(Champs4_name).__name__)

        # Récupérer l'enregistrement à partir de l'ID et du modèle spécifié
        record = request.env[model_name].sudo().browse(id)


        # Vérifier si l'enregistrement existe et si le champ de fichier est présent
        if not record.exists() or not record[Champs4_name]:
            _logger.info(f"Document avec l'ID {id} n'existe pas ou le champ {Champs4_name} est vide.")
            return {'error': 'Document non trouvé ou le champ de fichier est vide.'}

        _logger.info("Le document a été trouvé, préparation du téléchargement.")

        # Préparer le contenu du fichier pour le téléchargement
        file_data = record[Champs4_name]
        file_content = base64.b64decode(file_data)
        file_name = record.document_filename    # Nom du fichier, vous pouvez le personnaliser

        # Déterminer le type MIME du fichier
        file_extension = file_name.split('.')[-1] if '.' in file_name else 'bin'
        mime_type, _ = mimetypes.guess_type(f"file.{file_extension}")
        mime_type = mime_type or 'application/octet-stream'

        # Créer la réponse HTTP avec le fichier
        response = Response(
            file_content,
            headers=[
                ('Content-Type', mime_type),
                ('Content-Disposition', f'attachment; filename="{file_name}"'),
            ]
        )

        _logger.info("Téléchargement du document réussi.")
        return response




    @http.route('/lire_en_plus/<int:ids>/<string:model_name>',type='http', auth='public',website=True)
    def Read_more(self, model_name, ids):
        # Rechercher l'objet dans le modèle spécifié
        Model = request.env[model_name]
        record = Model.browse(ids)

        _logger.info("----------------------------")

        if record.exists():
            _logger.info("L'objet de modèle existe pour lire en plus")

            template_id = f'{model_name}.templata'
            return request.render(template_id, {
                'record': record
            })

        else:
            return {
                'error': 'Record not found'
            }





    @http.route('/generate_template/<int:ids>/<string:model_name>', type='http', auth='public', website=True)
    def generate_template(self,  model_name, ids):
        #try:
            # Récupération de l'enregistrement du modèle 'flexible.snippet.2'
            snippet = http.request.env['flexible__snippet'].browse(ids)

            if snippet:
                 _logger.info(" le flexible snnipet on a trouvé l'objet ")

            if not snippet:
                _logger.error(f"Snippet with ID {ids} not found.")


            # Générer le contenu XML de la template en utilisant un template QWeb
            template_content = http.request.env['ir.qweb']._render('flexible__snippet.flexible_snippet_template', {
                'record': snippet
            })

            if template_content:
                  _logger.info(" le template_content on a trouvé  ")



        #
        #     # Créer un nouveau enregistrement dans le modèle 'flexible.snippet.template'
        #     template = self.env['flexible_snippet_template'].create({
        #         'name': f"Template for {snippet.titre}",
        #         'snippet_id': snippet.id,
        #         'arch': template_content
        #     })
        #
        #     _logger.info(f"Template created successfully with ID {template.id}.")
        #     return {'template_id': template.id}
        #
        # except Exception as e:
        #     _logger.error(f"Error generating template: {str(e)}")
        #     return {'error': 'An error occurred while generating the template.'}




