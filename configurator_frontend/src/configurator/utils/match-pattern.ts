export function matchPattern(pattern: string, str: string) {
    // Escape special characters in the pattern except for the wildcard *
    const escapedPattern = pattern.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');

    // Replace * with the regex pattern to match any character sequence
    const regexPattern = new RegExp('^' + escapedPattern.replace(/\*/g, '.*') + '$');

    // Test if the string matches the regex pattern
    return regexPattern.test(str);
}

export function matchPatterns(patterns: string[], str: string) {
    return patterns.some(pattern => matchPattern(pattern, str));
}

