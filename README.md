# insight-plugin-template

[toc]

## Overview

`insight-plugin-template` is a template repo for developing plugins under [milvus-insight](https://github.com/zilliztech/milvus-insight).
You can develop your plugins(both client and server) under `src/<your plugin directory>/*`.

## Structure

```
.
├── LICENSE
├── README.md
├── lerna.json
├── milvus-insight
├── package.json
├── src
│   └── example_plugin
│       ├── README.md
│       ├── client
│       │   ├── Icon.tsx
│       │   ├── Index.tsx
│       │   ├── config.json
│       │   └── package.json
│       └── server
│           ├── app.ts
│           ├── config.json
│           └── package.json
├── tsconfig.paths.plugin.json
├── utils
│   ├── generatePackages.js
│   └── package.json
└── yarn.lock
```

## Steps

### Init `milvus-insight`

`git submodule update --remote`

### Install packages

`npx lerna bootstrap`

### Run `milvus-insight` server

```bash
cd milvus-insight/express
yarn start:plugin
```

### Modify and run `milvus-insight` client

```bash
cp ./tsconfig.paths.plugin.json ./milvus-insight/client/tsconfig.paths.json
cd milvus-insight/client
yarn start:plugin
```

### Start developing

You can write your plugins now.

Client plugins support fast refresh, and server plugins need rebuild.

### Example

We add an example plugin in `src/example_plugin`, and structure like:

```
src/example_plugin
├── README.md
├── client
│   ├── Icon.tsx      // custom nav icon
│   ├── Index.tsx
│   ├── config.json   // client config
│   └── package.json
└── server
    ├── app.ts
    ├── config.json   // server config
    └── package.json
```

#### Client plugin

```
src/example_plugin/client
├── Icon.tsx
├── Index.tsx
├── config.json
└── package.json
```

Firstly we need to edit `config.json`.

```
$ cat src/example_plugin/client/config.json
{
  "name": "plugin-1",						// Plugin name, should be unique.
  "version": "0.1.0",
  "client": {
    "path": "plugin-1",					// Plugin path, user can access from `<Insight_url>/<client.path>`.
    "entry": "Index.tsx",				// Client file entry, Insight will load it.
    "label": "plugin-label-1",	// Plugin label, will show on left navigation.
    "icon": "Icon.tsx"					// Custom icon entry, will show on left navigation.
    // "iconName": "navSystem"	// Conflict with `client.icon`. Insight will try to load the icon by `client.iconName` from `https://github.com/zilliztech/milvus-insight/blob/main/client/src/components/icons/Icons.tsx`
    // iconActiveClass: "iconActiveClass"
		// iconNormalClass: "iconNormalClass"
  }
}
```

Tips:

1. If either `client.icon` nor `client.iconName` are set, Insight will load a default `navOverview` icon.
2. You can import Insight src by alias name `insight_src`.

#### Server plugin

```
src/example_plugin/server
├── app.ts
├── config.json
└── package.json
```

Firstly we need to edit `config.json`.

```
$ cat src/example_plugin/server/config.json
{
  "name": "plugin-1",					// Plugin name, should be unique.
  "version": "0.1.0",
  "server": {
    "api": "example"					// Plugin server API. Insight will wrap it as `<Insight_url>/api/plugins/<server.api>`. For example, it'll be `localhost:3000/api/plugins/example`.
  }
}
```

Tips:

1. Insight overwirte `app.send` and `app.json`. So any response data will be formatted like this: `{ data:<your_original_data>, statusCode:200 }`.
2. Please catch any errors and send it to insight by `next(err)`.

## Generate plugin package

`npx lerna run build:plugins`

Then all packages will be in `dist/`.

Copy corresponding plugin packages(client or server) to `milvus-insight`.
