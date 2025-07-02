interface ScannerResultMetaData {
    documentType: DocumentReaderDocumentType[];
    status: DocumentReaderResultsStatus;
    textResult: {
        status: number;
        comparisonStatus: number;
        validityStatus: number;
    }
}

declare interface ScannerResult {
    [key: string]: any;
    metaData: ScannerResultMetaData;
}