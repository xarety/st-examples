import semver from 'semver';

export function isCompatible(hostVersion: string, packageVersion: string) {
    if (hostVersion === packageVersion) {
        return true;
    }

    if (hostVersion === '*') {
        return false;
    }

    if (packageVersion === '*') {
        return true;
    }

    // host and package have exact non-equal versions
    if (semver.valid(hostVersion) && semver.valid(packageVersion)) {
        return false;
    }

    // exact package version couldn't be compatible with host range
    if (semver.validRange(hostVersion) && semver.valid(packageVersion)) {
        return false;
    }

    // exact host version must be in package range
    if (semver.valid(hostVersion) && semver.validRange(packageVersion)) {
        return semver.satisfies(hostVersion, packageVersion);
    }

    // host range must be fully included in package range
    if (semver.validRange(hostVersion) && semver.validRange(packageVersion)) {
        return semver.subset(hostVersion, packageVersion);
    }

    return false;
}
