# -*- coding: utf-8 -*-

from odoo import models, fields, api


class flexible__snippet(models.Model):
        _name = 'flexible__snippet'
        _description = 'flexible__snippet'

        titre = fields.Char(string='Titre', required=True)
        text = fields.Text(string='Texte', required=True)
        date = fields.Date(string='Date de l\'Actualité')

        document_file = fields.Binary(string='Document', attachment=True)
        document_filename = fields.Char(string='FileName')



class FlexibleSnippetTemplate(models.Model):
    _name = 'flexible_snippet_template'
    _description = 'Template for flexible snippets'

    name = fields.Char(string='Name', required=True)
    snippet_id = fields.Many2one('flexible__snippet', string="Snippet", required=True, ondelete='cascade')
    arch = fields.Text(string='Template XML')