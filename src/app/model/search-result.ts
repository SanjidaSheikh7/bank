export interface SearchResult {
    success:boolean;
    totalElements:number;
    totalPages:number;
    hasNext:boolean;
    hasPrevious:boolean;
    pages:string[];
    currentPage:number;
}
