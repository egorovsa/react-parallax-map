import * as React from 'react';

export interface Point {
	x: number,
	y: number
}

export interface ParallaxRange {
	start: number,
	end: number,
	beginX: number,
	beginY: number,
	x: number,
	y: number,
	radius?: number,
	angle?: number,
	direction?: boolean,
	step?: number,
	linkClass?: string,
	page?: boolean,
	points?: Point[],
}

export interface Props {
	map: ParallaxRange[],
	currentScroll: number
	layerClassName?: string,
	layerZIndex?: number
}

export interface State {
	x: number,
	y: number,
	map: ParallaxRange[]
}

export class ParallaxMap extends React.Component<Props, State> {
	state: State = {
		x: 0,
		y: 0,
		map: []
	};

	static defaultProps = {
		layerClassName: '',
		layerZIndex: 0
	};

	componentDidMount() {
		let map: ParallaxRange[] = this.convertMapForRadius(this.props.map);

		this.setState({
			map: map
		} as State, () => {
			this.calculate();
		});
	}

	componentWillReceiveProps(nexrProps) {
		if (this.props.currentScroll !== nexrProps.currentScroll) {
			this.calculate();
		}
	}

	private getPoints(radius: number, direction: boolean, angle: number, step: number): Point[] {
		let exit: Point[] = [];
		let circlePoints: Point[] = [];
		let directedPoints: Point[] = [];
		let k = angle;

		for (let i = 0; i <= radius; i++) {
			k = k + step;

			circlePoints.push({
				x: Math.cos(k * Math.PI / 180) * radius,
				y: Math.sin(k * Math.PI / 180) * radius,
			});
		}

		if (direction === true) {
			for (let i = radius; i > 0; i--) {
				directedPoints.push(circlePoints[i])
			}
		} else {
			directedPoints = circlePoints;
		}

		let ratio: Point = {
			x: directedPoints[0].x,
			y: directedPoints[0].y,
		};

		for (let i = 0; i < radius; i++) {
			exit.push({
				x: directedPoints[i].x - ratio.x,
				y: directedPoints[i].y - ratio.y,
			})
		}

		return exit;
	}

	private convertMapForRadius(map): ParallaxRange[] {
		return map.map((mapItem) => {
			if (mapItem.hasOwnProperty('radius') && mapItem.radius > 0) {
				return {
					...mapItem, ...{
						points: this.getPoints(mapItem.radius, mapItem.direction, mapItem.angle, mapItem.step)
					}
				};
			} else {
				return {
					...mapItem, ...{
						points: []
					}
				};
			}
		});
	};

	private calculate() {
		this.state.map.map((itemMap) => {
			if (itemMap.start <= this.props.currentScroll && itemMap.end >= this.props.currentScroll) {

				let scrollArea: number = itemMap.end - itemMap.start - itemMap.radius;
				let xArea: number = itemMap.x - itemMap.beginX;
				let yArea: number = itemMap.y - itemMap.beginY;
				let howScroll = this.props.currentScroll - itemMap.start; // How much pixels are scrolled for this range 

				if (howScroll >= scrollArea) {
					let index = (howScroll - scrollArea).toFixed(0);

					if (itemMap.points[index]) {
						let goxRadius: number = itemMap.points[index].x + itemMap.x;
						let goyRadius: number = itemMap.points[index].y + itemMap.y;

						this.setState({
							x: goxRadius,
							y: goyRadius
						} as State);
					}

				} else {
					let gox: number = 0;
					let goy: number = 0;

					if (scrollArea > xArea) {
						gox = itemMap.beginX + howScroll / (scrollArea / xArea);
						goy = itemMap.beginY + howScroll / (scrollArea / yArea);
					} else {
						gox = itemMap.beginX + howScroll * (xArea / scrollArea);
						goy = itemMap.beginY + howScroll * (yArea / scrollArea);
					}

					this.setState({
						x: gox,
						y: goy
					} as State);
				}
			}
		});
	}

	public render() {
		return (
			<div style={{
				position: 'fixed',
				left: '0px',
				top: '0px',
				bottom: '0px',
				right: '0px',
				overflow: 'hidden',
				zIndex: this.props.layerZIndex
			}}>
				<div
					style={{transform: `translate(${this.state.x}px,${this.state.y}px)`}}
					className={this.props.layerClassName}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}