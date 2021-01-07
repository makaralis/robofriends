import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		// in order to use this we call super
		super(); 
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		//in order to change state 
		this.setState({ searchfield: event.target.value });
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		if (!robots.length) {
			return <h1 className="f1 tc br3 pa3 ma2">Loading...</h1>
		}
		else {
			return (
			<div className="tc">
				<h1 className="f1">RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll> 
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		);
		}
	}
}

export default App;