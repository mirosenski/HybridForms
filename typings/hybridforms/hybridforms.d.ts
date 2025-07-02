declare module "lib/UIControls" {
    import type { FormButtonStyle, FormButtonType } from "index";
    /**
     * The type of the Progress.
     * - 0: ring
     * - 1: bar
     */
    export enum ProgressType {
        ring = 0,
        bar = 1
    }
    /**
     * Predefined sizes of the progress.
     * - 0: xsmall
     * - 1: small
     * - 2: medium
     * - 3: large
     */
    export enum ProgressSize {
        xsmall = 0,
        small = 1,
        medium = 2,
        large = 3
    }
    /**
     * UiBlockerOverlay Modes dark and light
     * - 0: light
     * - 1: dark
     */
    export enum UIBlockerModeEnum {
        light = 0,
        dark = 1
    }
    /**
     * Data associated with hiding a dialog.
     **/
    export interface ContentDialogHideInfo {
        /***
         * The dialog's dismissal result. May be 'primary', 'secondary', 'none', or whatever custom value was passed to hide.
         **/
        result: string;
    }
    /**
     * Event object associated with hiding a dialog.
     **/
    export interface ContentDialogHideEvent extends Event {
        detail: ContentDialogHideInfo;
    }
    /**
     * Base control of all HybridForms ui controls. This class has no public properties or methods.
     */
    export abstract class BaseControl {
        element: HTMLElement;
        protected options: any;
        protected defaultElement: string;
        protected disposed: boolean;
        protected $element: JQuery<HTMLElement>;
        protected isView: boolean;
        id: string;
        constructor(element: HTMLElement, options: any);
        protected cssClasses(): void;
        protected init(): void;
        /**
         * Create method for PDF creation.
         * @returns a Promise
         */
        protected createView(): any;
        /**
         * This is an empty method. To overwrite within derived classes.
         * Contains everything which is ui relevant and returns a Promise.
         * If all controls on the ui have returned this promise the page event "rendered" is fired.
         * See also {@link Page.addEventListener} and {@link PageEventsEnum}
         */
        protected abstract createControl(): Promise<void>;
        /**
         * Register events here. This is an empty method and could be overwritten in derived classes.
         */
        protected registerEvents(): void;
        /**
         * Returns the name of the constructor.
         */
        protected name(): string;
        /**
         * Enables the control.
         */
        enable(): void;
        /**
         * Disables the control.
         * @param manuallyDisabled
         */
        disable(manuallyDisabled?: boolean): void;
        /**
         * Disposes the control.
         */
        dispose(): void;
    }
    /**
     * Displays a modal dialog which can display arbitrary HTML content.
     **/
    export class ContentDialog {
        /**
         * Gets the DOM element that hosts the ContentDialog control.
         **/
        element: HTMLElement;
        /**
         * Gets or sets the ContentDialog's visibility.
         **/
        hidden: boolean;
        /**
         * The text displayed as the title of the dialog.
         **/
        title: string;
        /**
         * The text displayed on the primary command's button.
         **/
        primaryCommandText: string;
        /**
         * Indicates whether the button representing the primary command is currently disabled.
         **/
        primaryCommandDisabled: boolean;
        /**
         * The text displayed on the secondary command's button.
         **/
        secondaryCommandText: string;
        /**
         * Indicates whether the button representing the secondary command is currently disabled.
         **/
        secondaryCommandDisabled: boolean;
        /**
         * Specifies the result of dismissing the ContentDialog.
         **/
        static DismissalResult: {
            /**
             * The dialog was dismissed without the user selecting any of the commands. The user may have dismissed the dialog by hitting the escape key or pressing the hardware back button.
             **/
            none: string;
            /**
             * The user dismissed the dialog by pressing the primary command.
             **/
            primary: string;
            /**
             * The user dismissed the dialog by pressing the secondary command.
             **/
            secondary: string;
        };
        /**
         * Indicates that the object is compatibile with declarative processing.
         **/
        static supportedForProcessing: boolean;
        /**
         * Creates a new ContentDialog control.
         * @param element The DOM element that hosts the ContentDialog control.
         * @param options An object that contains one or more property/value pairs to apply to the new control. Each property of the options object corresponds to one of the control's properties or events.
         **/
        constructor(element?: HTMLElement, options?: any);
        /**
         * Shows the ContentDialog. Only one ContentDialog may be shown at a time. If another ContentDialog is already shown, this ContentDialog will remain hidden.
         * @returns  A promise which is successfully fulfilled when the dialog is dismissed. The completion value indicates the dialog's dismissal result. This may be 'primary', 'secondary', 'none', or whatever custom value was passed to hide. If this ContentDialog cannot be shown because a ContentDialog is already showing or the ContentDialog is disposed, then the return value is a promise which is in an error state. If preventDefault() is called on the beforeshow event, then this promise will be canceled.
         **/
        show(): Promise<ContentDialogHideInfo>;
        /**
         * Hides the ContentDialog.
         * @param result A value indicating why the dialog is being hidden. The promise returned by show will be fulfilled with this value.
         **/
        hide(result?: any): void;
        /**
         * Disposes this control.
         **/
        dispose(): void;
        /**
         * Registers an event handler for the specified event.
         * @param type The name of the event to handle. Note that you drop the "on" when specifying the event name. For example, instead of specifying "onclick", you specify "click".
         * @param listener The event handler function to associate with the event.
         * @param useCapture Set to true to register the event handler for the capturing phase; otherwise, set to false to register the event handler for the bubbling phase.
         **/
        addEventListener(type: string, listener: (event: any) => void, useCapture?: boolean): void;
        /**
         * Removes an event handler that the addEventListener method registered.
         * @param type The name of the event that the event handler is registered for.
         * @param listener The event handler function to remove.
         * @param useCapture Set to true to remove the capturing phase event handler; set to false to remove the bubbling phase event handler.
         **/
        removeEventListener(type: string, listener: (event: any) => void, useCapture?: boolean): void;
        /**
         * Raises an event of the specified type and with additional properties.
         * @param type The type (name) of the event.
         * @param eventProperties The set of additional properties to be attached to the event object when the event is raised.
         * @returns true if preventDefault was called on the event, otherwise false.
         **/
        dispatchEvent(type: string, eventProperties: any): boolean;
        /**
         * Raised just before showing a dialog. Call preventDefault on this event to stop the dialog from being shown.
         * @param eventInfo An object that contains information about the event.
         **/
        onbeforeshow(eventInfo: Event): void;
        /**
         * Raised immediately after a dialog is fully shown.
         * @param eventInfo An object that contains information about the event.
         **/
        onaftershow(eventInfo: Event): void;
        /**
         * Raised just before hiding a dialog. Call preventDefault on this event to stop the dialog from being hidden.
         * @param eventInfo An object that contains information about the event.
         **/
        onbeforehide(eventInfo: ContentDialogHideEvent): void;
        /**
         * Raised immediately after a dialog is fully hidden.
         * @param eventInfo An object that contains information about the event.
         **/
        onafterhide(eventInfo: ContentDialogHideEvent): void;
    }
    /**
     * Progress control. Displays a progress ring or bar on the ui.
     */
    export class Progress {
        element: HTMLElement;
        type: ProgressType;
        size: ProgressSize;
        private htmlStrings;
        /**
         *
         * @param element
         * @param type Use numbers for the progressType. 0 = ring, 1 = bar; See {@link ProgressType}
         * @param size Use numbers for the progress size. 0 = xsmall, 1 = small, 2 = medium, 3 = large. See {@link ProgressSize}
         *
         */
        constructor(element: HTMLElement, type?: ProgressType, size?: ProgressSize);
        protected createControl(): Promise<void>;
        /**
         * Disposes the control.
         */
        dispose(): void;
        /**
         * Hides the progress. When not needed again the control should be disposed afterwards.
         * @param delay Fade-out delay of the progress. Default: 300ms.
         */
        hide(delay?: number): Promise<void>;
        /**
         * Shows the progress on the ui.
         * @param delay [optional] Fade-in delay in milliseconds of the progress. Default: 300ms;
         */
        show(delay?: number): void;
    }
    /**
     * BaseButton options.
     */
    export interface IBaseButtonOptions {
        /**
         * A function that gets called when the button was clicked.
         * Must return a Promise
         */
        clickHandler: (ev: any) => Promise<any>;
        /**
         * The label of the button. If omitted no label gets printed.
         */
        label?: string;
        /**
         * The icon of the button. if omitted no icon gets printed
         */
        icon?: string;
        /**
         * If set to true, the device vibrates on a button click (only on devices/platforms that supports vibration).
         */
        vibrationFeedback?: boolean;
        /**
         * If set to true, the button gets disabled when clicked
         */
        disableOnClick?: boolean;
        /**
         * Toggles the state of the button.
         */
        toggleButton?: boolean;
    }
    export enum ButtonType {
        /**
         * The Button takes as much width as it needs.
         */
        auto = 0
    }
    export interface IButtonOptions extends IBaseButtonOptions {
        type?: ButtonType;
    }
    /**
     * BaseButton class. All HybridForms buttons derive from this class. This class has no public methods.
     */
    export class BaseButton<T extends IBaseButtonOptions> {
        $button: JQuery<HTMLButtonElement>;
        disable(): void;
        /**
         * Enable button
         */
        enable(): void;
        /**
         * Set label of button
         * @param label Provide label as string, html is allowed
         */
        setLabel(label?: string): void;
        /**
         * Set options of button
         * @param options button options
         */
        setOptions(options: IBaseButtonOptions): void;
        /**
         * hide button
         * @param disable sets the disabled property, default: true;
         */
        hide(disable?: boolean): void;
        /**
         * show button
         * @param enable sets the enabled property, default: true;
         */
        show(enable?: boolean): void;
        /**
         * Triggers a click on the button
         */
        triggerClick(): void;
        /**
         * Shows a progress icon
         * @param $appendToCt optional, define a container to which the progress icon gets appended to, default: the progress button
         */
        showProgressIcon($appendToCt?: JQuery<HTMLElement>): void;
        /**
         * Hides the progress icon
         * @param $appendToCt optional, define a container from which the progress icon gets removed, default: the progress button
         */
        hideProgressIcon($appendToCt?: JQuery<HTMLElement>): void;
    }
    /**
     * Button class. Default HybridForms button.
     */
    export class Button extends BaseButton<IButtonOptions> {
        element: HTMLElement;
        protected type: ButtonType;
        protected html: {
            auto: string;
        };
        constructor(element: HTMLElement, options: IButtonOptions);
        dispose(): void;
    }
    export interface IFormButtonOptions extends IBaseButtonOptions {
        /**
         * The type of the button.
         */
        type: FormButtonType;
        /**
         * An optional heading for the button
         */
        heading?: string;
        /**
         * Gives the user an audio feedback when the button is clicked
         */
        audioFeedback?: boolean;
        /**
         * Gives the user an audio feedback when the clickHandler promise is fullfilled.
         */
        callbackFeedback?: boolean;
        /**
         * Shows Progress rings on the butten when the button is clicked, until the clickHandler promise is fullfilled.
         */
        showProgress?: boolean;
        /**
         * The style of the button.
         */
        style?: FormButtonStyle;
    }
    /**
     * FormButton class. The HybridForms button that could be used within the form.
     */
    export class FormButton extends BaseButton<IFormButtonOptions> {
        element: HTMLElement;
        constructor(element: HTMLElement, options: IFormButtonOptions);
        dispose(): void;
    }
    /**
     * UiBlockerOverlay class. An blocking overlay for time consuming operations. Info messages can be presented to the user.
     */
    export class UiBlockerOverlay {
        /**
         * constructor
         * @param uiMode Choose the dark or light mode of the UiBlockerOverlay; default = dark
         * @param zIndex the z-index of the overlay, default = 1000
         */
        constructor(uiMode?: UIBlockerModeEnum, zIndex?: number);
        /**
         * Opens the UiBlocker-Overlay
         * @param duration duration of the fade-in animation, default = 0;
         * @param msg the message that is shown to the user
         */
        open(duration?: number, msg?: string): void;
        /**
         * Presents an info message to the user
         * @param text the message that is presented to the user
         * @param isHtml if the string should be parsed as html set this option to true, default = false
         */
        info(text: string, isHtml?: boolean): void;
        /**
         * Closes the UiBlocker-Overlay
         */
        close(): void;
        /**
         * Replaces the UiBlocker message with given string
         * @param msg the message that is presented to the user
         * @param isHtml if the string should be parsed as html set this option to true
         */
        static showMessage(msg: string, isHtml?: boolean): Promise<void>;
    }
    /**
     * Settings for Tooltip
     */
    export interface ITooltipSettings {
        /**
         * display value for tooltip
         */
        innerHTML: string;
        /**
         * extra css classes for tooltip
         */
        classes: string;
    }
    /**
     * Tooltip class. The HybridForms tooltip that could be used within the form.
     */
    export class Tooltip {
        element: HTMLElement;
        settings: ITooltipSettings;
        /**
         * constructor
         * @param element the anchor element for the tooltip
         * @param settings ITooltipSettings
         */
        constructor(element: HTMLElement, settings: ITooltipSettings);
        /**
         * Open method. Show tooltip in given context
         * @param $context scroll container context where tootip is placed
         * @param duration enable open animation and set animation duration in ms
         */
        open($context: JQuery<HTMLElement>, duration?: number): Promise<void>;
        /**
         * Close method. Remove tooltip.
         * @param duration enable close animation and set animation duration in ms
         */
        close(duration?: number): Promise<void>;
        dispose(): void;
    }
}
declare module "lib/FormControls" {
    import type { IFormField, IScanButtonConfiguration, ISignData } from "index";
    import type { Progress } from "lib/UIControls";
    /**
     * Get a form control.
     * @param id the id of the form control
     * @param ct [optional] a parent html element
     */
    export function getCtrl(id: string, ct?: HTMLElement): any;
    /**
     * Base class of all form controls.Writes values into the fields blob,
     * sets ui classes and defines the structure of all form controls.
     */
    export abstract class FormControl {
        protected disposed: boolean;
        defaultValue: any;
        enabled: any;
        labelEl: JQuery<HTMLElement>;
        label: string;
        onChanged: (value: any) => void;
        required: boolean;
        tooltip: string;
        visiting: boolean;
        element: HTMLElement;
        /**
         * Deletes the all fields related to the form control.
         * @param name The field id.
         */
        deleteFields(name: string): Promise<any>;
        /**
         * Disables the form control.
         */
        disable(): void;
        /**
         * Disposes the form control.
         */
        dispose(): void;
        /**
         * Enables the form control.
         */
        enable(): void;
        /**
         * Show hidden FormControl
         * @param animate En/Disable animation
         * @param unlock Disable lock of hidden state to process control with condition
         */
        show(animate?: boolean, unlock?: boolean): void;
        /**
         * Hide FormControl
         * @param animate En/Disable animation
         * @param lock Enable lock of hidden FormControl to not process control with condition
         */
        hide(animate?: boolean, lock?: boolean): void;
        /**
         * Checks if the form control is included in a repeating unit.
         */
        isRepeatingUnit(): boolean;
        /**
         * Gets the corresponding field of the form control.
         */
        get(): IFormField;
        /**
         * Gets the default value auf the form control, if it is set.
         */
        getDefault(): any;
        /**
         * Gets the PostfixFieldId. Relevant for operations in repeating units.
         * Check first, if the form control is contained in a repeating unit, see: {@link isRepeatingUnit}.
         */
        getPostfixFieldId(): string;
        /**
         * Searches for a field by providing its id.
         * @param id The id of the field.
         */
        getWithId(id: string): IFormField;
        /**
         * Sets the field value of the form control. Be careful: This does not update the UI. In most cases it is better to use the val() method, see: {@link val}
         * @param value The value of the field
         */
        set(value: any): number;
        /**
         * Sets any field value by providing its id.
         * @param id The id of the field.
         * @param val The value of the field. Data type is an object. Its structure depends on the specific field type.
         */
        setWithId(id: string, val: any): number;
        /**
         * Sets a new label value.
         * @param value The value to set.
         */
        setLabel(value: string): void;
        /**
         *
         * @returns all fields and values that are connected with the the form control.
         */
        getAllValues(): any;
        /**
         * Sets ui value and updates the field value.
         * @param value The value of the field. Data type is an object. Its structure depends on the specific field type/form control.
         */
        abstract val(value?: any, disableOnChanged?: any): any;
    }
    /**
     * Base class for all fieldless controls
     * Fieldless controls are:
     * - {@link Label}
     * - {@link MailButton}
     * - {@link MapButton}
     * - {@link PhoneButton}
     * - {@link ScanButton}
     * - {@link WebView}
     */
    export abstract class FieldlessControl extends FormControl {
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control only set values of other form controls.
         */
        val(value?: any): any;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        setLabel(value: any): void;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        deleteFields(): Promise<any>;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        get(): IFormField;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        getDefault(): any;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        getWithId(): IFormField;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        set(): number;
        /**
         * Does nothing. Overwrites the inherited method from {@link FormControl}.
         * This form control do not have saved data in fields.
         */
        setWithId(): number;
    }
    /**
     * Base class for all kendo based form controls.
     * Kendo based form controls are:
     * - {@link DatePicker}
     * - {@link TimePicker}
     * - {@link ComboBox}
     * - {@link DropDownList}
     * - {@link NumericField}
     */
    export abstract class KendoBase<T> extends FormControl {
        /**
         * Returns the kendo ui control that is instantiated through the HybridForms control;
         * For the API of the kendo ui control see https://docs.telerik.com/kendo-ui/api/javascript/ui/
         */
        get inputCtrl(): kendo.ui.ComboBox;
        /**
         * On mobile or small devices a dialog opens when the user clicks on the control. If this dialog is open, the dialog control is returned;
         * Otherwise the main control is returned.
         * For the API of the kendo ui control see https://docs.telerik.com/kendo-ui/api/javascript/ui/
         */
        get currentInputCtrl(): kendo.ui.ComboBox;
        /**
         * Set additional options to kendo controls.
         * @param options New options to set.
         */
        setKendoOptions(options: any): void;
    }
    /**
     * The HybridForms Combobox. Inherits from {@link KendoBase}.
     */
    export class ComboBox extends KendoBase<kendo.ui.ComboBox> {
        element: HTMLElement;
        protected options: any;
        constructor(element: HTMLElement, options: any);
        /**
         * @deprecated
         * For compatibility to old win10 formdefinition javascript implementation this member must be named '_ctrl'
         */
        get _ctrl(): kendo.ui.ComboBox;
        /**
         * @deprecated
         * for compatibility to old win10 formdefinition javascript implementation.
         */
        get initialized(): void;
        /**
         * Gets the data source of the comboBox
         */
        getDataSource(): any[];
        /**
         *
         * @param itemId provide the name of the property that is defined as the id of the data source value field.
         * @returns the dataItem of the provided id of the data source.
         */
        getDataItem(itemId: string): any;
        /**
         * Returns a Promise which is resolved when the control is fully initialized.
         */
        isLoaded(): Promise<void>;
        /**
         * Set the data source of a ComboBox control.
         * @param dataSource Expects a key/value object. The key name is defined in the data-hf-options ('dataTextField') of the formcontrol.
         */
        setDataSource(dataSource: any[]): void;
        /**
         * Gets or sets the value of the ComboBox control.
         * The ComboBox control sets to fields:
         * - 1) the field with the "id" as key and the dataValueField (defined in the formdefinition) as value.
         * - 2) the field with the "id" plus the addition '_HFComboText' as key and the dataTextField (defined in the formdefinition) as value.
         * @param value [optional] If provided, the value (and the corresponding fields) of the ComboBox control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: string, disableOnChanged?: boolean): {
            value: string;
            text: string;
        };
    }
    /**
     * The HybridForms DatePicker control.
     * It inherits from the KendoBase control and instantiates the kendo ui date picker control, see:
     * https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker
     */
    export class DatePicker extends KendoBase<kendo.ui.DatePicker> {
        element: HTMLElement;
        protected options: any;
        /**
         * Placeholder for the input field when no value is selected.
         */
        emptyContent: string;
        /**
         * Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * The format also will be used to parse the input. See https://docs.telerik.com/kendo-ui/framework/globalization/dateformatting
         */
        displayValueFormat: string;
        /**
         * Disable the popup calendar.
         */
        disableCalendar: boolean;
        /**
         * Convert the date string to locale date
         */
        convertToLocalDate: boolean;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the DatePicker control.
         * @param value [optional] If provided, the value of the DatePicker control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: string, disableOnChanged?: boolean): string;
    }
    /**
     * The HybridForms DrawingControl.
     * Users can draw on an image inside edit overlay with all drawing funtionality. Optional a background image can be included. The drawn sketch is stored.
     */
    export class DrawingControl extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * Sets the height of the canvas.
         */
        height: number;
        /**
         * Sets the background image of the control.
         */
        image: string;
        /**
         * Sets the image responsive. Overrites width and height parameter.
         */
        responsive: boolean;
        /**
         * Sets the width of the canvas.
         */
        width: number;
        constructor(element: HTMLElement, options: any);
        /**
         * Does nothing on the DrawingControl.
         */
        val(value: any): void;
    }
    /**
     * The HybridForms DropDownList. Inherits from {@link KendoBase}.
     */
    export class DropDownList extends KendoBase<kendo.ui.DropDownList> {
        element: HTMLElement;
        protected options: any;
        constructor(element: HTMLElement, options: any);
        /**
         *
         * @param itemId provide the name of the property that is defined as the id of the data source value field.
         * @returns the dataItem of the provided id of the data source.
         */
        getDataItem(itemId: string): any;
        /**
         * Gets the data source of the DropDownList
         */
        getDataSource(): any[];
        /**
         * Returns a Promise which is resolved when the control is fully initialized.
         */
        isLoaded(): Promise<void>;
        /**
         * Set the data source of a DropDownList control.
         * @param dataSource Expects a key/value object. The key name is defined in the data-hf-options ('dataTextField') of the formcontrol.
         */
        setDataSource(dataSource: any[]): void;
        /**
         * Gets or sets the value of the DropDownList control.
         * The DropDownList control sets to fields:
         * - 1) the field with the "id" as key and the dataValueField (defined in the formdefinition) as value.
         * - 2) the field with the "id" plus the addition '_HFDropDownListText' as key and the dataTextField (defined in the formdefinition) as value.
         * @param value [optional] If provided, the value (and the corresponding fields) of the DropDownList control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: string, disableOnChanged?: boolean): {
            value: string;
            text: string;
        };
    }
    /**
     * The HybridForms FileUploader.
     * Upload files within a form.
     */
    export class FileUploader extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The minimum number of pixels for image files.
         */
        minImagePixel: number;
        /**
         * The maximum number of pixels for image files.
         */
        maxImagePixel: number;
        /**
         * The minimum file size in KB.
         */
        minFileSizeKb: number;
        /**
         * The maximum file size in KB.
         */
        maxFileSizeKb: number;
        /**
         * The maximum number of files to upload.
         */
        maxFileUploads: number;
        /**
         * The allowed file types. The file types are defined as an array of extensions.
         */
        allowedFormats: string[];
        /**
         * The description text displayed before uploaded files. HTML is allowed.
         */
        descriptionStart: string;
        /**
         * The description text displayed before uploaded files. HTML is allowed.
         */
        descriptionEnd: string;
        /**
         * The label text for the uplaod button.
         */
        buttonLabel: string;
        /**
         * Enable multiple file uploads.
         */
        multipleUpload: boolean;
        /**
         * the maximum number of pages for PDF files.
         */
        maxPDFPages: number;
        /**
         * Enable audio feedback on button click.
         */
        audioFeedback: boolean;
        /**
         * Suggests a unique file name for the uploaded file if another one with the same name already exists.
         */
        renameFileIfExists: boolean;
        /**
         * Delete all attachments if condition is not fullfilled.
         */
        deleteOnNotFullfilledCondition: boolean;
        constructor(element: HTMLElement, options: any);
        /**
         * Open file upload dialog.
         */
        openFileUploadPicker(): Promise<void>;
        /**
         * Upload files.
         * @param files Expects an array of files.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        uploadFiles(files: File[], disableOnChanged?: boolean): Promise<void>;
        /**
         * Delete file by filename.
         * @param filename Expects a string.
         */
        deleteFile(filename: string): Promise<void>;
        /**
         * Delete all files.
         */
        deleteAllAttachments(): Promise<void>;
        /**
         * Does nothing on the FileUploader.
         */
        val(value: any): void;
    }
    /**
     * The HybridForms HtmlContainer.
     * Users can place HTML code dynamically.
     */
    export class HtmlContainer extends FormControl {
        element: HTMLElement;
        protected options: any;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the children of HtmlContainer as a string.
         * @param value [optional] If provided, the value (and the corresponding field) of the HtmlContainer control gets set.
         */
        val(value: string): string;
    }
    /**
     * The HybridForms InkControl.
     * Users can draw on a canvas. Optional a background image can be included. The drawn sketch is stored.
     */
    export class InkControl extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * Sets a clear button in the left bottom corner if set to true.
         * Default: false.
         */
        clearButton: boolean;
        /**
         * Sets the colour the user draws on the canvas.
         */
        defaultColor: string;
        /**
         * Sets the height of the canvas.
         */
        height: number;
        /**
         * Sets the background image of the control.
         */
        image: string;
        /**
         * @deprecated For compatibility reasons to Win10 app.
         */
        isfMode: boolean;
        /**
         * If set to true, signatures gets logged.
         */
        logSigning: boolean;
        /**
         * Sets the width of the canvas.
         */
        width: number;
        constructor(element: HTMLElement, options: any);
        /**
         * Deletes all fields that are linked to the InkControl:
         * - 1) FieldId
         * - 2) FieldId + _HFInkImage
         * - 3) FieldId + '_HFInkImageMerged'
         */
        deleteFields(): Promise<void>;
        /**
         * Stores the images and sets the fields with the names of the images.
         * @param progress [optional] Adds a Progress control.
         */
        save(progress?: Progress): Promise<void>;
        /**
         * Does nothing on the InkControl. Use instead the {@link save} method to save the InkControl.
         * To get the file names of the stored images use the {@link Fields.getById} method.
         */
        val(value: any): void;
    }
    /**
     * Displays a label on the ui.
     */
    export class Label extends FieldlessControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The required fields to validate
         */
        requiredFields: string | any[];
        /**
         * The validation comparison operator
         */
        requiredFieldsOp: string;
        constructor(element: HTMLElement, options: any);
    }
    export class NumericField extends KendoBase<kendo.ui.NumericTextBox> {
        element: HTMLElement;
        protected options: any;
        /**
         * The default value of the control.
         */
        defaultValue: number;
        /**
         * The starting value of the control
         */
        startValue: number;
        /**
         * Hides spinners and disable dialog opening on mobile devices
         */
        disableOpenDialog: boolean;
        constructor(element: HTMLElement, options: any);
        /**
         * This function sets the unit of the input field.
         * @param {string} format - The format of the input. Set to empty string to remove the unit.
         * @param {string} [placeholder] - The placeholder text to display when the input is empty.
         */
        setUnit(format: string, placeholder?: string): void;
        /**
         * Gets or sets the value of the NumericField control.
         * @param value [optional] If provided, the value of the NumericField control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: number, disableOnChanged?: boolean): number;
    }
    /**
     * The PicturePicker control lets add pictures directly to a field of the form.
     */
    export class PicturePicker extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * If set to true, comments get displayed on the main form page.
         * Default: false.
         */
        showComment: false;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the PicturePicker control.
         * @param value [optional] If provided, the value of the PicturePicker control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: string, disableOnChanged?: boolean): string | undefined;
    }
    /**
     * The RadioBox control of HybridForms.
     */
    export class RadioBox extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * If set to true, the radio boxes are deselctable
         * Default: true.
         */
        deselectable: boolean;
        /**
         * If set to true, the radio boxes float left.
         * Default: false.
         */
        floatLeft: boolean;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the RadioBox control.
         * @param value [optional] If provided, the value of the RadioBox control gets set.
         */
        val(value: any): undefined | boolean;
    }
    /**
     * The ReverseGelocator gets the current position of the user and writes its results to other form controls
     */
    export class ReverseGeolocatorButton extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The type of the button. Go to {@link FormButtonType} to get all possibilities.
         */
        buttonType: string;
        /**
         * The label of the button.
         */
        buttonLabel: string;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the control.
         * @param value [optional] If provided, the value of the control gets set.
         */
        val(value?: string): string | number | string[] | undefined;
    }
    /**
     * The HybridForms SelectBox control. Is based on a standard html select control.
     * The ui and styling of this control is mainly controlled by the device and platform.
     */
    export class SelectBox extends FormControl {
        element: HTMLElement;
        protected options: any;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the control.
         * @param value [optional] If provided, the value of the control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value: string, disableOnChanged?: boolean): string | number | string[];
    }
    /**
     * The HybridForms Signature control.
     */
    export class Signature extends FormControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The background image of the control. Provided as url.
         * Default: A default image gets set.
         */
        image: string;
        /**
         * A callback function that gets called after sigining
         */
        signingAsCallback: string;
        /**
         * The signing data.
         */
        signData: ISignData;
        constructor(element: HTMLElement, options: any);
        /**
         * Saves the images and sets the corresponding fields of the control.
         */
        save(): Promise<void>;
        /**
         * Does nothing on the Signature.
         */
        val(value: any): void;
    }
    /**
     * The HybridForms Textfield control. For text based user inputs.
     */
    export class TextField extends FormControl {
        element: HTMLElement;
        protected options: any;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the Textfield control.
         * @param value [optional] If provided, the value (and the corresponding field) of the Textfield control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: string, disableOnChanged?: boolean): string | number | string[] | undefined;
    }
    /**
     * The HybridForms Treeview control. For representation and selection of hierarchical data.
     */
    export class TreeView extends FormControl {
        element: HTMLElement;
        protected options: any;
        constructor(element: HTMLElement, options: any);
        /**
         * Set the data source of a Treeview control.
         * @param dataSource Expects an array of key/value objects. The key name is defined in the data-hf-options ('dataTextField') of the formcontrol.
         * For more information see https://docs.telerik.com/kendo-ui/framework/datasource/hierarchical
         */
        setDataSource(dataSource: any[], dataIdField?: any, dataTextField?: any): void;
        /**
         * Gets or sets the value of the Treeview control.
         * The TreeView control sets to fields:
         * - 1) the field with the "id" as key and the dataValueField (defined in the formdefinition) as value.
         * - 2) the field with the "id" plus the addition '_HFText' as key and the dataTextField (defined in the formdefinition) as value.
         * @param value [optional] If provided, the value (and the corresponding field) of the Treeview control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: {
            id: string;
            text: string;
        }[] | {
            id: string;
            text: string;
        }, disableOnChanged?: boolean): {
            id: string;
            text: string;
        }[];
    }
    /**
     * The HybridForms CheckBox form control. For checkbox user inputs.
     */
    export class CheckBox extends FormControl {
        element: HTMLElement;
        protected options: any;
        floatLeft: boolean;
        onChanged: any;
        constructor(element: HTMLElement, options: any);
        val(value: any): undefined | boolean;
    }
    /**
     * The HybridForms TimePicker control. Inherits from {@link KendoBase} and instantiates the kendo timepicker widtget,
     * see: https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker
     */
    export class TimePicker extends KendoBase<kendo.ui.TimePicker> {
        element: HTMLElement;
        protected options: any;
        /**
         * The placeholder text if the control has no value.
         */
        emptyContent: string;
        /**
         * Convert the date string to locale time
         */
        convertToLocalTime: boolean;
        constructor(element: HTMLElement, options: any);
        /**
         * Gets or sets the value of the control.
         * @param value [optional] If provided, the value (and the corresponding field) of the control gets set.
         * @param disableOnChanged [optional] Disables the onChanged callback if set to true. Necessary if an onChanged-Handler wants to change itself.
         */
        val(value?: string, disableOnChanged?: boolean): Date;
    }
    /**
     * The ScanButton control scans codes of various types (barcodes, qrcodes etc.).
     */
    export class ScanButton extends FieldlessControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The button icon; SVG or fontawesome icon
         */
        icon: string;
        /**
         * The label of the button.
         */
        buttonHeading: string;
        /**
         * The type of the button. Go to {@link FormButtonType} to get all possibilities.
         */
        buttonType: string;
        /**
         * The label of the button.
         */
        buttonLabel: string;
        /**
         * The scan configuration
         */
        scan: IScanButtonConfiguration;
        constructor(element: HTMLElement, options: any);
    }
    /**
     * The MailButton control places a button to open system mail application.
     */
    export class MailButton extends FieldlessControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The button icon; SVG or fontawesome icon
         */
        icon: string;
        /**
         * The label of the button.
         */
        buttonHeading: string;
        /**
         * The type of the button. Go to {@link FormButtonType} to get all possibilities.
         */
        buttonType: string;
        /**
         * The label of the button.
         */
        buttonLabel: string;
        /**
         * The id of the mail address input form control
         */
        mailId: string;
        /**
         * The subject line for the mail
         */
        mailSubject: string;
        constructor(element: HTMLElement, options: any);
    }
    /**
     * The MapButton control places a button to open Google Maps with given address.
     */
    export class MapButton extends FieldlessControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The button icon; SVG or fontawesome icon
         */
        icon: string;
        /**
         * The label of the button.
         */
        buttonHeading: string;
        /**
         * The type of the button. Go to {@link FormButtonType} to get all possibilities.
         */
        buttonType: string;
        /**
         * The label of the button.
         */
        buttonLabel: string;
        /**
         * The id of the city input form control
         */
        cityId: string;
        /**
         * The id of the street name input form control
         */
        streetId: string;
        /**
         * The id of the zip code input form control
         */
        zipCodeId: string;
        /**
         * The id of the street number input form control
         */
        streetNoId: string;
        /**
         * The id of the street number addition input form control
         */
        streetAddId: string;
        constructor(element: HTMLElement, options: any);
    }
    /**
     * The PhoneButton control places a button to make a call.
     */
    export class PhoneButton extends FieldlessControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The button icon; SVG or fontawesome icon
         */
        icon: string;
        /**
         * The label of the button.
         */
        buttonHeading: string;
        /**
         * The type of the button. Go to {@link FormButtonType} to get all possibilities.
         */
        buttonType: string;
        /**
         * The label of the button.
         */
        buttonLabel: string;
        /**
         * The id of the phone number input form control
         */
        phoneId: string;
        constructor(element: HTMLElement, options: any);
    }
    export type WebviewCtrlType = 'videofile' | 'website';
    /**
     * The WebView control can be used to place an online or offline Video.
     */
    export class WebView extends FieldlessControl {
        element: HTMLElement;
        protected options: any;
        /**
         * The height for the WebView control
         */
        height: number;
        /**
         * The width for the WebView control
         */
        width: number;
        /**
         * The type of the WebView. Should it show an online video (Youtube, etc.) or an offline video file
         */
        type: WebviewCtrlType;
        /**
         * The url to the video. It can an 'https://' or a file ('\{\{HFFormPath\}\}') link
         */
        url: string;
        constructor(element: HTMLElement, options: any);
    }
}
declare module "lib/API" {
    import type { BarcodeOptions, ConditionTable, DataFormatEnum, FieldsEventsEnum, FormEventsEnum, FormStatusResult, FormValidationResult, IAsset, IAssetFile, ICounterData, ICounterResponse, IFormAttachment, IFormDefinition, IFormField, IGroup, IHFLocation, ILookupTable, IOnFieldsMutatedReference, ITab, IUser, NextPageConditionEnum, OptionValue, PageEventsEnum, PlatformEventsEnum, QRCodeOptions, RepeatingUnitEventsEnum, Status, XhrRequest } from "index";
    import type * as DOMPurify from 'dompurify';
    export * as UIControls from "lib/UIControls";
    export * as FormControls from "lib/FormControls";
    /**
     * The current version of the FormAPI.
     */
    export let version: string;
    /**
     * Static properties and methods related to manipulating fields.
     */
    export abstract class Fields {
        /**
         * Add an event listener
         * @param type type of event listener, defined in the {@link FieldsEventsEnum}
         * @param callback
         */
        static addEventListener(type: keyof typeof FieldsEventsEnum, callback: (ev: {
            detail: {
                value: IOnFieldsMutatedReference;
            };
        }) => void): void;
        /**
         * Always remove previously registered event listener
         * @param type type of event listener, defined in the {@link FieldsEventsEnum}
         * @param callback
         */
        static removeEventListener(type: keyof typeof FieldsEventsEnum, callback: (ev: {
            detail: {
                value: IOnFieldsMutatedReference;
            };
        }) => void): void;
        /**
         * Delete a field value.
         * @param id id of the field to delete
         */
        static deleteField(id: string): boolean;
        /**
         * Get field by its id
         * @param id id of the field
         */
        static getById(id: string): IFormField;
        /**
         * Get a field from its index
         * @param index index of a field
         */
        static getByIndex(index: number): IFormField;
        /**
         * get the index of a field
         * @param id id of the field
         */
        static getIndex(id: string): number;
        /**
         * Logs field-ids and values in the console.
         * If a searchString is provided only fields that matches a certain string gets logged
         * @param searchString string, a string to match with a field-id (indexOf)
         */
        static logFields(searchString: string): void;
        /**
         * Set field value
         * @param id id of the field
         * @param val value to set
         */
        static setField(id: string, val: any): any;
    }
    /**
     * Static properties and methods related to the current activation.
     */
    export class Activation {
        /**
         * Get the base url of the current activation.
         */
        static getBaseUrl(): string;
        /**
         * Get the client id of the current activation.
         */
        static getClientId(): string;
        /**
         * Get the absolute url of a path using the current activation. the '~' prefix extends the url with /api/app/\{id\}.
         */
        static getUrl(path: string): string;
    }
    /**
     * Static properties and methods related to the current form.
     */
    export class Form {
        /**
         * This function copies the current form and returns a promise that resolves to the new form.
         * @param {boolean} [deleteFields] - boolean - If true, the copied form will remove marked fields.
         * @returns A promise that will resolve to a new Form object.
         */
        static copyForm(deleteFields?: boolean): Promise<any>;
        /**
         * Get the status of the current form.
         */
        static getStatus(): Status;
        /**
         * Get the creation date of the current form.
         */
        static getFormDate(): Date;
        /**
         * Get the last modified date of the current form.
         */
        static getLastModified(): Date;
        /**
         * Get the group infos about the current form.
         */
        static getGroup(): IGroup;
        /**
         * Get the current form in specified format.
         * @param format {@link DataFormatEnum}, the format to get the form in.
         */
        static getCurrent(format?: DataFormatEnum): any;
        /**
         * Save the current form.
         */
        static save(): Promise<any>;
        /**
         * Disable the automatic saving of the form.
         */
        static disableAutoSave(): void;
        /**
         * Enable the automatic saving of the form.
         */
        static enableAutoSave(): void;
        /**
         * Prevent notify mutated event gets fired.
         */
        static disableNotifyMutated(): void;
        /**
         * Enable notify mutated event.
         */
        static enableNotifyMutated(): void;
        /**
         * Checks wether the form has an attachment with the given file name.
         * @param filename string, the name of the file.
         */
        static hasAttachment(filename: string): boolean;
        /**
         * Add or update an attachment with the given file name.
         * @param filename string, the name of the file.
         * @param blob Blob, blob to add or update
         */
        static addOrUpdateAttachment(filename: string, blob: Blob): Promise<IFormAttachment>;
        /**
         * Delete an attachment with the given file name.
         * @param filename string, the name of the file.
         */
        static deleteAttachment(filename: string): Promise<void>;
        /**
         * Returns the actual file path of an attachment with the given file name.
         * @param filename string, the name of the file.
         */
        static getAttachmentUrl(filename: string): Promise<string>;
        /**
         * Adds an event listener to the form class.
         * @param type type of event listener, defined in the {@link FormEventsEnum}
         * @param callback
         */
        static addEventListener(type: keyof typeof FormEventsEnum, callback: () => Promise<void>): void;
        /**
         * Always remove previously registered event listeners!
         * @param type type of event listener, defined in the {@link FormEventsEnum}
         * @param callback
         */
        static removeEventListener(type: keyof typeof FormEventsEnum, callback: () => Promise<void>): void;
    }
    /**
     * Static properties and methods related to the form status.
     */
    export class FormStatus {
        /**
         * Checks if the form is valid.
         */
        static checkFormStatus(): Promise<FormStatusResult>;
        /**
         * Processes all conditions and sets the status of the form
         */
        static setInitialStatus(): void;
        /**
         * Stops (or enables) processing conditions and setting the status of the form.
         * Use with caution and always set back with suspendStatus(false) or enableProcessing();
         * @param suspend boolean, default = true, suspending (true) or enabling processing of conditions and status of the form
         */
        static suspendProcessing(suspend: boolean): void;
        /**
         * List all invalid fields of the form
         * @param filter set filter to onlyFullfilled to get only fullfilled fields
         * @returns - an array of field ids
         */
        static listAllInvalidFields(filter?: {
            onlyFullfilled?: boolean;
        }): string[];
        /**
         * List all required fields of the form
         * @param filter set filter to onlyFullfilled to get only fullfilled fields, set filter to onlyUnfilled to get only unfilled fields, set filter to onlyFilled to get only filled fields
         * @returns - an array of field ids
         */
        static listAllRequiredFields(filter?: {
            onlyFullfilled?: boolean;
            onlyUnfilled?: boolean;
            onlyFilled?: boolean;
        }): string[];
        /**
         * Validate the current form
         * @param staticValidation set to false to validate the form with form validation
         * @param suppressLogs set to true to suppress log messages
         * @returns - form validation result
         */
        static validateCurrentForm(staticValidation?: boolean, suppressLogs?: boolean): FormValidationResult;
    }
    /**
     * Static properties and methods related to the form definition structure.
     */
    export class FormDefinition {
        /**
         * Get the form definition (IFormDefinition) of the current Form
         */
        static get(): IFormDefinition;
        /**
         * Get a table of all condition guids of the current Form
         */
        static getConditionTable(): ConditionTable;
        /**
         * Get a loolup table of all sections, tabs, blocks, condition controls and fields
         */
        static getLookUpTable(): ILookupTable;
        /**
         * Gets the formdefinition attachment path of the current Form
         */
        static getAttachmentPath(): string;
        /**
         * Takes the name of a file from the formdefiniton and returns a Promise with the actual file blob
         * @param filename
         */
        static getAttachmentBlob(filename: string): Promise<Blob>;
        /**
         * Takes the name of a file from the formdefiniton and returns a Promise with the actual file path
         * @param filename
         */
        static getAttachmentUrl(filename: string): Promise<string>;
        /**
         * Get the FormDev proxy host specified in the form definition
         */
        static getProxyHost(): string;
        /**
         * Sets the Approve Button label
         * @param text text to be set
         */
        static setApproveButtonLabel(text: string): void;
        /**
         * Sets the ApproveDialog title
         * @param text text to be set
         */
        static setApproveDialogTitle(text: string): void;
        /**
         * Sets the ApproveDialog message
         * @param text text to be set
         */
        static setApproveDialogMessage(text: string): void;
    }
    /**
     * Static properties and methods related to the asset repository.
     */
    export class Assets {
        /**
         * Get all assets of the current client.
         */
        static getAssets(): Promise<IAsset[]>;
        /**
         * Get assets by name.
         * @param assetname - given name of the asset
         */
        static getAssetFromName(assetname: string): Promise<IAsset>;
        /**
         * Get assets by path.
         * @param assetPath - path to the asset
         */
        static getAssetFromPath(assetPath: string): Promise<[IAsset, IAssetFile]>;
        /**
         * Get asset file as Blob by name.
         * @param assetname - given name of the asset
         * @param filename - name of the file
         */
        static getFileAsBlob(assetname: string, filename: string): Promise<Blob>;
        /**
         * Get asset file as URL by name.
         * @param assetname - given name of the asset
         * @param filename - name of the file
         */
        static getFileAsURL(assetname: string, filename: string): Promise<string>;
        /**
         * Reset asset repository.
         */
        static resetAssetRepository(): Promise<void>;
    }
    /**
     * Static properties and methods related to the form storage (data sources).
     */
    export class FormStorage {
        /**
         * Get a data source by ID or Url.
         * @param idOrUrl string - id from data source declaration or url to catalog
         * @param filters array - filter data source by given field and value
         * @returns array of data items is returned
         */
        static getCatalog(idOrUrl: string, filters?: {
            field: string;
            value: string;
        }[]): Promise<any>;
        /**
         * Get a kendo data source by ID or Url.
         * @param idOrUrl string - id from data source declaration or url to catalog
         * @param filters array - filter data source by given field and value
         * @returns a kendo data source object is returned
         * @deprecated
         */
        static getDataSource(idOrUrl: string, filters?: {
            field: string;
            value: string;
        }[]): Promise<kendo.data.DataSource>;
        /**
         * Get a kendo data source by ID or Url.
         * @param idOrUrl string - id from data source declaration or url to catalog
         * @param filters array - filter data source by given field and value
         * @returns a kendo data source object is returned
         */
        static getKendoDataSource(idOrUrl: string, filters?: {
            field: string;
            value: string;
        }[]): Promise<kendo.data.DataSource>;
    }
    /**
     * Static properties and methods related to geolocation handling.
     */
    export class Geolocator {
        /**
         * Get the current user position.
         * @param {Object} options - Options for the geolocation request.
         * @param {boolean} [options.supressErrorMessage] - Supresses error message when position request ran in error or timeout.
         * @param {boolean} [options.requestNewPosition] - Requests a new position. If set to false, the last saved position (if not older than 5 minutes) is returned.
         * @param {boolean} [options.enableHighAccuracy] - Use GPS support if possible (increase accuracy).
         * @param {number} [options.roundResultTo] - Round the result of latitude and longitude to given count.
         */
        static getPosition(options: {
            supressErrorMessage?: boolean;
            requestNewPosition?: boolean;
            enableHighAccuracy?: boolean;
            roundResultTo?: number;
        }): Promise<IHFLocation>;
        /**
         * Watch the current user position. And returns watcher ID.
         * @param success - callback function that takes a {@link IHFLocation} object as an input parameter.
         * @param error - callback function that takes an error object as an input parameter.
         * @param {Object} options - Options for the geolocation request.
         * @param {boolean} [options.supressErrorMessage] - Supresses error message when position request ran in error or timeout.
         * @param {number} [options.watchTimeout] - Quit watcher after given time (milliseconds).
         * @param {boolean} [options.enableHighAccuracy] - Use GPS support if possible (increase accuracy).
         * @param {number} [options.roundResultTo] - Round the result of latitude and longitude to given count.
         * @param {boolean} [options.audioFeedback] - Enable audio feedback on every successful fetch of new location data.
         * @param {boolean} [options.requestNewPosition] - Force to request always new position.
         * @returns watcher ID
         */
        static watchPosition(success: (result: IHFLocation) => void, error: (error: any) => void, options: {
            supressErrorMessage?: boolean;
            watchTimeout?: number;
            enableHighAccuracy?: boolean;
            roundResultTo?: number;
            audioFeedback?: boolean;
            requestNewPosition?: boolean;
        }): number;
        /**
         * Clear watcher by given ID.
         * @param watchId ID of watcher
         */
        static clearWatchPosition(watchId: number): void;
    }
    /**
     * Static properties and methods related to the platform.
     */
    export class Platform {
        /**
         * Opens a file with an external application, if there is a default program defined for it.
         * @param filepath - relative url to the file
         * @param mimetype - the mimetype of the file
         */
        static openFileWithExternalApplication(filepath: string, mimetype: string): Promise<void>;
        /**
         * Opens a url with an external application (e.g. browser, email client, phone app ...).
         * @param url - Specifies the URL of the page to open.
         * @param target - Specifies the target attribute or the name of the window; default:
         */
        static openExternalUrl(url: string, target?: string): void;
        /**
         * Get the build configuration of the current application
         * @returns The build configuration of the current application.
         */
        static getBuildConfig(): string;
        /**
         * Get the build date of the current application
         * @returns The date and time the application was built.
         */
        static getBuildDate(): Date;
        /**
         * Returns the version of the current application
         * @returns The version of the current application.
         */
        static getHFVersion(): string;
        /**
         * Checks if current app version is a v9 or higher
         * @returns true if current app version is a v9 or higher
         */
        static isV9(): boolean;
        /**
         * Checks if the device respectively the platform is online.
         */
        static isOnline(): boolean;
        /**
         * Adds an event listener to the platform class.
         * @param type type of event listener, defined in the {@link PlatformEventsEnum}
         * @param callback
         */
        static addEventListener(type: keyof typeof PlatformEventsEnum, callback: (ev: any) => void): void;
        /**
         * Always remove previously registered event listeners!
         * @param type type of event listener, defined in the {@link PlatformEventsEnum}
         * @param callback
         */
        static removeEventListener(type: keyof typeof PlatformEventsEnum, callback: (ev: any) => void): void;
    }
    /**
     * Static properties and methods related to the repeating units
     */
    export class RepeatingUnits {
        /**
         * Finds the repeating unit tab, if found, the tab is returned.
         * @param repeatingUnitId The id of the repeating unit.
         */
        static findTab(repeatingUnitId: string): ITab;
        /**
         * Gets the id of the repeating unit, if the provided field id is included in a repeating unit.
         * @param fieldId
         */
        static getRepeatingUnitId(fieldId: string): string;
        /**
         * Adds a repeating unit.
         * @param repeatingUnitId The id of the repeating unit.
         * @param options The options for adding the repeating unit.
         */
        static add(repeatingUnitId: string, options: {
            index?: number;
            autoSaveOnAdd?: boolean;
            enableScroll?: boolean;
            setInitialStatus?: boolean;
        }): Promise<number>;
        /**
         * Adds a repeating unit.
         * @param repeatingUnitId The id of the repeating unit.
         * @param index The index, the repeating unit should be added at.
         * @param autoSaveOnAdd default true. Control auto save of form if repeating unit was added.
         * @param enableScroll default true. Control if auto scroll to newly created unit is active or not.
         * @param setInitialStatus default true. Control if StatusWatcher gets initialized or not.
         */
        static add(repeatingUnitId: string, index?: number, autoSaveOnAdd?: boolean, enableScroll?: boolean, setInitialStatus?: boolean): Promise<number>;
        /**
         * Adds a repeating unit dynamically. Mainly for AdaptiveForms
         * @param tabId - The id of the repeating unit.
         */
        static addDynamically(tabId: string): Promise<number>;
        /**
         * Adds multiple repeating units dynamically. Mainly for AdaptiveForms
         * @param tabId - The id of the repeating unit.
         * @param count - The count of repeating units to add.
         */
        static addMultipleDynamically(tabId: string, count: number): Promise<number>;
        /**
         * Adds an event listener to the repeating unit.
         * @param repeatingUnitId The id of the repeating unit.
         * @param type The type of the event listener. Allowed types are defined in {@link RepeatingUnitEventsEnum}.
         * @param callback The callback function, that gets called after the event is fired.
         */
        static addEventListener(repeatingUnitId: string, type: keyof typeof RepeatingUnitEventsEnum, callback: (result: number) => void | Promise<void>): void;
        /**
         * Returns the count of the repeating units.
         * @param repeatingUnitId The id of the repeating unit.
         */
        static count(repeatingUnitId: string): number;
        /**
         * Gets the instance of the RepeatingUnit by given Id.
         * @param repeatingUnitId The id of the repeating unit.
         */
        static get(repeatingUnitId: string): any;
        /**
         * Gets the data source of a repeating unit if a mapping is defined.
         * @param tabId The id of the repeating unit.
         */
        static getDataSource<T extends {
            ID: string;
        }>(tabId: string): T[];
        /**
         * Sets the data source of a repeating unit if a mapping is defined.
         * @param tabId The id of the repeating unit.
         */
        static setDataSource<T extends {
            ID: string;
        }>(tabId: string): Promise<T[]>;
        /**
         * Gets the element, that the repeating unit is included
         * @param repeatingUnitId The id of the repeating unit.
         */
        static getElement(repeatingUnitId: string): HTMLElement;
        /**
         * Checks if an element is included in a repeating unit;
         * @param element
         */
        static isRepeatingUnit(element: HTMLElement): boolean;
        /**
         * Gets the postfix id of an certain HTML Element.
         * this is often useful, if you wish to change, set etc. a certain form control value at a certain repeating unit index position.
         * @param element
         */
        static getPostfixFieldId(element: HTMLElement): string;
        /**
         * Gets the repeating unit index of an certain HTML Element.
         * @param element
         */
        static getRepeatingUnitIndex(element: HTMLElement): number;
        /**
         * Removes a repeating unit at a certain index.
         * @param repeatingUnitId The id of the repeating unit.
         * @param options The options for removing the repeating unit.
         */
        static remove(repeatingUnitId: string, options: {
            index: number;
            autoSaveOnRemove?: boolean;
            enableScroll?: boolean;
        }): Promise<number>;
        /**
         * Removes a repeating unit at a certain index.
         * @param repeatingUnitId The id of the repeating unit.
         * @param index The index, the repeating unit should be removed at.
         * @param autoSaveOnRemove default true. Control auto save of form if repeating unit was removed.
         * @param enableScroll default true. Control if auto scroll to newly created unit is active or not.
         */
        static remove(repeatingUnitId: string, index: number, autoSaveOnRemove?: boolean, enableScroll?: boolean): Promise<number>;
        /**
         * Always remove previously registered events
         * @param repeatingUnitId The id of the repeating unit.
         * @param type The type of the event listener. Allowed types are defined in {@link RepeatingUnitEventsEnum}.
         * @param callback The callback function, that gets called after the event is fired.
         */
        static removeEventListener(repeatingUnitId: string, type: keyof typeof RepeatingUnitEventsEnum, callback: (result: number) => void | Promise<void>): void;
    }
    /**
     * Static properties and methods related to the page.
     */
    export class Page {
        /**
         * Add an event listener to the form page.
         * @param type Type of the event listener, defined in the {@link PageEventsEnum}.
         * @param callback A callback function
         */
        static addEventListener(type: keyof typeof PageEventsEnum, callback: (ev: any) => void): void;
        /**
         * Always remove previously registered event listeners!
         * @param type Type of the event listener, defined in the {@link PageEventsEnum}.
         * @param callback A callback function.
         */
        static removeEventListener(type: keyof typeof PageEventsEnum, callback: (ev: any) => void): void;
        /**
         * Scroll to a html element on the page.
         * @param element
         * @param duration the duration of the scrolling, default = 200;
         */
        static scrollTo(element: HTMLElement, duration?: number): void;
        /**
         * Gets the current form page.
         */
        static get(): any;
        /**
         * Navigates to a page of the form page.
         * @param id html element id
         */
        static navigate(id: string): void;
        /**
         * Navigates to next page of the form page depending of given condition.
         * If condition is 'fullfilled' the next editable page is navigated to.
         * If condition is 'visible' the next visible page is navigated to.
         *
         * @param condition define if next page is navigated to depending of fullfilled or visible condition.
         */
        static navigateToNextPage(condition?: NextPageConditionEnum): void;
        static getFormCt(): HTMLElement;
        static updateFormElementsDictionary(): void;
    }
    /**
     * The messages class displays messages of different types (info, error) to the user.
     */
    export class Messages {
        /**
         * Displays an info message.
         * @param msg The message body.
         * @param title [optional] the title of the message; if not provided, the title gets the default value "info" (in the current language).
         */
        static info(msg: string, title?: string): Promise<void>;
        /**
         * Displays an error message.
         * @param msg The message body.
         * @param title [optional] the title of the message; if not provided, the title gets the default value "error" (in the current language).
         */
        static error(msg: string, title?: string): Promise<void>;
        /**
         * Displays a confirm message.
         * @param message - The message body.
         * @param title - The title of the message.
         * @param primaryCommand - The label of the confirm button.
         * @param secondaryCommand - The label of the cancel button.
         */
        static confirm(message: string, title?: string, primaryCommand?: string, secondaryCommand?: string): Promise<{
            id: 'confirm' | 'cancel';
        }>;
    }
    /**
     * The log class outputs logging messages and writes to log files.
     */
    export class Log {
        /**
         * Logs an info.
         * @param message The log message
         */
        static info(message: string): void;
        /**
         * Logs an warning.
         * @param message The log message
         */
        static warning(message: string): void;
        /**
         * Logs an error.
         * @param message The log message
         */
        static error(message: string): void;
        /**
         * Outputs the log to the console.
         */
        static getLog(): Promise<string>;
    }
    /**
     * Translating class.
     */
    export class Internalization {
        /**
         * Get wording from key
         * @param str - key of wording
         * @return string
         */
        static getLocalRes(str: string): string;
        /**
         * Get culture of current page
         * @return string
         */
        static getCulture(): string;
    }
    /**
     * Static properties and methods related to the form translation service.
     */
    export class TranslationService {
        /**
         * Get translation from form translation key
         * @return string
         */
        static translate(key: string): string;
        /**
         * Checks whether a given string is a translation key.
         * A translation key is a string that starts with '{{@' and ends with '}}'.
         * @param key The string to check.
         * @returns True if the string is a translation key, false otherwise.
         */
        static isTranslationKey(key: string): boolean;
        /**
         * Get list of translation keys for a formdefinition
         * @return string
         */
        static getListOfTranslationKeys(formID: string): Promise<string[]>;
    }
    /**
     * Static properties and methods related to the theme.
     */
    export class Theme {
        /**
         * Get the current theme object of the app.
         */
        static getTheme(): {
            theme: string;
            themeType: 'light' | 'dark';
            isModernTheme: boolean;
        };
        /**
         * Set the theme of the app.
         * @param theme The theme to set.
         */
        static setTheme(theme: string): void;
    }
    /**
     * Utilities for the HybridForms API
     */
    export class Utilities {
        /**
         * Generates a guid.
         */
        static guid(): string;
        /**
         * Checks if a variable has a value.
         */
        static isDefined(value: any): boolean;
        /**
         * Copy given value to system clipboard
         * @param value string
         * @param copyContext HTMLElement, parent wrapper of the input to copy
         * @param tooltipEl HTMLElement, element to display the tooltip
         */
        static copyToClipboard(value: string, copyContext?: HTMLElement, tooltipEl?: HTMLElement): void;
        /**
         * Generate a QR Code SVG Element by given input
         * @param input string
         * @param size SVG size
         * @param customOptions custom options overwrite default. See https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode
         * @returns SVGElement
         */
        static qrCodeGenerator(input: string, size: number, customOptions?: QRCodeOptions): SVGElement;
        /**
         * Generate a barcode SVG Element by given input and format
         * @param input string
         * @param format barcode format
         * @param customOptions custom options overwrite default. See https://github.com/lindell/JsBarcode/wiki/Options
         * @returns SVGElement
         */
        static barCodeGenerator(input: string, format: string, customOptions?: BarcodeOptions): SVGElement;
        /**
         * Returns a JSZip node module instance for working with ZIPs
         */
        static zipHandler(input?: string, width?: number, height?: number): any;
        /**
         * Sanitize HTML input to prevent XSS attacks. Supports hf-img tag from HtmlContainer
         * @param value HTML string or Node to sanitize
         * @param options DOMPurify config to tweak sanitizing. https://github.com/cure53/DOMPurify
         * @returns clean HTML string
         */
        static sanitizeHtml(value: string | Node, options?: DOMPurify.Config & {
            RETURN_DOM_FRAGMENT?: false;
            RETURN_DOM?: false;
        }): string;
        /**
         * Return a counter value for a defined counter id. The counter must be registered and activated at the server.
         *
         * @param {string} counterId - The id of the counter you want to request.
         * @param counterData - This is the data that you want to send to request the counter.
         * @returns A promise of type ICounterResponse
         */
        static requestCounter(counterId: string, counterData?: ICounterData): Promise<ICounterResponse>;
        /**
         * Fill out multiple form fields by given form data object.
         * @param formData
         */
        static fillOutForm(formData: {
            [key: string]: string | boolean | number;
        }): void;
        /**
         * Decodes a given HTML string.
         * @param html
         * @returns decoded HTML string
         */
        static decodeHTML(html: string): string;
        /**
         * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
         * @param object The object to query.
         * @param path The path of the property to get.
         * @param defaultValue The value returned for undefined resolved values.
         * @returns Returns the resolved value.
         */
        static getFromObject(object: any, path: string, defaultValue?: any): any;
    }
    /**
     * Static properties and methods related to the stages.
     */
    export class Stages {
        /**
         * Set stage of form to given stage id. On ListPage an itemID must be provided.
         * @param stageId id of stage
         * @param itemId id of form
         */
        static setFormStage(stageId: string, itemId?: string): void;
        /**
         * Get stage of form on ListPage.
         * @param itemId id of form
         */
        static getFormStageOnListPage(itemId?: string): Promise<string>;
        /**
         * Get stage of form.
         * @param itemId id of form
         */
        static getFormStage(itemId?: string): string;
    }
    /**
     * Static properties and methods related to the system.
     */
    export class System {
        /**
         * Checks if the device respectively the platform is Browser.
         */
        static IsBrowser(): boolean;
        /**
         * Checks if the device respectively the platform is Cordova App. (all mobile apps)
         */
        static IsCordova(): boolean;
        /**
         * Checks if the device respectively the platform is iOS App. (Apple)
         */
        static IsIOS(): boolean;
        /**
         * Checks if the device respectively the platform is Android App.
         */
        static IsAndroid(): boolean;
        /**
         * Checks if the current scope is FomrView or PDF
         */
        static IsView(): boolean;
        /**
         * Checks if the device respectively the platform is FormDev.
         */
        static IsFormDev(): boolean;
        /**
         * Checks if the device respectively the platform is Reachout.
         */
        static IsReachout(): boolean;
    }
    /**
     * Static properties and methods related to the user.
     */
    export class User {
        /**
         * Gets user relevant data. Returns the {@link IUser} interface.
         */
        static get(): IUser;
        /**
         * Gets user display name.
         */
        static getDisplayName(): string;
    }
    /**
     * Static methods to make a xhr request.
     */
    export class XHR {
        /**
         * Make an XHR request. Options are provided through the {@link XhrRequest} interface.
         */
        static request<FetchRes extends boolean = false>(obj: XhrRequest<FetchRes>): Promise<FetchRes extends true ? Response : XMLHttpRequest>;
    }
    /**
     * Static methods to interact with the settings store.
     */
    export class SettingsStore {
        /**
         * Get a value form the settings store by its name.
         * @param name The name of the value to get.
         * @returns The value of the setting.
         */
        static getValue(name: string): any;
        /**
         * Set a value in the settings store by its name.
         * @param name The name of the value to set.
         * @param value The value to set.
         * @returns
         */
        static setValue(name: string, value: any): Promise<void>;
    }
    /**
     * Static methods to interact with the option manager.
     */
    export class OptionManager {
        /**
         * Get all options from the option manager.
         * @returns An array of {@link OptionValue} objects is returned.
         */
        static getAllOptions(): OptionValue[];
        /**
         * Get an option from the option manager by its name.
         * @param name The name of the option to get.
         * @returns The value of the option.
         */
        static getOptionValue(name: string): any;
    }
}
declare module "lib/HybridForms" {
    export * as API from "lib/API";
}
declare module "index" {
    export * as HybridForms from "lib/HybridForms";
    export * as HFAPI from "lib/API";
    /**
     * Enumeration of events related to the form page.
     */
    export enum PageEventsEnum {
        /**
         * Gets fired when the user navigates to another page on the formpage and this page is rendered the first time.
         * It is only useful if lazy-loading is activated!
         */
        sectionRendered = "sectionRendered",
        /**
         * Gets fired when the page is ready and all controls of the first page are rendered.
         */
        rendered = "rendered",
        /**
         * Gets fired when the page is ready and all controls are rendered in FormView or PDF.
         */
        viewrendered = "viewrendered",
        /**
         * Gets fired when the page get disposed.
         */
        disposed = "disposed",
        /**
         * Gets fired when the page is resizing.
         */
        resized = "resized",
        /**
         * Gets fired when the page is scrolled.
         */
        scrolled = "scrolled",
        /**
         * Gets fired when the user navigates to another page on the formpage.
         */
        navigated = "navigated",
        /**
         * Gets fired when the status of the form changes.
         */
        formStatusChanged = "formStatusChanged",
        /**
         * Gets fired when the user navigates away from the formpage.
         */
        navigatedAway = "navigatedAway"
    }
    /**
     * Enumeration of events that could be added to the fields class.
     */
    export enum FieldsEventsEnum {
        itemmutated = "itemmutated"
    }
    /**
     * Enumeration of platform events.
     */
    export enum PlatformEventsEnum {
        /**
         * Gets fired when the network status changes.
         */
        networkStatusChanged = "networkStatusChanged"
    }
    /**
     * Enumeration of repeating units events
     */
    export enum RepeatingUnitEventsEnum {
        /**
         * Gets fired before a repeating unit is added. Wait for all Promises in callbacks to be resolved.
         */
        beforeadd = "beforeadd",
        /**
         * Gets fired when a repeating unit has been added.
         */
        added = "added",
        /**
         * Gets fired before a repeating unit is removed. Wait for all Promises in callbacks to be resolved.
         */
        beforeremove = "beforeremove",
        /**
         * Gets fired when a repeating unit has been removed.
         */
        removed = "removed"
    }
    /**
     * Enumeration of form events
     */
    export enum FormEventsEnum {
        /**
         * Gets fired before a form gets approved. Wait for all Promises in callbacks to be resolved.
         * Cancel approve by reject promise with 'CANCELED'
         */
        beforeApprove = "beforeApprove"
    }
    /**
     * Enumeration of the Status of the Form.
     * - 0 - New;
     * - 1 - Edit;
     * - 2 - Approved;
     * - 3 - Group;
     * - 4 - Deleted;
     * - 5 - Archived;
     */
    export enum Status {
        /** return value: 0 */
        New = 0,
        /** return value: 1 */
        Edit = 1,
        /** return value: 2 */
        Approved = 2,
        /** return value: 3 */
        Group = 3,
        /** return value: 4 */
        Deleted = 4,
        /** return value: 5 */
        Archived = 5,
        /** return value: 6 */
        ReachOut = 6
    }
    /**
     * The type of the Button
     * - 0: small
     * - 1: medium
     * - 2: large
     */
    export enum FormButtonType {
        /**
         * The small type. Only an icon gets printed. Init with value 0.
         */
        small = 0,
        /**
         * The medium type button. A label and an icon gets printed. Init with value 1.
         */
        medium = 1,
        /**
         * The large type button. A label, an icon and a heading gets printed. Init with value 2.
         */
        large = 2
    }
    export type FormButtonStyle = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    export enum NextPageConditionEnum {
        Fullfilled = "fullfilled",
        Visible = "visible"
    }
    export enum SectionTypeEnum {
        evaluation = "evaluation"
    }
    export enum ExpandableDefaultEnum {
        expanded = "expanded",
        closed = "closed"
    }
    export enum DataFormatEnum {
        FormExchangeFormat = 0,
        ServerFormat = 1,
        FormManipulationFormat = 2
    }
    export enum OptionVisibilityEnum {
        Edit = 0,
        OK = 1,
        Disabled = 2,
        Hidden = 3
    }
    export interface IFormField {
        id: string;
        value: any;
    }
    export interface IFormDefinition {
        sections: ISection[];
        ListDataMapping: IDictionary<string>;
        ListItemTemplateId: 'listTemplate';
        TitleTemplate: string;
        Title?: string;
        dataSources?: IFormDataSource[];
    }
    export interface INextPageButton {
        show?: boolean;
        nextText?: string;
        condition?: NextPageConditionEnum;
        hint?: string;
    }
    export interface ISection {
        code: string;
        label: string;
        labelHTML: string;
        tabs: ITab[];
        type?: SectionTypeEnum;
        condition?: ICondition;
        id?: string;
        cssClasses?: string;
        state?: IState;
        removeIf?: string[];
        nextPageButton?: INextPageButton;
    }
    export interface IFormDataSource {
        url: string;
        persistent: boolean;
        id: string;
        name: string;
        progressItems?: number;
        formdefinitions?: any[];
    }
    export interface ITab {
        id: string;
        code: string;
        label: string;
        htmlLabel?: string;
        expandable: boolean;
        expandableId: string;
        expandableDefault?: ExpandableDefaultEnum;
        blocks: IBlock[];
        blockTemplates: IBlock[];
        repeatable: boolean;
        repeatableMin: number;
        repeatableMax: number;
        repeatableToolbar: boolean;
        repeatableShowOnlyLastToolbar: boolean;
        repeatableLabel: string;
        repeatableLabelAdd: string;
        repeatableLabelRemove: string;
        repeatableAnchors: boolean;
        repeatableAlwaysShowHeaderFooter: boolean;
        repeatingUnitHeader?: string[];
        repeatingUnitFooter?: string[];
        condition?: ICondition;
        cssClasses?: string;
        tooltip?: string;
        removeIf?: string[];
        state?: IState;
    }
    export interface IBlock {
        code: string;
        templateId: string;
        fields: IField[];
        repeatable?: boolean;
        repeatingUnitHeader?: boolean;
        repeatingUnitFooter?: boolean;
        repeatablePostfixFieldId?: string;
        repeatableCount?: number;
        condition?: ICondition;
        conditionControls?: IControlConditions;
        id?: string;
        cssClasses?: string;
        fullWidth?: boolean;
        removeIf?: string[];
        state?: IState;
    }
    export interface IComplexRequiredFields {
        op: string;
        fields: string;
    }
    export type RequiredFields = string | IComplexRequiredFields[];
    /**
     *  HybridForms Validation
     */
    export type FieldValidatorType = 'text' | 'number' | 'email' | 'tel' | 'date' | 'time';
    export interface IFieldValidator {
        type?: FieldValidatorType;
        min?: number | string;
        max?: number | string;
        step?: number;
        minlength?: number;
        maxlength?: number;
        decimals?: number;
        pattern?: string;
        anytext?: boolean;
        allowedValues?: {
            value: string;
            text?: string;
        }[];
        custom?: string;
        errorText?: string;
        errorHTML?: string;
    }
    export interface IListOptions {
        dialogHide: boolean;
        dialogText: string;
    }
    export interface IOnFieldsMutatedReference {
        refBlockCode: any;
        refTabCode: any;
        refSectionCode: any;
    }
    export interface IOnFieldsMutatedResult {
        value?: IFormField;
        field?: IField;
        reference?: IOnFieldsMutatedReference;
    }
    export interface IField {
        id: string;
        name: string;
        type: string;
        required: boolean;
        requiredFields: RequiredFields;
        requiredFieldsOp?: string;
        list: boolean;
        label: string;
        value: string;
        defaultValue: string;
        htmlTag: string;
        options: {
            [key: string]: any;
        };
        format?: string;
        repeatableDefaultId?: string;
        validator: IFieldValidator;
        refBlockCode?: string;
        refTabCode?: string;
        refSectionCode?: string;
        condition?: ICondition;
        conditionControl?: string[];
        customControlClass?: string;
        removeIf?: string[];
        state?: IState;
        listOptions?: IListOptions;
    }
    export interface ISignData {
        device: {
            scaleFactor: number;
            userAgent: string;
        };
        metadata: {
            timestamp: Date;
            geoposition: IHFLocation;
            signer: null;
            eventCounter: number;
            itemid: string;
            timeunit: string;
            input: string;
        };
        signature: ISignature[];
    }
    export interface ISignature {
        type: string;
        timestamp: number;
        pressure: number;
        tiltX: number;
        tiltY: number;
        twist: number;
        coords: {
            x: number;
            y: number;
        };
    }
    export interface IHFLocation {
        latitude: number;
        longitude: number;
        accuracy?: number;
        accuracyFormatted?: string;
        positionSource?: string;
        zoom?: number;
        timestamp?: Date;
    }
    export interface IFormAttachment {
        fileName: string;
        version?: string;
    }
    /**
     * User relevant data.
     */
    export interface IUser {
        displayName: string;
        accountName: string;
        companyName: string;
        ID: string;
        firstname: string;
        lastname: string;
        email: string;
        features: any;
        useGroupForms: boolean;
    }
    export interface IGroup {
        id: number;
        title: string;
        upn: string;
        email: string;
        isGroup: boolean;
        address: string;
        company: string;
        logoUrl: string;
    }
    export interface IScanButtonConfiguration {
        scanType: string;
        config?: any;
        errorMessage?: string;
        fieldId?: string;
        callback?: string;
        callbackFeedback?: boolean;
        vibrationFeedback?: boolean;
        audioFeedback?: boolean;
    }
    export interface ICounterResponse {
        counter: number;
        formatedCounter: string;
    }
    export interface ICounterOptions {
        opt1?: string;
        opt2?: string;
        opt3?: string;
        opt4?: string;
        opt5?: string;
        opt6?: string;
    }
    export interface ICounterData {
        options: ICounterOptions;
    }
    export enum ConditionSourceTypeEnum {
        form = 0,
        page = 1,
        tab = 2,
        block = 3,
        conditionalCtrl = 4,
        field = 5
    }
    export type ConditionExpressionOp = 'and' | 'or';
    export type ConditionExpressionType = 'page' | 'tab' | 'block' | 'field' | 'kiosk' | 'stage' | 'callback';
    export type ConditionExpressionElse = 'invisible' | 'disabled' | 'readonly' | 'optional';
    export type ConditionExpressionVal = boolean | number | string;
    export type ConditionExpressionValOp = 'equals' | 'contains' | 'not';
    export type ControlConditionStatus = 'fullfilled' | ConditionExpressionElse;
    export interface IConditionExpressionElseComplex {
        readonly: IElseCondition;
        disabled: IElseCondition;
        invisible: IElseCondition;
        optional: IElseCondition;
    }
    export interface IElseCondition {
        cond?: IConditionExpression[];
        default?: boolean;
        op?: ConditionExpressionOp;
    }
    export interface IConditionExpression {
        type: ConditionExpressionType;
        id: string;
        val?: ConditionExpressionVal;
        op?: ConditionExpressionValOp;
        nestedOp?: ConditionExpressionOp;
        cond?: IConditionExpression[];
    }
    export interface ICondition {
        id: string;
        cond: IConditionExpression[];
        op?: ConditionExpressionOp;
        else?: ConditionExpressionElse | IConditionExpressionElseComplex;
        elseCallback?: string;
        excludeFromValidation?: boolean;
        inProgress?: boolean;
        hintText?: string;
        hintHtml?: string;
        condGuid: string;
    }
    export interface IConditionTableItem {
        id: string;
        condition: ICondition;
        sourceType: ConditionSourceTypeEnum;
        repeatingPostfix: string;
        fullfilled?: boolean;
        validationId?: string;
        parentConditions?: string[];
    }
    export interface ConditionTable {
        [condId: string]: IConditionTableItem;
    }
    export interface ILookupTableType<T> {
        fields: string[];
        structure: T;
        parentStructureId?: string;
        sectionStructureId?: string;
    }
    export interface IDictionary<T> {
        [details: string]: T;
    }
    export interface ILookupTable {
        sections: IDictionary<ILookupTableType<ISection>>;
        tabs: IDictionary<ILookupTableType<ITab>>;
        blocks: IDictionary<ILookupTableType<IBlock>>;
        conditionCtrls: IDictionary<ILookupTableType<IControlCondition>>;
        fields: IDictionary<ILookupTableType<IField>>;
    }
    export interface IControlConditions {
        [conditionCtrlId: string]: IControlCondition;
    }
    export interface IControlCondition {
        id: string;
        fields: string[];
        condition: ICondition;
        state?: IState;
        conditionControls?: IControlConditions;
    }
    export type CondStateType = 'fullfilled' | 'else-invisible' | 'else-disabled' | 'else-readonly' | 'else-optional';
    export interface IState {
        condState: CondStateType;
        filled: number;
        invalid: boolean;
        previousCondState?: CondStateType;
        uiStateId?: string;
        stateId?: string;
        previousStateId?: string;
        rendered?: boolean;
        active?: boolean;
        condElse?: ConditionExpressionElse;
    }
    export interface XhrRequest<FetchRes = false> {
        url: string;
        withCredentials?: boolean;
        type?: string;
        data?: any;
        dataFileUrlRef?: string;
        headers?: IDictionary<string>;
        user?: string;
        password?: string;
        customRequestInitializer?: (xhr: XMLHttpRequest | XhrRequest) => void;
        responseType?: string;
        stage?: string;
        abort?: () => void;
        o?: XMLHttpRequest;
        timeout?: number;
        silentFail?: boolean;
        isRetry?: boolean;
        fetchResponse?: FetchRes;
        checkDateTime?: {
            useHeader: string;
        };
        signal?: AbortSignal;
        onUploadProgress?: (ev: ProgressEvent) => void;
        onDownloadProgress?: (ev: ProgressEvent) => void;
    }
    export interface OptionValue {
        name: string;
        label: string;
        value: any;
        visibility: OptionVisibilityEnum;
        customValue?: any;
        isHidden?: boolean;
        placeholder?: string;
    }
    export interface QRCodeBorder {
        color?: string | undefined;
        width?: number | undefined;
    }
    export interface QRCodeOverlay {
        height?: number | undefined;
        type?: string | undefined;
        url?: string | undefined;
        width?: string | undefined;
    }
    export interface QRCodeOptions {
        name?: string | undefined;
        background?: string | undefined;
        border?: QRCodeBorder | undefined;
        color?: string | undefined;
        encoding?: string | undefined;
        errorCorrection?: string | undefined;
        overlay?: QRCodeOverlay | undefined;
        padding?: number | undefined;
        renderAs?: string | undefined;
        size?: number | string | undefined;
        value?: number | string | undefined;
    }
    export interface BarcodeBaseOptions {
        width?: number;
        height?: number;
        format?: string;
        displayValue?: boolean;
        fontOptions?: string;
        font?: string;
        text?: string;
        textAlign?: string;
        textPosition?: string;
        textMargin?: number;
        fontSize?: number;
        background?: string;
        lineColor?: string;
        margin?: number;
        marginTop?: number;
        marginBottom?: number;
        marginLeft?: number;
        marginRight?: number;
        valid?: (valid: boolean) => void;
    }
    export interface Code128Options extends BarcodeBaseOptions {
        ean128?: boolean;
    }
    export interface Ean13Options extends BarcodeBaseOptions {
        flat?: boolean;
        lastChar?: string;
    }
    export type BarcodeOptions = BarcodeBaseOptions | Code128Options | Ean13Options;
    export enum FormValidationStatus {
        Complete = 1,
        Incomplete = 2,
        Invalid = 3
    }
    export interface IValidationError {
        error: string;
    }
    export interface IValidationWarning {
        warning: string;
    }
    export class ValidationErrorCollection extends Array<IValidationError> {
    }
    export class ValidationWarningCollection extends Array<IValidationWarning> {
    }
    export interface FormValidationResult {
        status: FormValidationStatus;
        valid: boolean;
        errors: ValidationErrorCollection;
        warnings: ValidationWarningCollection;
    }
    export enum ThemeModeEnum {
        Light = "light",
        Dark = "dark",
        Auto = "auto"
    }
    export enum ThemeTypeEnum {
        Classic = "classic",
        Modern = "modern",
        ModernDynamic = "modern-dynamic"
    }
    export interface IAssetBrief {
        id: number;
        name: string;
        displayName: string;
        clientId: number;
        description: string;
        settings: {
            [key: string]: any;
            theme?: {
                modes: ThemeModeEnum[];
                types: ThemeTypeEnum[];
                default?: ThemeTypeEnum;
                showDefaultAppThemes?: boolean;
            };
        };
        version: number;
        sync: boolean;
    }
    export interface IAsset extends IAssetBrief {
        files: IAssetFile[];
    }
    export interface IAssetFile {
        fileID: number;
        filename: string;
        size: number;
        contentType: string;
        created: string;
        localFilePath?: string;
        parentAssetName: string;
        isSynced?: boolean;
    }
    export interface FormStatusResult {
        filled: number;
        invalid: number;
        warning: number;
        notfilled: number;
        required: number;
        approvalCondition: boolean;
    }
}
