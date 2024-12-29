import React from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";

interface PaginationProps {
    totalPage: number;
    currPage: number;
    size: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({totalPage, currPage, size, onPageChange}: PaginationProps) => {

    const getPaginationGroup = () => {
        const start = Math.floor((currPage - 1) / size) * size;
        return new Array(Math.min(size, totalPage))
            .fill(null)
            .map((_, idx) => start + idx + 1)
            .filter(page => page <= totalPage);
    };

    return (
        <div className="flex justify-between items-center space-x-2 mb-8">
            <div className="text-[13px] font-medium text-label">
                Page {` ${currPage} `}
                of {` ${totalPage}`}
            </div>
            <div className="flex justify-center gap-x-1">
                <button
                    onClick={() => onPageChange(currPage - 1)}
                    disabled={currPage === 1}
                    className=" disabled:opacity-50"
                >
                    <ChevronLeftIcon
                        className="text-label w-8 h-8 border-2 border-placeholder rounded"/>
                </button>

                {getPaginationGroup().map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 text-sm font-inter items-center ${currPage === page ? 'bg-primary500 bg-opacity-40 text-label' : 'bg-transparent border-2 border-placeholder text-label hover:bg-placeholder'} rounded`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currPage + 1)}
                    disabled={currPage === totalPage}
                    className="disabled:opacity-50"
                >
                    <ChevronRightIcon className="text-label w-8 h-8 border-2 border-placeholder rounded"/>
                </button>
            </div>

        </div>
    );
};

export default Pagination;
