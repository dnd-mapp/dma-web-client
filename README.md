# DnD Mapp - Web client

[![License](https://img.shields.io/github/license/dnd-mapp/dma-web-client)](./LICENSE)
[![CI Workflow Status](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-web-client/push-main.yml?branch=main&logo=github&label=CI)](https://github.com/dnd-mapp/dma-web-client/actions/workflows/push-main.yml)

## Table of Contents

-   [About the Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Configuration](#configuration-and-certificates)
-   [Running the Application](#running-the-application)
    -   [Development Server](#development-server)
    -   [Building for Production](#building-for-production)
    -   [Running Unit Tests](#running-unit-tests)
    -   [Running End-to-End Tests](#running-end-to-end-tests)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)
-   [Acknowledgments](#acknowledgments)

---

## About the Project

This Angular application serves as a single-page interface to interact with the D&D Mapp platform. On this platform, Players and Dungeon Masters will be able to:

- Manage their Player Characters.
- Manage notes.
- Keep track of world lore, NPCs, and info.
- Join other players of the same campaign in battles on the virtual tabletop.

### Built With

*   [Angular](https://angular.io/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
*   [SCSS](https://sass-lang.com/)
*   [Angular CDK](https://material.angular.io/cdk)
*   [RxJS](https://rxjs.dev/)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **[Node.js](https://nodejs.org/en/download/) (v22) and npm (Node Package Manager, v11)**: We recommend using [mise-en-place](https://mise.jdx.dev/) to manage your installed version of Node.js and npm globally.
*   **Angular CLI**: Install globally using npm
    ```bash
    npm install -g @angular/cli@~20
    ```
*   **[mkcert](https://github.com/FiloSottile/mkcert)**: Create a new local CA
    ```bash
    mkcert -install
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dnd-mapp/dma-web-client.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd dma-web-client
    ```
3.  **(Optional when using mise-en-place) Install project tools**
    ```bash
    mise install
    ```
4.  **Install project dependencies:**
    ```bash
    npm ci
    ```

### Configuration and certificates

This application may require certain configuration files to be set up.

1.  **Copy the `public/config-template.json` file and rename it to `config.json`:** Make sure to update it so that the client communicates to the correct server.

    Example `public/config.json`:
    ```json
    {
        "authServerBaseUrl": "https://localhost.auth.dndmapp.dev:4300/server",
        "resourcesServerBaseUrl": "https://localhost.resources.dndmapp.dev:4400/server",
        "playerServerBaseUrl": "https://localhost.player.dndmapp.dev:4500/server"
    }
    ```

2.  **Generate a self-signed certificate to serve the application over HTTPS:** The app is served locally over HTTPS by default. In order to accomplish this you must generate a self-signed certificate using mkcert.
    ```bash
    mkcert -cert-file certificate.pem -key-file certificate-key.pem localhost.www.dndmapp.dev localhost
    ```

3.  **Trust the certificate:** In order to prevent HTTPS warnings from your browser you must add them as trusted certificates. Follow the steps below for your Operating System:
    <ul>
        <li>
            <details>
                <summary>For Windows:</summary>
                <ol>
                    <li>
                        Press <kbd>&#8862; Win</kbd>+<kbd>R</kbd> to open `Run`.
                    </li>
                    <li>
                        Type `mmc` and press <kbd>⏎ Enter</kbd> to open `Microsoft Management Console` (You may need to accept that this app may make changes to your device).
                    </li>
                    <li>
                        Press <kbd>CTRL</kbd>+<kbd>M</kbd> to add or remove Snap-ins.
                    </li>
                    <li>
                        Add the `Certificates` snap-in, confirm that it'll manage certificates for your user account, and confirm the selection of snap-ins.
                    </li>
                    <li>
                        In the side panel, navigate to `Console Root > Certificates - Current User > Trusted Root Certification Authorities > Certificates`.
                    </li>
                    <li>
                        In the top bar, open the `Action` menu, open the `All Tasks` sub menu, and select the `Import...` task.
                    </li>
                    <li>
                        Click on next to confirm that the store location is for the `Current User`.
                    </li>
                    <li>
                        Click on `Browse...`, navigate to the repository root folder, allow all file types, and select the `certificate.pem`.
                    </li>
                    <li>
                        Continue and finish by placing the certificate under the `Trusted Root Certification Authorities` store (There's no need to save the console settings).
                    </li>
                </ol>
            </details>
        </li>
        <li>
            <details>
                <summary>For macOS:</summary>
                <ol>
                    <li>
                        Press <kbd>⌘ Command</kbd>+<kbd>Space</kbd>.
                    </li>
                    <li>
                        Search for and open `Keychain Access` (You might get prompted to provide your password).
                    </li>
                    <li>
                        Open the root folder of the repository in finder.
                    </li>
                    <li>
                        Make sure that "Keychain Access" has the `login` section open on `All Items`.
                    </li>
                    <li>
                        Drag the certificate from finder into the Keychain Access (You might get an error message "-26276" indicating that the import of the certificate was not possible).
                    </li>
                    <li>
                        Find the certificate by the looking for it by the name `localhost.www.dndmapp.dev`, Right click on it and select `Get Info`.
                    </li>
                    <li>
                        Expand the `Trust` section and set `Secure Sockets Layer (SSL)` to `Always Trust`.
                    </li>
                    <li>
                        You may now close all windows (You might get prompted to provide your password to save the changes).
                    </li>
                </ol>
            </details>
        </li>
        <li>For all Operating Systems: You need to restart your browser after trusting the certificate to complete the process.</li>
    </ul>

4.  **Update the hosts file:** To be able to use the custom host names you need to update the hosts file. Follow the steps below for your Operating System:
    <ul>
        <li>
            <p>
                The following contents will need to be added to the Hosts file, no matter the OS of your device:
            </p>
            <pre>127.0.0.1    localhost.www.dndmapp.dev</pre>
        </li>
        <li>
            <details>
                <summary>For Windows:</summary>
                <ol>
                    <li>Run a text editor like Notepad or Notepad++ as Administrator.</li>
                    <li>Open the Hosts file on the following location: <pre>C:\Windows\System32\drivers\etc\hosts</pre></li>
                    <li>Add the contents from above in the file, save, and close the file.</li>
                </ol>
            </details>
        </li>
        <li>
            <details>
                <summary>For macOS:</summary>
                <ol>
                    <li>Open a terminal.</li>
                    <li>
                        Using your favorite CLI text editor tool, open the hosts file located at: <pre>/etc/hosts</pre> (You might need to use <code>sudo</code> to have write permissions for this file).
                    </li>
                    <li>Add the contents from above in this file. After that you may save and close the file.</li>
                </ol>
            </details>
        </li>
    </ul>

---

## Running the Application

### Development Server

Run `npm run start` for a development server. Navigate to `https://localhost.www.dndmapp.dev:4200`. The application will automatically reload if you change any of the source files.

```bash
npm run start
```

### Building for Production

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/dma-web-client` directory.

```bash
npm run build
```

### Running Unit Tests

Run `npm run test` to execute the unit tests via [vitest](https://vitest.dev).

```bash
npm run test
```

### Running End-to-End Tests

Run `npm run e2e` to execute the end-to-end tests via a [Playwright](https://playwright.dev/).

```bash
npm run e2e
```

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repository and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.

---

## Contact

Your Email - [mail.dndmapp@gmail.com.com](mailto:mail.dndmapp@gmail.com)

Project Link: [https://github.com/dnd-mapp/dma-web-client](https://github.com/dnd-mapp/dma-web-client)

---

## Acknowledgments

*   [ChooseAnOSL](https://choosealicense.com/)
*   [ImgShields](https://shields.io/)
