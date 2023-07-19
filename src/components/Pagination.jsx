import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";


export default function Pages ({ resultsPerPage, totalResults, paginate }) {
   
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
        <div className="self-end ">
            <Pagination>
            {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                    <a
                    onClick={(event) => paginate(number, event)}
                    href="!#"
                    className="page-link bg-transparent text-yellow-400"
                    >
                    {number}
                    </a>
                </li>
            ))}
            </Pagination>
        </div>
    )
} 
  
