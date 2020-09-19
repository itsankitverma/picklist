import React, { Component, useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import './Picklist.css'

import Data from './Data.json'
{/*import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom'
*/}

class ItemPage extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            dataOrder: null,
            dataItems: {
                            ic: Data.o.ic,
                            r_qty: Data.o.r_qty,
                            uom: Data.o.uom,
                        },
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
                         cdc: inData.cdc,
                       },
            dataItems:  Data.o,
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
    //    event.preventDefault();    || causing pageload error
       props.callback(input)
    }
    
    return (
      <>
            <div className="container bcol">
             <div className="card-transparent pl-5 ml-5 ">
            <div className="card-body pl-5 ml-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                            <h6> CUSTOMER CODE: </h6> 
                            <input  type="text" 
                                    name="cc"
                                    id="txt" 
                                    placeholder="customer code" 
                                    value={input.cc} 
                                    onChange={setInput} 
                                    required /> 
                            <div className="pt-2"/>
                            <h6 > DIVISION CODE: </h6> 
                            <input  type="text" 
                                    name="cdc"
                                    placeholder="item code" 
                                    value={input.cdc} 
                                    onChange={setInput} 
                                    required />
                    </div>
                    <div className="col-sm">
                        <h6> ITEM CODE: </h6> 
                        <input  type="text" 
                                name="ic"
                                placeholder="division code"  
                                value={input.ic} 
                                onChange={setInput} 
                                required /> 
                                <div className="pt-3"/>
                        <h6> REQUIRED QTY: </h6> 
                        <input  type="text" 
                                name="r_qty"
                                placeholder="required qty"  
                                value={input.r_qty} 
                                onChange={setInput} 
                                required /> 
                                <div className="pt-3"/>
                        <h6> UOM: </h6> 
                        <input  type="text" 
                                name="uom"
                                placeholder="uom"  
                                value={input.uom} 
                                onChange={setInput} 
                                required /> 

                    </div>
                    <div className="col-sm pt-4 float-right ">
                   
                    <button className = "btn btn-primary " 
                    
                    onClick = {()=>{
                    if( input.cc == Data.cc &&
                        input.cdc == Data.cdc ||
                        input.ic == Data['o'][0].ic  ||
                        input.r_qty == Data['o'][0].r_qty ||
                        input.uom == Data['o'][0].uom){
                       
                            handleGenerate()

                   }
                   else{
                       alert('Enter The Required Field')
                   }
            }}
               > 
                                
                            Generate 
                        </button>
                    </div>
                </div>
                </div>
            </div>  
        </div>
        </div>
            </>
        )
}   


const ErrorResponse = (props) => {     
    return( <div className = "col-sm-6" >
                <h6> {props.data} </h6>
            </div>)
}

const OrderHdr = (props) => {
    return (
            <>
                <div className="container bcolheader">
        <div className="card-transparent pl-5 ml-5 ">
          <div className="card-body pl-5 ml-5">
            <div className="row">
              <div className="col-sm">
                <div className="fontsizer">Reference: {props.data.ref} </div>
                <div>Division Code: {props.data.cdc}</div>
                <div>
                  Customer Code: {props.data.cc}
                </div>
              </div>
              <div className="col-sm">
                <input type="text"className="pt-2 fontsize fc" value={props.data.ono} disabled />  
              </div>
              <div className="col-sm">
                <div className="pt-2" />
                <button className="btn btn-primary">Print</button>
              </div>
            </div>
          </div>
        </div>
      </div>
            </>
        // <div className='container bcol'>
        //     <div className='container bcol'>
        //     <div>Order <> {props.data.ono} </> <> {props.data.ot} </> </div>
        //     <div>Reference: <> {props.data.ref} </> </div>
        //     <div>Customer Code: {props.data.cc}</div>
        //     <div>Division Code: {props.data.cdc}</div>
        //     <div>In/Out: {props.data.od}</div>
        //     </div>
        // </div>
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
        <>
        <div class="container bcol">
        <div className="card-transparent pl-5 ml-5 ">
          <div className="card-body pl-5 ml-5">
            <div class="row">
            <i className="fas fa-caret-right"  data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></i>
              <div class="col-sm">
                <div>Item Code: {props.data.ic}</div>
                <div>Alt Item Code: {props.data.aic}</div>
              </div>
              <div class="col-sm ">
                <div className="id">Item Description: {props.data.descr}</div>
                <div className="upc">UPC: {props.data.upc}</div>
              </div>
              <div class="col-sm">
                <div className="pt-2" />
                <div>Required Qty: {props.data.r_qty}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

const PalletList = (props) => {
    const Space = "________";
    return (
        <div className="container bcol">
        <div className="collapse" id="collapseExample">
        <div className="container bcol bt"> 
        <div className="bcol">
        <Table className="tcol table-striped center ">
        <div className=" ">
            <thead >
            <tr>
                <th> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th> 
                <th> Location </th> 
                <th> Plt Sl No </th> 
                <th> Exp Date </th> 
                <th> Avl Qty </th> 
                <th> UoM </th> 
            </tr> 
            </thead> 
            <tbody > 
                {
                    props.data.map( (plt) => {
                        return( 
                            <tr key = {plt.psn}>
                                <td 
                                >{Space}</td> 
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
        </div>
        </div>
        </div>      
    )
}

export default ItemPage;
