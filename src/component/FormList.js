import React from 'react';

class FormList extends React.Component {
  render() {
    return <div className="col-md-6 offset-md-3">
      {this.props.list.map((item, index) => {
        return <div key={index} className="row mt-4">
          <div className={this.props.isPreview ? "offset-md-1 col-md-10" : "col-md-10"}>
            <input type={item} className="form-control"/>
          </div>
          <div className="col-md-2">
            {this.props.isPreview ? '' : <button id={'delete' + index} className="btn btn-danger" onClick={() => this.props.deleteList(index)}>X</button>}
          </div>
        </div>
      })}
    </div>
  }
}

export default FormList

