"""
import config.dev as dev_config
import config.prod as prod_config
import os

environment = os.getenv('PYTHON_ENV', 'development')

config = None
if environment == 'development':
	config = dev_config
if environment == 'production':
	config = prod_config*/
"""