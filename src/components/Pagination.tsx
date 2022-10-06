import { PaginationItem } from "./PaginationItem";

interface PaginationProps{
    totalCountOfRegisters?: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePageArray(from: number, to: number){
    return [...new Array(to - from)].map((_, index) => {return from + index + 1}).filter(page => page > 0)
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 5,
    currentPage = 1,
    onPageChange,
}: PaginationProps){
    const lastPage = Math.floor(totalCountOfRegisters! / registersPerPage);

    const previousPages = currentPage > 1 ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1) : []

    const nextPages = currentPage < lastPage ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

    return(
        <div className="pagination">
            {/*<a href="#">&laquo;</a>*/}

            {currentPage > (1 + siblingsCount) && (
                <>
                    <PaginationItem number={1} onPageChange={onPageChange}/>
                    {currentPage > (2 + siblingsCount) && <a style={{whiteSpace: 'nowrap'}}>...</a>}
                </>
            )}
            
            {previousPages.length > 0 && previousPages.map(page => {
                return <PaginationItem number={page} onPageChange={onPageChange}/>
            })}

            <PaginationItem number={currentPage} isCurrent={true} onPageChange={onPageChange}/>

            {nextPages.length > 0 && nextPages.map(page => {
                return <PaginationItem number={page} onPageChange={onPageChange}/>
            })}

            {(currentPage + siblingsCount) < lastPage && (
                <>
                    {(currentPage + 1  + siblingsCount) < lastPage && <a style={{whiteSpace: 'nowrap'}}>...</a>}
                    <PaginationItem number={lastPage} onPageChange={onPageChange}/>
                </>
            )}

        </div>
    )
}