import json
import os
import re
from datetime import datetime
import unicodedata

def remover_caracteres_invalidos(texto):
    """Remove caracteres inválidos para nomes de arquivo no Windows."""
    texto = texto.replace(':', '-').replace('*', '').replace('?', '').replace('"', '').replace('<', '').replace('>', '').replace('|', '')
    texto = re.sub(r'[\s./\\]+', '_', texto)
    texto = ''.join(ch for ch in texto if unicodedata.category(ch)[0] != 'C')
    return texto

def processar_postagens_por_ano(arquivos_json, ano_filtrar):
    """
    Lê os arquivos JSON fornecidos, filtra as postagens por ano,
    limpa os títulos e salva cada postagem em um arquivo Markdown
    dentro da pasta _posts/ANO.
    """
    postagens_filtradas = []

    for arquivo_json in arquivos_json:
        try:
            with open(arquivo_json, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if 'rows' in data and isinstance(data['rows'], list):
                    for postagem in data['rows']:
                        if 'data_publicacao' in postagem and postagem['data_publicacao']:
                            try:
                                data_publicacao = datetime.fromisoformat(postagem['data_publicacao'].replace('Z', '+00:00'))
                                ano = str(data_publicacao.year)
                                if ano == ano_filtrar:
                                    postagens_filtradas.append(postagem)
                            except ValueError:
                                print(f"Aviso no arquivo '{arquivo_json}': Formato de data inválido encontrado: '{postagem['data_publicacao']}'. Postagem ignorada.")
                                continue
                        else:
                            print(f"Aviso no arquivo '{arquivo_json}': Postagem sem data de publicação. Ignorando.")
                            continue
        except FileNotFoundError:
            print(f"Erro: Arquivo '{arquivo_json}' não encontrado.")
            continue
        except json.JSONDecodeError:
            print(f"Erro: Falha ao decodificar o JSON em '{arquivo_json}'. Verifique a estrutura do arquivo '{arquivo_json}'.")
            continue

    if not postagens_filtradas:
        print(f"Nenhuma postagem encontrada para o ano de {ano_filtrar} nos arquivos fornecidos.")
        return

    diretorio_ano = os.path.join('_posts', ano_filtrar)
    os.makedirs(diretorio_ano, exist_ok=True)

    for i, postagem in enumerate(postagens_filtradas):
        if 'titulo' in postagem and postagem['titulo']:
            titulo_limpo = remover_caracteres_invalidos(postagem['titulo'])
            nome_arquivo_base = titulo_limpo[:90]
            try:
                data_publicacao_obj = datetime.fromisoformat(postagem['data_publicacao'].replace('Z', '+00:00')).date()
                nome_arquivo_yaml = f"{data_publicacao_obj.strftime('%Y-%m-%d')}-{nome_arquivo_base[:-(len(str(i)) + 1)] if len(nome_arquivo_base) + len(str(i)) + 1 > 70 else nome_arquivo_base}-{i+1}.md"
            except ValueError:
                # Se houver um erro na data, usamos uma data genérica para o nome do arquivo, mas mantemos a data original no front matter
                nome_arquivo_yaml = f"data-invalida-{nome_arquivo_base[:-(len(str(i)) + 1) if len(nome_arquivo_base) + len(str(i)) + 1 > 70 else nome_arquivo_base]}-{i+1}.md"
        else:
            try:
                data_publicacao_obj = datetime.fromisoformat(postagem['data_publicacao'].replace('Z', '+00:00')).date()
                nome_arquivo_yaml = f"{data_publicacao_obj.strftime('%Y-%m-%d')}-postagem-sem-titulo-{i+1}.md"
            except ValueError:
                nome_arquivo_yaml = f"data-invalida-postagem-sem-titulo-{i+1}.md"

        caminho_arquivo = os.path.join(diretorio_ano, nome_arquivo_yaml)

        conteudo_yaml = f"""---
id: {postagem.get('id')}
data_publicacao: "{postagem.get('data_publicacao')}"
data_alteracao: "{postagem.get('data_alteracao')}"
materia_tags: "{postagem.get('materia_tags')}"
categoria: "{postagem.get('categoria')}"
titulo: "{postagem.get('titulo', '').replace('"', '\\"')}"
sutia: "{str(postagem.get('sutia', '')).replace('"', '\\"')}"
chapeu: "{str(postagem.get('chapeu', ''))}"
autor: "{postagem.get('autor', '')}"
imagem: "{postagem.get('imagem', '')}"
---
{postagem.get('conteudo', '')}
"""

        try:
            with open(caminho_arquivo, 'w', encoding='utf-8') as outfile:
                outfile.write(conteudo_yaml)
            print(f"Postagem salva em: {caminho_arquivo}")
        except Exception as e:
            print(f"Erro ao salvar o arquivo '{caminho_arquivo}': {e}")

    print(f"Processamento para o ano de {ano_filtrar} concluído. As postagens foram salvas na pasta '_posts/{ano_filtrar}'.")

if __name__ == "__main__":
    arquivos_json = ['MateriasJamildo1.json', 'MateriasJamildo2.json', 'MateriasJamildo3.json'] # Substitua pelos nomes reais dos seus arquivos

    while True:
        ano_desejado = input("Digite o ano que você deseja processar (ou 'todos' para processar todos os anos encontrados): ").strip()
        if ano_desejado.lower() == 'todos':
            anos_encontrados = set()
            for arquivo in arquivos_json:
                try:
                    with open(arquivo, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        if 'rows' in data and isinstance(data['rows'], list):
                            for postagem in data['rows']:
                                if 'data_publicacao' in postagem and postagem['data_publicacao']:
                                    try:
                                        data_publicacao = datetime.fromisoformat(postagem['data_publicacao'].replace('Z', '+00:00'))
                                        anos_encontrados.add(str(data_publicacao.year))
                                    except ValueError:
                                        pass
                except (FileNotFoundError, json.JSONDecodeError):
                    continue

            if anos_encontrados:
                for ano in sorted(list(anos_encontrados)):
                    print(f"\nProcessando postagens do ano: {ano}")
                    processar_postagens_por_ano(arquivos_json, ano)
                break
            else:
                print("Nenhum ano encontrado nos arquivos JSON.")
                break

        elif ano_desejado.isdigit() and len(ano_desejado) == 4:
            print(f"\nProcessando postagens do ano: {ano_desejado}")
            processar_postagens_por_ano(arquivos_json, ano_desejado)
            break
        else:
            print("Por favor, digite um ano válido (ex: 2009) ou 'todos'.")