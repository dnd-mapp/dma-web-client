# CI/CD

This document elaborates on our CI/CD process.

---

On every PR, the following steps are executed:

1. Formatting is checked via Prettier.
2. Linting is checked via ESLint.
3. The code is compiled.
4. Unit tests are run.

---

After merging a PR to the `main` branch the following steps are executed:

1. A Docker image is created with tags `latest`, and the commit hash.
2. A deployment is done to the E2E testing environment.
3. Once the deployment was successful, E2E tests are run against this environment.
4. After successful completion of the E2E tests another deployment is done the dev environment, which is a live environment which can be used by developers and users to experience the latest changes.

---

Upon triggering the `bump-version` workflow the following steps are executed:

1. The version in the package.json is bumped with the specified bump (`patch`, `minor`, or `major`).
2. A PR is made to change merge the change to the `main` branch.
3. After the PR is merged, git tags are created.
4. Upon creation of the git tags, a Docker image is created with tags `latest`, the commit hash and the version.
5. After the Docker image is created a GitHub release is done, linking the git tags and Docker image. At the same time a deployment is done to the production environment. 

---

## Release flow

When triggering the release pipeline, one should keep in mind what version should be released. When a `alpha` version should be released, the pipeline should be triggered with the following parameters:

```text
prerelease-id:  alpha
version:        premajor | preminor | prepatch
```

The selected version is dependent on what type of changes have been made to the product. Subsequent alpha releases should be triggered with the following parameters:

```text
prerelease-id:  alpha
version:        prerelease
```

When the product is ready to move to `beta`, the pipeline should be triggered with the following parameters:

```text
prerelease-id:  beta
version:        prerelease
```

This will reset the prerelease counter to `0` and replace the prerelease ID with `beta`. Followup prereleases of beta should be handled in a similar fashion as `alpha` prereleases. When the product is ready to move on to release candidates, the pipeline should be triggered with the following parameters:

```text
prerelease-id:  release candidate
version:        prerelease
```

Same as with moving from `alpha` to `beta`, the prerelease counter will be reset and the prerelease ID will be replaced with `rc`. Adding more release candidates also follows the same pattern as with adding prereleases for `alpha` and `beta` versions. When the product is ready to move on to the definitive release, the pipeline should be triggered with the following parameters:

```text
version:    major | minor | patch
```

The selected version here depends on what `pre-` version was selected that started this whole chain. When the chain was started with a `preminor` release, this final release should be a `minor` version.
