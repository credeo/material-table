import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, DatePicker, DateTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

class MTableEditField extends React.Component {
  getProps() {
    const { columnDef, rowData, onRowDataChange,  ...props } = this.props;
    return props;
  }

  renderLookupField() {
    return (
      <Select
        {...this.getProps()}
        value={this.props.value === undefined ? '' : this.props.value}
        onChange={event => this.props.onChange(event.target.value)}
        style={{
          fontSize: 13,
        }}
      >
        {Object.keys(this.props.columnDef.lookup).map(key => (
          <MenuItem key={key} value={key}>{this.props.columnDef.lookup[key]}</MenuItem>)
        )}
      </Select>
    );

  }

  renderBooleanField() {
    return (
      <Checkbox
        {...this.getProps()}
        value={String(this.props.value)}
        checked={Boolean(this.props.value)}
        onChange={event => this.props.onChange(event.target.checked)}
        style={{
          paddingLeft: 0,
          paddingTop: 0,
          paddingBottom: 0
        }}
      />
    );
  }

  renderDateField() {
    return (
        <DatePicker
          {...this.getProps()}
          format="dd.MM.yyyy"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          cancelLabel={"Abbrechen"}
          showTodayButton={true}
          todayLabel={"Heute"}
          clearLabel={"Löschen"}
          okLabel={"Übernehmen"}
          ampm={false}
          InputProps={{
            style: {
              fontSize: 13,
            }
          }}
        />
    );
  }

  renderTimeField() {
    return (
        <TimePicker
          {...this.getProps()}
          format="HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          cancelLabel={"Abbrechen"}
          showTodayButton={true}
          todayLabel={"Heute"}
          clearLabel={"Löschen"}
          okLabel={"Übernehmen"}
          ampm={false}
          InputProps={{
            style: {
              fontSize: 13,
            }
          }}
        />
    );
  }

  renderDateTimeField() {
    return (
        <DateTimePicker
          {...this.getProps()}
          format="DD.MM.YYYY HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          cancelLabel={"Abbrechen"}
          showTodayButton={true}
          todayLabel={"Heute"}
          clearLabel={"Löschen"}
          okLabel={"Übernehmen"}
          ampm={false}
          InputProps={{
            style: {
              fontSize: 13,
            }
          }}
        />
    );
  }

  renderTextField() {

    return (
      <TextField
        {...this.getProps()}
        style={this.props.columnDef.type === 'numeric' ? { float: 'right' } : {}}
        type={this.props.columnDef.type === 'numeric' ? 'number' : 'text'}
        placeholder={this.props.columnDef.title}
        value={this.props.value === undefined ? '' : this.props.value}
        onChange={event => this.props.onChange(event.target.value)}
        multiline
        required={true}
        rowsMax={3}
        InputProps={{
          style: {
            fontSize: 13,
          }
        }}
      />
    );
  }

  renderCurrencyField() {
    return "ok";
  }

  render() {
    let component = "ok";

    if (this.props.columnDef.lookup) {
      component = this.renderLookupField();
    }
    else if (this.props.columnDef.type === "boolean") {
      component = this.renderBooleanField();
    }
    else if (this.props.columnDef.type === "date") {
      component = this.renderDateField();
    }
    else if (this.props.columnDef.type === "time") {
      component = this.renderTimeField();
    }
    else if (this.props.columnDef.type === "datetime") {
      component = this.renderDateTimeField();
    }
    else if (this.props.columnDef.type === "currency") {
      component = this.renderCurrencyField();
    }
    else {
      component = this.renderTextField();
    }

    return component;

  }
}

MTableEditField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  columnDef: PropTypes.object.isRequired
};

export default MTableEditField;
