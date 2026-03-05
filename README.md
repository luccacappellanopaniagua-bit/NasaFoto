# NASA APOD Birthday Viewer 🌌

Este projeto permite que você digite uma data de aniversário (ou qualquer data especial) e descubra qual imagem incrível do universo a NASA publicou naquele dia (Astronomy Picture of the Day).

A aplicação possui um Frontend moderno e interativo e um Backend robusto em Python utilizando FastAPI.

---

## 🚀 Como iniciar o projeto

### 1. Iniciando o Backend

O backend é responsável por se comunicar com a API oficial da NASA e entregar os dados para o site seguro e formatado.

1. Abra o seu terminal (PowerShell) e navegue até a pasta **`Backend`**:
   ```powershell
   cd Backend
   ```
2. Ative o ambiente virtual (venv) para isolar as dependências do Python:
   ```powershell
   .\venv\Scripts\activate
   ```
   > ⚠️ ***Dica:*** *Se você receber um erro vermelho dizendo que a execução de scripts está desabilitada no seu sistema, execute este comando no PowerShell e tente ativar novamente:*
   > `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

3. Instale as dependências necessárias do projeto:
   ```powershell
   pip install -r requirements.txt
   ```

4. Inicie o servidor FastAPI:
   ```powershell
   python -m uvicorn main:app --reload
   ```
   ✅ *Sucesso: Você verá uma mensagem indicando que o servidor está rodando em `http://127.0.0.1:8000` ou `http://localhost:8000`.*

---

### 2. Configurando a Chave de API (Importante)

O projeto está configurado para tentar ler a sua chave da API da NASA.
Dentro da pasta **`Backend`**, certifique-se de editar o arquivo `.env` para incluir sua própria chave, caso contrário, será usada uma chave de demonstração limitadíssima da NASA.

```env
NASA_API_KEY=sua_chave_aqui_da_nasa
```
*(Você pode conseguir uma chave gratuitamente em: https://api.nasa.gov/)*

---

### 3. Iniciando o Frontend

O frontend é composto puramente de arquivos estáticos da web moderno (HTML puro, CSS puro e Vanilla JavaScript), por isso não necessita de um servidor pesado para rodar.

Para ver o site:
1. Navegue até a pasta **`Frontend`**.
2. Dê **dois cliques** no arquivo `index.html` para abrí-lo em seu navegador padrão (Google Chrome, Edge, Safari, etc.).

✨ **Dica para usuários do VS Code:** 
Recomendamos instalar a extensão **Live Server**. Basta clicar com o botão direito no arquivo `index.html` e selecionar **"Open with Live Server"**. Isso abrirá o site automaticamente e atualizará a página sempre que você fizer modificações no código da interface.
