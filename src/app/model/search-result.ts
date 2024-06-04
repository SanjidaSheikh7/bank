export interface SearchResult {
    success:boolean;
    totalElements:number;
    totalPages:number;
    hasNext:boolean;
    hasPrevious:boolean;
    currentPage:number;
    pages:string[];
}
