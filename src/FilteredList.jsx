import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      type: "all",
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  onFilter = (selectedType) => {
    this.setState({ type: selectedType });
  }

  filterItem = (item) => {
    const nameMatch = item.name.toLowerCase().search(this.state.search) !== -1;
    const typeMatch = this.state.type === "all" || item.type === this.state.type;

    if (this.state.type === "Fruit") {
      return nameMatch && typeMatch && item.type === "Fruit";
    }

    if (this.state.type === "Vegetable") {
      return nameMatch && typeMatch && item.type === "Vegetable";
    }

    return nameMatch && typeMatch;
  }

  render() {
    const filteredItems = this.props.items.filter(this.filterItem);

    return (
      <div className="filter-list">
        <h1>Produce Search</h1>

        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={filteredItems} />

        <DropdownButton id="typeDropdown" title={this.state.type === "all" ? "Type" : this.state.type} onSelect={this.onFilter}>
          <Dropdown.Item eventKey="all">All</Dropdown.Item>
          <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item>
          <Dropdown.Item eventKey="Vegetable">Vegetables</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default FilteredList;
