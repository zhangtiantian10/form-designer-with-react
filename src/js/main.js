class FormEditor extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(event) {
    let index = $(event.currentTarget).data("item-index");
    this.props.removeFormItem(index);
  }

  addItem(item) {
    this.props.addItem(item)
  }

  render() {
    return (<div>
      <div>
        <ul>
          {this.props.items.map((item, index) => {
            return (<li>
              <input type={item.type} />
              <button class="btn btn-default btn-sm" onClick={this.removeItem} data-item-index={index} >
                -
              </button>
            </li>)
          })}
        </ul>

        <DialogButton addItem={this.addItem}/>
      </div>
    </div>);
  }
}

class FormPreviewer extends React.Component {
  render() {
    return (<div>
      <div>
        <ul>
          {this.props.items.map(item => (<li><input type={item.type} /> </li>))}
        </ul>
      </div>
    </div>);
  }
}

class DialogButton extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog(e) {
    e.preventDefault();

    let _this = this;

    let $dialog = $('<div>').dialog({
      title: 'Choose Type',
      width: 400,
      close: (e) => {
        ReactDOM.unmountComponentAtNode(e.target);
        $(e.target).remove();
      }
    });

    let closeDialog = (e) => {
      e.preventDefault();
      $dialog.dialog('close');
    }

    ReactDOM.render(<DialogContent closeDialog={closeDialog} submitHandler={this.props.addItem}/>, $dialog[0])
  }

  render() {
    return (<button className="btn btn-default btn-sm" onClick={this.openDialog}>
      +
    </button>);
  }

}

class DialogContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type:"date"
    }

    this.onTypeChange = this.onTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTypeChange(e) {
    this.setState({
      type: e.currentTarget.value
    });
  }

  onSubmit() {
    this.props.submitHandler(this.state)
  }

  render() {
    return (<div>
      <input type="radio" name="dialogType" checked={this.state.type==="date"} onChange={this.onTypeChange} value="date" />date<br />
      <input type="radio" name="dialogType" checked={this.state.type==="text"} onChange={this.onTypeChange} value="text" />text<br />
      <button onClick={this.onSubmit}>Submit</button>
      <button onClick={this.props.closeDialog}>Cancel</button>
      </div>)
  }
}


class MyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "edit",
      items: []
    }
    this.addFormItem = this.addFormItem.bind(this);
    this.removeFormItem = this.removeFormItem.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  renderEditor() {
    this.setState({status: 'edit'});
  }

  renderPreview() {
    this.setState({status: 'preview'});
  }

  removeFormItem(index) {
    let items = this.state.items;
    _.remove(items, (item, i) => i === index);
    this.setState({items});
  }

  addFormItem(item) {
    this.setState({
      items: [...this.state.items, item]
    });
  }

  render() {
    if (this.state.status === 'edit') {
      return (<div>
        <button className="btn btn-default btn-sm" onClick={this.renderPreview}>
          preview
        </button>
        <FormEditor items={this.state.items}
          removeFormItem={this.removeFormItem}
          addItem={this.addFormItem}/>
      </div>);
    }

    return (<div>
      <button className="btn btn-default btn-sm" onClick={this.renderEditor}>
        edit
      </button>
      <FormPreviewer items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<MyContainer/>, document.getElementById('container'));
