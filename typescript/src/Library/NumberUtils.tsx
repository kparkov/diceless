const numberString = (x: number, locale?: string, maxDigits?: number): string => x.toLocaleString('da-DK', { maximumFractionDigits: 2 });
const percentage = (fraction: number): number => fraction * 100;
const percentageString = (fraction: number, locale?: string, maxDigits?: number): string => (numberString(fraction * 100)) + '%';

const result = {
    numberString,
    percentage,
    percentageString
};

export default result;