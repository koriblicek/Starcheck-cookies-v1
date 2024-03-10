import { adjustHue, parseToHsl } from "polished";
import { HslColor } from "polished/lib/types/color";

function HSLToHex(hsl: HslColor): string {
    const { hue: h, saturation: s, lightness: l } = hsl;

    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

        // Convert to Hex and prefix with "0" if required
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export function triadic(color: string) {
    return { primary: color, left: adjustHue(240, color), right: adjustHue(120, color) };
}


function getErrorH(primaryH: number) {
    switch (true) {
        case (primaryH >= 15 && primaryH < 60): //Yellow
            return 5;
            break;
        case (primaryH >= 60 && primaryH < 140): //Green
            return 10;
            break;
        case (primaryH >= 140 && primaryH < 190): //Cyan
            return 357;
            break;
        case (primaryH >= 190 && primaryH < 240): //Blue
            return 0;
            break;
        case (primaryH >= 240 && primaryH < 350): //Purple
            return 355;
            break;
        default:
            return primaryH;
            break;
    }
}
function getErrorS(primaryS: number) {
    switch (true) {
        case (primaryS < 75):
            return 75;
            break;
        case (primaryS > 85):
            return 85;
            break;
        default:
            return primaryS;
            break;
    }
}
function getErrorL(primaryL: number) {
    switch (true) {
        case (primaryL + 5 < 45):
            return 45;
            break;
        case (primaryL + 5 > 55):
            return 55;
            break;
        default:
            return primaryL + 5;
            break;
    }
}

function getSuccessH(primaryH: number) {
    switch (true) {
        case (primaryH < 25 || primaryH >= 335):
            return 120;
            break;
        case (primaryH >= 25 && primaryH < 75):
            return 80;
            break;
        case (primaryH >= 150 && primaryH < 210):
            return 90;
            break;
        case (primaryH >= 210 && primaryH < 285):
            return 100;
            break;
        case (primaryH >= 285 && primaryH < 335):
            return 130;
            break;
        default:
            return primaryH;
            break;
    }
}
function getSuccessS(primaryS: number) {
    switch (true) {
        case (primaryS - 5 < 55):
            return 55;
            break;
        case (primaryS - 5 > 70):
            return 70;
            break;
        default:
            return primaryS - 5;
            break;
    }
}
function getSuccessL(primaryL: number) {
    switch (true) {
        case (primaryL + 5 < 45):
            return 45;
            break;
        case (primaryL + 5 > 60):
            return 60;
            break;
        default:
            return primaryL + 5;
            break;
    }
}

function getWarningH(primaryH: number) {
    switch (true) {
        case (primaryH >= 240 || primaryH < 60): //Red
            return 42;
        case (primaryH >= 60 && primaryH < 140): //Green
            return 40;
        case (primaryH >= 140 && primaryH < 240): //Cyan
            return 38;
        default:
            return primaryH;
    }
}
function getWarningS(primaryS: number) {
    switch (true) {
        case (primaryS + 5 < 80):
            return 80;
        case (primaryS + 5 > 100):
            return 100;
        default:
            return primaryS + 5;
    }
}
function getWarningL(primaryL: number) {
    switch (true) {
        case (primaryL + 15 < 55):
            return 55;
        case (primaryL + 15 > 65):
            return 65;
        default:
            return (primaryL + 15);
    }
}

export function getErrorColor(color: string): string {
    const parsedToHsl = parseToHsl(color);
    const rv = HSLToHex({ hue: getErrorH(parsedToHsl.hue), saturation: getErrorS(parsedToHsl.saturation), lightness: getErrorL(parsedToHsl.lightness) });
    return rv;
}

export function getSuccessColor(color: string): string {
    const parsedToHsl = parseToHsl(color);
    const rv = HSLToHex({ hue: getSuccessH(parsedToHsl.hue), saturation: getSuccessS(parsedToHsl.saturation), lightness: getSuccessL(parsedToHsl.lightness) });
    return rv;
}

export function getWarningColor(color: string): string {
    const parsedToHsl = parseToHsl(color);
    const rv = HSLToHex({ hue: getWarningH(parsedToHsl.hue), saturation: getWarningS(parsedToHsl.saturation), lightness: getWarningL(parsedToHsl.lightness) });
    return rv;
}
