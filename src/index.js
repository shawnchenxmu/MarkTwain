import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from './components/editor'

class App extends Component {
	render() {
		return (
			<Editor />
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))