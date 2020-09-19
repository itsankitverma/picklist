import React, { Component, useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Data from './Data.json'
import './Print.css'


class Print extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            dataOrder: null,
            dataItems: null,
            errString: "",
            show:false
        }
    }

    processInput = (inputs) => {
        // Call REST API here.        
        var inData = require('./Data.json')
        this.setState({ 
            dataOrder: { ono: inData.ono,
                         ot:  inData.ot,
                         ref: inData.ref,
                         od:  inData.od,
                         cc:  inData.cc,
                         cdc: inData.cdc 
                       },
            dataItems: inData.o,
            errString: "",
            show: true
        });
    }
   

    
    renderSupport() {
        if (this.state.show) {
            if (!this.state.errString || this.state.errString.length === 0) {
                const itemDiv = this.state.dataItems.map( (item) => {
                                    return <Item data={item} ></Item>
                                })
                return (
                    <div>
                        <OrderHdr data={this.state.dataOrder}> </OrderHdr> 
                        {itemDiv}
                    </div>
                )
            } else {
                return(<ErrorResponse data={this.state.errString}> </ErrorResponse>)
            }
        }      
    }
    
    
    render() {
        window.onload = function() { window.print(); }
        return ( 
            <div>
                
            <OrderInput callback= {this.processInput.bind(this)}> </OrderInput> 
              {this.renderSupport()}
            </div>
          )
    }
}

const useGatherInputs = () => {
  const [input, setInput] = useState({})

  const handleInputs = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  return [input, handleInputs]
}
   
const OrderInput = (props) => {
    const [input, setInput] = useGatherInputs()
    
    function handleGenerate(event) {
       event.preventDefault();
       props.callback(input)
    }
    
    return (
            <div className = "" >
                
                <br />
                <div className = "row d-flex justify-content-center" >
                        <button className = "btn btn-primary"
                                onClick = {handleGenerate}> 
                            Print 
                        </button> 
                    </div >
                </div>
           
        )
}   


const ErrorResponse = (props) => {     
    return( <div className = "col-sm-6" >
                <h6> {props.data} </h6>
            </div>)
}

const OrderHdr = (props) => {
    const Printer = () => {
        window.print();
    }
    return (
        <>
        <div className="container ">
                <div className="row">
                    <div className="col-sm fz">
                    ST CLOUD GOLD STORAGE, LLC<br/>
                    519 - 29TH AVENUE SOUTH<br/>
                    WAITE PARK, MN 56387
                    </div>
                    <div className="col-sm">
                  
                    </div>
                    <div className="col-sm mr-auto float-right ordrit">
                    Order Number : {props.data.ono}<br/>
                    Order Date : {new Date().toLocaleDateString()}<br/>
                    Page : {}
                    </div>
              </div>
                    <button className="float-right" onClick={Printer}>Print</button>
            </div>
            {/* <div>Order <> {props.data.ono} </> <> {props.data.ot} </> </div>
            <div>Reference: <> {props.data.ref} </> </div>
            <div>Customer Code: {props.data.cc}</div>
            <div>Division Code: {props.data.cdc}</div>
            <div>In/Out: {props.data.od}</div> */}

        </>
    )
}
              
class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:true
        }
    }
   
    render() {
        var hdrData = { ic:this.props.data.ic, aic:this.props.data.aic, descr:this.props.data.descr, 
                    r_qty:this.props.data.r_qty, upc:this.props.data.upc }
        
        return (
            <div>
            <ItemHdr data={hdrData}></ItemHdr>
            <PalletList data={this.props.data.l}></PalletList>
            </div>
        )
    }
}
                
const ItemHdr = (props) => {
    const displayUPC = () => {
        if(props.data.upc) {
            return <div> UPC: {props.data.upc} </div>
        }
    }
    return (
        <div>
            {/* <div> Item Code: {props.data.ic} </div>
            <div> Alt Item Code: {props.data.aic} </div>
            <div> {props.data.descr} </div>
            <displayUPC />
            <div> Required Qty: {props.data.r_qty} </div>
            <div> Uom: {props.data.uom} </div> */}
            <br/>
            <div className="container">
                <div className="row ">
                    <div className="col-sm">
                    </div>
                    <div className="col-sm ptupc">
                    PICKING TICKET<br/>
                    {props.data.descr}<br/>
                    UPC : {props.data.upc}
                    <br/><br/> 
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
                </div> <br/>
                <div className="">
                <Table striped bordered hover className="card center fontT center">
                    <div >
                    <thead>
                        <tr className="fonts ">
                        <th scope="col">ITEM CODE</th>
                        <th scope="col">REQ QTY</th>
                        <th scope="col">AIC</th>
                        </tr>
                    </thead>
                    <tbody className="fontb ">
                       {Data.o.map( (ihr) => {
                        return( 
                            <tr key={ihr.ic}>
                                <td> {ihr.ic} </td> 
                                <td> {ihr.r_qty} </td> 
                                <td> {ihr.uom} </td> 
                            </tr>
                        )
                    })}
                    </tbody>
                    </div>
                </Table>
                </div>
                <br/><br/>
                </div>
       
    )
}

const PalletList = (props) => {
    return (
        
        <div className="palletmargin">
        <Table striped bordered hover className="center">
        <div className=" ">
            <thead >
            <tr>
                        <th scope=""></th>
                        <th scope="">Pkd Qty</th>
                        <th scope="">Location</th>
                        <th scope="">Plt Sl No </th>
                        <th scope="">Exp Date</th>
                        <th scope="">Avl Qty</th>
                        <th scope="">UOM</th>
            </tr> 
            </thead> 
            <tbody > 
                {
                    props.data.map( (plt) => {
                        return( 
                            <tr key = {plt.psn} >
                                <td> __________ </td> 
                                <td> __________ </td> 
                                <td> {plt.loc} </td> 
                                <td> {plt.psn} </td> 
                                <td> {plt.exp} </td> 
                                <td> {plt.aq}  </td> 
                                <td> {plt.uom} </td> 
                            </tr>
                        )
                    })
                }
            </tbody>
            </div>
        </Table>    
        </div>  
    )
}

export default Print;
