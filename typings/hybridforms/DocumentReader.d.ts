interface IDocumentReaderPlugin {
    DocumentReader: IDocumentReader;
    Enum: Enum;

    DocumentReaderScenario: typeof DocumentReaderScenario;
    Rect: typeof Rect;
    DocReaderFieldRect: typeof DocReaderFieldRect;
    DocumentReaderGraphicField: typeof DocumentReaderGraphicField;
    DocumentReaderGraphicResult: typeof DocumentReaderGraphicResult;
    DocumentReaderValue: typeof DocumentReaderValue;
    DocumentReaderTextField: typeof DocumentReaderTextField;
    DocumentReaderTextResult: typeof DocumentReaderTextResult;
    Coordinate: typeof Coordinate;
    ElementPosition: typeof ElementPosition;
    ImageQuality: typeof ImageQuality;
    ImageQualityGroup: typeof ImageQualityGroup;
    DocumentReaderDocumentType: typeof DocumentReaderDocumentType;
    DocumentReaderNotification: typeof DocumentReaderNotification;
    AccessControlProcedureType: typeof AccessControlProcedureType;
    FileData: typeof FileData;
    CertificateData: typeof CertificateData;
    SecurityObjectCertificates: typeof SecurityObjectCertificates;
    File: typeof FileClass;
    Application: typeof Application;
    Value: typeof Value;
    Attribute: typeof Attribute;
    Authority: typeof Authority;
    Extension: typeof Extension;
    Validity: typeof Validity;
    CertificateChain: typeof CertificateChain;
    SignerInfo: typeof SignerInfo;
    SecurityObject: typeof SecurityObject;
    CardProperties: typeof CardProperties;
    RFIDSessionData: typeof RFIDSessionData;
    DataField: typeof DataField;
    DocumentReaderAuthenticityCheck: typeof DocumentReaderAuthenticityCheck;
    PDF417Info: typeof PDF417Info;
    DocumentReaderBarcodeResult: typeof DocumentReaderBarcodeResult;
    DocumentReaderBarcodeField: typeof DocumentReaderBarcodeField;
    DocumentReaderAuthenticityResult: typeof DocumentReaderAuthenticityResult;
    DocumentReaderAuthenticityElement: typeof DocumentReaderAuthenticityElement;
    DocumentReaderCompletion: typeof DocumentReaderCompletion;
    RfidNotificationCompletion: typeof RfidNotificationCompletion;
    RegulaException: typeof RegulaException;
    PKDCertificate: typeof PKDCertificate;
    ImageInputParam: typeof ImageInputParam;
    PAResourcesIssuer: typeof PAResourcesIssuer;
    PAAttribute: typeof PAAttribute;
    TAChallenge: typeof TAChallenge;
    DocumentReaderResultsStatus: typeof DocumentReaderResultsStatus;
    DetailsOptical: typeof DetailsOptical;
    DetailsRFID: typeof DetailsRFID;
    VDSNCData: typeof VDSNCData;
    BytesData: typeof BytesData;
    ImageInputData: typeof ImageInputData;
    DocReaderDocumentsDatabase: typeof DocReaderDocumentsDatabase;
    DocumentReaderComparison: typeof DocumentReaderComparison;
    DocumentReaderRfidOrigin: typeof DocumentReaderRfidOrigin;
    DocumentReaderTextSource: typeof DocumentReaderTextSource;
    DocumentReaderSymbol: typeof DocumentReaderSymbol;
    DocumentReaderValidity: typeof DocumentReaderValidity;
    FaceApiParams: typeof FaceApiParams;
    Search: typeof Search;
    ImageQA: typeof ImageQA;
    GlaresCheckParams: typeof GlaresCheckParams;
    RFIDParams: typeof RFIDParams;
    OnlineProcessingConfig: typeof OnlineProcessingConfig;
    ScannerConfig: typeof ScannerConfig;
    RecognizeConfig: typeof RecognizeConfig;
    DocumentReaderResults: typeof DocumentReaderResults;
}
declare let DocumentReader: IDocumentReaderPlugin;

interface IDocumentReader {
    initializeReaderAutomatically(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    isBlePermissionsGranted(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    startBluetoothService(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    initializeReaderBleDeviceConfig(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getTag(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getAPIVersion(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getAvailableScenarios(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    isRFIDAvailableForUse(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getCoreMode(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getCoreVersion(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDatabaseDate(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDatabaseID(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDatabaseVersion(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDocumentReaderIsReady(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDocumentReaderStatus(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDatabaseCountriesNumber(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDatabaseDocumentsNumber(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    selectedScenario(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getSessionLogFolder(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getDatabaseDescription(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    showScanner(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    startNewPage(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    startNewSession(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    startRFIDReader(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    stopRFIDReader(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    stopRFIDReaderWithErrorMessage(message: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    stopScanner(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    deinitializeReader(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    isAuthenticatorAvailableForUse(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getConfig(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getRfidScenario(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getLicenseExpiryDate(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getLicenseCountryFilter(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    licenseIsRfidAvailable(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getCameraSessionIsPaused(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    removeDatabase(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    cancelDBUpdate(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    resetConfiguration(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    clearPKDCertificates(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    readRFID(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    getRfidSessionStatus(successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setRfidDelegate(delegate: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setEnableCoreLogs(logs: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    addPKDCertificates(certificates: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setCameraSessionIsPaused(paused: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setTag(tag: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    checkDatabaseUpdate(databaseId: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    scan(config: any, successCallback: (m: string) => void, errorCallback: (e: any) => void): any;
    recognize(config: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    recognizeImages(images: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    showScannerWithCameraID(cameraID: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    runAutoUpdate(databaseType: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setConfig(config: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setRfidScenario(scenario: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    initializeReader(config: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    prepareDatabase(databaseType: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    recognizeImage(image: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    recognizeData(data: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setRfidSessionStatus(status: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    providePACertificates(certificates: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    provideTACertificates(certificates: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    provideTASignature(signature: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    parseCoreResults(json: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setTCCParams(params: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    recognizeImageWithOpts(image: any, options: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    recognizeVideoFrame(byteString: any, params: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    showScannerWithCameraIDAndOpts(cameraID: any, options: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    recognizeImageWithCameraMode(image: any, mode: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    /**
     * @deprecated
     */
    recognizeImagesWithImageInputs(images: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    setLanguage(language: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldValueByType(results: any, fieldType: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldValueByTypeLcid(results: any, fieldType: any, lcid: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldValueByTypeSource(results: any, fieldType: any, source: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldValueByTypeLcidSource(results: any, fieldType: any, lcid: any, source: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldValueByTypeSourceOriginal(results: any, fieldType: any, source: any, original: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldValueByTypeLcidSourceOriginal(results: any, fieldType: any, lcid: any, source: any, original: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldByType(results: any, fieldType: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    textFieldByTypeLcid(results: any, fieldType: any, lcid: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldByTypeSource(results: any, fieldType: any, source: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldByTypeSourcePageIndex(results: any, fieldType: any, source: any, pageIndex: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldByTypeSourcePageIndexLight(results: any, fieldType: any, source: any, pageIndex: any, light: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldImageByType(results: any, fieldType: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldImageByTypeSource(results: any, fieldType: any, source: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldImageByTypeSourcePageIndex(results: any, fieldType: any, source: any, pageIndex: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    graphicFieldImageByTypeSourcePageIndexLight(results: any, fieldType: any, source: any, pageIndex: any, light: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    containers(results: any, resultType: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
    encryptedContainers(results: any, successCallback: (m: any) => void, errorCallback: (e: any) => void): any;
}
interface Enum {
    FontStyle: typeof FontStyle;
    eRPRM_Authenticity: typeof eRPRM_Authenticity;
    eRFID_ErrorCodes: typeof eRFID_ErrorCodes;
    eLDS_ParsingErrorCodes: typeof eLDS_ParsingErrorCodes;
    eRFID_CertificateType: typeof eRFID_CertificateType;
    RGLMeasureSystem: typeof RGLMeasureSystem;
    eRPRM_ResultType: typeof eRPRM_ResultType;
    CameraTypes: typeof CameraTypes;
    FrameShapeType: typeof FrameShapeType;
    eRFID_BaudRate: typeof eRFID_BaudRate;
    eRPRM_FieldVerificationResult: typeof eRPRM_FieldVerificationResult;
    DocReaderAction: DocReaderAction;
    eProcessGLCommands: typeof eProcessGLCommands;
    PKDResourceType: typeof PKDResourceType;
    eRFID_AuthenticationProcedureType: typeof eRFID_AuthenticationProcedureType;
    DocumentReaderErrorCodes: typeof DocumentReaderErrorCodes;
    ScenarioIdentifier: ScenarioIdentifier;
    eRFID_AccessControl_ProcedureType: typeof eRFID_AccessControl_ProcedureType;
    eRFID_NotificationCodes: typeof eRFID_NotificationCodes;
    eRFID_Password_Type: typeof eRFID_Password_Type;
    BarcodeResult: typeof BarcodeResult;
    eSignManagementAction: typeof eSignManagementAction;
    eCheckDiagnose: typeof eCheckDiagnose;
    RFIDDelegate: typeof RFIDDelegate;
    TextProcessing: TextProcessing;
    ProcessingFinishedStatus: typeof ProcessingFinishedStatus;
    DocFormat: typeof DocFormat;
    eLDS_ParsingNotificationCodes: typeof eLDS_ParsingNotificationCodes;
    eImageQualityCheckType: typeof eImageQualityCheckType;
    MRZFormat: typeof MRZFormat;
    BarcodeType: typeof BarcodeType;
    eRPRM_SecurityFeatureType: typeof eRPRM_SecurityFeatureType;
    OnlineMode: typeof OnlineMode;
    eRFID_SDK_ProfilerType: typeof eRFID_SDK_ProfilerType;
    diDocType: diDocType;
    HoloAnimationType: typeof HoloAnimationType;
    eRequestCommand: typeof eRequestCommand;
    ImageFormat: typeof ImageFormat;
    eGraphicFieldType: typeof eGraphicFieldType;
    RegDeviceConfigType: typeof RegDeviceConfigType;
    CameraMode: typeof CameraMode;
    CaptureMode: typeof CaptureMode;
    eCheckResult: typeof eCheckResult;
    eRFID_TerminalType: typeof eRFID_TerminalType;
    eRFID_DataFile_Type: typeof eRFID_DataFile_Type;
    eVisualFieldType: eVisualFieldType;
    DocReaderOrientation: DocReaderOrientation;
    LCID: typeof LCID;
    DocReaderFrame: typeof DocReaderFrame;
    eRPRM_Lights: typeof eRPRM_Lights;
    LineCap: typeof LineCap;
    UIInterfaceOrientationMask: UIInterfaceOrientationMask;
    AVCaptureSessionPreset: typeof AVCaptureSessionPreset;
    AVCaptureDevicePosition: typeof AVCaptureDevicePosition;
    UIViewContentMode: typeof UIViewContentMode;
}
declare class DocumentReaderScenario {
    public name: any;
    public caption: any;
    public description: any;
    public multiPageOff: any;
    public frameKWHLandscape: any;
    public frameKWHPortrait: any;
    public frameKWHDoublePageSpreadPortrait: any;
    public frameKWHDoublePageSpreadLandscape: any;
    public frameOrientation: any;
    public uvTorch: any;
    public faceExt: any;
    public seriesProcessMode: any;
    public manualCrop: any;

    public static fromJson(jsonObject: any): DocumentReaderScenario;
}
declare class Rect {
    public bottom: number;
    public top: number;
    public left: number;
    public right: number;

    public static fromJson(jsonObject: any): Rect;
}
declare class DocReaderFieldRect {
    public bottom: number;
    public top: number;
    public left: number;
    public right: number;

    public static fromJson(jsonObject: any): DocReaderFieldRect;
}
declare class DocumentReaderGraphicField {
    public sourceType: any;
    public fieldType: any;
    public light: any;
    public pageIndex: any;
    public originalPageIndex: any;
    public fieldName: any;
    public lightName: any;
    public value: any;
    public fieldRect: DocReaderFieldRect;

    public static fromJson(jsonObject: any): DocumentReaderGraphicField;
}
declare class DocumentReaderGraphicResult {
    public fields: DocumentReaderGraphicField[];

    public static fromJson(jsonObject: any): DocumentReaderGraphicResult;
}
declare class DocumentReaderValue {
    public pageIndex: any;
    public sourceType: any;
    public validity: any;
    public probability: any;
    public value: any;
    public originalValue: any;
    public boundRect: Rect;
    public comparison: any;
    public originalSymbols: DocumentReaderSymbol[];
    public rfidOrigin: DocumentReaderRfidOrigin;

    public static fromJson(jsonObject: any): DocumentReaderValue;
}
declare class DocumentReaderTextField {
    public fieldType: number;
    public lcid: any;
    public status: any;
    public lcidName: any;
    public fieldName: any;
    public value: any;
    public getValue: DocumentReaderValue;
    public values: DocumentReaderValue[];
    public comparisonList: DocumentReaderComparison[];
    public validityList: DocumentReaderValidity[];
    public comparisonStatus: any;
    public validityStatus: any;

    public static fromJson(jsonObject: any): DocumentReaderTextField;
}
declare class DocumentReaderTextResult {
    public status: number;
    public comparisonStatus: number;
    public validityStatus: number;
    public availableSourceList: DocumentReaderTextSource[];
    public fields: DocumentReaderTextField[];

    public static fromJson(jsonObject: any): DocumentReaderTextResult;
}
declare class Coordinate {
    public x: number;
    public y: number;

    public static fromJson(jsonObject: any): Coordinate;
}
declare class ElementPosition {
    public docFormat: any;
    public width: any;
    public height: any;
    public dpi: any;
    public pageIndex: any;
    public inverse: any;
    public perspectiveTr: any;
    public objArea: any;
    public objIntAngleDev: any;
    public resultStatus: any;
    public angle: any;
    public center: Coordinate;
    public leftTop: Coordinate;
    public leftBottom: Coordinate;
    public rightTop: Coordinate;
    public rightBottom: Coordinate;

    public static fromJson(jsonObject: any): ElementPosition;
}
declare class ImageQuality {
    public featureType: any;
    public result: any;
    public type: any;

    public static fromJson(jsonObject: any): ImageQuality;
}
declare class ImageQualityGroup {
    public count: any;
    public result: any;
    public imageQualityList: ImageQuality[];
    public pageIndex: any;

    public static fromJson(jsonObject: any): ImageQualityGroup;
}
declare class DocumentReaderDocumentType {
    public pageIndex: number;
    public documentID: number;
    public dType: number;
    public dFormat: number;
    public dMRZ: boolean;
    public isDeprecated: boolean;
    public name: string;
    public ICAOCode: string;
    public dDescription: string;
    public dYear: string;
    public dCountryName: string;
    public FDSID: number[];

    public static fromJson(jsonObject: any): DocumentReaderDocumentType;
}
declare class DocumentReaderNotification {
    public notificationCode: any;
    public dataFileType: any;
    public progress: any;

    public static fromJson(jsonObject: any): DocumentReaderNotification;
}
declare class AccessControlProcedureType {
    public activeOptionIdx: any;
    public type: any;
    public status: any;
    public notifications: any[];

    public static fromJson(jsonObject: any): AccessControlProcedureType;
}
declare class FileData {
    public length: any;
    public type: any;
    public status: any;
    public data: any;
    public static fromJson(jsonObject: any): FileData;
}
declare class CertificateData {
    public length: any;
    public data: any;
    public static fromJson(jsonObject: any): CertificateData;
}
declare class SecurityObjectCertificates {
    public securityObject: CertificateData;

    public static fromJson(jsonObject: any): SecurityObjectCertificates;
}
declare class FileClass {
    public readingTime: any;
    public type: any;
    public pAStatus: any;
    public readingStatus: any;
    public fileID: any;
    public fileData: FileData;
    public certificates: SecurityObjectCertificates;
    public docFieldsText: any[];
    public docFieldsGraphics: any[];
    public docFieldsOriginals: any[];
    public notifications: any[];

    public static fromJson(jsonObject: any): FileClass;
}
declare class Application {
    public type: any;
    public status: any;
    public applicationID: any;
    public dataHashAlgorithm: any;
    public unicodeVersion: any;
    public version: any;
    public files: FileClass[];

    public static fromJson(jsonObject: any): Application;
}
declare class Value {
    public length: any;
    public type: any;
    public status: any;
    public data: any;
    public format: any;
    public static fromJson(jsonObject: any): Value;
}
declare class Attribute {
    public type: any;
    public value: Value;
    public static fromJson(jsonObject: any): Attribute;
}
declare class Authority {
    public data: any;
    public friendlyName: Value;
    public attributes: Attribute[];

    public static fromJson(jsonObject: any): Authority;
}
declare class Extension {
    public data: any;
    public type: any;
    public static fromJson(jsonObject: any): Extension;
}
declare class Validity {
    public notAfter: Value;
    public notBefore: Value;
    public static fromJson(jsonObject: any): Validity;
}
declare class CertificateChain {
    public origin: any;
    public type: any;
    public version: any;
    public paStatus: any;
    public serialNumber: any;
    public signatureAlgorithm: any;
    public subjectPKAlgorithm: any;
    public fileName: Value;
    public validity: Validity;
    public issuer: Authority;
    public subject: Authority;
    public notifications: any[];
    public extensions: Extension[];

    public static fromJson(jsonObject: any): CertificateChain;
}
declare class SignerInfo {
    public version: any;
    public paStatus: any;
    public dataToHash: any;
    public digestAlgorithm: any;
    public signatureAlgorithm: any;
    public serialNumber: Value;
    public signature: Value;
    public subjectKeyIdentifier: Value;
    public issuer: Authority;
    public notifications: any[];
    public signedAttributes: Extension[];
    public certificateChain: CertificateChain[];

    public static fromJson(jsonObject: any): SignerInfo;
}
declare class SecurityObject {
    public fileReference: any;
    public version: any;
    public objectType: any;
    public notifications: any[];
    public signerInfos: SignerInfo[];

    public static fromJson(jsonObject: any): SecurityObject;
}
declare class CardProperties {
    public aTQA: any;
    public bitRateR: any;
    public bitRateS: any;
    public chipTypeA: any;
    public mifareMemory: any;
    public rfidType: any;
    public sAK: any;
    public support4: any;
    public supportMifare: any;
    public aTQB: any;
    public aTR: any;
    public baudrate1: any;
    public baudrate2: any;
    public uID: any;

    public static fromJson(jsonObject: any): CardProperties;
}
declare class RFIDSessionData {
    public totalBytesReceived: any;
    public totalBytesSent: any;
    public status: any;
    public extLeSupport: any;
    public processTime: any;
    public cardProperties: CardProperties;
    public accessControls: AccessControlProcedureType[];
    public applications: Application[];
    public securityObjects: SecurityObject[];
    public dataGroups: any[];
    public dataFields: DataField[];

    public static fromJson(jsonObject: any): RFIDSessionData;
}
declare class DataField {
    public data: any;
    public fieldType: any;

    public static fromJson(jsonObject: any): DataField;
}
declare class DocumentReaderAuthenticityCheck {
    public type: any;
    public status: any;
    public typeName: any;
    public pageIndex: any;
    public elements: DocumentReaderAuthenticityElement[];

    public static fromJson(jsonObject: any): DocumentReaderAuthenticityCheck;
}
declare class PDF417Info {
    public errorLevel: any;
    public columns: any;
    public rows: any;

    public static fromJson(jsonObject: any): PDF417Info;
}
declare class DocumentReaderBarcodeResult {
    public fields: DocumentReaderBarcodeField[];

    public static fromJson(jsonObject: any): DocumentReaderBarcodeResult;
}
declare class DocumentReaderBarcodeField {
    public barcodeType: any;
    public status: any;
    public pageIndex: any;
    public pdf417Info: PDF417Info;
    public data: any[];

    public static fromJson(jsonObject: any): DocumentReaderBarcodeField;
}
declare class DocumentReaderAuthenticityResult {
    public status: any;
    public checks: DocumentReaderAuthenticityCheck[];

    public static fromJson(jsonObject: any): DocumentReaderAuthenticityResult;
}
declare class DocumentReaderAuthenticityElement {
    public status: any;
    public elementType: any;
    public elementDiagnose: any;
    public elementTypeName: any;
    public elementDiagnoseName: any;

    public static fromJson(jsonObject: any): DocumentReaderAuthenticityElement;
}
declare class DocumentReaderCompletion {
    public action: number;
    public results: DocumentReaderResults;
    public error: RegulaException;

    public static fromJson(jsonObject: any): DocumentReaderCompletion;
}
declare class RfidNotificationCompletion {
    public notification: any;
    public value: any;

    public static fromJson(jsonObject: any): RfidNotificationCompletion;
}
declare class RegulaException {
    public errorCode: any;
    public message: any;

    public static fromJson(jsonObject: any): RegulaException;
}
declare class PKDCertificate {
    public binaryData: any;
    public resourceType: any;
    public privateKey: any;

    public static fromJson(jsonObject: any): PKDCertificate;
}
declare class ImageInputParam {
    public width: any;
    public height: any;
    public type: any;
    public disableFrameShiftIR: any;
    public doFlipYAxis: any;

    public static fromJson(jsonObject: any): ImageInputParam;
}
declare class PAResourcesIssuer {
    public data: any[];
    public friendlyName: any;
    public attributes: PAAttribute[];

    public static fromJson(jsonObject: any): PAResourcesIssuer;
}
declare class PAAttribute {
    public type: any;
    public value: any;

    public static fromJson(jsonObject: any): PAAttribute;
}
declare class TAChallenge {
    public data: any[];
    public auxPCD: any;
    public challengePICC: any;
    public hashPK: any;
    public idPICC: any;

    public static fromJson(jsonObject: any): TAChallenge;
}
declare class DocumentReaderResultsStatus {
    public overallStatus: number;
    public optical: number;
    public detailsOptical: DetailsOptical;
    public rfid: number;
    public detailsRFID: DetailsRFID;
    public portrait: number;
    public stopList: number;

    public static fromJson(jsonObject: any): DocumentReaderResultsStatus;
}
declare class DetailsOptical {
    public overallStatus: number;
    public mrz: number;
    public text: number;
    public docType: number;
    public security: number;
    public imageQA: number;
    public expiry: number;
    public vds: number;
    public pagesCount: number;

    public static fromJson(jsonObject: any): DetailsOptical;
}
declare class DetailsRFID {
    public pa: any;
    public ca: any;
    public aa: any;
    public ta: any;
    public bac: any;
    public pace: any;
    public overallStatus: any;

    public static fromJson(jsonObject: any): DetailsRFID;
}
declare class VDSNCData {
    public type: any;
    public version: any;
    public issuingCountry: any;
    public message: any;
    public signatureAlgorithm: any;
    public signature: BytesData;
    public certificate: BytesData;
    public certificateChain: CertificateChain[];
    public notifications: any[];

    public static fromJson(jsonObject: any): VDSNCData;
}
declare class BytesData {
    public data: any;
    public length: any;
    public status: any;
    public type: any;

    public static fromJson(jsonObject: any): BytesData;
}
declare class ImageInputData {
    public pageIndex: any;
    public light: any;
    public type: any;
    public width: any;
    public height: any;
    public bitmap: any;
    public imgBytes: any[];

    public static fromJson(jsonObject: any): ImageInputData;
}
declare class DocReaderDocumentsDatabase {
    public databaseID: any;
    public version: any;
    public date: any;
    public databaseDescription: any;
    public countriesNumber: any;
    public documentsNumber: any;
    public size: any;

    public static fromJson(jsonObject: any): DocReaderDocumentsDatabase;
}
declare class DocumentReaderComparison {
    public sourceTypeLeft: any;
    public sourceTypeRight: any;
    public status: any;

    public static fromJson(jsonObject: any): DocumentReaderComparison;
}
declare class DocumentReaderRfidOrigin {
    public dg: any;
    public dgTag: any;
    public entryView: any;
    public tagEntry: any;

    public static fromJson(jsonObject: any): DocumentReaderRfidOrigin;
}
declare class DocumentReaderTextSource {
    public sourceType: any;
    public source: any;
    public validityStatus: any;

    public static fromJson(jsonObject: any): DocumentReaderTextSource;
}
declare class DocumentReaderSymbol {
    public code: any;
    public rect: Rect;
    public probability: any;

    public static fromJson(jsonObject: any): DocumentReaderSymbol;
}
declare class DocumentReaderValidity {
    public sourceType: any;
    public status: any;

    public static fromJson(jsonObject: any): DocumentReaderValidity;
}
declare class FaceApiParams {
    public url: any;
    public mode: any;
    public searchParams: Search;
    public threshold: any;
    public serviceTimeout: any;
    public proxy: any;
    public proxyPassword: any;
    public proxyType: any;

    public static fromJson(jsonObject: any): FaceApiParams;
}
declare class Search {
    public limit: any;
    public threshold: any;
    public groupIds: any[];

    public static fromJson(jsonObject: any): Search;
}
declare class ImageQA {
    public dpiThreshold: any;
    public angleThreshold: any;
    public focusCheck: any;
    public glaresCheck: any;
    public colornessCheck: any;
    public moireCheck: any;
    public expectedPass: any[];
    public glaresCheckParams: GlaresCheckParams;
    public documentPositionIndent: any;

    public static fromJson(jsonObject: any): ImageQA;
}
declare class GlaresCheckParams {
    public imgMarginPart: any;
    public maxGlaringPart: any;

    public static fromJson(jsonObject: any): GlaresCheckParams;
}
declare class RFIDParams {
    public paIgnoreNotificationCodes: any[];

    public static fromJson(jsonObject: any): RFIDParams;
}
declare class OnlineProcessingConfig {
    public mode: any;
    public url: any;
    public processParam: any;
    public imageFormat: any;
    public imageCompressionQuality: any;

    public static fromJson(jsonObject: any): OnlineProcessingConfig;
}
declare class ScannerConfig {
    public scenario: any;
    public livePortrait: any;
    public extPortrait: any;
    public onlineProcessingConfig: OnlineProcessingConfig;
    public cameraId: any;

    public static fromJson(jsonObject: any): ScannerConfig;
}
declare class RecognizeConfig {
    public scenario: any;
    public livePortrait: any;
    public extPortrait: any;
    public onlineProcessingConfig: OnlineProcessingConfig;
    public image: any;
    public oneShotIdentification: any;
    public images: any[];
    public imageInputData: ImageInputData[];

    public static fromJson(jsonObject: any): RecognizeConfig;
}
declare class DocumentReaderResults {
    public videoCaptureSessionId: any;
    public chipPage: number;
    public irElapsedTime: number;
    public processingFinishedStatus: number;
    public elapsedTime: number;
    public elapsedTimeRFID: number;
    public morePagesAvailable: number;
    public rfidResult: any;
    public highResolution: any;
    public graphicResult: DocumentReaderGraphicResult;
    public textResult: DocumentReaderTextResult;
    public documentPosition: ElementPosition[];
    public barcodePosition: ElementPosition[];
    public mrzPosition: ElementPosition[];
    public imageQuality: ImageQualityGroup[];
    public rawResult: string;
    public documentReaderNotification: DocumentReaderNotification;
    public rfidSessionData: RFIDSessionData;
    public authenticityResult: DocumentReaderAuthenticityResult;
    public barcodeResult: DocumentReaderBarcodeResult;
    public ppmIn: any;
    public documentType: DocumentReaderDocumentType[];
    public status: DocumentReaderResultsStatus;
    public vdsncData: VDSNCData;

    public static fromJson(jsonObject: any): DocumentReaderResults;
}
declare namespace FontStyle {
    let NORMAL: number;
    let BOLD: number;
    let ITALIC: number;
    let BOLD_ITALIC: number;
}
declare namespace eRPRM_Authenticity {
    let NONE: number;
    let UV_LUMINESCENCE: number;
    let IR_B900: number;
    let IMAGE_PATTERN: number;
    let AXIAL_PROTECTION: number;
    let UV_FIBERS: number;
    let IR_VISIBILITY: number;
    let OCR_SECURITY_TEXT: number;
    let IPI: number;
    let PHOTO_EMBED_TYPE: number;
    let HOLOGRAMS: number;
    let PHOTO_AREA: number;
    let PORTRAIT_COMPARISON: number;
    let BARCODE_FORMAT_CHECK: number;
    let KINEGRAM: number;
    let HOLOGRAMS_DETECTION: number;
    let MRZ: number;
    let STATUS_ONLY: number;
    let OVI: number;
    let LIVENESS: number;
    let OCR: number;
}
declare namespace eRFID_ErrorCodes {
    let RFID_ERROR_NO_ERROR: number;
    let RFID_ERROR_ALREADY_DONE: number;
    let RFID_ERROR_FAILED: number;
    let RFID_ERROR_NO_CHIP_DETECTED: number;
    let RFID_ERROR_NOT_AVAILABLE: number;
    let RFID_ERROR_INVALID_PARAMETER: number;
    let RFID_ERROR_NOT_INITIALIZED: number;
    let RFID_ERROR_NOT_ENOUGH_MEMORY: number;
    let RFID_ERROR_INVALID_DIRECTORY: number;
    let RFID_ERROR_UNKNOWN_COMMAND: number;
    let RFID_ERROR_FILE_IO_ERROR: number;
    let RFID_ERROR_BUSY: number;
    let RFID_ERROR_OLD_FIRMWARE: number;
    let RFID_ERROR_PCSC_FAILED: number;
    let RFID_ERROR_PCSC_READER_NOT_AVAILABLE: number;
    let RFID_ERROR_PCSC_CANT_CONNECT_CARD: number;
    let RFID_ERROR_PCSC_CARD_IS_NOT_CONNECTED: number;
    let RFID_ERROR_PCSC_OPERATION_CANCELLED: number;
    let RFID_ERROR_PCSC_CARD_IS_BUSY: number;
    let RFID_ERROR_PCSC_FAILED_SCARD: number;
    let RFID_ERROR_PCSC_EXT_LE_FAILED: number;
    let RFID_ERROR_LAYER6_SECURITY_MANAGER: number;
    let RFID_ERROR_LAYER6_APP_SELECTION_FAILURE: number;
    let RFID_ERROR_LAYER6_MUTUAL_AUTH_MAC_FAIL: number;
    let RFID_ERROR_LAYER6_MUTUAL_AUTH_ENC_FAIL: number;
    let RFID_ERROR_LAYER6_MUTUAL_AUTH_FAILURE: number;
    let RFID_ERROR_LAYER6_MUTUAL_AUTH_FAILURE_DATA: number;
    let RFID_ERROR_LAYER6_SM_DO_8E_MISSING: number;
    let RFID_ERROR_LAYER6_SM_DO_87_MISSING: number;
    let RFID_ERROR_LAYER6_SM_DO_99_MISSING: number;
    let RFID_ERROR_LAYER6_SM_MAC_INCORRECT: number;
    let RFID_ERROR_LAYER6_SM_DO_87_INCORRECT: number;
    let RFID_ERROR_LAYER6_NON_TLV_RESPONSE_DATA: number;
    let RFID_ERROR_LAYER6_WRONG_RND_ICC_LENGTH: number;
    let RFID_ERROR_LAYER6_INT_AUTH_FAILURE: number;
    let RFID_ERROR_LAYER6_MSE_SET_KAT_FAILURE: number;
    let RFID_ERROR_LAYER6_MSE_SET_DST_FAILURE: number;
    let RFID_ERROR_LAYER6_PSO_CERTIFICATE_FAILURE: number;
    let RFID_ERROR_LAYER6_MSE_SET_AT_FAILURE: number;
    let RFID_ERROR_LAYER6_GET_CHALLENGE_FAILURE: number;
    let RFID_ERROR_LAYER6_EXT_AUTH_FAILURE: number;
    let RFID_ERROR_LAYER6_GENERAL_AUTH_FAILURE: number;
    let RFID_ERROR_LAYER6_FILE_NOT_FOUND: number;
    let RFID_ERROR_LAYER6_FILE_EOF1: number;
    let RFID_ERROR_LAYER6_FILE_EOF2: number;
    let RFID_ERROR_LAYER6_INCORRECT_PARAMS: number;
    let RFID_ERROR_LAYER6_NO_REFERENCE_DATA: number;
    let RFID_ERROR_LAYER6_PWD_SUSPEND: number;
    let RFID_ERROR_LAYER6_PWD_BLOCKED: number;
    let RFID_ERROR_LAYER6_PWD_DEACTIVATED: number;
    let RFID_ERROR_LAYER6_PWD_BLOCKED2: number;
    let RFID_ERROR_LAYER6_PWD_DEACTIVATED2: number;
    let RFID_ERROR_LAYER6_PWD_SUSPEND2: number;
    let RFID_ERROR_LAYER6_PWD_FAILED: number;
    let RFID_ERROR_NOT_PERFORMED: number;
    let RFID_ERROR_SESSION_IS_CLOSED: number;
    let RFID_ERROR_SESSION_TERMINAL_UNSUPPORTED_OPERATION: number;
    let RFID_ERROR_SESSION_TERMINAL_TYPE_UNKNOWN: number;
    let RFID_ERROR_SESSION_TERMINAL_TYPE_BAD_CERTIFICATE: number;
    let RFID_ERROR_SESSION_TERMINAL_TYPE_NOT_SET: number;
    let RFID_ERROR_SESSION_PROCEDURE_TYPE_UNKNOWN: number;
    let RFID_ERROR_Session_Procedure_Type_Unsupported: number;
    let RFID_ERROR_SESSION_PROCEDURE_TYPE_NOT_SET: number;
    let RFID_ERROR_SESSION_ACCESS_KEY_UNKNOWN_TYPE: number;
    let RFID_ERROR_SESSION_ACCESS_KEY_UNSUPPORTED_SM_TYPE: number;
    let RFID_ERROR_SESSION_ACCESS_KEY_INCORRECT_SM_TYPE: number;
    let RFID_ERROR_SESSION_ACCESS_KEY_RESTRICTED: number;
    let RFID_ERROR_SESSION_ACCESS_KEY_INCORRECT_DATA: number;
    let RFID_ERROR_SESSION_ACCESS_KEY_NOT_SET: number;
    let RFID_ERROR_SESSION_PWD_MANAGEMENT_NOT_AUTHORIZED: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_UNKNOWN_TYPE: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_SM: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_PACE: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_CA_KEYS: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_TA: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_REQUIRES_CA: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_INCORRECT_OPTION_CA: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_CA_FAILED: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_TA_FAILED: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_AA_FAILED: number;
    let RFID_ERROR_SESSION_ACCESS_CONTROL_RI_FAILED: number;
    let RFID_ERROR_SESSION_PA_SIGNATURE_CHECK_FAILED: number;
    let RFID_ERROR_SESSION_PA_HASH_CHECK_FAILED: number;
    let RFID_ERROR_SESSION_INVALID_AUX_DATA_DATE_OF_EXPIRY: number;
    let RFID_ERROR_SESSION_INVALID_AUX_DATA_DATE_OF_BIRTH: number;
    let RFID_ERROR_SESSION_INVALID_AUX_DATA_COMMUNITY_ID: number;
    let RFID_ERROR_SESSION_E_SIGN_REQUIRES_APP_SELECTION: number;
    let RFID_ERROR_SESSION_E_SIGN_PIN_NOT_SET: number;
    let RFID_ERROR_SESSION_E_SIGN_PIN_NOT_VERIFIED: number;
    let RFID_ERROR_SESSION_INCORRECT_DATA: number;
    let RFID_ERROR_SESSION_FILE_NOT_ENOUGH_DATA: number;
    let RFID_ERROR_SESSION_FILE_INCORRECT_DATA: number;
    let RFID_ERROR_SESSION_FILE_UNEXPECTED_DATA: number;
    let RFID_ERROR_SESSION_FILE_CONTENTS_UNEXPECTED_DATA: number;
    let RFID_ERROR_SESSION_FILE_WRONG_TAG: number;
    let RFID_ERROR_SESSION_FILE_CANT_USE_DATA: number;
    let RFID_ERROR_SESSION_FILE_CANT_READ_DATA: number;
    let RFID_ERROR_SESSION_FILE_ACCESS_DENIED: number;
    let RFID_ERROR_LAYER34_NO_ERROR: number;
    let RFID_ERROR_LAYER34_TIME_OUT: number;
    let RFID_ERROR_LAYER34_COLLISION: number;
    let RFID_ERROR_LAYER34_CRC: number;
    let RFID_ERROR_LAYER34_DATA_INTEGRITY: number;
    let RFID_ERROR_LAYER34_DATA_LENGTH: number;
    let RFID_ERROR_Layer34_RFU: number;
    let RFID_ERROR_LAYER34_COLLISION_TOO_MANY: number;
    let RFID_ERROR_LAYER34_PROTOCOL_B: number;
    let RFID_ERROR_LAYER34_DATA_CONTENTS: number;
    let RFID_ERROR_LAYER34_PROTOCOL: number;
    let RFID_ERROR_LAYER34_GLOBAL_TIME_OUT: number;
    let RFID_ERROR_LAYER34_MIFARE_AUTH: number;
    let RFID_ERROR_LAYER34_SAM_ERROR: number;
    let RFID_ERROR_LAYER34_SAM_COLLISION: number;
    let RFID_ERROR_LAYER34_SAM_ACKNOWLEDGE: number;
}
declare namespace eLDS_ParsingErrorCodes {
    let ERR_LDS_OK: number;
    let ERR_LDS_ASN_INCORRECT_DATA: number;
    let RR_LDS_ASN_NOT_ENOUGH_DATA: number;
    let ERR_LDS_ASN_CONTENTS_UNEXPECTED_DATA: number;
    let ERR_LDS_ASN_SIGNED_DATA_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNED_DATA_ENCAP_CONTENTS_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNED_DATA_VERSION_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNED_DATA_DIGEST_ALGORITHMS_INCORRECT_DATA: number;
    let ERR_LDS_ASN_LDS_OBJECT_INCORRECT_DATA: number;
    let ERR_LDS_ASN_LDS_OBJECT_VERSION_INCORRECT_DATA: number;
    let ERR_LDS_ASN_LDS_OBJECT_DIGEST_ALGORITHM_INCORRECT_DATA: number;
    let ERR_LDS_ASN_LDS_OBJECT_DG_HASHES_INCORRECT_DATA: number;
    let ERR_LDS_ASN_LDS_OBJECT_VERSION_INFO_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_VERSION_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_SN_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_SIGNATURE_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_ISSUER_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_VALIDITY_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_SUBJECT_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_SUBJECT_PK_INCORRECT_DATA: number;
    let ERR_LDS_ASN_CERTIFICATE_EXTENSIONS_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_VERSION_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_SID_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_DIGEST_ALG_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_SIGNED_ATTRS_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_SIGN_ALG_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_SIGNATURE_INCORRECT_DATA: number;
    let ERR_LDS_ASN_SIGNER_INFO_UNSIGNED_ATTRS_INCORRECT_DATA: number;
    let ERR_LDS_ICAO_LDS_OBJECT_UNSUPPORTED_DIGEST_ALGORITHM: number;
    let ERR_LDS_ICAO_SIGNED_DATA_SIGNER_INFOS_EMPTY: number;
    let ERR_LDS_ICAO_SIGNER_INFO_UNSUPPORTED_DIGEST_ALGORITHM: number;
    let ERR_LDS_ICAO_SIGNER_INFO_UNSUPPORTED_SIGNATURE_ALGORITHM: number;
    let ERR_LDS_ICAO_SIGNER_INFO_MESSAGE_DIGEST_ERROR: number;
    let ERR_LDS_ICAO_SIGNER_INFO_SIGNED_ATTRS_MISSED: number;
    let ERR_LDS_AUTH_SIGNER_INFO_CANT_FIND_CERTIFICATE: number;
    let ERR_LDS_AUTH_ERROR: number;
    let ERR_LDS_AUTH_UNSUPPORTED_SIGNATURE_ALGORITHM: number;
    let ERR_LDS_AUTH_UNSUPPORTED_PUBLIC_KEY_ALGORITHM: number;
    let ERR_LDS_AUTH_MESSED_ALGORITHMS: number;
    let ERR_LDS_AUTH_PUBLIC_KEY_DATA_INVALID: number;
    let ERR_LDS_AUTH_ALGORITHM_PARAMETERS_DATA_INVALID: number;
    let ERR_LDS_AUTH_SIGNATURE_DATA_INVALID: number;
    let ERR_LDS_AUTH_UNSUPPORTED_DIGEST_ALGORITHM: number;
    let ERR_LDS_AUTH_SIGNATURE_DATA_INCORRECT: number;
    let ERR_LDS_AUTH_ALGORITHM_PARAMETERS_NOT_DEFINED: number;
    let ERR_LDS_AUTH_SIGNATURE_CHECK_FAILED: number;
    let ERR_LDS_DG_WRONG_TAH: number;
    let ERR_LDS_DG_CONTENTS_UNEXPECTED_DATA: number;
    let ERR_LDS_BAP_SYMMETRIC_CYPHER_CANT_INITIALIZE: number;
    let ERR_LDS_PACE_INFO_NOT_AVAILABLE: number;
    let ERR_LDS_PACE_SYMMETRIC_CYPHER_CANT_INITIALIZE: number;
    let ERR_LDS_PACE_KEY_AGREEMENT_CANT_INITIALIZE: number;
    let ERR_LDS_PACE_EPHEMERAL_KEYS_CANT_CREATE: number;
    let ERR_LDS_PACE_MAPPING_CANT_DECODE_NONCE: number;
    let ERR_LDS_PACE_SHARED_SECRET_CANT_CREATE: number;
    let ERR_LDS_PACE_DOMAIN_PARAMS_UNSUPPORTED_FORMAT: number;
    let ERR_LDS_PACE_EPHEMERAL_KEYS_INCORRECT: number;
    let ERR_LDS_PACE_MAPPING_EPHEMERAL_KEYS_INCORRECT: number;
    let ERR_LDS_PACE_MAPPING_CANT_PERFORM: number;
    let ERR_LDS_PACE_NON_MATCHING_AUTH_TOKENS: number;
    let ERR_LDS_PACE_CAM_DATA_INCORRECT: number;
    let ERR_LDS_PACE_CAM_DATA_CANT_VERIFY: number;
    let ERR_LDS_PACE_CAM_DATA_NON_MATCHING: number;
    let ERR_LDS_PACE_IM_SCHEME_INCORRECT: number;
    let ERR_LDS_PACE_IM_RANDOM_MAPPING_FAILED: number;
    let ERR_LDS_CA_CANT_FIND_PUBLIC_KEY: number;
    let ERR_LDS_CA_CANT_FIND_INFO: number;
    let ERR_LDS_CA_INCORRECT_VERSION: number;
    let ERR_LDS_CA_CANT_FIND_DOMAIN_PARAMETERS: number;
    let ERR_LDS_CA_KEY_AGREEMENT_CANT_INITIALIZE: number;
    let ERR_LDS_CA_PUBLIC_KEY_UNSUPPORTED_ALGORITHM: number;
    let ERR_LDS_CA_EPHEMERAL_KEYS_CANT_CREATE: number;
    let ERR_LDS_CA_SHARED_SECRET_CANT_CREATE: number;
    let ERR_LDS_CA_NON_MATCHING_AUTH_TOKENS: number;
    let ERR_LDS_TA_INCORRECT_VERSION: number;
    let ERR_LDS_TA_CANT_BUILD_CERTIFICATE_CHAIN: number;
    let ERR_LDS_TA_CANT_FIND_IS_PRIVATE_KEY: number;
    let ERR_LDS_TA_PUBLIC_KEY_UNSUPPORTED_ALGORITHM: number;
    let ERR_LDS_TA_SIGNATURE_BUILDING_ERROR: number;
    let ERR_LDS_TA_INVALID_KEY_ALGORITHM_PARAMETERS: number;
    let ERR_LDS_AA_PUBLIC_KEY_UNSUPPORTED_ALGORITHM: number;
    let ERR_LDS_AA_PUBLIC_KEY_INCORRECT_DATA: number;
    let ERR_LDS_AA_PUBLIC_KEY_INCORRECT_PARAMETERS: number;
    let ERR_LDS_AA_PUBLIC_KEY_UNDEFINED_PARAMETERS: number;
    let ERR_LDS_AA_SIGNATURE_INCORRECT_DATA: number;
    let ERR_LDS_AA_UNSUPPORTED_RECOVERY_SCHEME: number;
    let ERR_LDS_AA_INCORRECT_TRAILER: number;
    let ERR_LDS_AA_UNSUPPORTED_DIGEST_ALGORITHM: number;
    let ERR_LDS_RI_SECTOR_KEY_CANT_FIND: number;
    let ERR_LDS_RI_SECTOR_KEY_INCORRECT_DATA: number;
    let ERR_LDS_RI_SECTOR_KEY_INCOMPLETE_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_MISSING_MANDATORY_DATA_PK: number;
    let ERR_LDS_CV_CERTIFICATE_PUBLIC_KEY_UNSUPPORTED: number;
    let ERR_LDS_CV_CERTIFICATE_CHAT_UNSUPPORTED_TERMINAL_TYPE: number;
    let ERR_LDS_CV_CERTIFICATE_PRIVATE_KEY_UNSUPPORTED: number;
    let ERR_LDS_CV_CERTIFICATE_PRIVATE_KEY_INVALID_PARAMS: number;
    let ERR_LDS_CV_CERTIFICATE_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_CPI_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_CAR_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_PUBLIC_KEY_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_CHR_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_CHAT_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_VALID_FROM_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_VALID_TO_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_EXTENSIONS_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_PRIVATE_KEY_INCORRECT_DATA: number;
    let ERR_LDS_CV_CERTIFICATE_PRIVATE_KEY_MISSING: number;
    let ERR_LDS_VDS_UNSUPPORTED_VERSION: number;
    let ERR_LDS_VDS_ISSUING_COUNTRY_SIZE: number;
    let ERR_LDS_VDS_ISSUING_COUNTRY_INCORRECT_DATA: number;
    let ERR_LDS_VDS_SIGNER_CERTIFICATE_SIZE: number;
    let ERR_LDS_VDS_SIGNER_CERTIFICATE_DATA: number;
    let ERR_LDS_VDS_SIGNATURE_INCORRECT_DATA: number;
    let ERR_LDS_VDS_NC_INCORRECT_DATA: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_DATA: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_HEADER: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_TYPE: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_VERSION: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_ISSUING_COUNTRY: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_MESSAGE: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_SIGNATURE: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_SIG_ALGORITHM: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_CERTIFICATE: number;
    let ERR_LDS_VDS_NC_MISSING_OR_INCORRECT_SIG_VALUE: number;
}
declare namespace eRFID_CertificateType {
    let CT_UNDEFINED: number;
    let CT_CSCA: number;
    let CT_CSCA_LINK: number;
    let CT_DS: number;
    let CT_MLS: number;
    let CT_DEV_LS: number;
    let CT_DEF_LS: number;
    let CT_BLS: number;
    let CT_LDS2: number;
    let CT_BCS: number;
    let CT_BCSNC: number;
}
declare namespace RGLMeasureSystem {
    let METRIC: number;
    let IMPERIAL: number;
}
declare namespace eRPRM_ResultType {
    let NONE_1: number;
    export { NONE_1 as NONE };
    export let RPRM_RESULT_TYPE_EMPTY: number;
    export let RPRM_RESULT_TYPE_RAW_IMAGE: number;
    export let RPRM_RESULT_TYPE_FILE_IMAGE: number;
    export let RPRM_RESULT_TYPE_MRZ_OCR_EXTENDED: number;
    export let RPRM_RESULT_TYPE_BARCODES: number;
    export let RPRM_RESULT_TYPE_GRAPHICS: number;
    export let RPRM_RESULT_TYPE_MRZ_TEST_QUALITY: number;
    export let RPRM_RESULT_TYPE_DOCUMENT_TYPES_CANDIDATES: number;
    export let RPRM_RESULT_TYPE_CHOSEN_DOCUMENT_TYPE_CANDIDATE: number;
    export let RPRM_RESULT_TYPE_DOCUMENTS_INFO_LIST: number;
    export let RPRM_RESULT_TYPE_OCR_LEXICAL_ANALYZE: number;
    export let RPRM_RESULT_TYPE_RAW_UNCROPPED_IMAGE: number;
    export let RPRM_RESULT_TYPE_VISUAL_OCR_EXTENDED: number;
    export let RPRM_RESULT_TYPE_BAR_CODES_TEXT_DATA: number;
    export let RPRM_RESULT_TYPE_BAR_CODES_IMAGE_DATA: number;
    export let RPRM_RESULT_TYPE_AUTHENTICITY: number;
    export let RPRM_RESULT_TYPE_EOS_IMAGE: number;
    export let RPRM_RESULT_TYPE_BAYER_IMAGE: number;
    export let RPRM_RESULT_TYPE_MAGNETIC_STRIPE: number;
    export let RPRM_RESULT_TYPE_MAGNETIC_STRIPE_TEXT_DATA: number;
    export let RPRM_RESULT_TYPE_FIELD_FILE_IMAGE: number;
    export let RPRM_RESULT_TYPE_DATABASE_CHECK: number;
    export let RPRM_RESULT_TYPE_FINGERPRINT_TEMPLATE_ISO: number;
    export let RPRM_RESULT_TYPE_INPUT_IMAGE_QUALITY: number;
    export let RPRM_RESULT_TYPE_INTERNAL_RFID_SESSION: number;
    export let RPRM_RESULT_TYPE_INTERNAL_ENCRYPTED_RCL: number;
    export let RPRM_RESULT_TYPE_INTERNAL_LICENSE: number;
    export let RPRM_RESULT_TYPE_TEXT: number;
    export let RPRM_RESULT_TYPE_IMAGES: number;
    export let RPRM_RESULT_TYPE_HOLO_PARAMS: number;
    export let RPRM_RESULT_TYPE_DOCUMENT_POSITION: number;
    export let RPRM_RESULT_TYPE_CUSTOM: number;
    export let RFID_RESULT_TYPE_RFID_RAW_DATA: number;
    export let RFID_RESULT_TYPE_RFID_TEXT_DATA: number;
    export let RFID_RESULT_TYPE_RFID_IMAGE_DATA: number;
    export let RFID_RESULT_TYPE_RFID_BINARY_DATA: number;
    export let RFID_RESULT_TYPE_RFID_ORIGINAL_GRAPHICS: number;
    export let RPRM_RESULT_TYPE_BARCODE_POSITION: number;
    export let RPRM_RESULT_TYPE_MRZ_POSITION: number;
    export let RPRM_RESULT_TYPE_LIVE_PORTRAIT: number;
    export let RPRM_RESULT_TYPE_STATUS: number;
    export let RPRM_RESULT_TYPE_PORTRAIT_COMPARISON: number;
    export let RPRM_RESULT_TYPE_EXT_PORTRAIT: number;
}
declare namespace CameraTypes {
    let FRONT: string;
    let BACK: string;
}
declare namespace FrameShapeType {
    let LINE: number;
    let CORNER: number;
}
declare namespace eRFID_BaudRate {
    let rfbr_106: number;
    let rfbr_212: number;
    let rfbr_424: number;
    let rfbr_848: number;
}
declare namespace eRPRM_FieldVerificationResult {
    let RCF_DISABLED: number;
    let RCF_VERIFIED: number;
    let RCF_NOT_VERIFIED: number;
    let RCF_COMPARE_TRUE: number;
    let RCF_COMPARE_FALSE: number;
}
interface DocReaderAction {
    COMPLETE: number;
    PROCESS: number;
    MORE_PAGES_AVAILABLE: number;
    CANCEL: number;
    ERROR: number;
    PROCESS_WHITE_FLASHLIGHT: number;
    TIMEOUT: number;
    PROCESSING_ON_SERVICE: number;
    NOTIFICATION: number;
    PROCESS_WHITE_UV_IMAGES: number;
    PROCESS_IR_FRAME: number;
}
declare namespace eProcessGLCommands {
    let ePC_ProcMgr_SetLicense: number;
    let ePC_ProcMgr_Process: number;
    let ePC_ProcMgr_ProcessAsync: number;
    let ePC_ProcMgr_Init: number;
    let ePC_ProcMgr_ProcessImage: number;
    let ePC_ProcMgr_StartNewDocument: number;
    let ePC_ProcMgr_StartNewPage: number;
    let ePC_ProcMgr_Unload: number;
    let ePC_ProcMgr_CheckDatabase: number;
    let ePC_ProcMgr_ComparePortraits: number;
    let ePC_RFID_SetTCCParams: number;
    let ePC_RFID_SetReprocessingParams: number;
}
declare namespace PKDResourceType {
    let CERTIFICATE_PA: number;
    let CERTIFICATE_TA: number;
    let LDIF: number;
    let CRL: number;
    let ML: number;
    let DEFL: number;
    let DEVL: number;
    let BL: number;
    function getType(value: any): number;
}
declare namespace eRFID_AuthenticationProcedureType {
    let aptUndefined: number;
    let aptStandard: number;
    let aptAdvanced: number;
    let aptGeneral: number;
}
declare namespace DocumentReaderErrorCodes {
    let INITIALIZATION_CORE_ABSENT: number;
    let INITIALIZATION_FAILED: number;
    let INCORRECT_SCENARIO: number;
    let NO_RESULT: number;
    let REMOVE_DATABASE: number;
    let FETCHING_DATABASE: number;
    let DB_ID_NOT_FOUND: number;
    let DB_DESCRIPTION_NOT_FOUND: number;
    let SAVE_DB: number;
    let DOWNLOAD_DB_INCORRECT_CHECKSUM: number;
    let DB_DOWNLOAD: number;
    let LICENSE_ABSENT_OR_CORRUPTED: number;
    let LICENSE_INVALID_DATE: number;
    let LICENSE_INVALID_VERSION: number;
    let LICENSE_INVALID_DEVICE_ID: number;
    let LICENSE_INVALID_SYSTEM_OR_APP_ID: number;
    let LICENSE_NO_CAPABILITIES: number;
    let LICENSE_NO_AUTHENTICITY: number;
    let RECORD_PROCESS_INVALID_OUTPUT_URL: number;
    let LICENSE_ONLINE_ERROR: number;
    let LICENSE_NO_DATABASE: number;
    let LICENSE_DATABASE_INCORRECT: number;
    let INVALID_TCC_PARAMS: number;
    let RFID_IN_PROGRESS: number;
    let NATIVE_JAVA_EXCEPTION: number;
    let BACKEND_ONLINE_PROCESSING: number;
    let WRONG_INPUT: number;
    let STATE_EXCEPTION: number;
    let BLE_EXCEPTION: number;
    let FEATURE_BLUETOOTH_LE_NOT_SUPPORTED: number;
    let APP_BACKGROUND: number;
    let ONLINE_PROCESSING_WRONG_INPUT: number;
}

interface ScenarioIdentifier {
    SCENARIO_MRZ: string;
    SCENARIO_BARCODE: string;
    SCENARIO_LOCATE: string;
    SCENARIO_OCR: string;
    SCENARIO_DOCTYPE: string;
    SCENARIO_MRZ_OR_BARCODE: string;
    SCENARIO_MRZ_OR_LOCATE: string;
    SCENARIO_MRZ_AND_LOCATE: string;
    SCENARIO_MRZ_OR_OCR: string;
    SCENARIO_MRZ_OR_BARCODE_OR_OCR: string;
    SCENARIO_LOCATE_VISUAL_AND_MRZ_OR_OCR: string;
    SCENARIO_FULL_PROCESS: string;
    SCENARIO_FULL_AUTH: string;
    SCENARIO_ID3RUS: string;
    SCENARIO_RUS_STAMP: string;
    SCENARIO_OCR_FREE: string;
    SCENARIO_CREDIT_CARD: string;
    SCENARIO_CAPTURE: string;
    SCENARIO_BARCODE_AND_LOCATE: string;
}

declare namespace eRFID_AccessControl_ProcedureType {
    let ACPT_UNDEFINED: number;
    let ACPT_BAC: number;
    let ACPT_PACE: number;
    let ACPT_CA: number;
    let ACPT_TA: number;
    let ACPT_AA: number;
    let ACPT_RI: number;
    let ACPT_CARD_INFO: number;
}
declare namespace eRFID_NotificationCodes {
    let RFID_NOTIFICATION_ERROR: number;
    let RFID_NOTIFICATION_DOCUMENT_READY: number;
    let RFID_NOTIFICATION_READ_PROTOCOL4: number;
    let RFID_NOTIFICATION_READ_PROTOCOL3: number;
    let RFID_NOTIFICATION_PROGRESS: number;
    let RFID_NOTIFICATION_TA_STEP: number;
    let RFID_NOTIFICATION_SM_REQUIRED: number;
    let RFID_NOTIFICATION_ISO_ERROR: number;
    let RFID_NOTIFICATION_PA_REQUEST: number;
    let RFID_NOTIFICATION_SM_ESTABLISHED: number;
    let RFID_NOTIFICATION_PCSC_READER_DISCONNECTED: number;
    let RFID_NOTIFICATION_PCSC_READER_LIST_CHANGED: number;
    let RFID_NOTIFICATION_PCSC_BYTES_RECEIVED: number;
    let RFID_NOTIFICATION_PCSC_TOTAL_READING_TIME: number;
    let RFID_NOTIFICATION_PCSC_DATA_RECEIVED: number;
    let RFID_NOTIFICATION_PCSC_BYTES_SENT: number;
    let RFID_NOTIFICATION_PCSC_TOTAL_READING_SPEED: number;
    let RFID_NOTIFICATION_PCSC_TOTAL_PROCESS_TIME: number;
    let RFID_NOTIFICATION_PCSC_READER_LIST_CHANGING: number;
    let RFID_NOTIFICATION_PCSC_EXT_LENGTH_SUPPORT: number;
    let RFID_NOTIFICATION_PA_CERTIFICATE_CHAIN: number;
    let RFID_NOTIFICATION_PA_CERTIFICATE_CHAIN_ITEM: number;
    let RFID_NOTIFICATION_SCENARIO: number;
    let RFID_NOTIFICATION_PCSC_READING_DATAGROUP: number;
    let RFID_NOTIFICATION_PCSC_FILE_NOT_FOUND: number;
    let RFID_NOTIFICATION_PCSC_END_OF_FILE: number;
    let RFID_NOTIFICATION_PCSC_FILE_ACCESS_DENIED: number;
    let RFID_NOTIFICATION_PCSC_APPLICATION_SELECTED: number;
    let RFID_NOTIFICATION_AC_PROCEDURE_START: number;
    let RFID_NOTIFICATION_AC_PROCEDURE_FINISH: number;
    let RFID_NOTIFICATION_PA_SECURITY_OBJECT_CHECK: number;
    let RFID_NOTIFICATION_PA_FILE_CHECK: number;
    let RFID_NOTIFICATION_PCSC_UPDATING_DATAGROUP: number;
    let RFID_NOTIFICATION_AUXILIARY_DATA_VALIDATION: number;
    let RFID_NOTIFICATION_RI_SECTOR_ID: number;
    let RFID_NOTIFICATION_BIOMETRICS_EMPTY_PLACEHOLDER: number;
}
declare namespace eRFID_Password_Type {
    let PPT_UNKNOWN: number;
    let PPT_MRZ: number;
    let PPT_CAN: number;
    let PPT_PIN: number;
    let PPT_PUK: number;
    let PPT_PIN_ESIGN: number;
    let PPT_SAI: number;
}
declare namespace BarcodeResult {
    let NO_ERR: number;
    let NULL_PTR_ERR: number;
    let BAD_ARG_ERR: number;
    let SIZE_ERR: number;
    let RANGE_ERR: number;
    let INTERNAL_ERR: number;
    let TRY_EXCEPT_ERR: number;
    let BAR_CODE_NOT_FOUND: number;
    let BAR_CODE_DECODE_ERR: number;
    let NO_USER_DLL_FOUND: number;
    let NO_IPP_DLL_FOUND: number;
    let IPP_EXEC_ERR: number;
    let IPP_TRY_EXCEPT_ERR: number;
    let BARCODE_ERROR_INPUT_PARAM: number;
    let BARCODE_ERROR_FINIT: number;
    let BARCODE_ERROR_NOT_LOAD_IP_DECODED_LL: number;
    let BARCODE_ERROR_INNER_PROBLEM: number;
    let BARCODE_ERROR_DECODE_1D_BAD_DECODE: number;
    let BARCODE_ERROR_FIND_ROW_OR_COLUMN: number;
    let BARCODE_ERROR_FIND_3X8_2D_X: number;
    let BARCODE_ERROR_FIND_3X8_2D_Y: number;
    let BARCODE_ERROR_2D_UGOL_MAX: number;
    let BARCODE_ERROR_INDEFINITELY_DECODED: number;
    let BARCODE_ERROR_DLL_NOT_INIT: number;
    let BARCODE_ERROR_IP_DECODE_DLL_Try_Except: number;
    let IPDECODE_ERROR_LARGEERRORS: number;
    let IPDECODE_ERROR_FAULTCOLUMNS: number;
    let IPDECODE_ERROR_FAULTROWS: number;
    let IPDECODE_ERROR_INCORRECT_ERROR_LEVEL: number;
    let IPDECODE_ERROR_LOADING_DEV_TABLE: number;
}
declare namespace eSignManagementAction {
    let smaUndefined: number;
    let smaCreatePIN: number;
    let smaChangePIN: number;
    let smaUnblockPIN: number;
    let smaTerminatePIN: number;
    let smaGenerateKeys: number;
    let smaTerminateKeys: number;
    let smaSignData: number;
}
declare namespace eCheckDiagnose {
    let UNKNOWN: number;
    let PASS: number;
    let INVALID_INPUT_DATA: number;
    let INTERNAL_ERROR: number;
    let EXCEPTION_IN_MODULE: number;
    let UNCERTAIN_VERIFICATION: number;
    let NECESSARY_IMAGE_NOT_FOUND: number;
    let PHOTO_SIDES_NOT_FOUND: number;
    let INVALID_CHECKSUM: number;
    let SYNTAX_ERROR: number;
    let LOGIC_ERROR: number;
    let SOURCES_COMPARISON_ERROR: number;
    let FIELDS_COMPARISON_LOGIC_ERROR: number;
    let INVALID_FIELD_FORMAT: number;
    let TRUE_LUMINISCENCE_ERROR: number;
    let FALSE_LUMINISCENCE_ERROR: number;
    let FIXED_PATTERN_ERROR: number;
    let LOW_CONTRAST_IN_IR_LIGHT: number;
    let INCORRECT_BACKGROUND_LIGHT: number;
    let BACKGROUND_COMPARISON_ERROR: number;
    let INCORRECT_TEXT_COLOR: number;
    let PHOTO_FALSE_LUMINISCENCE: number;
    let TOO_MUCH_SHIFT: number;
    let FIBERS_NOT_FOUND: number;
    let TOO_MANY_OBJECTS: number;
    let SPECKS_IN_UV: number;
    let TOO_LOW_RESOLUTION: number;
    let INVISIBLE_ELEMENT_PRESENT: number;
    let VISIBLE_ELEMENT_ABSENT: number;
    let ELEMENT_SHOULD_BE_COLORED: number;
    let ELEMENT_SHOULD_BE_GRAYSCALE: number;
    let PHOTO_WHITE_IR_DONT_MATCH: number;
    let UV_DULL_PAPER_MRZ: number;
    let FALSE_LUMINISCENCE_IN_MRZ: number;
    let UV_DULL_PAPER_PHOTO: number;
    let UV_DULL_PAPER_BLANK: number;
    let UV_DULL_PAPER_ERROR: number;
    let FALSE_LUMINISCENCE_IN_BLANK: number;
    let BAD_AREA_IN_AXIAL: number;
    let FALSE_IPI_PARAMETERS: number;
    let FIELD_POS_CORRECTOR_HIGHLIGHT_IR: number;
    let FIELD_POS_CORRECTOR_GLARES_IN_PHOTO_AREA: number;
    let FIELD_POS_CORRECTOR_PHOTO_REPLACED: number;
    let OVI_IR_INVISIBLE: number;
    let OVI_INSUFFICIENT_AREA: number;
    let OVI_COLOR_INVARIABLE: number;
    let OVI_BAD_COLOR_FRONT: number;
    let OVI_BAD_COLOR_SIDE: number;
    let OVI_WIDE_COLOR_SPREAD: number;
    let OVI_BAD_COLOR_PERCENT: number;
    let HOLOGRAM_ELEMENT_ABSENT: number;
    let HOLOGRAM_SIDE_TOP_IMAGES_ABSENT: number;
    let HOLOGRAM_ELEMENT_PRESENT: number;
    let HOLOGRAM_FRAMES_IS_ABSENT: number;
    let HOLOGRAM_HOLO_FIELD_IS_ABSENT: number;
    let PHOTO_PATTERN_INTERRUPTED: number;
    let PHOTO_PATTERN_SHIFTED: number;
    let PHOTO_PATTERN_DIFFERENT_COLORS: number;
    let PHOTO_PATTERN_IR_VISIBLE: number;
    let PHOTO_PATTERN_NOT_INTERSECT: number;
    let PHOTO_SIZE_IS_WRONG: number;
    let PHOTO_PATTERN_INVALID_COLOR: number;
    let PHOTO_PATTERN_SHIFTED_VERT: number;
    let PHOTO_PATTERN_PATTERN_NOT_FOUND: number;
    let PHOTO_PATTERN_DIFFERENT_LINES_THICKNESS: number;
    let PHOTO_IS_NOT_RECTANGLE: number;
    let PHOTO_CORNERS_IS_WRONG: number;
    let DOCUMENT_IS_CANCELLING: number;
    let TEXT_COLOR_SHOULD_BE_BLUE: number;
    let TEXT_COLOR_SHOULD_BE_GREEN: number;
    let TEXT_COLOR_SHOULD_BE_RED: number;
    let TEXT_SHOULD_BE_BLACK: number;
    let BARCODE_WAS_READ_WITH_ERRORS: number;
    let BARCODE_DATA_FORMAT_ERROR: number;
    let BARCODE_SIZE_PARAMS_ERROR: number;
    let NOT_ALL_BARCODES_READ: number;
    let GLARES_IN_BARCODE_AREA: number;
    let PORTRAIT_COMPARISON_PORTRAITS_DIFFER: number;
    let PORTRAIT_COMPARISON_NO_SERVICE_REPLY: number;
    let PORTRAIT_COMPARISON_SERVICE_ERROR: number;
    let PORTRAIT_COMPARISON_NOT_ENOUGH_IMAGES: number;
    let PORTRAIT_COMPARISON_NO_LIVE_PHOTO: number;
    let PORTRAIT_COMPARISON_NO_SERVICE_LICENSE: number;
    let PORTRAIT_COMPARISON_NO_PORTRAIT_DETECTED: number;
    let MOBILE_IMAGES_UNSUITABLE_LIGHT_CONDITIONS: number;
    let MOBILE_IMAGES_WHITE_UV_NO_DIFFERENCE: number;
    let FINGERPRINTS_COMPARISON_MISMATCH: number;
    let HOLO_PHOTO_FACE_NOT_DETECTED: number;
    let HOLO_PHOTO_FACE_COMPARISON_FAILED: number;
    let HOLO_PHOTO_FACE_GLARE_IN_CENTER_ABSENT: number;
    let HOLO_ELEMENT_SHAPE_ERROR: number;
    let ALGORITHM_STEPS_ERROR: number;
    let HOLO_AREAS_NOT_LOADED: number;
    let FINISHED_BY_TIMEOUT: number;
    let HOLO_PHOTO_DOCUMENT_OUTSIDE_FRAME: number;
    let LIVENESS_DEPTH_CHECK_FAILED: number;
    let MRZ_QUALITY_WRONG_SYMBOL_POSITION: number;
    let MRZ_QUALITY_WRONG_BACKGROUND: number;
    let MRZ_QUALITY_WRONG_MRZ_WIDTH: number;
    let MRZ_QUALITY_WRONG_MRZ_HEIGHT: number;
    let MRZ_QUALITY_WRONG_LINE_POSITION: number;
    let MRZ_QUALITY_WRONG_FONT_TYPE: number;
    let OCR_QUALITY_TEXT_POSITION: number;
    let OCR_QUALITY_INVALID_FONT: number;
    let OCR_QUALITY_INVALID_BACKGROUND: number;
    let LAS_INK_INVALID_LINES_FREQUENCY: number;
    let DOC_LIVENESS_ELECTRONIC_DEVICE_DETECTED: number;
    let DOC_LIVENESS_INVALID_BARCODE_BACKGROUND: number;
    let LAST_DIAGNOSE_VALUE: number;
}
declare namespace RFIDDelegate {
    let NULL: number;
    let NO_PA: number;
    let FULL: number;
}
interface TextProcessing {
    ocNoChange: number;
    ocUppercase: number;
    ocLowercase: number;
    ocCapital: number;
}
declare namespace ProcessingFinishedStatus {
    export let NOT_READY: number;
    export let READY: number;
    let TIMEOUT_1: number;
    export { TIMEOUT_1 as TIMEOUT };
}
declare namespace DocFormat {
    export let ID1: number;
    export let ID2: number;
    export let ID3: number;
    export let NON: number;
    export let A4: number;
    export let ID3_x2: number;
    export let ID2_TURKEY: number;
    export let ID1_90: number;
    export let ID1_180: number;
    export let ID1_270: number;
    export let ID2_180: number;
    export let ID3_180: number;
    export let CUSTOM: number;
    export let PHOTO: number;
    export let FLEXIBLE: number;
    let UNKNOWN_1: number;
    export { UNKNOWN_1 as UNKNOWN };
}
declare namespace eLDS_ParsingNotificationCodes {
    let NTF_LDS_ASN_CERTIFICATE_INCORRECT_VERSION: number;
    let NTF_LDS_ASN_CERTIFICATE_NON_MATCHING_SIGNATURE_ALGORITHM: number;
    let NTF_LDS_ASN_CERTIFICATE_INCORRECT_TIME_CODING: number;
    let NTF_LDS_ASN_CERTIFICATE_INCORRECT_USE_OF_GENERALIZED_TIME: number;
    let NTF_LDS_ASN_CERTIFICATE_EMPTY_ISSUER: number;
    let NTF_LDS_ASN_CERTIFICATE_EMPTY_SUBJECT: number;
    let NTF_LDS_ASN_CERTIFICATE_UNSUPPORTED_CRITICAL_EXTENSION: number;
    let NTF_LDS_ASN_CERTIFICATE_FORCED_DEFAULT_CSCA_ROLE: number;
    let NTF_LDS_ASN_CERTIFICATE_FORCED_DEFAULT_DS_ROLE: number;
    let NTF_LDS_ASN_CERTIFICATE_INCORRECT_ISSUER_SUBJECT_DS: number;
    let NTF_LDS_ASN_CERTIFICATE_DUPLICATING_EXTENSIONS: number;
    let NTF_LDS_ICAO_CERTIFICATE_VERSION_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_VERSION_INCORRECT: number;
    let NTF_LDS_ICAO_CERTIFICATE_ISSUER_COUNTRY_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_ISSUER_COMMON_NAME_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_ISSUER_COUNTRY_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_COUNTRY_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_COMMON_NAME_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_COUNTRY_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_USING_NON_COMPLIANT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_UNSUPPORTED_SIGNATURE_ALGORITHM: number;
    let NTF_LDS_ICAO_CERTIFICATE_UNSUPPORTED_PUBLIC_KEY_ALGORITHM: number;
    let NTF_LDS_ICAO_CERTIFICATE_MISSED_EXTENSIONS: number;
    let NTF_LDS_ICAO_CERTIFICATE_VALIDITY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_USING_NON_COMPLIANT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_KEY_USAGE_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_KEY_USAGE_NOT_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_KEY_USAGE_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_INCORRECT_USAGE1: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_INCORRECT_USAGE2: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_NOT_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_PATH_LEN_C_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_BASIC_C_PATH_LEN_C_INCORRECT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_EXT_KEY_USAGE_NOT_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_EXT_KEY_USAGE_INCORRECT_USAGE: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_EXT_KEY_USAGE_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_AUTH_KEY_ID_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_AUTH_KEY_ID_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_AUTH_KEY_ID_KEY_ID_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_KEY_ID_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_KEY_ID_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_PRIVATE_KEY_UP_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_PRIVATE_KEY_UP_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_PRIVATE_KEY_UP_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_DN_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_DN_INCORRECT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_SUBJECT_ALT_NAME_DN_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_DN_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_DN_INCORRECT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_ISSUER_ALT_NAME_DN_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_VERSION: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_DOC_TYPES: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_DOC_TYPES_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CERT_POLICIES_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CERT_POLICIES_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CERT_POLICIES_POLICY_ID_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CRL_DIST_POINT_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CRL_DIST_POINT_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CRL_DIST_POINT_EMPTY: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CRL_DIST_POINT_POINT_MISSED: number;
    let NTF_LDS_ICAO_CERTIFICATE_SN_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_ISSUER_SN_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_SN_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_ISSUER_ATTRIBUTE_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_ATTRIBUTE_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_ISSUER_SUBJECT_COUNTRY_NON_MATCHING: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_CSCA_ALT_NAMES_NON_MATCHING: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_NAME_CHANGE_INCORRECT_DATA: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_NAME_CHANGE_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_NAME_CHANGE_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_DOC_TYPE_LIST_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_EXT_OPTIONAL_CRITICAL: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_CERTIFICATE_SUBJECT_COMMON_NAME_NON_COMPLIANT: number;
    let NTF_LDS_ICAO_COM_LDS_VERSION_INCORRECT: number;
    let NTF_LDS_ICAO_COM_LDS_VERSION_MISSING: number;
    let NTF_LDS_ICAO_COM_UNICODE_VERSION_INCORRECT: number;
    let NTF_LDS_ICAO_COM_UNICODE_VERSION_MISSING: number;
    let NTF_LDS_ICAO_COM_DGPM_INCORRECT: number;
    let NTF_LDS_ICAO_COM_DGPM_MISSING: number;
    let NTF_LDS_ICAO_COM_DGPM_UNEXPECTED: number;
    let NTF_LDS_ICAO_APPLICATION_LDS_VERSION_UNSUPPORTED: number;
    let NTF_LDS_ICAO_APPLICATION_UNICODE_VERSION_UNSUPPORTED: number;
    let NTF_LDS_ICAO_APPLICATION_LDS_VERSION_INCONSISTENT: number;
    let NTF_LDS_ICAO_APPLICATION_UNICODE_VERSION_INCONSISTENT: number;
    let NTF_LDS_ASN_SIGNED_DATA_OID_INCORRECT: number;
    let NTF_LDS_ASN_SIGNED_DATA_VERSION_INCORRECT: number;
    let NTF_LDS_ASN_SIGNED_DATA_CONTENT_OID_INCORRECT: number;
    let NTF_LDS_ICAO_SIGNED_DATA_VERSION_INCORRECT: number;
    let NTF_LDS_ICAO_SIGNED_DATA_DIGEST_ALGORITHMS_EMPTY: number;
    let NTF_LDS_ICAO_SIGNED_DATA_DIGEST_ALGORITHMS_UNSUPPORTED: number;
    let NTF_LDS_ICAO_SIGNED_DATA_SIGNER_INFOS_MULTIPLE_ENTRIES: number;
    let NTF_LDS_ICAO_SIGNED_DATA_CERTIFICATES_MISSED: number;
    let NTF_LDS_ICAO_SIGNED_DATA_CERTIFICATES_EMPTY: number;
    let NTF_LDS_ICAO_SIGNED_DATA_CRLS_INCORRECT_USAGE: number;
    let NTF_LDS_ICAO_LDS_OBJECT_INCORRECT_CONTENT_OID: number;
    let NTF_LDS_ICAO_LDS_OBJECT_DG_NUMBER_INCORRECT: number;
    let NTF_LDS_ICAO_LDS_OBJECT_DG_HASH_MISSING: number;
    let NTF_LDS_ICAO_LDS_OBJECT_DG_HASH_EXTRA: number;
    let NTF_LDS_ICAO_LDS_OBJECT_VERSION_INCORRECT: number;
    let NTF_LDS_ICAO_MASTER_LIST_VERSION_INCORRECT: number;
    let NTF_LDS_ICAO_DEVIATION_LIST_VERSION_INCORRECT: number;
    let NTF_LDS_BSI_DEFECT_LIST_VERSION_INCORRECT: number;
    let NTF_LDS_BSI_BLACK_LIST_VERSION_INCORRECT: number;
    let NTF_LDS_ASN_SIGNER_INFO_VERSION_INCORRECT: number;
    let NTF_LDS_ASN_SIGNER_INFO_SID_INCORRECT_CHOICE: number;
    let NTF_LDS_ASN_SIGNER_INFO_SID_DIGEST_ALGORITHM_NOT_LISTED: number;
    let NTF_LDS_ASN_SIGNER_INFO_MESSAGE_DIGEST_ATTR_MISSING: number;
    let NTF_LDS_ASN_SIGNER_INFO_MESSAGE_DIGEST_ATTR_DATA: number;
    let NTF_LDS_ASN_SIGNER_INFO_MESSAGE_DIGEST_ATTR_Value: number;
    let NTF_LDS_ASN_SIGNER_INFO_CONTENT_TYPE_ATTR_MISSING: number;
    let NTF_LDS_ASN_SIGNER_INFO_CONTENT_TYPE_ATTR_DATA: number;
    let NTF_LDS_ASN_SIGNER_INFO_CONTENT_TYPE_ATTR_VALUE: number;
    let NTF_LDS_ASN_SIGNER_INFO_SIGNING_TIME_ATTR_MISSING: number;
    let NTF_LDS_ASN_SIGNER_INFO_SIGNING_TIME_ATTR_DATA: number;
    let NTF_LDS_ASN_SIGNER_INFO_SIGNING_TIME_ATTR_VALUE: number;
    let NTF_LDS_ASN_SIGNER_INFO_LIST_CONTENT_DESCRIPTION_ATTR_MISSING: number;
    let NTF_LDS_ASN_SIGNER_INFO_LIST_CONTENT_DESCRIPTION_ATTR_DATA: number;
    let NTF_LDS_AUTH_SIGNER_INFO_CERTIFICATE_VALIDITY: number;
    let NTF_LDS_AUTH_SIGNER_INFO_CERTIFICATE_ROOT_IS_NOT_TRUSTED: number;
    let NTF_LDS_AUTH_SIGNER_INFO_CERTIFICATE_CANT_FIND_CSCA: number;
    let NTF_LDS_AUTH_SIGNER_INFO_CERTIFICATE_REVOKED: number;
    let NTF_LDS_AUTH_SIGNER_INFO_CERTIFICATE_SIGNATURE_INVALID: number;
    let NTF_LDS_UNSUPPORTED_IMAGE_FORMAT: number;
    let NTF_LDS_MRZ_DOCUMENT_TYPE_UNKNOWN: number;
    let NTF_LDS_MRZ_ISSUING_STATE_SYNTAX_ERROR: number;
    let NTF_LDS_MRZ_NAME_IS_VOID: number;
    let NTF_LDS_MRZ_NUMBER_INCORRECT_CHECKSUM: number;
    let NTF_LDS_MRZ_NATIONALITY_SYNTAX_ERROR: number;
    let NTF_LDS_MRZ_DOB_SYNTAX_ERROR: number;
    let NTF_LDS_MRZ_DOB_ERROR: number;
    let NTF_LDS_MRZ_DOB_INCORRECT_CHECKSUM: number;
    let NTF_LDS_MRZ_SEX_INCORRECT: number;
    let NTF_LDS_MRZ_DOE_SYNTAX_ERROR: number;
    let NTF_LDS_MRZ_DOE_ERROR: number;
    let NTF_LDS_MRZ_DOE_INCORRECT_CHECKSUM: number;
    let NTF_LDS_MRZ_OPTIONAL_DATA_INCORRECT_CHECKSUM: number;
    let NTF_LDS_MRZ_INCORRECT_CHECKSUM: number;
    let NTF_LDS_MRZ_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_FORMAT_OWNER_MISSING: number;
    let NTF_LDS_BIOMETRICS_FORMAT_OWNER_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_FORMAT_TYPE_MISSING: number;
    let NTF_LDS_BIOMETRICS_FORMAT_TYPE_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_TYPE_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_SUB_TYPE_MISSING: number;
    let NTF_LDS_BIOMETRICS_SUB_TYPE_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_BDB_IMAGE_MISSING: number;
    let NTF_LDS_BIOMETRICS_BDB_FORMAT_ID_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_BDB_VERSION_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_LENGTH_INCORRECT: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_GENDER: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_EYE_COLOR: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_HAIR_COLOR: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_POSE_ANGLE_YAW: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_POSE_ANGLE_PITCH: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_POSE_ANGLE_ROLL: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_POSE_ANGLE_U_YAW: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_POSE_ANGLE_U_PITCH: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_POSE_ANGLE_U_ROLL: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_FACE_IMAGE_TYPE: number;
    let NTF_LDS_BIOMETRICS_BDB_DATA_IMAGE_DATA_TYPE: number;
    let NTF_LDS_SI_PACE_INFO_UNSUPPORTED_STD_PARAMETERS: number;
    let NTF_LDS_SI_PACE_INFO_DEPRECATED_VERSION: number;
    let NTF_LDS_SI_PACE_DOMAIN_PARAMS_USING_STD_REF: number;
    let NTF_LDS_SI_PACE_DOMAIN_PARAMS_UNSUPPORTED_ALGORITHM: number;
    let NTF_LDS_SI_CA_INFO_INCORRECT_VERSION: number;
    let NTF_LDS_SI_CA_PUBLIC_KEY_UNSUPPORTED_ALGORITHM: number;
    let NTF_LDS_SI_CA_DOMAIN_PARAMS_UNSUPPORTED_ALGORITHM: number;
    let NTF_LDS_SI_TA_INFO_INCORRECT_VERSION: number;
    let NTF_LDS_SI_TA_INFO_FILE_ID_FOR_VERSION2: number;
    let NTF_LDS_SI_EID_SECURITY_UNSUPPORTED_DIGEST_ALGORITHM: number;
    let NTF_LDS_SI_RI_INFO_INCORRECT_VERSION: number;
    let NTF_LDS_SI_RI_DOMAIN_PARAMS_UNSUPPORTED_ALGORITHM: number;
    let NTF_LDS_SI_AA_INFO_INCORRECT_VERSION: number;
    let NTF_LDS_SI_AA_INFO_UNSUPPORTED_ALGORITHM: number;
    let NTF_LDS_SI_AA_INFO_INCONSISTENT_ALGORITHM_REFERENCE: number;
    let NTF_LDS_SI_STORAGE_PACE_INFO_NOT_AVAILABLE: number;
    let NTF_LDS_SI_STORAGE_PACE_INFO_NO_STD_PARAMETERS: number;
    let NTF_LDS_SI_STORAGE_PACE_INFO_NO_MATCHING_DOMAIN_PARAMS: number;
    let NTF_LDS_SI_STORAGE_CA_INFO_NOT_AVAILABLE: number;
    let NTF_LDS_SI_STORAGE_CA_DOMAIN_PARAMS_NO_REQUIRED_OPTION: number;
    let NTF_LDS_SI_STORAGE_CA_DOMAIN_PARAMS_NOT_AVAILABLE: number;
    let NTF_LDS_SI_STORAGE_CA_ANONYMOUS_INFOS: number;
    let NTF_LDS_SI_STORAGE_CA_INFO_NO_MATCHING_DOMAIN_PARAMS: number;
    let NTF_LDS_SI_STORAGE_CA_INFO_NO_MATCHING_PUBLIC_KEY: number;
    let NTF_LDS_SI_STORAGE_CA_INCORRECT_INFOS_QUANTITY: number;
    let NTF_LDS_SI_STORAGE_TA_INFO_NOT_AVAILABLE: number;
    let NTF_LDS_SI_STORAGE_CARD_INFO_LOCATOR_MULTIPLE_ENTRIES: number;
    let NTF_LDS_SI_STORAGE_EID_SECURITY_INFO_MULTIPLE_ENTRIES: number;
    let NTF_LDS_SI_STORAGE_PRIVILEGED_TI_MULTIPLE_ENTRIES: number;
    let NTF_LDS_SI_STORAGE_PRIVILEGED_TI_INCORRECT_USAGE: number;
    let NTF_LDS_SI_STORAGE_RI_DOMAIN_PARAMS_MULTIPLE_ENTRIES: number;
    let NTF_LDS_SI_STORAGE_PACE_INFOS_NON_CONSISTANT: number;
    let NTF_LDS_CV_CERTIFICATE_PROFILE_INCORRECT_VERSION: number;
    let NTF_LDS_CV_CERTIFICATE_VALIDITY: number;
    let NTF_LDS_CV_CERTIFICATE_NON_CV_CA_DOMAIN_PARAMETERS: number;
    let NTF_LDS_CV_CERTIFICATE_PRIVATE_KEY_INCORRECT_VERSION: number;
    let NTF_LDS_TA_PACE_STATIC_BINDING_USED: number;
    let NTF_LDS_AUTH_ML_SIGNER_INFO_CERTIFICATE_VALIDITY: number;
    let NTF_LDS_AUTH_ML_SIGNER_INFO_CERTIFICATE_ROOT_IS_NOT_TRUSTED: number;
    let NTF_LDS_AUTH_ML_SIGNER_INFO_CERTIFICATE_CANT_FIND_CSCA: number;
    let NTF_LDS_AUTH_ML_SIGNER_INFO_CERTIFICATE_REVOKED: number;
    let NTF_LDS_AUTH_ML_SIGNER_INFO_CERTIFICATE_SIGNATURE_INVALID: number;
}
declare namespace eImageQualityCheckType {
    let IQC_IMAGE_GLARES: number;
    let IQC_IMAGE_FOCUS: number;
    let IQC_IMAGE_RESOLUTION: number;
    let IQC_IMAGE_COLORNESS: number;
    let IQC_PERSPECTIVE: number;
    let IQC_BOUNDS: number;
    let IQC_SCREEN_CAPTURE: number;
    let IQC_PORTRAIT: number;
    let IQC_HANDWRITTEN: number;
}
declare namespace MRZFormat {
    let FORMAT_1X30: string;
    let FORMAT_3X30: string;
    let FORMAT_2X36: string;
    let FORMAT_2X44: string;
    let FORMAT_1X6: string;
    let FORMAT_2X30: string;
}
declare namespace BarcodeType {
    let UNKNOWN_2: number;
    export { UNKNOWN_2 as UNKNOWN };
    export let BCT_CODE128: number;
    export let CODE39: number;
    export let EAN8: number;
    export let ITF: number;
    export let PDF417: number;
    export let STF: number;
    export let MTF: number;
    export let IATA: number;
    export let CODABAR: number;
    export let UPCA: number;
    export let CODE93: number;
    export let UPCE: number;
    export let EAN13: number;
    export let QRCODE: number;
    export let AZTEC: number;
    export let DATAMATRIX: number;
    export let ALL_1D: number;
    export let CODE11: number;
    export let JABCODE: number;
}
declare namespace eRPRM_SecurityFeatureType {
    let NONE_2: number;
    export { NONE_2 as NONE };
    export let SECURITY_FEATURE_TYPE_BLANK: number;
    export let SECURITY_FEATURE_TYPE_FILL: number;
    export let SECURITY_FEATURE_TYPE_PHOTO: number;
    export let SECURITY_FEATURE_TYPE_MRZ: number;
    export let SECURITY_FEATURE_TYPE_FALSE_LUMINESCENCE: number;
    export let SECURITY_FEATURE_TYPE_HOLO_SIMPLE: number;
    export let SECURITY_FEATURE_TYPE_HOLO_VERIFY_STATIC: number;
    export let SECURITY_FEATURE_TYPE_HOLO_VERIFY_MULTI_STATIC: number;
    export let SECURITY_FEATURE_TYPE_HOLO_VERIFY_DINAMIC: number;
    export let SECURITY_FEATURE_TYPE_PATTERN_NOT_INTERRUPTED: number;
    export let SECURITY_FEATURE_TYPE_PATTERN_NOT_SHIFTED: number;
    export let SECURITY_FEATURE_TYPE_PATTERN_SAME_COLORS: number;
    export let SECURITY_FEATURE_TYPE_PATTERN_IR_INVISIBLE: number;
    export let SECURITY_FEATURE_TYPE_PHOTO_SIZE_CHECK: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_GHOST: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_RFID: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_VISUAL: number;
    export let SECURITY_FEATURE_TYPE_BARCODE: number;
    export let SECURITY_FEATURE_TYPE_PATTERN_DIFFERENT_LINES_THICKNESS: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_VS_CAMERA: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_RFID_VS_CAMERA: number;
    export let SECURITY_FEATURE_TYPE_GHOST_PHOTO: number;
    export let SECURITY_FEATURE_TYPE_CLEAR_GHOST_PHOTO: number;
    export let SECURITY_FEATURE_TYPE_INVISIBLE_OBJECT: number;
    export let SECURITY_FEATURE_TYPE_LOW_CONTRAST_OBJECT: number;
    export let SECURITY_FEATURE_TYPE_PHOTO_COLOR: number;
    export let SECURITY_FEATURE_TYPE_PHOTO_SHAPE: number;
    export let SECURITY_FEATURE_TYPE_PHOTO_CORNERS: number;
    export let SECURITY_FEATURE_TYPE_OCR: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_EXTVS_VISUAL: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_EXTVS_RFID: number;
    export let SECURITY_FEATURE_TYPE_PORTRAIT_COMPARISON_EXTVS_LIVE: number;
    export let SECURITY_FEATURE_TYPE_LIVENESS_DEPTH: number;
    export let SECURITY_FEATURE_TYPE_MICROTEXT: number;
    export let SECURITY_FEATURE_TYPE_FLUORESCENT_OBJECT: number;
    export let SECURITY_FEATURE_TYPE_LANDMARKS_CHECK: number;
    export let SECURITY_FEATURE_TYPE_FACE_PRESENCE: number;
    export let SECURITY_FEATURE_TYPE_FACE_ABSENCE: number;
    export let SECURITY_FEATURE_TYPE_LIVENESS_SCREEN_CAPTURE: number;
    export let SECURITY_FEATURE_TYPE_LIVENESS_ELECTRONIC_DEVICE: number;
    export let SECURITY_FEATURE_TYPE_LIVENESS_OVI: number;
    export let SECURITY_FEATURE_TYPE_BARCODE_SIZE_CHECK: number;
    export let SECURITY_FEATURE_TYPE_LAS_INK: number;
    export let SECURITY_FEATURE_TYPE_LIVENESS_MLI: number;
    export let SECURITY_FEATURE_TYPE_LIVENESS_BARCODE_BACKGROUND: number;
}
declare namespace OnlineMode {
    let MANUAL: number;
    let AUTO: number;
}
declare namespace eRFID_SDK_ProfilerType {
    let SPT_DOC_9303_EDITION_2006: number;
    let SPT_DOC_9303_LDS_PKI_MAINTENANCE: number;
}
interface diDocType {
    dtNotDefined: number;
    dtPassport: number;
    dtIdentityCard: number;
    dtDiplomaticPassport: number;
    dtServicePassport: number;
    dtSeamanIdentityDocument: number;
    dtIdentityCardForResidence: number;
    dtTravelDocument: number;
    dtOther: number;
    dtVisaID2: number;
    dtVisaID3: number;
    dtRegistrationCertificate: number;
    dtNationalIdentityCard: number;
    dtSocialIdentityCard: number;
    dtAliensIdentityCard: number;
    dtPrivilegedIdentityCard: number;
    dtResidencePermitIdentityCard: number;
    dtOriginCard: number;
    dtEmergencyPassport: number;
    dtAliensPassport: number;
    dtAlternativeIdentityCard: number;
    dtAuthorizationCard: number;
    dtBeginnerPermit: number;
    dtBorderCrossingCard: number;
    dtChauffeurLicense: number;
    dtChauffeurLicenseUnder18: number;
    dtChauffeurLicenseUnder21: number;
    dtCommercialDrivingLicense: number;
    dtCommercialDrivingLicenseInstructionalPermit: number;
    dtCommercialDrivingLicenseUnder18: number;
    dtCommercialDrivingLicenseUnder21: number;
    dtCommercialInstructionPermit: number;
    dtCommercialNewPermit: number;
    dtConcealedCarryLicense: number;
    dtConcealedFirearmPermit: number;
    dtConditionalDrivingLicense: number;
    dtDepartmentOfVeteransAffairsIdentityCard: number;
    dtDiplomaticDrivingLicense: number;
    dtDrivingLicense: number;
    dtDrivingLicenseInstructionalPermit: number;
    dtDrivingLicenseInstructionalPermitUnder18: number;
    dtDrivingLicenseInstructionalPermitUnder21: number;
    dtDrivingLicenseLearnersPermit: number;
    dtDrivingLicenseLearnersPermitUnder18: number;
    dtDrivingLicenseLearnersPermitUnder21: number;
    dtDrivingLicenseNovice: number;
    dtDrivingLicenseNoviceUnder18: number;
    dtDrivingLicenseNoviceUnder21: number;
    dtDrivingLicenseRegisteredOffender: number;
    dtDrivingLicenseRestrictedUnder18: number;
    dtDrivingLicenseRestrictedUnder21: number;
    dtDrivingLicenseTemporaryVisitor: number;
    dtDrivingLicenseTemporaryVisitorUnder18: number;
    dtDrivingLicenseTemporaryVisitorUnder21: number;
    dtDrivingLicenseUnder18: number;
    dtDrivingLicenseUnder21: number;
    dtEmploymentDrivingPermit: number;
    dtEnhancedChauffeurLicense: number;
    dtEnhancedChauffeurLicenseUnder18: number;
    dtEnhancedChauffeurLicenseUnder21: number;
    dtEnhancedCommercialDrivingLicense: number;
    dtEnhancedDrivingLicense: number;
    dtEnhancedDrivingLicenseUnder18: number;
    dtEnhancedDrivingLicenseUnder21: number;
    dtEnhancedIdentityCard: number;
    dtEnhancedIdentityCardUnder18: number;
    dtEnhancedIdentityCardUnder21: number;
    dtEnhancedOperatorsLicense: number;
    dtFirearmsPermit: number;
    dtFullProvisionalLicense: number;
    dtFullProvisionalLicenseUnder18: number;
    dtFullProvisionalLicenseUnder21: number;
    dtGenevaConventionsIdentityCard: number;
    dtGraduatedDrivingLicenseUnder18: number;
    dtGraduatedDrivingLicenseUnder21: number;
    dtGraduatedInstructionPermitUnder18: number;
    dtGraduatedInstructionPermitUnder21: number;
    dtGraduatedLicenseUnder18: number;
    dtGraduatedLicenseUnder21: number;
    dtHandgunCarryPermit: number;
    dtIdentityAndPrivilegeCard: number;
    dtIdentityCardMobilityImpaired: number;
    dtIdentityCardRegisteredOffender: number;
    dtIdentityCardTemporaryVisitor: number;
    dtIdentityCardTemporaryVisitorUnder18: number;
    dtIdentityCardTemporaryVisitorUnder21: number;
    dtIdentityCardUnder18: number;
    dtIdentityCardUnder21: number;
    dtIgnitionInterlockPermit: number;
    dtImmigrantVisa: number;
    dtInstructionPermit: number;
    dtInstructionPermitUnder18: number;
    dtInstructionPermitUnder21: number;
    dtInterimDrivingLicense: number;
    dtInterimIdentityCard: number;
    dtIntermediateDrivingLicense: number;
    dtIntermediateDrivingLicenseUnder18: number;
    dtIntermediateDrivingLicenseUnder21: number;
    dtJuniorDrivingLicense: number;
    dtLearnerInstructionalPermit: number;
    dtLearnerLicense: number;
    dtLearnerLicenseUnder18: number;
    dtLearnerLicenseUnder21: number;
    dtLearnerPermit: number;
    dtLearnerPermitUnder18: number;
    dtLearnerPermitUnder21: number;
    dtLimitedLicense: number;
    dtLimitedPermit: number;
    dtLimitedTermDrivingLicense: number;
    dtLimitedTermIdentityCard: number;
    dtLiquorIdentityCard: number;
    dtNewPermit: number;
    dtNewPermitUnder18: number;
    dtNewPermitUnder21: number;
    dtNonUsCitizenDrivingLicense: number;
    dtOccupationalDrivingLicense: number;
    dtOneidaTribeOfIndiansIdentityCard: number;
    dtOperatorLicense: number;
    dtOperatorLicenseUnder18: number;
    dtOperatorLicenseUnder21: number;
    dtPermanentDrivingLicense: number;
    dtPermitToReEnter: number;
    dtProbationaryAutoLicense: number;
    dtProbationaryDrivingLicenseUnder18: number;
    dtProbationaryDrivingLicenseUnder21: number;
    dtProbationaryVehicleSalespersonLicense: number;
    dtProvisionalDrivingLicense: number;
    dtProvisionalDrivingLicenseUnder18: number;
    dtProvisionalDrivingLicenseUnder21: number;
    dtProvisionalLicense: number;
    dtProvisionalLicenseUnder18: number;
    dtProvisionalLicenseUnder21: number;
    dtPublicPassengerChauffeurLicense: number;
    dtRacingAndGamingComissionCard: number;
    dtRefugeeTravelDocument: number;
    dtRenewalPermit: number;
    dtRestrictedCommercialDrivingLicense: number;
    dtRestrictedDrivingLicense: number;
    dtRestrictedPermit: number;
    dtSeasonalPermit: number;
    dtSeasonalResidentIdentityCard: number;
    dtSeniorCitizenIdentityCard: number;
    dtSexOffender: number;
    dtSocialSecurityCard: number;
    dtTemporaryDrivingLicense: number;
    dtTemporaryDrivingLicenseUnder18: number;
    dtTemporaryDrivingLicenseUnder21: number;
    dtTemporaryIdentityCard: number;
    dtTemporaryInstructionPermitIdentityCard: number;
    dtTemporaryInstructionPermitIdentityCardUnder18: number;
    dtTemporaryInstructionPermitIdentityCardUnder21: number;
    dtTemporaryVisitorDrivingLicense: number;
    dtTemporaryVisitorDrivingLicenseUnder18: number;
    dtTemporaryVisitorDrivingLicenseUnder21: number;
    dtUniformedServicesIdentityCard: number;
    dtVehicleSalespersonLicense: number;
    dtWorkerIdentificationCredential: number;
    dtCommercialDrivingLicenseNovice: number;
    dtCommercialDrivingLicenseNoviceUnder18: number;
    dtCommercialDrivingLicenseNoviceUnder21: number;
    dtPassportCard: number;
    dtPermanentResidentCard: number;
    dtPersonalIdentificationVerification: number;
    dtTemporaryOperatorLicense: number;
    dtDrivingLicenseUnder19: number;
    dtIdentityCardUnder19: number;
    dtVisa: number;
    dtTemporaryPassport: number;
    dtVotingCard: number;
    dtHealthCard: number;
    dtCertificateOfCitizenship: number;
    dtAddressCard: number;
    dtAirportImmigrationCard: number;
    dtAlienRegistrationCard: number;
    dtAPEHCard: number;
    dtCouponToDrivingLicense: number;
    dtCrewMemberCertificate: number;
    dtDocumentForReturn: number;
    dtECard: number;
    dtEmploymentCard: number;
    dtHKSARImmigrationForm: number;
    dtImmigrantCard: number;
    dtLabourCard: number;
    dtLaissezPasser: number;
    dtLawyerIdentityCertificate: number;
    dtLicenseCard: number;
    dtPassportStateless: number;
    dtPassportChild: number;
    dtPassportConsular: number;
    dtPassportDiplomaticService: number;
    dtPassportOfficial: number;
    dtPassportProvisional: number;
    dtPassportSpecial: number;
    dtPermissionToTheLocalBorderTraffic: number;
    dtSEDESOLCard: number;
    dtSocialCard: number;
    dtTBCard: number;
    dtVehiclePassport: number;
    dtWDocument: number;
    dtDiplomaticIdentityCard: number;
    dtConsularIdentityCard: number;
    dtIncomeTaxCard: number;
    dtResidencePermit: number;
    dtDocumentOfIdentity: number;
    dtBorderCrossingPermit: number;
    dtPassportLimitedValidity: number;
    dtSIMCard: number;
    dtTaxCard: number;
    dtCompanyCard: number;
    dtDomesticPassport: number;
    dtIdentityCertificate: number;
    dtResidentIdCard: number;
    dtArmedForcesIdentityCard: number;
    dtProfessionalCard: number;
    dtRegistrationStamp: number;
    dtDriverCard: number;
    dtDriverTrainingCertificate: number;
    dtQualificationDrivingLicense: number;
    dtMembershipCard: number;
    dtPublicVehicleDriverAuthorityCard: number;
    dtMarineLicense: number;
    dtTemporaryLearnerDrivingLicense: number;
    dtTemporaryCommercialDrivingLicense: number;
    dtInterimInstructionalPermit: number;
    dtCertificateOfCompetency: number;
    dtCertificateOfProficiency: number;
    dtTradeLicense: number;
    dtPassportPage: number;
    dtInvoice: number;
    dtPassengerLocatorForm: number;
}
declare namespace HoloAnimationType {
    let DocumentHoloAnimationUnknown: number;
    let DocumentHoloAnimationTypeHorizontal: number;
    let DocumentHoloAnimationTypeVertical: number;
    let DocumentHoloAnimationTypeLeftBottomRightTop: number;
    let DocumentHoloAnimationTypeRightBottomLeftTop: number;
}
declare namespace eRequestCommand {
    let eReqCmd_RFid_SendData: number;
    let eReqCmd_RFid_Notify: number;
    let eReqCmd_RFid_GetDataForScenario: number;
    let eReqCmd_Torch_GetUVFoto: number;
    let eReqCmd_InternetSend: number;
    let eReqCmd_GetGuid: number;
    let eReqCmd_WltToImage: number;
}
declare namespace ImageFormat {
    let PNG: number;
    let JPG: number;
}
declare namespace eGraphicFieldType {
    let GF_PORTRAIT: number;
    let GF_FINGERPR: number;
    let GF_EYE: number;
    let GF_SIGNATURE: number;
    let GF_BAR_CODE: number;
    let GF_PROOF_OF_CITIZENSHIP: number;
    let GF_DOCUMENT_IMAGE: number;
    let GF_COLOR_DYNAMIC: number;
    let GF_GHOST_PORTRAIT: number;
    let GF_STAMP: number;
    let GF_PORTRAIT_OF_CHILD: number;
    let GF_OTHER: number;
    let GF_FINGER_LEFT_THUMB: number;
    let GF_FINGER_LEFT_INDEX: number;
    let GF_FINGER_LEFT_MIDDLE: number;
    let GF_FINGER_LEFT_RING: number;
    let GF_FINGER_LEFT_LITTLE: number;
    let GF_FINGER_RIGHT_THUMB: number;
    let GF_FINGER_RIGHT_INDEX: number;
    let GF_FINGER_RIGHT_MIDDLE: number;
    let GF_FINGER_RIGHT_RING: number;
    let GF_FINGER_RIGHT_LITTLE: number;
}
declare namespace RegDeviceConfigType {
    let DEVICE_7310: number;
}
declare namespace CameraMode {
    let AUTO_1: number;
    export { AUTO_1 as AUTO };
    export let CAMERA1: number;
    export let CAMERA2: number;
}
declare namespace CaptureMode {
    let AUTO_2: number;
    export { AUTO_2 as AUTO };
    export let CAPTURE_VIDEO: number;
    export let CAPTURE_FRAME: number;
}
declare namespace eCheckResult {
    let CH_CHECK_ERROR: number;
    let CH_CHECK_OK: number;
    let CH_CHECK_WAS_NOT_DONE: number;
}
declare namespace eRFID_TerminalType {
    let TET_UNDEFINED: number;
    let TET_INSPECTION_SYSTEM: number;
    let TET_AUTHENTICATION_TERMINAL: number;
    let TET_SIGNATURE_TERMINAL: number;
    let TET_UNAUTHENTICATED_TERMINAL: number;
}
declare namespace eRFID_DataFile_Type {
    let DFT_UNSPECIFIED: number;
    let DFT_PASSPORT_DG1: number;
    let DFT_PASSPORT_DG2: number;
    let DFT_PASSPORT_DG3: number;
    let DFT_PASSPORT_DG4: number;
    let DFT_PASSPORT_DG5: number;
    let DFT_PASSPORT_DG6: number;
    let DFT_PASSPORT_DG7: number;
    let DFT_PASSPORT_DG8: number;
    let DFT_PASSPORT_DG9: number;
    let DFT_PASSPORT_DG10: number;
    let DFT_PASSPORT_DG11: number;
    let DFT_PASSPORT_DG12: number;
    let DFT_PASSPORT_DG13: number;
    let DFT_PASSPORT_DG14: number;
    let DFT_PASSPORT_DG15: number;
    let DFT_PASSPORT_DG16: number;
    let DFT_PASSPORT_DG17: number;
    let DFT_PASSPORT_DG18: number;
    let DFT_PASSPORT_DG19: number;
    let DFT_PASSPORT_DG20: number;
    let DFT_PASSPORT_SOD: number;
    let DFT_PASSPORT_CVCA: number;
    let DFT_PASSPORT_COM: number;
    let DFT_ID_DG1: number;
    let DFT_ID_DG2: number;
    let DFT_ID_DG3: number;
    let DFT_ID_DG4: number;
    let DFT_ID_DG5: number;
    let DFT_ID_DG6: number;
    let DFT_ID_DG7: number;
    let DFT_ID_DG8: number;
    let DFT_ID_DG9: number;
    let DFT_ID_DG10: number;
    let DFT_ID_DG11: number;
    let DFT_ID_DG12: number;
    let DFT_ID_DG13: number;
    let DFT_ID_DG14: number;
    let DFT_ID_DG15: number;
    let DFT_ID_DG16: number;
    let DFT_ID_DG17: number;
    let DFT_ID_DG18: number;
    let DFT_ID_DG19: number;
    let DFT_ID_DG20: number;
    let DFT_ID_DG21: number;
    let DFT_DL_COM: number;
    let DFT_DL_DG1: number;
    let DFT_DL_DG2: number;
    let DFT_DL_DG3: number;
    let DFT_DL_DG4: number;
    let DFT_DL_DG5: number;
    let DFT_DL_DG6: number;
    let DFT_DL_DG7: number;
    let DFT_DL_DG8: number;
    let DFT_DL_DG9: number;
    let DFT_DL_DG10: number;
    let DFT_DL_DG11: number;
    let DFT_DL_DG12: number;
    let DFT_DL_DG13: number;
    let DFT_DL_DG14: number;
    let DFT_DL_SOD: number;
    let DFT_DL_CE: number;
    let DFT_DL_CVCA: number;
    let DFT_PACE_CARDACCESS: number;
    let DFT_PACE_CARDSECURITY: number;
    let DFT_PACE_CHIPSECURITY: number;
    let DFT_MIFARE_DATA: number;
    let DFT_MIFARE_VALIDITY: number;
    let DFT_AUTHENTICITYV2: number;
    let DFT_ATR: number;
    let DFT_ESIGN_PK: number;
    let DFT_ESIGN_SIGNEDDATA: number;
    let DFT_CERTIFICATE: number;
    let DFT_MASTERLIST: number;
    let DFT_DEFECTLIST: number;
    let DFT_DEVIATIONLIST: number;
    let DFT_APP_DIRECTORY: number;
    let DFT_SESSION: number;
    let DFT_LOGDATA: number;
    let DFT_CHIP_PROPERTIES: number;
    let DFT_SAM_DATA: number;
    let DFT_SAM_DATA_MAX: number;
    let DFT_VDS: number;
    let DFT_VDSNC: number;
    let DFT_USERDEFINED: number;
}
interface eVisualFieldType {
    FT_DOCUMENT_CLASS_CODE: number;
    FT_ISSUING_STATE_CODE: number;
    FT_DOCUMENT_NUMBER: number;
    FT_DATE_OF_EXPIRY: number;
    FT_DATE_OF_ISSUE: number;
    FT_DATE_OF_BIRTH: number;
    FT_PLACE_OF_BIRTH: number;
    FT_PERSONAL_NUMBER: number;
    FT_SURNAME: number;
    FT_GIVEN_NAMES: number;
    FT_MOTHERS_NAME: number;
    FT_NATIONALITY: number;
    FT_SEX: number;
    FT_HEIGHT: number;
    FT_WEIGHT: number;
    FT_EYES_COLOR: number;
    FT_HAIR_COLOR: number;
    FT_ADDRESS: number;
    FT_DONOR: number;
    FT_SOCIAL_SECURITY_NUMBER: number;
    FT_DL_CLASS: number;
    FT_DL_ENDORSED: number;
    FT_DL_RESTRICTION_CODE: number;
    FT_DL_UNDER_21_DATE: number;
    FT_AUTHORITY: number;
    FT_SURNAME_AND_GIVEN_NAMES: number;
    FT_NATIONALITY_CODE: number;
    FT_PASSPORT_NUMBER: number;
    FT_INVITATION_NUMBER: number;
    FT_VISA_ID: number;
    FT_VISA_CLASS: number;
    FT_VISA_SUB_CLASS: number;
    FT_MRZ_STRING_1: number;
    FT_MRZ_STRING_2: number;
    FT_MRZ_STRING_3: number;
    FT_MRZ_TYPE: number;
    FT_OPTIONAL_DATA: number;
    FT_DOCUMENT_CLASS_NAME: number;
    FT_ISSUING_STATE_NAME: number;
    FT_PLACE_OF_ISSUE: number;
    FT_DOCUMENT_NUMBER_CHECKSUM: number;
    FT_DATE_OF_BIRTH_CHECKSUM: number;
    FT_DATE_OF_EXPIRY_CHECKSUM: number;
    FT_PERSONAL_NUMBER_CHECKSUM: number;
    FT_FINAL_CHECKSUM: number;
    FT_PASSPORT_NUMBER_CHECKSUM: number;
    FT_INVITATION_NUMBER_CHECKSUM: number;
    FT_VISA_ID_CHECKSUM: number;
    FT_SURNAME_AND_GIVEN_NAMES_CHECKSUM: number;
    FT_VISA_VALID_UNTIL_CHECKSUM: number;
    FT_OTHER: number;
    FT_MRZ_STRINGS: number;
    FT_NAME_SUFFIX: number;
    FT_NAME_PREFIX: number;
    FT_DATE_OF_ISSUE_CHECKSUM: number;
    FT_DATE_OF_ISSUE_CHECK_DIGIT: number;
    FT_DOCUMENT_SERIES: number;
    FT_REG_CERT_REG_NUMBER: number;
    FT_REG_CERT_CAR_MODEL: number;
    FT_REG_CERT_CAR_COLOR: number;
    FT_REG_CERT_BODY_NUMBER: number;
    FT_REG_CERT_CAR_TYPE: number;
    FT_REG_CERT_MAX_WEIGHT: number;
    FT_REG_CERT_WEIGHT: number;
    FT_ADDRESS_AREA: number;
    FT_ADDRESS_STATE: number;
    FT_ADDRESS_BUILDING: number;
    FT_ADDRESS_HOUSE: number;
    FT_ADDRESS_FLAT: number;
    FT_PLACE_OF_REGISTRATION: number;
    FT_DATE_OF_REGISTRATION: number;
    FT_RESIDENT_FROM: number;
    FT_RESIDENT_UNTIL: number;
    FT_AUTHORITY_CODE: number;
    FT_PLACE_OF_BIRTH_AREA: number;
    FT_PLACE_OF_BIRTH_STATE_CODE: number;
    FT_ADDRESS_STREET: number;
    FT_ADDRESS_CITY: number;
    FT_ADDRESS_JURISDICTION_CODE: number;
    FT_ADDRESS_POSTAL_CODE: number;
    FT_DOCUMENT_NUMBER_CHECK_DIGIT: number;
    FT_DATE_OF_BIRTH_CHECK_DIGIT: number;
    FT_DATE_OF_EXPIRY_CHECK_DIGIT: number;
    FT_PERSONAL_NUMBER_CHECK_DIGIT: number;
    FT_FINAL_CHECK_DIGIT: number;
    FT_PASSPORT_NUMBER_CHECK_DIGIT: number;
    FT_INVITATION_NUMBER_CHECK_DIGIT: number;
    FT_VISA_ID_CHECK_DIGIT: number;
    FT_SURNAME_AND_GIVEN_NAMES_CHECK_DIGIT: number;
    FT_VISA_VALID_UNTIL_CHECK_DIGIT: number;
    FT_PERMIT_DL_CLASS: number;
    FT_PERMIT_DATE_OF_EXPIRY: number;
    FT_PERMIT_IDENTIFIER: number;
    FT_PERMIT_DATE_OF_ISSUE: number;
    FT_PERMIT_RESTRICTION_CODE: number;
    FT_PERMIT_ENDORSED: number;
    FT_ISSUE_TIMESTAMP: number;
    FT_NUMBER_OF_DUPLICATES: number;
    FT_MEDICAL_INDICATOR_CODES: number;
    FT_NON_RESIDENT_INDICATOR: number;
    FT_VISA_TYPE: number;
    FT_VISA_VALID_FROM: number;
    FT_VISA_VALID_UNTIL: number;
    FT_DURATION_OF_STAY: number;
    FT_NUMBER_OF_ENTRIES: number;
    FT_DAY: number;
    FT_MONTH: number;
    FT_YEAR: number;
    FT_UNIQUE_CUSTOMER_IDENTIFIER: number;
    FT_COMMERCIAL_VEHICLE_CODES: number;
    FT_AKA_DATE_OF_BIRTH: number;
    FT_AKA_SOCIAL_SECURITY_NUMBER: number;
    FT_AKA_SURNAME: number;
    FT_AKA_GIVEN_NAMES: number;
    FT_AKA_NAME_SUFFIX: number;
    FT_AKA_NAME_PREFIX: number;
    FT_MAILING_ADDRESS_STREET: number;
    FT_MAILING_ADDRESS_CITY: number;
    FT_MAILING_ADDRESS_JURISDICTION_CODE: number;
    FT_MAILING_ADDRESS_POSTAL_CODE: number;
    FT_AUDIT_INFORMATION: number;
    FT_INVENTORY_NUMBER: number;
    FT_RACE_ETHNICITY: number;
    FT_JURISDICTION_VEHICLE_CLASS: number;
    FT_JURISDICTION_ENDORSEMENT_CODE: number;
    FT_JURISDICTION_RESTRICTION_CODE: number;
    FT_FAMILY_NAME: number;
    FT_GIVEN_NAMES_RUS: number;
    FT_VISA_ID_RUS: number;
    FT_FATHERS_NAME: number;
    FT_FATHERS_NAME_RUS: number;
    FT_SURNAME_AND_GIVEN_NAMES_RUS: number;
    FT_PLACE_OF_BIRTH_RUS: number;
    FT_AUTHORITY_RUS: number;
    FT_ISSUING_STATE_CODE_NUMERIC: number;
    FT_NATIONALITY_CODE_NUMERIC: number;
    FT_ENGINE_POWER: number;
    FT_ENGINE_VOLUME: number;
    FT_CHASSIS_NUMBER: number;
    FT_ENGINE_NUMBER: number;
    FT_ENGINE_MODEL: number;
    FT_VEHICLE_CATEGORY: number;
    FT_IDENTITY_CARD_NUMBER: number;
    FT_CONTROL_NO: number;
    FT_PARRENTS_GIVEN_NAMES: number;
    FT_SECOND_SURNAME: number;
    FT_MIDDLE_NAME: number;
    FT_REG_CERT_VIN: number;
    FT_REG_CERT_VIN_CHECK_DIGIT: number;
    FT_REG_CERT_VIN_CHECKSUM: number;
    FT_LINE_1_CHECK_DIGIT: number;
    FT_LINE_2_CHECK_DIGIT: number;
    FT_LINE_3_CHECK_DIGIT: number;
    FT_LINE_1_CHECKSUM: number;
    FT_LINE_2_CHECKSUM: number;
    FT_LINE_3_CHECKSUM: number;
    FT_REG_CERT_REG_NUMBER_CHECK_DIGIT: number;
    FT_REG_CERT_REG_NUMBER_CHECKSUM: number;
    FT_REG_CERT_VEHICLE_ITS_CODE: number;
    FT_CARD_ACCESS_NUMBER: number;
    FT_MARITAL_STATUS: number;
    FT_COMPANY_NAME: number;
    FT_SPECIAL_NOTES: number;
    FT_SURNAME_OF_SPOSE: number;
    FT_TRACKING_NUMBER: number;
    FT_BOOKLET_NUMBER: number;
    FT_CHILDREN: number;
    FT_COPY: number;
    FT_SERIAL_NUMBER: number;
    FT_DOSSIER_NUMBER: number;
    FT_AKA_SURNAME_AND_GIVEN_NAMES: number;
    FT_TERRITORIAL_VALIDITY: number;
    FT_MRZ_STRINGS_WITH_CORRECT_CHECK_SUMS: number;
    FT_DL_CDL_RESTRICTION_CODE: number;
    FT_DL_UNDER_18_DATE: number;
    FT_DL_RECORD_CREATED: number;
    FT_DL_DUPLICATE_DATE: number;
    FT_DL_ISS_TYPE: number;
    FT_MILITARY_BOOK_NUMBER: number;
    FT_DESTINATION: number;
    FT_BLOOD_GROUP: number;
    FT_SEQUENCE_NUMBER: number;
    FT_REG_CERT_BODY_TYPE: number;
    FT_REG_CERT_CAR_MARK: number;
    FT_TRANSACTION_NUMBER: number;
    FT_AGE: number;
    FT_FOLIO_NUMBER: number;
    FT_VOTER_KEY: number;
    FT_ADDRESS_MUNICIPALITY: number;
    FT_ADDRESS_LOCATION: number;
    FT_SECTION: number;
    FT_OCR_NUMBER: number;
    FT_FEDERAL_ELECTIONS: number;
    FT_REFERENCE_NUMBER: number;
    FT_OPTIONAL_DATA_CHECKSUM: number;
    FT_OPTIONAL_DATA_CHECK_DIGIT: number;
    FT_VISA_NUMBER: number;
    FT_VISA_NUMBER_CHECKSUM: number;
    FT_VISA_NUMBER_CHECK_DIGIT: number;
    FT_VOTER: number;
    FT_PREVIOUS_TYPE: number;
    FT_FIELD_FROM_MRZ: number;
    FT_CURRENT_DATE: number;
    FT_STATUS_DATE_OF_EXPIRY: number;
    FT_BANKNOTE_NUMBER: number;
    FT_CSC_CODE: number;
    FT_ARTISTIC_NAME: number;
    FT_ACADEMIC_TITLE: number;
    FT_ADDRESS_COUNTRY: number;
    FT_ADDRESS_ZIPCODE: number;
    FT_E_ID_RESIDENCE_PERMIT_1: number;
    FT_E_ID_RESIDENCE_PERMIT_2: number;
    FT_E_ID_PLACE_OF_BIRTH_STREET: number;
    FT_E_ID_PLACE_OF_BIRTH_CITY: number;
    FT_E_ID_PLACE_OF_BIRTH_STATE: number;
    FT_E_ID_PLACE_OF_BIRTH_COUNTRY: number;
    FT_E_ID_PLACE_OF_BIRTH_ZIPCODE: number;
    FT_CDL_CLASS: number;
    FT_DL_UNDER_19_DATE: number;
    FT_WEIGHT_POUNDS: number;
    FT_LIMITED_DURATION_DOCUMENT_INDICATOR: number;
    FT_ENDORSEMENT_EXPIRATION_DATE: number;
    FT_REVISION_DATE: number;
    FT_COMPLIANCE_TYPE: number;
    FT_FAMILY_NAME_TRUNCATION: number;
    FT_FIRST_NAME_TRUNCATION: number;
    FT_MIDDLE_NAME_TRUNCATION: number;
    FT_EXAM_DATE: number;
    FT_ORGANIZATION: number;
    FT_DEPARTMENT: number;
    FT_PAY_GRADE: number;
    FT_RANK: number;
    FT_BENEFITS_NUMBER: number;
    FT_SPONSOR_SERVICE: number;
    FT_SPONSOR_STATUS: number;
    FT_SPONSOR: number;
    FT_RELATIONSHIP: number;
    FT_USCIS: number;
    FT_CATEGORY: number;
    FT_CONDITIONS: number;
    FT_IDENTIFIER: number;
    FT_CONFIGURATION: number;
    FT_DISCRETIONARY_DATA: number;
    FT_LINE_1_OPTIONAL_DATA: number;
    FT_LINE_2_OPTIONAL_DATA: number;
    FT_LINE_3_OPTIONAL_DATA: number;
    FT_EQV_CODE: number;
    FT_ALT_CODE: number;
    FT_BINARY_CODE: number;
    FT_PSEUDO_CODE: number;
    FT_FEE: number;
    FT_STAMP_NUMBER: number;
    FT_SBH_SECURITYOPTIONS: number;
    FT_SBH_INTEGRITYOPTIONS: number;
    FT_DATE_OF_CREATION: number;
    FT_VALIDITY_PERIOD: number;
    FT_PATRON_HEADER_VERSION: number;
    FT_BDB_TYPE: number;
    FT_BIOMETRIC_TYPE: number;
    FT_BIOMETRIC_SUBTYPE: number;
    FT_BIOMETRIC_PRODUCTID: number;
    FT_BIOMETRIC_FORMAT_OWNER: number;
    FT_BIOMETRIC_FORMAT_TYPE: number;
    FT_PHONE: number;
    FT_PROFESSION: number;
    FT_TITLE: number;
    FT_PERSONAL_SUMMARY: number;
    FT_OTHER_VALID_ID: number;
    FT_CUSTODY_INFO: number;
    FT_OTHER_NAME: number;
    FT_OBSERVATIONS: number;
    FT_TAX: number;
    FT_DATE_OF_PERSONALIZATION: number;
    FT_PERSONALIZATION_SN: number;
    FT_OTHERPERSON_NAME: number;
    FT_PERSONTONOTIFY_DATE_OF_RECORD: number;
    FT_PERSONTONOTIFY_NAME: number;
    FT_PERSONTONOTIFY_PHONE: number;
    FT_PERSONTONOTIFY_ADDRESS: number;
    FT_DS_CERTIFICATE_ISSUER: number;
    FT_DS_CERTIFICATE_SUBJECT: number;
    FT_DS_CERTIFICATE_VALIDFROM: number;
    FT_DS_CERTIFICATE_VALIDTO: number;
    FT_VRC_DATAOBJECT_ENTRY: number;
    FT_TYPE_APPROVAL_NUMBER: number;
    FT_ADMINISTRATIVE_NUMBER: number;
    FT_DOCUMENT_DISCRIMINATOR: number;
    FT_DATA_DISCRIMINATOR: number;
    FT_ISO_ISSUER_ID_NUMBER: number;
    FT_GNIB_NUMBER: number;
    FT_DEPT_NUMBER: number;
    FT_TELEX_CODE: number;
    FT_ALLERGIES: number;
    FT_SP_CODE: number;
    FT_COURT_CODE: number;
    FT_CTY: number;
    FT_SPONSOR_SSN: number;
    FT_DO_D_NUMBER: number;
    FT_MC_NOVICE_DATE: number;
    FT_DUF_NUMBER: number;
    FT_AGY: number;
    FT_PNR_CODE: number;
    FT_FROM_AIRPORT_CODE: number;
    FT_TO_AIRPORT_CODE: number;
    FT_FLIGHT_NUMBER: number;
    FT_DATE_OF_FLIGHT: number;
    FT_SEAT_NUMBER: number;
    FT_DATE_OF_ISSUE_BOARDING_PASS: number;
    FT_CCW_UNTIL: number;
    FT_REFERENCE_NUMBER_CHECKSUM: number;
    FT_REFERENCE_NUMBER_CHECK_DIGIT: number;
    FT_ROOM_NUMBER: number;
    FT_RELIGION: number;
    FT_REMAINDER_TERM: number;
    FT_ELECTRONIC_TICKET_INDICATOR: number;
    FT_COMPARTMENT_CODE: number;
    FT_CHECK_IN_SEQUENCE_NUMBER: number;
    FT_AIRLINE_DESIGNATOR_OF_BOARDING_PASS_ISSUER: number;
    FT_AIRLINE_NUMERIC_CODE: number;
    FT_TICKET_NUMBER: number;
    FT_FREQUENT_FLYER_AIRLINE_DESIGNATOR: number;
    FT_FREQUENT_FLYER_NUMBER: number;
    FT_FREE_BAGGAGE_ALLOWANCE: number;
    FT_PDF_417_CODEC: number;
    FT_IDENTITY_CARD_NUMBER_CHECKSUM: number;
    FT_IDENTITY_CARD_NUMBER_CHECK_DIGIT: number;
    FT_VETERAN: number;
    FT_DL_CLASS_CODE_A_1_FROM: number;
    FT_DL_CLASS_CODE_A_1_TO: number;
    FT_DL_CLASS_CODE_A_1_NOTES: number;
    FT_DL_CLASS_CODE_A_FROM: number;
    FT_DL_CLASS_CODE_A_TO: number;
    FT_DL_CLASS_CODE_A_NOTES: number;
    FT_DL_CLASS_CODE_B_FROM: number;
    FT_DL_CLASS_CODE_B_TO: number;
    FT_DL_CLASS_CODE_B_NOTES: number;
    FT_DL_CLASS_CODE_C_1_FROM: number;
    FT_DL_CLASS_CODE_C_1_TO: number;
    FT_DL_CLASS_CODE_C_1_NOTES: number;
    FT_DL_CLASS_CODE_C_FROM: number;
    FT_DL_CLASS_CODE_C_TO: number;
    FT_DL_CLASS_CODE_C_NOTES: number;
    FT_DL_CLASS_CODE_D_1_FROM: number;
    FT_DL_CLASS_CODE_D_1_TO: number;
    FT_DL_CLASS_CODE_D_1_NOTES: number;
    FT_DL_CLASS_CODE_D_FROM: number;
    FT_DL_CLASS_CODE_D_TO: number;
    FT_DL_CLASS_CODE_D_NOTES: number;
    FT_DL_CLASS_CODE_BE_FROM: number;
    FT_DL_CLASS_CODE_BE_TO: number;
    FT_DL_CLASS_CODE_BE_NOTES: number;
    FT_DL_CLASS_CODE_C_1_E_FROM: number;
    FT_DL_CLASS_CODE_C_1_E_TO: number;
    FT_DL_CLASS_CODE_C_1_E_NOTES: number;
    FT_DL_CLASS_CODE_CE_FROM: number;
    FT_DL_CLASS_CODE_CE_TO: number;
    FT_DL_CLASS_CODE_CE_NOTES: number;
    FT_DL_CLASS_CODE_D_1_E_FROM: number;
    FT_DL_CLASS_CODE_D_1_E_TO: number;
    FT_DL_CLASS_CODE_D_1_E_NOTES: number;
    FT_DL_CLASS_CODE_DE_FROM: number;
    FT_DL_CLASS_CODE_DE_TO: number;
    FT_DL_CLASS_CODE_DE_NOTES: number;
    FT_DL_CLASS_CODE_M_FROM: number;
    FT_DL_CLASS_CODE_M_TO: number;
    FT_DL_CLASS_CODE_M_NOTES: number;
    FT_DL_CLASS_CODE_L_FROM: number;
    FT_DL_CLASS_CODE_L_TO: number;
    FT_DL_CLASS_CODE_L_NOTES: number;
    FT_DL_CLASS_CODE_T_FROM: number;
    FT_DL_CLASS_CODE_T_TO: number;
    FT_DL_CLASS_CODE_T_NOTES: number;
    FT_DL_CLASS_CODE_AM_FROM: number;
    FT_DL_CLASS_CODE_AM_TO: number;
    FT_DL_CLASS_CODE_AM_NOTES: number;
    FT_DL_CLASS_CODE_A_2_FROM: number;
    FT_DL_CLASS_CODE_A_2_TO: number;
    FT_DL_CLASS_CODE_A_2_NOTES: number;
    FT_DL_CLASS_CODE_B_1_FROM: number;
    FT_DL_CLASS_CODE_B_1_TO: number;
    FT_DL_CLASS_CODE_B_1_NOTES: number;
    FT_SURNAME_AT_BIRTH: number;
    FT_CIVIL_STATUS: number;
    FT_NUMBER_OF_SEATS: number;
    FT_NUMBER_OF_STANDING_PLACES: number;
    FT_MAX_SPEED: number;
    FT_FUEL_TYPE: number;
    FT_EC_ENVIRONMENTAL_TYPE: number;
    FT_POWER_WEIGHT_RATIO: number;
    FT_MAX_MASS_OF_TRAILER_BRAKED: number;
    FT_MAX_MASS_OF_TRAILER_UNBRAKED: number;
    FT_TRANSMISSION_TYPE: number;
    FT_TRAILER_HITCH: number;
    FT_ACCOMPANIED_BY: number;
    FT_POLICE_DISTRICT: number;
    FT_FIRST_ISSUE_DATE: number;
    FT_PAYLOAD_CAPACITY: number;
    FT_NUMBER_OF_AXELS: number;
    FT_PERMISSIBLE_AXLE_LOAD: number;
    FT_PRECINCT: number;
    FT_INVITED_BY: number;
    FT_PURPOSE_OF_ENTRY: number;
    FT_SKIN_COLOR: number;
    FT_COMPLEXION: number;
    FT_AIRPORT_FROM: number;
    FT_AIRPORT_TO: number;
    FT_AIRLINE_NAME: number;
    FT_AIRLINE_NAME_FREQUENT_FLYER: number;
    FT_LICENSE_NUMBER: number;
    FT_IN_TANKS: number;
    FT_EXEPT_IN_TANKS: number;
    FT_FAST_TRACK: number;
    FT_OWNER: number;
    FT_MRZ_STRINGS_ICAO_RFID: number;
    FT_NUMBER_OF_CARD_ISSUANCE: number;
    FT_NUMBER_OF_CARD_ISSUANCE_CHECKSUM: number;
    FT_NUMBER_OF_CARD_ISSUANCE_CHECK_DIGIT: number;
    FT_CENTURY_DATE_OF_BIRTH: number;
    FT_DL_CLASSCODE_A3_FROM: number;
    FT_DL_CLASSCODE_A3_TO: number;
    FT_DL_CLASSCODE_A3_NOTES: number;
    FT_DL_CLASSCODE_C2_FROM: number;
    FT_DL_CLASSCODE_C2_TO: number;
    FT_DL_CLASSCODE_C2_NOTES: number;
    FT_DL_CLASSCODE_B2_FROM: number;
    FT_DL_CLASSCODE_B2_TO: number;
    FT_DL_CLASSCODE_B2_NOTES: number;
    FT_DL_CLASSCODE_D2_FROM: number;
    FT_DL_CLASSCODE_D2_TO: number;
    FT_DL_CLASSCODE_D2_NOTES: number;
    FT_DL_CLASSCODE_B2E_FROM: number;
    FT_DL_CLASSCODE_B2E_TO: number;
    FT_DL_CLASSCODE_B2E_NOTES: number;
    FT_DL_CLASSCODE_G_FROM: number;
    FT_DL_CLASSCODE_G_TO: number;
    FT_DL_CLASSCODE_G_NOTES: number;
    FT_DL_CLASSCODE_J_FROM: number;
    FT_DL_CLASSCODE_J_TO: number;
    FT_DL_CLASSCODE_J_NOTES: number;
    FT_DL_CLASSCODE_LC_FROM: number;
    FT_DL_CLASSCODE_LC_TO: number;
    FT_DLC_LASSCODE_LC_NOTES: number;
    FT_BANKCARDNUMBER: number;
    FT_BANKCARDVALIDTHRU: number;
    FT_TAX_NUMBER: number;
    FT_HEALTH_NUMBER: number;
    FT_GRANDFATHERNAME: number;
    FT_SELECTEE_INDICATOR: number;
    FT_MOTHER_SURNAME: number;
    FT_MOTHER_GIVENNAME: number;
    FT_FATHER_SURNAME: number;
    FT_FATHER_GIVENNAME: number;
    FT_MOTHER_DATEOFBIRTH: number;
    FT_FATHER_DATEOFBIRTH: number;
    FT_MOTHER_PERSONALNUMBER: number;
    FT_FATHER_PERSONALNUMBER: number;
    FT_MOTHER_PLACEOFBIRTH: number;
    FT_FATHER_PLACEOFBIRTH: number;
    FT_MOTHER_COUNTRYOFBIRTH: number;
    FT_FATHER_COUNTRYOFBIRTH: number;
    FT_DATE_FIRST_RENEWAL: number;
    FT_DATE_SECOND_RENEWAL: number;
    FT_PLACE_OF_EXAMINATION: number;
    FT_APPLICATION_NUMBER: number;
    FT_VOUCHER_NUMBER: number;
    FT_AUTHORIZATION_NUMBER: number;
    FT_FACULTY: number;
    FT_FORM_OF_EDUCATION: number;
    FT_DNI_NUMBER: number;
    FT_RETIREMENT_NUMBER: number;
    FT_PROFESSIONAL_ID_NUMBER: number;
    FT_AGE_AT_ISSUE: number;
    FT_YEARS_SINCE_ISSUE: number;
    FT_DLCLASSCODE_BTP_FROM: number;
    FT_DLCLASSCODE_BTP_NOTES: number;
    FT_DLCLASSCODE_BTP_TO: number;
    FT_DLCLASSCODE_C3_FROM: number;
    FT_DLCLASSCODE_C3_NOTES: number;
    FT_DLCLASSCODE_C3_TO: number;
    FT_DLCLASSCODE_E_FROM: number;
    FT_DLCLASSCODE_E_NOTES: number;
    FT_DLCLASSCODE_E_TO: number;
    FT_DLCLASSCODE_F_FROM: number;
    FT_DLCLASSCODE_F_NOTES: number;
    FT_DLCLASSCODE_F_TO: number;
    FT_DLCLASSCODE_FA_FROM: number;
    FT_DLCLASSCODE_FA_NOTES: number;
    FT_DLCLASSCODE_FA_TO: number;
    FT_DLCLASSCODE_FA1_FROM: number;
    FT_DLCLASSCODE_FA1_NOTES: number;
    FT_DLCLASSCODE_FA1_TO: number;
    FT_DLCLASSCODE_FB_FROM: number;
    FT_DLCLASSCODE_FB_NOTES: number;
    FT_DLCLASSCODE_FB_TO: number;
    FT_DLCLASSCODE_G1_FROM: number;
    FT_DLCLASSCODE_G1_NOTES: number;
    FT_DLCLASSCODE_G1_TO: number;
    FT_DLCLASSCODE_H_FROM: number;
    FT_DLCLASSCODE_H_NOTES: number;
    FT_DLCLASSCODE_H_TO: number;
    FT_DLCLASSCODE_I_FROM: number;
    FT_DLCLASSCODE_I_NOTES: number;
    FT_DLCLASSCODE_I_TO: number;
    FT_DLCLASSCODE_K_FROM: number;
    FT_DLCLASSCODE_K_NOTES: number;
    FT_DLCLASSCODE_K_TO: number;
    FT_DLCLASSCODE_LK_FROM: number;
    FT_DLCLASSCODE_LK_NOTES: number;
    FT_DLCLASSCODE_LK_TO: number;
    FT_DLCLASSCODE_N_FROM: number;
    FT_DLCLASSCODE_N_NOTES: number;
    FT_DLCLASSCODE_N_TO: number;
    FT_DLCLASSCODE_S_FROM: number;
    FT_DLCLASSCODE_S_NOTES: number;
    FT_DLCLASSCODE_S_TO: number;
    FT_DLCLASSCODE_TB_FROM: number;
    FT_DLCLASSCODE_TB_NOTES: number;
    FT_DLCLASSCODE_TB_TO: number;
    FT_DLCLASSCODE_TM_FROM: number;
    FT_DLCLASSCODE_TM_NOTES: number;
    FT_DLCLASSCODE_TM_TO: number;
    FT_DLCLASSCODE_TR_FROM: number;
    FT_DLCLASSCODE_TR_NOTES: number;
    FT_DLCLASSCODE_TR_TO: number;
    FT_DLCLASSCODE_TV_FROM: number;
    FT_DLCLASSCODE_TV_NOTES: number;
    FT_DLCLASSCODE_TV_TO: number;
    FT_DLCLASSCODE_V_FROM: number;
    FT_DLCLASSCODE_V_NOTES: number;
    FT_DLCLASSCODE_V_TO: number;
    FT_DLCLASSCODE_W_FROM: number;
    FT_DLCLASSCODE_W_NOTES: number;
    FT_DLCLASSCODE_W_TO: number;
    FT_URL: number;
    FT_CALIBER: number;
    FT_MODEL: number;
    FT_MAKE: number;
    FT_NUMBER_OF_CYLINDERS: number;
    FT_SURNAME_OF_HUSBAND_AFTER_REGISTRATION: number;
    FT_SURNAME_OF_WIFE_AFTER_REGISTRATION: number;
    FT_DATE_OF_BIRTH_OF_WIFE: number;
    FT_DATE_OF_BIRTH_OF_HUSBAND: number;
    FT_CITIZENSHIP_OF_FIRST_PERSON: number;
    FT_CITIZENSHIP_OF_SECOND_PERSON: number;
    FT_CVV: number;
    FT_DATE_OF_INSURANCE_EXPIRY: number;
    FT_MORTGAGE_BY: number;
    FT_OLD_DOCUMENT_NUMBER: number;
    FT_OLD_DATE_OF_ISSUE: number;
    FT_OLD_PLACE_OF_ISSUE: number;
    FT_DLCLASSCODE_LR_FROM: number;
    FT_DLCLASSCODE_LR_TO: number;
    FT_DLCLASSCODE_LR_NOTES: number;
    FT_DLCLASSCODE_MR_FROM: number;
    FT_DLCLASSCODE_MR_TO: number;
    FT_DLCLASSCODE_MR_NOTES: number;
    FT_DLCLASSCODE_HR_FROM: number;
    FT_DLCLASSCODE_HR_TO: number;
    FT_DLCLASSCODE_HR_NOTES: number;
    FT_DLCLASSCODE_HC_FROM: number;
    FT_DLCLASSCODE_HC_TO: number;
    FT_DLCLASSCODE_HC_NOTES: number;
    FT_DLCLASSCODE_MC_FROM: number;
    FT_DLCLASSCODE_MC_TO: number;
    FT_DLCLASSCODE_MC_NOTES: number;
    FT_DLCLASSCODE_RE_FROM: number;
    FT_DLCLASSCODE_RE_TO: number;
    FT_DLCLASSCODE_RE_NOTES: number;
    FT_DLCLASSCODE_R_FROM: number;
    FT_DLCLASSCODE_R_TO: number;
    FT_DLCLASSCODE_R_NOTES: number;
    FT_DLCLASSCODE_CA_FROM: number;
    FT_DLCLASSCODE_CA_TO: number;
    FT_DLCLASSCODE_CA_NOTES: number;
    FT_CITIZENSHIP_STATUS: number;
    FT_MILITARY_SERVICE_FROM: number;
    FT_MILITARY_SERVICE_TO: number;
    FT_DLCLASSCODE_NT_FROM: number;
    FT_DLCLASSCODE_NT_TO: number;
    FT_DLCLASSCODE_NT_NOTES: number;
    FT_DLCLASSCODE_TN_FROM: number;
    FT_DLCLASSCODE_TN_TO: number;
    FT_DLCLASSCODE_TN_NOTES: number;
    FT_DLCLASSCODE_D3_FROM: number;
    FT_DLCLASSCODE_D3_TO: number;
    FT_DLCLASSCODE_D3_NOTES: number;
    FT_ALT_DATE_OF_EXPIRY: number;
    FT_DLCLASSCODE_CD_FROM: number;
    FT_DLCLASSCODE_CD_TO: number;
    FT_DLCLASSCODE_CD_NOTES: number;
    FT_PAYMENT_PERIOD_TO: number;
    FT_PAYMENT_PERIOD_FROM: number;
    FT_ISSUER_IDENTIFICATION_NUMBER: number;
    FT_VACCINATION_CERTIFICATE_IDENTIFIER: number;
    FT_FIRST_NAME: number;
    FT_DATE_OF_ARRIVAL: number;
    FT_SECOND_NAME: number;
    FT_THIRD_NAME: number;
    FT_FOURTH_NAME: number;
    FT_LAST_NAME: number;
    FT_DLCLASSCODE_RM_FROM: number;
    FT_DLCLASSCODE_RM_NOTES: number;
    FT_DLCLASSCODE_RM_TO: number;
    FT_DLCLASSCODE_PW_FROM: number;
    FT_DLCLASSCODE_PW_NOTES: number;
    FT_DLCLASSCODE_PW_TO: number;
    FT_DLCLASSCODE_EB_FROM: number;
    FT_DLCLASSCODE_EB_NOTES: number;
    FT_DLCLASSCODE_EB_TO: number;
    FT_DLCLASSCODE_EC_FROM: number;
    FT_DLCLASSCODE_EC_NOTES: number;
    FT_DLCLASSCODE_EC_TO: number;
    FT_DLCLASSCODE_EC1_FROM: number;
    FT_DLCLASSCODE_EC1_NOTES: number;
    FT_DLCLASSCODE_EC1_TO: number;
    FT_PLACE_OF_BIRTH_CITY: number;
    FT_YEAR_OF_BIRTH: number;
    FT_YEAR_OF_EXPIRY: number;
    FT_GRANDFATHER_NAME_MATERNAL: number;
    FT_FIRST_SURNAME: number;
    FT_MONTH_OF_BIRTH: number;
    FT_ADDRESS_FLOOR_NUMBER: number;
    FT_ADDRESS_ENTRANCE: number;
    FT_ADDRESS_BLOCK_NUMBER: number;
    FT_ADDRESS_STREET_NUMBER: number;
    FT_ADDRESS_STREET_TYPE: number;
    FT_ADDRESS_CITY_SECTOR: number;
    FT_ADDRESS_COUNTY_TYPE: number;
    FT_ADDRESS_CITY_TYPE: number;
    FT_ADDRESS_BUILDING_TYPE: number;
}
interface DocReaderOrientation {
    ALL: number;
    PORTRAIT: number;
    LANDSCAPE: number;
    LANDSCAPE_LEFT: number;
    LANDSCAPE_RIGHT: number;
}
declare namespace LCID {
    let LATIN: number;
    let ABKHAZIAN_CYRILLIC: number;
    let AFRIKAANS: number;
    let ALBANIAN: number;
    let AMHARIC: number;
    let ARABIC_ALGERIA: number;
    let ARABIC_BAHRAIN: number;
    let ARABIC_EGYPT: number;
    let ARABIC_IRAQ: number;
    let ARABIC_JORDAN: number;
    let ARABIC_KUWAIT: number;
    let ARABIC_LEBANON: number;
    let ARABIC_LIBYA: number;
    let ARABIC_MOROCCO: number;
    let ARABIC_OMAN: number;
    let ARABIC_QATAR: number;
    let ARABIC_SAUDI_ARABIA: number;
    let ARABIC_SYRIA: number;
    let ARABIC_TUNISIA: number;
    let ARABIC_UAE: number;
    let ARABIC_YEMEN: number;
    let ARABIC_ARMENIAN: number;
    let ARABIC_WORLD: number;
    let AZERI_CYRILIC: number;
    let AZERI_LATIN: number;
    let BASQUE: number;
    let BANK_CARD: number;
    let BANK_CARD_CVV2: number;
    let BANK_CARD_NAME: number;
    let BANK_CARD_NUMBER: number;
    let BANK_CARD_VALID_THRU: number;
    let BELARUSIAN: number;
    let BENGALI: number;
    let BULGARIAN: number;
    let CATALAN: number;
    let CHINESE_HONGKONG_SAR: number;
    let CHINESE_MACAO_SAR: number;
    let CHINESE: number;
    let CHINESE_SINGAPORE: number;
    let CHINESE_TAIWAN: number;
    let CROATIAN: number;
    let CZECH: number;
    let DANISH: number;
    let DIVEHI: number;
    let DUTCH_BELGIUM: number;
    let DUTCH_NETHERLANDS: number;
    let ENGLISH_AUSTRALIA: number;
    let ENGLISH_BELIZE: number;
    let ENGLISH_CANADA: number;
    let ENGLISH_CARRIBEAN: number;
    let ENGLISH_IRELAND: number;
    let ENGLISH_JAMAICA: number;
    let ENGLISH_NEW_ZEALAND: number;
    let ENGLISH_PHILIPPINES: number;
    let ENGLISH_SOUTH_AFRICA: number;
    let ENGLISH_TRINIDAD: number;
    let ENGLISH_UK: number;
    let ENGLISH_US: number;
    let ENGLISH_ZIMBABWE: number;
    let ESTONIAN: number;
    let FAEROESE: number;
    let FARSI: number;
    let FINNISH: number;
    let FRENCH_BELGIUM: number;
    let FRENCH_CANADA: number;
    let FRENCH_FRANCE: number;
    let FRENCH_LUXEMBOURG: number;
    let FRENCH_MONACO: number;
    let FRENCH_SWITZERLAND: number;
    let FYRO_MACEDONIAN: number;
    let GALICIAN: number;
    let GEORGIAN: number;
    let GERMAN_AUSTRIA: number;
    let GERMAN_GERMANY: number;
    let GERMAN_LIECHTENSTEIN: number;
    let GERMAN_LUXEMBOURG: number;
    let GERMAN_SWITZERLAND: number;
    let GREEK: number;
    let GUJARATI: number;
    let HEBREW: number;
    let HINDI_INDIA: number;
    let HUNGARIAN: number;
    let ICELANDIC: number;
    let INDONESIAN: number;
    let ITALIAN_ITALY: number;
    let ITALIAN_SWITZERLAND: number;
    let JAPANESE: number;
    let KANNADA: number;
    let KASHMIRI: number;
    let KAZAKH: number;
    let KONKANI: number;
    let KOREAN: number;
    let KYRGYZ_CYRILICK: number;
    let LAO: number;
    let LATVIAN: number;
    let LITHUANIAN: number;
    let MALAY_MALAYSIA: number;
    let MALAY_BRUNEI_DARUSSALAM: number;
    let MARATHI: number;
    let MONGOLIAN_CYRILIC: number;
    let NORWEGIAN_BOKMAL: number;
    let NORWEGIAN_NYORSK: number;
    let PASHTO: number;
    let POLISH: number;
    let PORTUGUESE_BRAZIL: number;
    let PORTUGUESE_PORTUGAL: number;
    let PUNJABI: number;
    let RHAETO_ROMANIC: number;
    let ROMANIAN: number;
    let RUSSIAN: number;
    let SANSKRIT: number;
    let SERBIAN_CYRILIC: number;
    let SERBIAN_LATIN: number;
    let SINDHI: number;
    let SINDHI_INDIA: number;
    let SINHALA: number;
    let SLOVAK: number;
    let SLOVENIAN: number;
    let SPANISH_ARGENTINA: number;
    let SPANISH_BOLIVIA: number;
    let SPANISH_CHILE: number;
    let SPANICH_COLOMBIA: number;
    let SPANISH_COSTA_RICA: number;
    let SPANISH_DOMINICAN_REPUBLIC: number;
    let SPANISH_ECUADOR: number;
    let SPANISH_EL_SALVADOR: number;
    let SPANISH_GUATEMALA: number;
    let SPANISH_HONDURAS: number;
    let SPANISH_MEXICO: number;
    let SPANISH_NICARAGUA: number;
    let SPANISH_PANAMA: number;
    let SPANISH_PARAGUAY: number;
    let SPANISH_PERU: number;
    let SPANISH_PUERTO_RICO: number;
    let SPANISH_TRADITIONAL_SORT: number;
    let SPANISH_INTERNATIONAL_SORT: number;
    let SPANISH_URUGUAY: number;
    let SPANISH_VENEZUELA: number;
    let SWAHILI: number;
    let SWEDISH: number;
    let SWEDISH_FINLAND: number;
    let SYRIAC: number;
    let TAMIL: number;
    let TATAR: number;
    let TELUGU: number;
    let THAI_THAILAND: number;
    let TURKISH: number;
    let TAJIK_CYRILLIC: number;
    let TURKMEN: number;
    let UKRAINIAN: number;
    let URDU: number;
    let UZBEK_CYRILIC: number;
    let UZBEK_LATIN: number;
    let VIETNAMESE: number;
    let CTC_SIMPLIFIED: number;
    let CTC_TRADITIONAL: number;
}
declare namespace DocReaderFrame {
    export let MAX: string;
    export let SCENARIO_DEFAULT: string;
    let NONE_3: string;
    export { NONE_3 as NONE };
    export let DOCUMENT: string;
}
declare namespace eRPRM_Lights {
    let NONE_4: number;
    export { NONE_4 as NONE };
    export let RPRM_LIGHT_UV: number;
    export let RPRM_LIGHT_WHITE_FULL: number;
    export let RPRM_LIGHT_IR: number;
    export let RPRM_Light_IR_TOP: number;
    export let RPRM_Light_IR_SIDE: number;
    export let RPRM_Light_IR_Full: number;
    export let RPRM_LIGHT_OVD: number;
    export let RPRM_LIGHT_WHITE_FULL_OVD: number;
}
declare namespace LineCap {
    let Butt: number;
    let Round: number;
    let Square: number;
}
interface UIInterfaceOrientationMask {
    Portrait: number;
    LandscapeLeft: number;
    LandscapeRight: number;
    PortraitUpsideDown: number;
    Landscape: number;
    All: number;
    AllButUpsideDown: number;
}
declare namespace AVCaptureSessionPreset {
    let Low: number;
    let Medium: number;
    let High: number;
    let Photo: number;
    let InputPriority: number;
    let QHD960x540: number;
    let Hd1280x720: number;
    let Hd1920x1080: number;
    let Hd4K3840x2160: number;
    let IFrame960x540: number;
    let IFrame1280x720: number;
    let Qvga320x240: number;
    let Vga640x480: number;
    let Cif352x288: number;
}
declare namespace AVCaptureDevicePosition {
    let Front: number;
    let Back: number;
    let Unspecified: number;
}
declare namespace UIViewContentMode {
    let ScaleToFill: number;
    let ScaleAspectFit: number;
    let ScaleAspectFill: number;
    let Redraw: number;
    let Center: number;
    let Top: number;
    let Bottom: number;
    let Left: number;
    let Right: number;
    let TopLeft: number;
    let TopRight: number;
    let BottomLeft: number;
    let BottomRight: number;
}
