import replacementsConfig from "../config.json";

const replacements = replacementsConfig.replacements;

const cyrillicToAsciiMap = new Map();
const cyrillicChars = [];

replacements.forEach((replacement) => {
    cyrillicToAsciiMap.set(replacement.cyrillic, replacement.ascii);
    cyrillicChars.push(replacement.cyrillic);
});

const cyrillicPattern = new RegExp(`[${cyrillicChars.map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`).join("")}]`, "g");

const formatToUnicode = (char) => {
    return `U+${char.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()}`;
};

const findCyrillicCharacters = (text) => {
    const matches = [];
    let match;

    while ((match = cyrillicPattern.exec(text)) !== null) {
        matches.push({
            index: match.index,
            character: match[0],
            replacement: cyrillicToAsciiMap.get(match[0])
        });
    }

    return matches;
};

const handleNode = (node, context, where) => {
    const matches = findCyrillicCharacters(node.name);

    if (matches.length > 0) {
        matches.forEach((match) => {
            const character = match.character;
            const characterCode = formatToUnicode(character);

            const replacement = match.replacement;
            const replacementCode = formatToUnicode(replacement);

            context.report({
                node: node,
                message: `Found cyrillic character "${character}" (${characterCode}) in ${where}, replace with "${replacement}" (${replacementCode})`,
                loc: {
                    start: {
                        line: node.loc.start.line,
                        column: node.loc.start.column + match.index
                    },
                    end: {
                        line: node.loc.start.line,
                        column: node.loc.start.column + match.index + 1
                    }
                },
                fix: (fixer) => {
                    const start = node.range[0] + match.index;
                    const end = start + 1;

                    return fixer.replaceTextRange([start, end], replacement);
                }
            });
        });
    }
};

export default {
    meta: {
        type: "problem",
        docs: {
            description: "Replace cyrillic characters with their visual ASCII equivalents",
        },
        fixable: "code",
        schema: []
    },
    create: (context) => {
        return {
            Identifier(node) {
                handleNode(node, context, "identifier");
            },
            JSXIdentifier(node) {
                handleNode(node, context, "JSX identifier");
            }
        };
    }
};