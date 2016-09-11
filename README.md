# magical-gh-pages
Update your Github pages branch using the info already in your package.json

### Originally from https://github.com/zeke/jus/issues/34
---

I cooked up something similar for my website, but tried to make it slightly more magical:

```json
  "gh-pages": {
    "branch": "master",
    "url": "https://github.com/verifiedmodules/verifiedmodules.github.io"
  },
  "scripts": {
    "start": "jus serve",
    "build": "jus build . dist",
    "deploy": "bash .bin/deploy.sh"
  },
  "homepage": "https://verifiedmodules.github.io",
```

```bash
#!/usr/bin/env bash
# ./bin/deploy.sh
rm -rf dist .gh-pages
jus build . dist
git clone $npm_package_gh_pages_url .gh-pages --branch $npm_package_gh_pages_branch --bare --depth 1
git --git-dir=.gh-pages --work-tree=dist add -A
git --git-dir=.gh-pages --work-tree=dist commit -m deploy
git --git-dir=.gh-pages --work-tree=dist push $npm_package_gh_pages_url $npm_package_gh_pages_branch
opener $npm_package_homepage
```

It's magical because it a) uses package.json to hold the parameters, and b) manages to update the github pages branch without altering the current branch or copying any of the files in the project directory or the `dist` directory. (I may or may not have spent a few mythical man days of my life learning to bend git to my will while building a CI system...)

I was thinking, I could re-write the shell script in Node to remove the Bash dependency. And with some heuristics, I could probably automatically figure out which branch (gh-pages, master, or docs) and repo (either repository.url in package.json, or inferred from homepage in package.json if homepage contains 'github.io'?) to push to, so it could be zero configuration.  Would you be interested in including this? I was thinking of just jus, but come to think of it I could make it a regular npm module. But the gist of it is, I'd like "deploy" to be as drop-dead simple as "serve" and "build". Everyone should be able to publish to gh-pages without complex configuring.
