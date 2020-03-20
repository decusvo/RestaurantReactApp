from flask import Flask, request, jsonify, Blueprint
import json
import psycopg2
from common import connector

def validate_table(request):
    return None
