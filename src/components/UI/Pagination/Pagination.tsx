import React, {useState} from 'react';
import classes from './Pagination.module.scss';
import {PaginationArrowLeft, PaginationArrowRight} from "../../../assets/images/Icons/IconsSvg";

interface IPropsPagination {
    handlePagination: (offset: number) => void
    pagesCount: number
}

const Pagination: React.FC<IPropsPagination> = (props) => {

    const [currentPage, setCurrentPage] = useState<number>(1)

    const classNames = require('classnames')

    const renderPaginationArr = () => {
        let paginationArr = []
        const pages = Math.ceil(props.pagesCount!)
        for (let i = 1; i <= pages; i++) {
            paginationArr.push(i)
        }
        return paginationArr
    }

    const onPageChanged = (index: number) => {
        setCurrentPage(index + 1)
        props.handlePagination && props.handlePagination(index * 10)
    }

    return (
        <div className={classNames(classes.PaginationBlock, classes.Flex)}>
            <button className={classNames(classes.ArrowButton, classes.Flex)}
                    onClick={() => onPageChanged(currentPage - 2)}
                    disabled={currentPage === 1}

            >
                <PaginationArrowLeft/>
            </button>

            <div className={classes.Flex}>
                {renderPaginationArr().map((item: any, index: number) => {
                    return (
                        <button
                            className={classNames(classes.PageNumber, index + 1 === currentPage && classes.ActivePage)}
                            onClick={() => onPageChanged(index)}
                            key={index}
                        >
                            {index + 1}
                        </button>
                    )
                })}
            </div>
            <button className={classNames(classes.ArrowButton, classes.Flex)}
                    onClick={() => onPageChanged(currentPage)}
                    disabled={currentPage === renderPaginationArr().length}
            >
                <PaginationArrowRight/>
            </button>
        </div>
    )
}

export default Pagination;
