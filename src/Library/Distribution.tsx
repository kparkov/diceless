interface ICombinationCount { 
    value: number, 
    combinations: number,
    atLeast: number,
    atMost: number,
};

export default class Distribution {
    private _sides: number[] = [];
    private _combinationCounts: ICombinationCount[] = [];
    private _combinations: number = 0;

    constructor(sides: number[]) {
        this._sides = sides;

        if (this._sides.length > 0) {
            this._combinationCounts = this.generateDistribution();
        }
    }

    public combinationCountsOf(value: number): number {
        const result = this._combinationCounts.filter(x => x.value === value);

        if (result.length === 1) {
            return result[0].combinations;
        }

        return 0;
    }

    public combinationCounts(): ICombinationCount[] {
        return this._combinationCounts.slice().sort((a, b) => a.value - b.value);
    }

    public combinations(): number {
        return this._combinations;
    }

    public percentage(combinationCount: number): number {
        return Math.round((combinationCount / this._combinations) * 10000) / 10000;
    }

    private generateDistribution(): ICombinationCount[] {
        const base: ICombinationCount[] = [{ value: 0, combinations: 1, atLeast: 1, atMost: 1 }];
        // const minValue: number = this._sides.length;
        // const maxValue: number = this._sides.reduce((p, c) => p + c);
        this._combinations = this._sides.reduce((p, c) => p * c);

        let cumulativeDistribution: ICombinationCount[] = base;

        for (const sides of this._sides) {
            const currentDistribution: ICombinationCount[] = [];

            const cumulativeMinValue: number = cumulativeDistribution.reduce((p, c) => p.value < c.value ? p : c).value;
            const lengthOfCumulative: number = cumulativeDistribution.length;
            let runningOccurences: number = 0;

            for (let i = cumulativeMinValue + 1; i < cumulativeMinValue + lengthOfCumulative + sides; i++) {
                const firstValueFromCumulative = i - sides;
                const lastValueFromCumulative = i - 1;

                const sliceOfCumulativeDistribution = cumulativeDistribution.filter(item => item.value >= firstValueFromCumulative && item.value <= lastValueFromCumulative);
                const sumOfSlice = sliceOfCumulativeDistribution.map(x => x.combinations).reduce((p, c) => p + c);

                currentDistribution.push({ value: i, combinations: sumOfSlice, atLeast: this._combinations - runningOccurences, atMost: runningOccurences + sumOfSlice });
                runningOccurences += sumOfSlice;
            }

            cumulativeDistribution = currentDistribution;
        }

        return cumulativeDistribution;
    }
}