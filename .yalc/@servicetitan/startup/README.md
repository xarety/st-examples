# @servicetitan/startup

## Run Locally

### Initial Setup

1. Globally install the `yalc` package

```
$ npm i yalc -g
```

2. Build the `uikit` packages

```
$ cd <path-to-uikit>
$ npm run build
```

3. Run `yalc publish` in the `startup` package folder

```
$ cd .\packages\startup\
$ yalc publish
```

4. Run `yalc add @servicetitan/startup` in your dependent project, which will use the current version of the startup package

```
$ cd <path-to-your-project>
$ yalc add @servicetitan/startup
```

5. Update your dependencies

```
$ npm run bootstrap
```

### Fetch Changes

1. Build the `uikit` packages

```
$ cd <path-to-uikit>
$ npm run build
```

2. Run `yalc push` in the `startup` package folder

```
$ cd .\packages\startup\
$ yalc push
```

3. Update your dependencies

```
$ cd <path-to-your-project>
$ npm run bootstrap
```
