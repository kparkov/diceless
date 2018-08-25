# Diceless

Diceless is a dice roller with a small toolkit for visualizing the probabilities of rolls. It is what powers [diceless.io](http://diceless.io/). It can be used when dice are not readily available, or if you want more feedback about the statistics of a given roll. For a more in-depth toolkit into _just the probability distributions_, I recommend the excellent tool at [anydice.com](https://anydice.com/).

Diceless is designed for speed of use. You can write a dice expression such as '2d6+3d8+4' and press enter. It will immediately roll the dice and add this expression to a quick roll history, so you can repeat that same roll easily.

![screenshot](res/screen.gif)

## Features

- Write a dice expression and roll it pressing enter.
- Previous expressions are shown as buttons for quick re-rolling.
- See quick stats about the roll: sum, average, highest, lowest, probability (at most, at least).
- See the detailed distribution graph for exactly this roll, at most and at least.
- Everything happens on the client; there is no backend. Collaborative features might change that in the future.

## Install

### Requirements

- Node.js (was developed using v8.11.3)

### Run in development mode

To get started in development mode, clone this repository and cd into the directory. Then run:

```shell
npm install
npm start
```

This will expose the dice-roller on port 3000. It should automatically open in a new browser tab.

### Tests

If you want to run the test, you can do so by running (after running install):

```shell
npm test
```

### Docker

There is also a dockerfile included. If you have [docker installed](https://docs.docker.com/install/), you can run:

```shell
npm run build-docker
docker run -it -p 5000:5000 dice-roller
```

This will expose the dice-roller on port 5000. Navigate to http://localhost:5000/ to see it.

## Possible improvements

- Complex logic (for example, roll 4d6 and discard the lowest)
- Special dice (Fate dice, dice with symbols, repeated sides, etc.)
- Shared session of dice rolling.
- Mobile version.

## Roadmap

This is mainly a hobby project, and I have no idea whether it has any appeal to gamers, who generally appreciate the tactile experience of rolling actual dice. I thought it would be interesting to make, especially as I wanted to try out developing React with TypeScript.

If it matures to a state I consider useful enough, I will publish it to a public domain.

I only have the time to keep the development at low intensity. To speed up development and elevate the ambitions of the project, it would require collaborators.

## Contributions

I accept pull requests after review, and the review will require that:

- The TS lint configuration is respected.
- Non-components / library classes are unit tested. I haven't quite figured out how to effectively unit test React components.