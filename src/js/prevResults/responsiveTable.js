import React from 'react'
import 'simplebar/dist/simplebar.min.css';
import { SetUpDisplay } from '../../functions/func'

const ResponsiveTableData = (label, data) => {
   let tData = data.map(elem => <p>{elem}</p>);

   return (
       <div className='res-table-data'>
           <div class='res-table-label'>{label}</div>
           <div className='res-table-elem'>{tData}</div>
       </div>
   );
}

class ResponsiveTable extends React.Component {
   constructor(props) {
       super(props);

       this.displayAll = this.displayAll.bind(this);
   }

   displayAll() {
      let all = [];

       this.props.data.forEach((elem, index) => {
         let className = 'res-table-row';

         if(index === this.props.display)
            className += ' selected'

         let moves1, moves2, moves3, average;

         [moves1, moves2, moves3, average] = SetUpDisplay(elem);

         all.push(
            <div onClick={() => this.props.changeDisplay(index)} class={className} key={index}>
               {ResponsiveTableData('Position', [elem.position])}
               {ResponsiveTableData('Name', [elem.name])}
               {ResponsiveTableData('Scramble 1 / 2 / 3', [moves1, moves2, moves3])}
               {ResponsiveTableData('Mean / Single', [average, elem.lowest])}
            </div>
         );
      })

      return all;
   }

   render() {
      return (
         <div id='responsive-table'>
            {this.displayAll()}
         </div>
      );
   }
}

export default ResponsiveTable;