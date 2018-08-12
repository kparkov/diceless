# Dice Roller Toolkit

Dice Roller Toolkit is exactly what it sounds like. It's a dice roller with a small toolkit for visualizing the probabilities of rolls. It can be used when dice are not readily available, or if you want more feedback about the statistics of a given roll. For a more in-depth toolkit into just the probabilities, I recommend the excellent [anydice.com](https://anydice.com/) tool.

Dice Roller Toolkit is designed for speed of use. You can write a dice expression such as '2d6+3d8' and press enter. It will immediately roll the dice and add this expression to a quick roll history, so you can repeat that same roll easily.

![screenshot](res/screen.gif)

## Quick start

This project was kickstarted using [create-react-app with TypeScript](https://github.com/Microsoft/TypeScript-React-Starter). You need node installed to run it. To get started in development mode, clone this repository and cd into the directory. Then run:

```shell
npm install
npm start
```

This will expose the dice-roller on port 3000.

### Docker

There is also a dockerfile included. If you have docker installed, you can run:

```shell
npm run build-docker
docker run -it -p 5000:5000 dice-roller
```

This will expose the dice-roller on port 5000.