from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
import os
#RODAR O FLASK PARA FUNCIONAR O BANCO DE DADOS E O SERVIDOR, CLICAR NA PASTA TIPOS_CRIPTOGRAFIA, ABRIR INTEGRADO AO TERMINAL E DIGITAR O COMANDO FLASK RUN

app = Flask(__name__)

# Configuração do banco de dados SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///publicacoes.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
db = SQLAlchemy(app)

# Configuração do CORS para permitir requisições de qualquer origem
CORS(app)

# Modelo para a publicação
class Publicacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(255), nullable=False)
    imagem = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Publicacao {self.titulo}>'

# Criar as tabelas no banco de dados, se não existirem
with app.app_context():
    #Código para apagar a tabela
    #db.drop_all() 
    db.create_all()

# Rota para carregar as publicações
@app.route('/publicacoes', methods=['GET'])
def get_publicacoes():
    publicacoes = Publicacao.query.all()  
    return jsonify([{
        'titulo': pub.titulo,
        'descricao': pub.descricao,
        'imagem': pub.imagem
    } for pub in publicacoes])  

# Rota para criar uma nova publicação
@app.route('/publicar', methods=['POST'])
def criar_publicacao():
    titulo = request.form.get('titulo')
    descricao = request.form.get('descricao')
    imagem = request.files.get('imagem')

    # Validação dos campos
    if not titulo or not descricao or not imagem:
        return jsonify({"message": "Todos os campos são obrigatórios"}), 400

    # Salvar a imagem na pasta de uploads
    UPLOAD_FOLDER = 'uploads'
    imagem_path = os.path.join(UPLOAD_FOLDER, imagem.filename)
    imagem.save(imagem_path)

    # Criar a nova publicação no banco de dados
    nova_publicacao = Publicacao(titulo=titulo, descricao=descricao, imagem=imagem_path)
    db.session.add(nova_publicacao)
    db.session.commit()

    return jsonify({
        'titulo': nova_publicacao.titulo,
        'descricao': nova_publicacao.descricao,
        'imagem': nova_publicacao.imagem
    }), 201

if __name__ == '__main__':
    app.run(debug=True)
