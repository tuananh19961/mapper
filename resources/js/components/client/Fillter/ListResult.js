import React, { Component } from 'react';
import ItemResult from './ItemResult';
import {isEmpty} from 'lodash';

class ListResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            todosPerPage: 4,
        }
    }

    // PAGINATION REACTJS
     handleClick(e) {
        this.setState({currentPage: e});
    }
    onSizePage = (data) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / this.state.todosPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    render() {
        const { Motel } = this.props;

        const {currentPage, todosPerPage} = this.state;
        const indexOfLast = currentPage * todosPerPage;
        const indexOfFirst = indexOfLast - todosPerPage;

        return (
            <div className="result_fillter">

                    <div className="top_result">

                        <div className="item-top">
                            <select id="inputState" className="form-control">
                                <option>Sort...</option>
                                <option>...</option>
                            </select>
                        </div>

                        <div className="item-top num_results">
                            <span>{Motel.data.length}
                                kết quả</span>
                        </div>
                    </div>

                    <div className="list_results">

                        {Motel.isLoading
                            ? <div className="text-center">
                                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw mt-20"></i>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            : !isEmpty(Motel.data)
                                ? Motel
                                    .data
                                    .slice(indexOfFirst, indexOfLast)
                                    .map((item, index) => {
                                        return <ItemResult item={item} key={index}/>
                                    })
                                : <div className="text-center">
                                    <span className="mt-20">
                                        Không có kết quả phù hợp!
                                    </span>
                                </div>
                        }

                        {!isEmpty(Motel.data) && <div className="text-center">
                            <ul className="pagination">
                                {this
                                    .onSizePage(Motel.data)
                                    .map((num, index) => {
                                        return <li 
                                            className="page-item" 
                                            key={index} 
                                            onClick={() => this.handleClick(num)}
                                        >
                                            {num}
                                        </li>
                                    })}
                            </ul>
                        </div>
                        }

                    </div>

                </div>
        );
    }
}

export default ListResult;