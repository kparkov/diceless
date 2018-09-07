import NumberUtils from "./NumberUtils";

describe('NumberUtils.numberFormat', () => {
    test('10.645378 should return "10.65"', () => {
        expect(NumberUtils.numberString(10.645378)).toEqual('10.65');
    });

    // This is because node.js does not ship with locale settings - will work in browser.
    test('10.645378 should still return "10.65" with Danish locale set', () => {
        expect(NumberUtils.numberString(10.645378, 'da-DK')).toEqual('10.65');
    });
})

describe('NumberUtils.percentage', () => {
    test('0.167895 should return 16.7895', () => {
        expect(NumberUtils.percentage(0.167895)).toEqual(16.7895);
    });
});

describe('NumberUtils.percentageString', () => {
    test('0.4578123 should return 45.78%', () => {
        expect(NumberUtils.percentageString(0.4578123)).toEqual('45.78%');
    })
});
