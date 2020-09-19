import React, { Component, useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import "./Picklist.css";
import Print from './Print';
import Data from './DataO.json'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import "./OrderEdit.css"

class OrderEdit extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            dataOrder: null,
            dataItems: null,
            errString: "",
            show:false,
            ono:'',
        }
    }
    

    processInput = (inputs) => {
        // Call REST API here.        
        var inData = require('./DataO.json')
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
   
    PrintUnit(order){
        this.setState({ono:order})
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
        props.callback(input)
    //    event.preventDefault();     || causing error
    }



    
    return (
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
                               name="ono"
                               placeholder="item code" 
                               value={input.ono} 
                               onChange={setInput} 
                               required />
               </div>
               <div className="col-sm">
                   <h6> ORDER NUMBER: </h6> 
                   <input  type="text" 
                           name="cdc"
                           placeholder="division code"  
                           value={input.cdc} 
                           onChange={setInput} 
                           required /> 
                           <div className="pt-2"/>
                   <h6> ORDER TYPE: </h6> 
                   <input  type="text" 
                           name="ot"
                           placeholder="required qty"  
                           value={input.ot} 
                           onChange={setInput} 
                           required /> 
                           <div className="pt-3"/>

               </div>
               <div className="col-sm pt-4 float-right ">
              
               <button className = "btn btn-primary "  
               
               onClick = {()=>{
                   if(input.cc == Data.cc || input.ono == Data.ono || input.cdc == Data.cdc || input.ot == Data.ot){
                    handleGenerate()
                   }
                   else{
                       alert('Enter the required field')
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
        )
}   

// const Printer = () => {
//     this.props.history.push('./print')
// }

const ErrorResponse = (props) => {     
    return( <div className = "col-sm-6" >
                <h6> {props.data} </h6>
            </div>)
}

const OrderHdr = (props) => {
    return (
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
                
                    <button   className="btn btn-primary" >Print</button>
                        
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
              
class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:true,
            cell:'',
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
        </div>
    )
}


const PalletList = (props) => {
   const [Space, setSpace] = useState("________")

   

   const GetSpace = (e) => {
    const Spaces = setSpace(e.target.value)
    if(Spaces == 0 || Spaces== '0'){
           alert('Enter Non Negative Value')
        }else{
            setSpace(e.target.value)
        }
   }

//    const checkVal =()=> {
//        if(Space == 0 || Space == '0')
//        {
//            alert('Enter Non Negative value')
//        }
//    }

    return (
        <div className="container bcol">
        <div className="collapse" id="collapseExample">
        <div className="container bcol bt"> 
        <div className="bcol">
        <Table className="tcol table-striped center ">
        <div className=" "> 
        <span className="changeSave float-right" id="changes">
            Changes Saved
        </span>
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
                        const x =  document.getElementById('space')
                        if(x == 0 ){
                            alert(x)
                        }
                        return( 
                            <tr key = {plt.psn}>
                                <td id="space" contentEdiTable="true" className="p-editable-column"  type="check"  onKeyPress={GetSpace} 
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
        {/* <DataTable value={props.data.l} editMode="cell" className="editable-cells-table center">
        <Column editor={ 
                props.data.map( (plt) => {
                        return( 
                            <tr key = {plt.psn}>
                                <td contentEdiTable="true" >  </td> 
                                <td> {plt.loc} </td> 
                                <td> {plt.psn} </td> 
                                <td> {plt.exp} </td> 
                                <td> {plt.aq}  </td> 
                                <td> {plt.uom} </td> 
                            </tr>
                        )
                    })}></Column> */}
                        
            {/* {
                    props.data.map( (plt) => {
                        return( 
                            <tr key = {plt.psn}>
                                <td contentEdiTable="true" >  </td> 
                                <td> {plt.loc} </td> 
                                <td> {plt.psn} </td> 
                                <td> {plt.exp} </td> 
                                <td> {plt.aq}  </td> 
                                <td> {plt.uom} </td> 
                            </tr>
                        )
                    })
                } */}


        {/* </DataTable>   */}
        </div>
        </div>
        </div>
        </div>       
    )
}



export default OrderEdit;
