import { Die } from "./Die";

export class Converter {
    public static parseString(representation: string): Die[] {
        const cleaned = representation.replace(/\s/, '');
        const pattern = /\d+[dD]\d+/g;
        const matches = cleaned.match(pattern);
        const result: Die[] = [];
        
        if (matches) {
            for (const match of matches) {
                const splitted = match.split(/[dD]/);
                const [count, sides] = [ parseInt(splitted[0], 10), parseInt(splitted[1], 10) ];
                
                for (let i = 0; i < count; i++) {
                    result.push(new Die(sides));
                }
            }
        }

        return result;
    }
}