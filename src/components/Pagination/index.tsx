import {usePagination, DOTS} from './usePagination';
import s from './Pagination.module.scss';
import React from 'react';

const Pagination = (
    {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    }: any) => {
    const paginationRange: any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={s.paginationContainer}
        >
            <li
                className={`${s.paginationItem} ${currentPage === 1 ? s.disabled : ''}`}
                onClick={onPrevious}
            >
                <div className={`${s.arrow} ${s.left}`}/>
            </li>
            {React.Children.toArray(paginationRange.map((pageNumber: string) => {
                if (pageNumber === DOTS) {
                    return <li className={`${s.paginationItem} ${s.dots}`}>&#8230;</li>;
                }

                return (
                    <li
                        className={`${s.paginationItem} ${pageNumber === currentPage ? s.selected : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            }))}
            <li
                className={`${s.paginationItem} ${currentPage === lastPage ? s.disabled : ''}`}
                onClick={onNext}
            >
                <div className={`${s.arrow} ${s.right}`}/>
            </li>
        </ul>
    );
};

export default Pagination;
