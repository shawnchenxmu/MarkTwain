import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'

import './index.scss'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			panelClass: 'md-panel',
			mode: 'split',
			isFullScreen: false,
			result: marked(this.props.content || ''),
			editing: null
		}
	}

	componentDidMount () {
		this.textControl = ReactDOM.findDOMNode(this.refs.editor)
		this.previewControl = ReactDOM.findDOMNode(this.refs.preview)
		console.log(this)
	}

	componentWillUnmount () {
		this.textControl = null
    this.previewControl = null
	}

	render () {
		return (
			<div className="editor">
				<div className="editor-input">
					<textarea ref="editor" name="content" onChange={this.onChange.bind(this)}></textarea>
				</div>
				<div className="editor-preview" ref="preview" dangerouslySetInnerHTML={{ __html: this.state.result }}></div>
			</div>
		)
	}

	onChange (e) {
		if (this._ltr) clearTimeout(this.state.editing)
		this._ltr = setTimeout(() => {
			this.setState({ result: marked(this.textControl.value) })
		})
	}
}