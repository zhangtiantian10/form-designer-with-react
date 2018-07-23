import React, { Component } from 'react';
import FormList from './FormList'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isPreview: false
    }
  }

  deleteList(index) {
    const {list} = this.state;

    list.splice(index, 1);

    this.setState({
      list: list
    });
  }

  addList = () => {
    const text = this.refs.text
    const date = this.refs.date
    let item = ''
    const {list} = this.state

    if (text.checked) {
      item = text.value;
    } else if (date.checked) {
      item = date.value;
    }

    if (item) {
      list.push(item)
    }

    this.setState({
      list: list
    });
  }

  changePreview = () => {
    this.setState({
      isPreview: !this.state.isPreview
    })
  }

  render() {
    const {isPreview, list} = this.state
    console.log(list)
    return (
      <div>
        <div className="center">
          <button className="btn btn-primary" onClick={this.changePreview}>{isPreview ? 'Edit' : 'Preview'}</button>
          <button className={isPreview ? "hidden-button" : "btn btn-primary add-button"} data-toggle="modal" data-target="#selectModal">+</button>
        </div>

        <div className="modal fade" id="selectModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Select Field Type</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="inputType" id="textInput" value="text" ref="text"/>
                    <label className="form-check-label" htmlFor="textInput">
                      Text Input
                    </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="inputType" id="datePicker" value="date" ref="date"/>
                    <label className="form-check-label" htmlFor="textInput">
                      Date Picker
                    </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.addList}>Add</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <FormList isPreview={isPreview} list={list} deleteList={(index) => this.deleteList(index)}/>
      </div>
    );
  }
}

export default App;
