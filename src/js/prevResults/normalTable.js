import React from 'react'
import { SetUpDisplay } from '../../functions/func'
import 'simplebar/dist/simplebar.min.css';
import {Table} from 'react-bootstrap'

class NormalTable extends React.Component {
   constructor(props) {
       super(props);
       
       this.displayAll = this.displayAll.bind(this);
   }

   displayAll() {
       let all = [];

       this.props.data.forEach((elem, index)  => {
           let className = 'table-row';

           if(index === this.props.display)
               className += ' selected';

           let moves1, moves2, moves3, average;

           [moves1, moves2, moves3, average] = SetUpDisplay(elem);

            all.push(
                <tr onClick={() => this.props.changeDisplay(index)} key={index} className={className}>
                    <td>{elem.position}</td>
                    <td>{elem.name}</td>
                    <td>{moves1}</td>
                    <td>{moves2}</td>
                    <td>{moves3}</td>
                    <td>{average}</td>
                    <td>{elem.lowest}</td>
                </tr>
            );
       })
       return all;
   }

   render() {
       return (
           <div id='table-container'>
               <Table>
                   <thead>
                       <tr>
                           <th>{"Position"}</th>
                           <th>Name</th>
                           <th>{"Scramble 1"}</th>
                           <th>{"Scramble 2"}</th>
                           <th>{"Scramble 3"}</th>
                           <th>Mean</th>
                           <th>Single</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.displayAll()}
                   </tbody>
               </Table>
           </div>
       );
   }
}

export default NormalTable;