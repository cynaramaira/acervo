import os
import yaml

def adicionar_campo_title():
    diretorio_raiz_posts = "C:\\Users\\User\\Documents\\jamildo.com\\acervoj\\_posts"

    for raiz, subpastas, arquivos in os.walk(diretorio_raiz_posts):
        print(f"Procurando arquivos em: {raiz}")
        for filename in arquivos:
            if filename.endswith(".md"):
                filepath = os.path.join(raiz, filename)
                print(f"Processando arquivo: {filepath}")
                with open(filepath, 'r+', encoding='utf-8') as f:
                    content = f.readlines()
                    f.seek(0)
                    f.truncate()

                    front_matter = ""
                    front_matter_inicio = False
                    front_matter_fim = -1
                    titulo_encontrado = False
                    titulo_valor = None
                    title_ja_existe = False

                    print("Iniciando análise do front matter...")
                    for i, line in enumerate(content):
                        print(f"Linha {i}: {line.strip()}")
                        if line.strip() == '---':
                            if not front_matter_inicio:
                                front_matter_inicio = True
                                print("Início do front matter encontrado.")
                            elif front_matter_inicio:
                                front_matter_fim = i
                                print("Fim do front matter encontrado.")
                                break
                        elif front_matter_inicio:
                            front_matter += line
                            print(f"Adicionando ao front_matter: {line.strip()}")

                    print(f"front_matter:\n{front_matter}")
                    print(f"front_matter_fim: {front_matter_fim}")

                    if front_matter and front_matter_fim > 0:
                        try:
                            data = yaml.safe_load(front_matter)
                            print(f"Dados YAML:\n{data}")
                            if data:
                                if 'titulo' in data:
                                    titulo_valor = data['titulo']
                                    titulo_encontrado = True
                                    print(f"Campo 'titulo' encontrado com valor: {titulo_valor}")
                                else:
                                    print("Campo 'titulo' não encontrado no YAML.")
                                if 'title' in data:
                                    title_ja_existe = True
                                    print("Campo 'title' já existe.")
                                else:
                                    print("Campo 'title' não existe.")

                                if titulo_encontrado and not title_ja_existe:
                                    content.insert(front_matter_fim, f"title: \"{titulo_valor}\"\n")
                                    print(f"Campo 'title' adicionado antes da linha {front_matter_fim}.")
                            else:
                                print("Erro: Dados YAML são nulos.")
                        except yaml.YAMLError as e:
                            print(f"Erro ao analisar YAML em {filename}: {e}")

                    else:
                        print(f"Front matter não encontrado em: {filename}")

                    f.writelines(content)
                    if titulo_encontrado and titulo_valor and not title_ja_existe:
                        print(f"Campo 'title' adicionado em: {filename}")
                    elif title_ja_existe:
                        print(f"Campo 'title' já existia em: {filename}")
                    elif filename.endswith(".md"):
                        print(f"Campo 'titulo' não encontrado ou erro no front matter em: {filename}")

adicionar_campo_title()