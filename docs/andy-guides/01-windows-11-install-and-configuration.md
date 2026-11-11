# Andy's Windows 11 laptop setup

**Fleet Mucky Mayhem · Stage 1: install, configure and prepare the project folder**

**Version:** 0.2 — draft for Andy and Martin to review

**Prepared:** 11 November 2026

## Start here

Andy, this guide gets your personal Windows 11 x64 laptop ready for future website maintenance. All installer choices below are tailored to that laptop. Follow it from top to bottom. Each stage ends with a **Checkpoint** so you can confirm the expected result before continuing.

Allow about **45–60 minutes**, plus download time. It is fine to stop at a checkpoint and continue later.

By the end you will have:

- Visual Studio Code installed and set up for comfortable reading and editing.
- Git for Windows installed, ready for the later GitHub stage.
- Node.js and npm installed, ready for later website checks and previews.
- One clearly named local folder open in VS Code.
- A completed tool/version checklist to review with Martin.

**There is no website code on the laptop at the end of this guide. That is the correct result.** Connecting to GitHub, obtaining the repository, setting commit author details, editing rides and publishing changes come in later guides. No GitHub sign-in is needed today.

## Contents

1. [Understand the tools](#1-understand-the-tools)
2. [Check your laptop before installing](#2-check-your-laptop-before-installing)
3. [Install Visual Studio Code](#3-install-visual-studio-code)
4. [Install Git for Windows](#4-install-git-for-windows)
5. [Install Node.js and npm](#5-install-nodejs-and-npm)
6. [Create the project folder](#6-create-the-project-folder)
7. [Open that folder in VS Code](#7-open-that-folder-in-vs-code)
8. [Set up the editor](#8-set-up-the-editor)
9. [Choose Command Prompt as the terminal](#9-choose-command-prompt-as-the-terminal)
10. [Check the installed tools](#10-check-the-installed-tools)
11. [Finish and record the results](#11-finish-and-record-the-results)
12. [Resolve common setup problems](#12-resolve-common-setup-problems)
13. [Official references](#13-official-references)

## 1. Understand the tools

| Tool | What it will do for you |
| --- | --- |
| **Visual Studio Code**, shortened to **VS Code** | The application in which you will open the project, read files and edit ride information. |
| **Git for Windows** | Records changes and later connects your working copy to GitHub. VS Code uses Git in the background. |
| **Node.js** | Runs the website's checking and preview tools on your laptop. |
| **npm** | Comes with Node.js and starts those tools using short commands. It is not a separate purchase or download. |
| **File Explorer** | Windows' folder/file browser. We use it to create the local project container. |

A **terminal** is a panel where you type a command and read its response. This guide uses Windows **Command Prompt** inside VS Code. Copy the commands exactly; you do not need to learn programming to perform these installation checks.

## 2. Check your laptop before installing

### 2.1 Prepare

1. Save any open work and connect the laptop to power and the internet.
2. Use your normal Windows account.
3. Git or Node may display a Windows administrator approval prompt during installation. Check that it refers to the installer you just opened, then approve it. If Windows asks for administrator credentials you do not have, ask Martin for help.
4. If any of these tools are already installed, tell Martin their versions before replacing or removing them. Existing installations may be used by other projects. You can use the checks in [Section 10](#10-check-the-installed-tools) to collect versions first.

### 2.2 Use the x64 installers

Your laptop is confirmed as **x64**, so choose **x64** or **64-bit x64** wherever a download page offers an installer type. The steps below name the x64 option for each tool.

**Checkpoint:** You are ready to install the Windows x64 versions on your own laptop.

## 3. Install Visual Studio Code

### 3.1 Download

1. Open your web browser and visit the [official VS Code download page](https://code.visualstudio.com/download).
2. Choose the **Windows User Installer — x64**.
3. Use the normal **Stable** release. Save the installer in **Downloads**.

The User Installer installs for your Windows account and normally does not require administrator rights. Choose **Visual Studio Code**, not the separate Visual Studio development suite. Microsoft's [Windows setup instructions](https://code.visualstudio.com/docs/setup/windows) explain the installer choices.

### 3.2 Run the installer

1. Open **Downloads** and double-click the VS Code installer.
2. Read the licence and continue if you accept it.
3. Keep the suggested installation location and Start menu folder.
4. On **Select Additional Tasks**, ensure **Add to PATH** is selected. This lets the `code` command work later.
5. A desktop shortcut is optional. Leave other choices at their defaults unless Martin advises otherwise.
6. If a GitHub Copilot CLI page appears, choose **Don't add the copilot command** for this setup.
7. Select **Install**, then finish and open VS Code.

### 3.3 First launch

- You can use the core editor without signing in.
- If offered an AI assistant, Copilot setup or Settings Sync, skip that setup for now.
- You can leave the Welcome page open or close its tab using its **X**.

Microsoft confirms that AI features are optional and an account is not needed for the core editor: [getting started with VS Code](https://code.visualstudio.com/docs/getstarted/overview).

**Checkpoint:** VS Code opens from the Windows Start menu. You have not connected it to GitHub or opened website code.

## 4. Install Git for Windows

### 4.1 Download

1. Visit the [official Git for Windows download page](https://git-scm.com/install/windows).
2. Under **Standalone Installer**, choose **Git for Windows/x64 Setup**.
3. Save and run the installer from **Downloads**.

Use the maintained version offered by that page. This guide was checked when Git for Windows **2.56.1** was available; a later maintained version can show a different version number.

### 4.2 Follow the setup screens

Git's installer has several pages. Keep the supplied defaults except for the choices below. Some pages may be absent or worded slightly differently.

| If the installer asks about… | Choose… |
| --- | --- |
| Git's default editor | **Use Visual Studio Code as Git's default editor**. |
| Adjusting PATH / command-line use | **Git from the command line and also from 3rd-party software**. |
| Credential helper | Keep **Git Credential Manager** enabled. It will support browser sign-in in the later GitHub stage. |

For the other pages, continue with the supplied defaults. Select **Install**, then **Finish**. You can leave **Launch Git Bash** and **View Release Notes** unselected at the end.

The Git project documents its [installer choices](https://gitforwindows.org/mapping-between-git-installer-gui-settings-and-command-line-arguments.html), and confirms that [Git Credential Manager is included with Git for Windows](https://git-scm.com/doc/credential-helpers).

**Checkpoint:** Git setup has finished. You do not need to open Git Bash, enter GitHub credentials or initialise a repository.

## 5. Install Node.js and npm

For this guide use **Node.js 24.22.2 LTS**, a Node 24 maintenance release available when the guide was prepared. The project uses Node 24. Do not choose a different major version merely because a download page labels it the newest LTS.

### 5.1 Download the Windows installer

Open the [Node.js 24.22.2 x64 Windows Installer](https://nodejs.org/dist/v24.22.2/node-v24.22.2-x64.msi).

This installer is listed in the [official release announcement](https://nodejs.org/en/blog/release/v24.22.2). If the browser asks whether to save the file, save it in Downloads.

### 5.2 Install

1. Open the downloaded `.msi` file.
2. Read the licence and continue if you accept it.
3. Keep the suggested destination and default features, including **Node.js runtime**, **npm package manager** and **Add to PATH**.
4. If offered optional tools for compiling native modules, leave that additional installation unselected for now.
5. Complete **Install → Finish**. Ask Martin if installation cannot finish.
6. Close all VS Code windows and reopen VS Code from Start so it picks up the installed tools.

**Checkpoint:** Node.js setup has completed. The actual `node` and `npm` commands will be checked in Section 10; no website packages are being installed today.

## 6. Create the project folder

We will use this fixed location under your own Windows user folder:

```text
%USERPROFILE%\Projects\FleetMuckyMayhem
```

`%USERPROFILE%` means **your Windows user folder**. Windows fills it in for you. It is independent of your GitHub username, and your Windows folder name may not be Andy or Andrew-Deeley.

For example, if Windows uses `C:\Users\andy`, the result would be:

```text
C:\Users\andy\Projects\FleetMuckyMayhem
```

The example is illustrative: do not rename your Windows account folder to match it. We are using this local location rather than Documents/Desktop, which may be redirected into OneDrive.

### 6.1 Open your Windows user folder

1. Open **File Explorer** from the taskbar or Start.
2. Press **Ctrl+L** to select its address bar. Use the address bar, not the search box.
3. Type the following and press **Enter**:

   ```text
   %USERPROFILE%
   ```

4. File Explorer should open your Windows user folder. Its address will normally begin with `C:\Users\`.

### 6.2 Create Projects

1. Look for a folder called **Projects**.
2. If it exists, open it. Otherwise choose **New → Folder**.
3. Name the new folder **Projects** and press **Enter**, then open it.

### 6.3 Create FleetMuckyMayhem

1. Inside Projects, look for a folder called **FleetMuckyMayhem**.
2. If it does not exist, choose **New → Folder**, name it **FleetMuckyMayhem** and press **Enter**.
3. Open it. If an existing folder contains files, pause and ask Martin to confirm the location rather than mixing work together.
4. Click the address bar to see the full path. It should end with:

   ```text
   \Projects\FleetMuckyMayhem
   ```

The structure created today is:

```text
Your Windows user folder
└── Projects
    └── FleetMuckyMayhem
```

**FleetMuckyMayhem is an empty project container today.** In the next guide it will hold the website's repository folder. Do not create additional website subfolders or copy files into it yet.

Microsoft's [new-folder instructions](https://support.microsoft.com/en-us/word/create-a-new-folder) cover the File Explorer steps.

**Checkpoint:** You can open the empty FleetMuckyMayhem folder, and its path ends in `\Projects\FleetMuckyMayhem` without OneDrive in that path.

## 7. Open that folder in VS Code

1. Return to VS Code.
2. Select **File → Open Folder**.
3. Browse to your Windows user folder, then **Projects → FleetMuckyMayhem**.
4. Select **Select Folder**. If VS Code opens a new window, continue in that window.
5. If a Workspace Trust prompt appears, confirm it names the **FleetMuckyMayhem** folder you created. You can trust that specific empty folder; leave any option to trust its parent folder unselected.
6. Look at the left-hand **Explorer** area. It should show **FLEETMUCKYMAYHEM** with no website files underneath it.

Workspace Trust is VS Code's way of asking whether code in a folder can run; Microsoft's [Workspace Trust explanation](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust) provides background.

If Explorer is hidden, press **Ctrl+Shift+E**. An empty folder is expected. If Source Control offers **Initialize Repository** or **Clone Repository**, leave those actions for the next guide.

**Checkpoint:** VS Code is looking at the correct empty project container, not Downloads, Documents or your entire Windows user folder.

## 8. Set up the editor

### 8.1 Use User settings

1. Press **Ctrl+Shift+P**. A search box called the **Command Palette** opens at the top.
2. Type **Preferences: Open User Settings**.
3. Select **Preferences: Open User Settings**, without `(JSON)` on the end, and press Enter.
4. Use the graphical Settings screen. If User and Workspace tabs are shown, select **User**.

User settings apply to VS Code for your Windows user. Workspace settings belong to a particular project. We use User settings today so the empty container stays empty. Settings save as you change them; there is no separate Save button. See Microsoft's [settings explanation](https://code.visualstudio.com/docs/configure/settings).

### 8.2 Make these three settings

Use the Settings search box, replacing the search text each time. The exact setting IDs below help avoid similarly named options.

| Search for | Set | Reason |
| --- | --- | --- |
| `@id:editor.fontSize` | **16**, or a comfortable reading size | Makes ride details easier to read. |
| `@id:editor.wordWrap` | **on** | Displays long notes across the available width without inserting line breaks into the file. |
| `@id:files.autoSave` | **off** | You will deliberately save edits using Ctrl+S in the later editing guide. |

Leave other settings as they are. Close the Settings view when finished; the folder remains open.

### 8.3 Extensions and accounts

VS Code already has JSON editing, formatting and syntax support. No extra extension is required for this stage. The [built-in JSON documentation](https://code.visualstudio.com/docs/languages/json) describes those features.

You can leave GitHub sign-in, Settings Sync, AI assistants and additional extensions until there is a specific need. Git commit name/email and GitHub access will be configured in the later connection stage, using your own details.

**Checkpoint:** Text size is comfortable, Word Wrap is on, Auto Save is off, and these settings were made in User settings.

## 9. Choose Command Prompt as the terminal

We will use **Command Prompt** consistently for the Windows instructions. This also avoids the PowerShell script-policy issue that can occur with npm's PowerShell launcher.

1. Press **Ctrl+Shift+P**.
2. Type **Terminal: Select Default Profile** and select that command.
3. Choose **Command Prompt** from the list.
4. Select **Terminal → New Terminal** from VS Code's menu.
5. Look for the terminal panel, normally below the editor. Its tab should say **cmd** or **Command Prompt**.

Changing the default affects new terminals. If an old PowerShell terminal is still visible, use the small dropdown beside the terminal panel's **+** button and choose **Command Prompt** to open a fresh one.

The prompt should look broadly like this:

```text
C:\Users\andy\Projects\FleetMuckyMayhem>
```

Your Windows name may differ. A prompt beginning `PS ` is PowerShell; open Command Prompt before continuing.

A **prompt** is the folder text ending in `>`. You type commands after it. Do not copy the prompt or the example output below into your command.

Microsoft documents [default terminal profiles](https://code.visualstudio.com/docs/terminal/profiles) and [opening the integrated terminal](https://code.visualstudio.com/docs/terminal/getting-started).

**Checkpoint:** A Command Prompt terminal is open inside VS Code.

## 10. Check the installed tools

Run these checks in that Command Prompt terminal. **Type one command, press Enter, and wait for its result before typing the next.** These commands read installed-tool information; they do not obtain website code or alter the website.

### 10.1 VS Code

Type:

```bat
code --version
```

**Expected:** A version number, followed by other identification lines such as a long build identifier and `x64`. The exact Stable version can change. Record the first line.

### 10.2 Git

Type:

```bat
git --version
```

**Expected:** A line beginning `git version`. For example:

```text
git version 2.56.1.windows.1
```

That is an example, not a required exact patch/build number. Record the value actually displayed.

### 10.3 Node.js

Type:

```bat
node --version
```

**Expected for this guide:**

```text
v24.22.2
```

If another `v24...` version appears, record it and ask Martin to confirm it. If a different major version appears, stop before replacing installations or changing project tools.

### 10.4 npm

Type:

```bat
npm --version
```

**Expected with the selected installer:**

```text
11.19.1
```

Record the actual version if it differs. npm is included with Node.js; do not download a separate npm installer or run an npm upgrade command to force a match. The [Node 24.22.2 archive](https://nodejs.org/en/download/archive/v24.22.2) identifies its bundled npm version.

### 10.5 Confirm the folder

Type:

```bat
cd
```

In Command Prompt, `cd` on its own displays the current folder. Confirm the printed path ends in `\Projects\FleetMuckyMayhem`.

**Checkpoint:** All four tools respond, and the terminal is using the intended project container. No application preview is expected yet.

## 11. Finish and record the results

Fill this in for your review with Martin. Blank cells are for your own results, not commands to type.

| Item | Your result |
| --- | --- |
| Date completed | |
| Laptop | Personal Windows 11 laptop |
| Windows system type | x64 (confirmed) |
| Actual project-container path | |
| VS Code version: first line of output | |
| Git version | |
| Node.js version | |
| npm version | |
| Any question or setup problem | |

Before finishing, confirm:

- [ ] VS Code opens normally from Start.
- [ ] Git, Node.js and npm are installed and their version commands respond.
- [ ] The FleetMuckyMayhem container exists in the agreed local location and is empty.
- [ ] VS Code's Explorer shows that container.
- [ ] User settings have the chosen font size, Word Wrap on and Auto Save off.
- [ ] New terminals use Command Prompt.
- [ ] The terminal's `cd` output matches the container's File Explorer path.
- [ ] Any different versions or unclear results have been recorded for Martin.

**Stop here for Stage 1.** You can close VS Code with **File → Exit**. Later, reopen it from Start; if the container is not already open, use **File → Open Recent** or repeat Section 7.

At this point there should be no website files, package.json, Git history or website preview in the container. The next guide will cover connecting to the source repository. Do not use the production publishing repository as a working folder.

## 12. Resolve common setup problems

### A command says it is not recognised

1. Confirm the spelling against Section 10.
2. Close **all** VS Code windows, then reopen it from Start.
3. Reopen the container and create a new Command Prompt terminal.
4. Retry only the failed version command.
5. If it still fails, restart Windows once and retry. If that does not resolve it, ask Martin to check the installation/PATH choice. Record which command failed and its exact error.

PATH is Windows' list of places to look for installed programs. A newly installed tool may not appear in an already-open application. Microsoft covers the [VS Code PATH check](https://code.visualstudio.com/docs/setup/windows#the-code-command-is-not-recognized-in-the-terminal).

### npm reports that npm.ps1 cannot run or that scripts are disabled

This normally means the terminal is PowerShell. Repeat Section 9 and open **Command Prompt**. Retry `npm --version` there. No Windows execution-policy change is required for these Command Prompt checks.

### Source Control says there is no repository

That is expected: the container is empty at this stage. Do not select **Initialize Repository** to make the message disappear. Continue with the completion checklist.

### The folder path includes OneDrive

Return to Section 6 and start from `%USERPROFILE%` in File Explorer's address bar. Confirm the exact local `Projects\FleetMuckyMayhem` location with Martin if the path still differs. Do not relocate any existing work as part of this setup.

### An installer is blocked, requests unavailable administrator approval or shows unexpected choices

Pause and contact Martin with the installer name and the displayed message. Keep your existing Windows security settings unchanged. There is no need to solve that problem by selecting random advanced installer options.

## 13. Official references

These are background/help links; the numbered steps above are your route through this stage. Installer wording and version numbers can change after the preparation date.

- [VS Code downloads](https://code.visualstudio.com/download).
- [Installing VS Code on Windows](https://code.visualstudio.com/docs/setup/windows).
- [VS Code User and Workspace settings](https://code.visualstudio.com/docs/configure/settings).
- [VS Code terminal profiles](https://code.visualstudio.com/docs/terminal/profiles).
- [Git for Windows downloads](https://git-scm.com/install/windows).
- [Git for Windows installer options](https://gitforwindows.org/mapping-between-git-installer-gui-settings-and-command-line-arguments.html).
- [Node.js 24.22.2 release and Windows installer links](https://nodejs.org/en/blog/release/v24.22.2).
- [Node.js 24.22.2 archive and bundled npm version](https://nodejs.org/en/download/archive/v24.22.2).
- [Creating a folder with File Explorer](https://support.microsoft.com/en-us/word/create-a-new-folder).

**End of Stage 1 — ready for Martin's review before the repository-connection guide.**
