interface PaginationItemProps{
    number: number;
    isCurrent?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationItem({
    number,
    isCurrent = false,
    onPageChange
}: PaginationItemProps){
    return(
        <a onClick={() => onPageChange(number)} key={number} style={isCurrent ? {color:'yellow', whiteSpace: 'nowrap'} : {whiteSpace: 'nowrap'}}>{number}</a>
    )
}