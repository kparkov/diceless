export interface IPermutationCount { 
    value: number, 
    permutations: number,
    atLeast: number,
    atMost: number,
};

export default class Distribution {
    private _sides: number[] = [];
    private _permutationCounts: IPermutationCount[] = [];
    private _permutations: number = 0;

    constructor(sides: number[]) {
        this._sides = sides;

        if (this._sides.length > 0) {
            this._permutationCounts = this.generateDistribution();
        }
    }

    public permutationCountsOf(value: number): IPermutationCount {
        const result = this._permutationCounts.filter(x => x.value === value);

        if (result.length === 1) {
            return result[0];
        }

        return { value, permutations: 0, atLeast: 0, atMost: 0 };
    }

    public permutationCounts(): IPermutationCount[] {
        return this._permutationCounts.slice().sort((a, b) => a.value - b.value);
    }

    public permutations(): number {
        return this._permutations;
    }

    public percentage(combinationCount: number): number {
        return combinationCount / this._permutations;
    }

    private generateDistribution(): IPermutationCount[] {
        const base: IPermutationCount[] = [{ value: 0, permutations: 1, atLeast: 1, atMost: 1 }];
        // const minValue: number = this._sides.length;
        // const maxValue: number = this._sides.reduce((p, c) => p + c);
        this._permutations = this._sides.reduce((p, c) => p * c);

        let cumulativeDistribution: IPermutationCount[] = base;

        for (const sides of this._sides) {
            const currentDistribution: IPermutationCount[] = [];

            const cumulativeMinValue: number = cumulativeDistribution.reduce((p, c) => p.value < c.value ? p : c).value;
            const lengthOfCumulative: number = cumulativeDistribution.length;
            let runningOccurences: number = 0;

            for (let i = cumulativeMinValue + 1; i < cumulativeMinValue + lengthOfCumulative + sides; i++) {
                const firstValueFromCumulative = i - sides;
                const lastValueFromCumulative = i - 1;

                const sliceOfCumulativeDistribution = cumulativeDistribution.filter(item => item.value >= firstValueFromCumulative && item.value <= lastValueFromCumulative);
                const sumOfSlice = sliceOfCumulativeDistribution.map(x => x.permutations).reduce((p, c) => p + c);

                currentDistribution.push({ value: i, permutations: sumOfSlice, atLeast: this._permutations - runningOccurences, atMost: runningOccurences + sumOfSlice });
                runningOccurences += sumOfSlice;
            }

            cumulativeDistribution = currentDistribution;
        }

        return cumulativeDistribution;
    }
}