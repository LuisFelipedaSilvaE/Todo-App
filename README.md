# 📝 Todo App (React Native + Expo)

Um aplicativo moderno de gerenciamento de tarefas desenvolvido com **React Native** e **Expo**. O projeto foca em performance, animações fluidas e persistência de dados local.

![Badge React Native](https://img.shields.io/badge/tech-React%20Native-blue)
![Badge Expo](https://img.shields.io/badge/tech-Expo-black)

---

## ✨ Funcionalidades

- **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
- **Persistência Local:** Dados salvos no dispositivo usando `AsyncStorage` (não perde ao fechar o app).
- **Monitoramento de Prazos:** Indicadores visuais automáticos:
  - 🟢 _On Track_ (No prazo)
  - 🟠 _Due Today_ (Vence hoje)
  - 🔴 _Overdue_ (Atrasado)
- **Notificações Visuais:** Badge na aba indicando novas tarefas não vistas.
- **Temas:** Suporte (preparado) para Light/Dark mode via Contexto.
- **Interface:** Ícones vetoriais SVG e Layout responsivo.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Navegação:** [Expo Router](https://docs.expo.dev/router/introduction/) (Navegação baseada em arquivos)
- **Animações:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Armazenamento:** Async Storage
- **Ícones:** SVG
- **Gerenciamento de Estado:** React Context API (`TodoContext`, `DialogContext`, `ThemeContext`)
- **Build:** EAS (Expo Application Services)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado.
- Gerenciador de pacotes (NPM ou Yarn).
- Celular com o app **Expo Go** ou Emulador Android/iOS configurado.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
    cd NOME-DO-REPO
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npx expo start
    ```

    _Dica: Se tiver problemas com cache, use `npx expo start --clear`_

4.  **Abra no celular:**
    - Escaneie o QR Code com o app **Expo Go** (Android) ou Câmera (iOS).

---

## 📦 Gerando o APK (Android)

Este projeto está configurado para o **EAS Build**. Para gerar um APK instalável que não depende do servidor de desenvolvimento:

1.  **Instale a CLI do EAS:**

    ```bash
    npm install -g eas-cli
    ```

2.  **Faça login na sua conta Expo:**

    ```bash
    eas login
    ```

3.  **Gere o APK (Perfil Preview):**
    ```bash
    eas build -p android --profile preview
    ```
    _Isso irá gerar um link para baixar o arquivo .apk instalável._
