export interface SearchTransactionResult {
    success:boolean;
    totalElements:number;
    totalPages:number;
    currentPage:number;
    isFirst:boolean;
    isLast:boolean;
    pages:string[];
}
