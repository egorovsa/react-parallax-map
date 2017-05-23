import * as React from 'react';
import {ParallaxMap} from "../ui/react-parallax-map";

export interface Props {

}

export interface State {
	scrollTop: number
}

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
	}, {
		start: 2500,
		end: 3800,
		beginX: -2538,
		beginY: -981,
		x: -1800,
		y: -2500,
		radius: 500,
		direction: false,
		angle: -180,
		step: 0.15
	}, {
		start: 3800,
		end: 5200,
		beginX: -1429,
		beginY: -2981,
		x: -300,
		y: -2600,
		radius: 0
	}
];

let layerTest = [
	{start: 0, end: 100, beginX: 0, x: 0, beginY: 0, y: 0, radius: 0},
	{start: 100, end: 1000, beginX: 0, x: -3500, beginY: 0, y: -3500, radius: 0,},
	{start: 1000, end: 1300, beginX: -3500, x: -3500, beginY: -3500, y: -3500, radius: 0},
	{start: 1300, end: 2500, beginX: -3500, x: -6000, beginY: -3500, y: -6000, radius: 0},
	{start: 2500, end: 2800, beginX: -6000, x: -6000, beginY: -6000, y: -6000, radius: 0},
	{start: 2800, end: 3500, beginX: -6000, x: -9000, beginY: -6000, y: -3000, radius: 0},
	{start: 3500, end: 3800, beginX: -9000, x: -9000, beginY: -3000, y: -3000, radius: 0},
	{start: 3800, end: 4200, beginX: -9000, x: -9500, beginY: -3000, y: -6000, radius: 0},
	{start: 4200, end: 4500, beginX: -9500, x: -9500, beginY: -6000, y: -6000, radius: 0},
	{start: 4500, end: 5000, beginX: -9500, x: -11500, beginY: -6000, y: -9000, radius: 0},
	{start: 5200, end: 5500, beginX: -11500, x: -11500, beginY: -9000, y: -9000, radius: 0},
];


export class AppComponent extends React.Component<Props, State> {
	state: State = {
		scrollTop: 0
	};

	componentDidMount() {
		window.addEventListener('scroll', this.scrollHandler);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollHandler);
	}


	private scrollHandler = (e) => {
		this.setState({
			scrollTop: window.scrollY
		} as State)
	};

	public render() {
		return (
			<div>
				<ParallaxMap
					map={layerData}
					currentScroll={this.state.scrollTop}
					layerClassName="test-layer-bg"
					layerZIndex={0}
				/>

				<ParallaxMap
					map={layerTest}
					currentScroll={this.state.scrollTop}
					layerClassName="test-layer"
					layerZIndex={1}
				>
					<div style={{left: '50px', top: '50px'}} className="test-layer-blocks">
						<div className="content">
							<h1>REACT PARALLAX MAP</h1>
							<p> React component with TypeScript for making parallax effect in React with using parallax maps</p>
						</div>
					</div>

					<div style={{left: '3550px', top: '3550px'}} className="test-layer-blocks">
						<div className="content">
							<h1>How to install</h1>
							<p>

							</p>
						</div>
					</div>
				</ParallaxMap>

			</div>
		);
	}
}