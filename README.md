# react-parallax-map

React component with TypeScript for making parallax effect in React with using parallax maps



## How to install
```
npm i react-dropdown-ui --save
```

## How to import
For TypeScript usage there is a index.d.ts in node_modules folder
```typescript
import {ParallaxMap} from 'react-parallax-map';
```

or

```javascript
var ParallaxMap = require('react-parallax-map');
```

## How to use
```jsx harmony
//Creating a map for layer
let layerData = [
	{
		start: 0,
		end: 1000,
		beginX: 0,
		beginY: 0,
		x: 0,
		y: -400,
		radius: 500,
		direction: true,
		angle: -100,
		step: 0.15
	},
	{
		start: 1000,
		end: 2500,
		beginX: -537,
		beginY: -682,
		x: -2000,
		y: -700,
		radius: 500,
		direction: false,
		angle: -280,
		step: 0.15
	}
	
    <UIParalaxMap
        map={layerData}
        currentScroll={this.state.scrollTop}
        layerClassName="test-layer-bg"
        layerZIndex={0}
    />
];
```

### Specification

* `map`: ParallaxRange[] - map for layer;
* `currentScroll`: number - current window scrollTop position;
* `layerClassName`?: string - other class name for layer;
* `layerZIndex`?: number  - current layer's z-index position;

#### ParallaxRange

* `start`: number - scroll top position when the range must be start
* `end`: number - scroll top position when the range must be finish,
* `beginX`: number - coordinate X start,
* `beginY`: number - coordinate Y start,
* `x`: number - destination coordinate X,
* `y`: number - destination coordinate Y,
* `radius?`: number - radius of turning to the next range,
* `angle?`: number - angle of the radius,
* `direction?`: boolean - direction of the radius,
* `step?`: number - drawing step ratio,


## For development
just use:

+ $ yarn or $ npm i
+ $ gulp

open your browser http://localhost:3000

## For Build

$ ./production
