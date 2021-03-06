import React from 'react';
import './App.css'

class App extends React.Component {
  render(){
    return (
      <div>
        <Markdown/>
        <hr/>
        <Fileuploader/>
      </div>
    )
  }
}

class Markdown extends React.Component {
  constructor() {
    super()
    this.state = {
      input: 'Input your markdown text',
      output: '',
      err: ''
    }
    this.converter = new window.showdown.Converter()
  }
  update(e){
    let code = e.target.value
    try {
      this.setState({
        output: this.converter.makeHtml(code),
        err: ''
      })
    }
    catch(err){
      this.setState({err: err.message})
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <figure className="row header">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <img src="https://s3-us-west-2.amazonaws.com/static-assets.kloudless.com/static/logo_white.png" width="100%" alt="logo"/>
          </div>
        </figure>
        <header className="row">
            <span className="alert alert-warning col-xs-12 col-sm-12 col-md-12 col-lg-12">{this.state.err}</span>
        </header>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <h2 className="h2">markdown code</h2>
            <textarea
            className="form-control"
            onChange={this.update.bind(this)}
            defaultValue={this.state.input}/>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <h2 className="h2">rendered output</h2>
            <aside className="sandbox" dangerouslySetInnerHTML={{__html: this.state.output}}></aside>
          </div>
        </div>
      </div>
    )
  }
}

class Fileuploader extends React.Component{
  constructor () {
    super()

    this.success = (files) => {
      this.setState({ files: JSON.stringify(files) })
    }
  }

  componentDidMount() {
    this.explorer = new window.Kloudless.explorer({
      app_id: 'X9oaWHtuldy9Joik3mmv3gnGafF6fsQQAyTwVKo1R11CKl2B',
      multiselect: false,
      computer: true,
      services: ['all'],
      types: ['all']
    });

    this.explorer.on('success', this.success.bind(this))
    this.explorer.on('startFileUpload', ()=>{

    })

    this.explorer.choosify(document.getElementById('chooser'))
  }

  render() {
    return (
      <figure className="container-fluid">
        <div className="row">
          <div className="col-xs-6">
            <button className="btn btn-primary" id="chooser">Choose file!</button>
            <button onClick={this.save} className="btn btn-primary" id="saver">Save file!</button>
          </div>
        </div>
      </figure>
      )
    }
}

export default App
