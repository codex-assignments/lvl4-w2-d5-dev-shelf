shelf_items = [
    {
        "id": 1,
        "title": "Flask",
        "category": "Backend Framework",
        "description": "A micro web framework written in Python designed to make getting started quick and easy, with the ability to scale up to complex applications.",
        "quick_ref": "from flask import Flask, request, jsonify",
        "resources": [
            {"label": "Official Docs", "url": "https://flask.palletsprojects.com/"}
        ]
    },
    {
        "id": 2,
        "title": "Flask-CORS",
        "category": "Middleware / Security",
        "description": "A Flask extension for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX requests from frontend applications possible.",
        "quick_ref": "from flask_cors import CORS; CORS(app)",
        "resources": [
            {"label": "PyPI Page", "url": "https://pypi.org/project/Flask-CORS/"}
        ]
    },
    {
        "id": 3,
        "title": "os (Standard Library)",
        "category": "Core Python Utility",
        "description": "Python's built-in standard library module that provides a portable way of using operating system dependent functionality like reading environment variables or handling file paths.",
        "quick_ref": "import os; db_path = os.getenv('DATABASE_URL')",
        "resources": [
            {"label": "Official Python Docs", "url": "https://docs.python.org/3/library/os.html"}
        ]
    },
    {
        "id": 4,
        "title": "python-dotenv",
        "category": "Environment Management",
        "description": "Reads key-value pairs from a .env file and sets them as environment variables. Essential for keeping API keys and secret configuration values out of source control.",
        "quick_ref": "from dotenv import load_dotenv; load_dotenv()",
        "resources": [
            {"label": "PyPI Page", "url": "https://pypi.org/project/python-dotenv/"},
            {"label": "GitHub Repo", "url": "https://github.com/theofidry/django-dotenv"}
        ]
    },
    {
        "id": 5,
        "title": "Vite",
        "category": "Frontend Build Tool",
        "description": "A modern, blazing-fast frontend build tool and development server that replaces older configurations like Webpack.",
        "quick_ref": "npm create vite@latest my-app -- --template react",
        "resources": [
            {"label": "Official Site", "url": "https://vite.dev"},
            {"label": "Getting Started Guide", "url": "https://vite.dev/guide/"}
        ]
    },
    {
        "id": 6,
        "title": "React",
        "category": "Frontend Library",
        "description": "A popular open-source JavaScript library for building component-based, interactive user interfaces.",
        "quick_ref": "import { useState, useEffect } from 'react';",
        "resources": [
            {"label": "New React Docs", "url": "https://react.dev"},
            {"label": "Reference Manual", "url": "https://react.dev/reference/react"}
        ]
    },
    {
        "id": 7,
        "title": "PyPI (Python Package Index)",
        "category": "Package Repository",
        "description": "The official third-party software repository for Python applications. It is where tools like pip go to download and install packages.",
        "quick_ref": "pip install <package_name>",
        "resources": [
            {"label": "Main Hub", "url": "https://pypi.org"}
        ]
    },
    {
        "id": 8,
        "title": "SQLite3",
        "category": "Database Engine",
        "description": "A lightweight, serverless, self-contained SQL database engine. It stores data locally in a single file, making it perfect for development or low-traffic apps without needing a separate database server.",
        "quick_ref": "import sqlite3; conn = sqlite3.connect('app.db')",
        "resources": [
            {"label": "Documentation", "url": "https://www.sqlite.org/docs.html"},
            {"label": "Python Reference", "url": "https://docs.python.org/3/library/sqlite3.html"}
        ]
    },
    {
        "id": 9,
        "title": "Supabase",
        "category": "Backend-as-a-Service (BaaS)",
        "description": "An open-source Firebase alternative providing a real-time Postgres database, authentication, instant APIs, Edge Functions, and storage.",
        "quick_ref": "from supabase import create_client; supabase = create_client(url, key)",
        "resources": [
            {"label": "Official Docs", "url": "https://supabase.com/docs"},
            {"label": "Python Library GitHub", "url": "https://github.com/supabase-community/supabase-py"}
        ]
    }
]