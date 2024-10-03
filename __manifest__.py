# -*- coding: utf-8 -*-
{
    'name': "Flexible_Snippet",
    'license': 'LGPL-3',

    'summary': "Short (1 phrase/line) summary of the module's purpose",

    'description': """
Long description of module's purpose
    """,

    'author': "My Company",
    'website': "https://www.yourcompany.com",


    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'website', 'web_editor'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/snippet.xml',
        'views/template.xml',

    ],
    'qweb': [
        'static/src/xml/contenue.xml',
    ],
    'assets': {
        'web.assets_frontend': [
             'flexible__snippet/static/src/js/model_fields_selector.js',
             'flexible__snippet/static/src/js/js_snnipet.js',

             'flexible__snippet/static/src/xml/contenue.xml',
             'flexible__snippet/static/src/css/flexible_css.css',

        ],
        'website.assets_wysiwyg': [
            'flexible__snippet/static/src/parametrage_snippet/option.js',
        ],
        'web.assets_backend': [
            #'flexible__snippet/static/src/js/model_fields_selector.js',
        ],
    },
    'application': True,


    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}

