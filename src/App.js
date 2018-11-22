import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,InputGroup, InputGroupAddon, Input, Table } from 'reactstrap'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            selectValue: 'Select a State',
            tableData: [],
            value: '',
            searchValue:''
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    api = () => {
        console.log('api clicked')
        let bankAPI = `https://vast-shore-74260.herokuapp.com/banks?city=${this.state.selectValue}`
        console.log(bankAPI, 'API')
        axios.get(bankAPI).then(res=> {
            console.log(res.data);
            this.setState({tableData: res.data})
        });
    }
    handleChange = (e) => {
        console.log('handle clicked')
        this.setState({selectValue:e.target.value},() => this.api());
        console.log(this.state.selectValue,'select value')
    }

    showTable = () => {
        if(this.state.tableData.length !== 0) {
            return(
                <Container>
                    <hr/>
                    <Table>
                        <thead>
                        <tr>
                            <th>IFSC</th>
                            <th>BANK NAME</th>
                            <th>ADDRESS</th>
                            <th>BRANCH</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.tableData.filter(this.tableSearch(this.state.searchValue)).map(function(data, key) {
                            return (
                                <tr key = {key}>
                                    <th>{data.ifsc}</th>
                                    <th>{data.bank_name}</th>
                                    <th>{data.address}</th>
                                    <th>{data.branch}</th>
                                </tr>
                            )
                        })}</tbody>
                    </Table>
                </Container>
            );
        }
    }

    updateInputValue = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    tableSearch = (searchValue) => {
        return(x) => {
            return x.ifsc.toLowerCase().includes(searchValue.toLowerCase()) ||
                x.bank_name.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue;
        }
    }

  render() {
    return (
      <Container>
          <Row>
            <h1>BANK LIST</h1>
          </Row>
          <Row>
              <Col md="3">
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                      <DropdownToggle caret size="sm">
                          {this.state.selectValue}
                      </DropdownToggle>
                      <DropdownMenu onClick={this.handleChange}>
                          <DropdownItem value='MUMBAI'>MUMBAI</DropdownItem>
                          <DropdownItem value='KERALA'>KERALA</DropdownItem>
                          <DropdownItem value='CHENNAI'>CHENNAI</DropdownItem>
                          <DropdownItem value='BANGALORE'>BANGALORE</DropdownItem>
                          <DropdownItem value='HYDERABAD'>HYDERABAD</DropdownItem>
                      </DropdownMenu>
                  </ButtonDropdown>
              </Col>
              <Col md="9">
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
                      <Input placeholder="Enter the IFSC Code" value={this.state.searchValue} onChange={this.updateInputValue}/>
                  </InputGroup>
              </Col>
          </Row>
          <Row>
              {this.showTable()}
          </Row>
      </Container>
    );
  }
}

export default App;
