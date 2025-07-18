"use strict";
var HFFormdefinition;
(function (HFFormdefinition) {
    var CustomCode;
    (function (CustomCode) {
        let audioIsPlaying = false;
        let audio = null;
        function getSigner() {
            let thisCtrl = this, name = [], currentRU = '', signerParts, namePart;
            if (!thisCtrl.getSignerOptions) {
                return;
            }
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(thisCtrl.element)) {
                currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(thisCtrl.element);
            }
            signerParts = thisCtrl.getSignerOptions.split(',');
            if (signerParts.length) {
                signerParts.forEach(function (signingPart) {
                    if (currentRU) {
                        signingPart += currentRU;
                    }
                    namePart = HybridForms.API.Fields.getById(signingPart);
                    if (namePart && namePart.value) {
                        name.push(namePart.value);
                    }
                });
            }
            return $.trim(name.join(' '));
        }
        CustomCode.getSigner = getSigner;
        function setUser() {
            return HybridForms.API.User.get().displayName || '';
        }
        CustomCode.setUser = setUser;
        function setDataSourceTest() {
            HybridForms.API.FormStorage.getCatalog('GemeindeKatalog').then((dataSource) => {
                const amountCtrl = HybridForms.API.FormControls.getCtrl('programmatic_set_datasource');
                amountCtrl.isLoaded().then(() => {
                    amountCtrl.setDataSource(dataSource);
                });
            });
        }
        CustomCode.setDataSourceTest = setDataSourceTest;
        function onRepeatingUnitChanged(dataSource) {
            console.log(dataSource);
        }
        CustomCode.onRepeatingUnitChanged = onRepeatingUnitChanged;
        function onRepeatingUnitNameChanged(sourceIds, postfix) {
            const values = sourceIds.reduce((acc, id) => {
                const ctrl = HybridForms.API.FormControls.getCtrl(id + postfix);
                const value = ctrl.val();
                if (value) {
                    acc.push(value);
                }
                return acc;
            }, []);
            if (!values.length) {
                return null;
            }
            return values.join(' ');
        }
        CustomCode.onRepeatingUnitNameChanged = onRepeatingUnitNameChanged;
        class User extends HybridForms.API.UIControls.BaseControl {
            constructor(element, options) {
                super(element, options);
            }
            getUserOnApp() {
                const user = HybridForms.API.User.get();
                if (user && user.displayName) {
                    return user.displayName;
                }
                return '';
            }
            createControl() {
                return Promise.resolve();
            }
            registerEvents() {
                this.onRendered = () => {
                    if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                        this.userId += HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                    }
                    if (this.condId) {
                        const condCtrl = HybridForms.API.FormControls.getCtrl(this.condId);
                        if (condCtrl.val()) {
                            return;
                        }
                    }
                    const ctrl = HybridForms.API.FormControls.getCtrl(this.userId);
                    const user = this.getUserOnApp();
                    if (user.length) {
                        ctrl.val(user);
                    }
                };
                HybridForms.API.Page.addEventListener('rendered', this.onRendered);
            }
            dispose() {
                if (this.disposed) {
                    return;
                }
                HybridForms.API.Page.removeEventListener('rendered', this.onRendered);
                this.disposed = true;
            }
        }
        CustomCode.User = User;
        class Initializr extends HybridForms.API.UIControls.BaseControl {
            constructor(element, options) {
                super(element, options);
                if (typeof this.callback === 'function') {
                    this.onRendered = () => {
                        this.callback.call(this);
                    };
                    HybridForms.API.Page.addEventListener('rendered', this.onRendered);
                    HybridForms.API.Page.addEventListener('viewrendered', this.onRendered);
                }
            }
            dispose() {
                if (this.disposed) {
                    return;
                }
                if (this.onRendered) {
                    HybridForms.API.Page.removeEventListener('rendered', this.onRendered);
                    HybridForms.API.Page.addEventListener('viewrendered', this.onRendered);
                }
                this.disposed = true;
            }
        }
        CustomCode.Initializr = Initializr;
        function testDataControl() {
            const dataCtrl = HybridForms.API.FormControls.getCtrl('data_control_test');
            console.log('Test: DataControl initial Value: ' + JSON.stringify(dataCtrl.val()));
            dataCtrl.val({
                id: '1',
                value: 'test',
            });
        }
        function calculateDuration() {
            let that = this;
            let ctrlIds = that.calcDurationOptions.split(',');
            if (ctrlIds.length !== 3) {
                return;
            }
            let start;
            let end;
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                let currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                ctrlIds.forEach(function (ctrlId, idx) {
                    ctrlId += currentRU;
                    ctrlIds[idx] = ctrlId;
                });
            }
            let ctrl1 = HybridForms.API.FormControls.getCtrl(ctrlIds[0]);
            let ctrl2 = HybridForms.API.FormControls.getCtrl(ctrlIds[1]);
            let ctrl3 = HybridForms.API.FormControls.getCtrl(ctrlIds[2]);
            let time1 = ctrl1.val();
            let time2 = ctrl2.val();
            let duration_formatted = '';
            if (time1 !== null && time2 !== null) {
                start = moment(ctrl1.val().formatTime(), 'HH:mm');
                end = moment(ctrl2.val().formatTime(), 'HH:mm');
            }
            else {
                ctrl3.val(duration_formatted);
                return;
            }
            if (start && end) {
                let duration = end.diff(start);
                if (duration < 0) {
                    duration_formatted = moment.utc(duration).format('HH:mm') + '  (+1 day)';
                }
                else {
                    duration_formatted = moment.utc(duration).format('HH:mm');
                }
                HybridForms.API.Fields.setField(ctrlIds[2], duration_formatted);
            }
            else {
                HybridForms.API.Fields.setField(ctrlIds[2], duration_formatted);
            }
            ctrl3.val(duration_formatted);
        }
        CustomCode.calculateDuration = calculateDuration;
        function onRendered() {
            HFFormdefinition.CustomCode.checkIsView();
            HFFormdefinition.CustomCode.setStamp();
            HFFormdefinition.CustomCode.fetchAssetFile(true);
            testDataControl();
            const druButtonCtrl = HybridForms.API.FormControls.getCtrl('intializeDRU_Button');
            if (druButtonCtrl) {
                const field = HybridForms.API.Fields.getById('hf-repeatable-count-dru_tab_01');
                if (field.value > 0) {
                    druButtonCtrl.disable();
                }
            }
        }
        CustomCode.onRendered = onRendered;
        function onViewRendered() {
            HFFormdefinition.CustomCode.checkIsView();
            HFFormdefinition.CustomCode.fetchAssetFile(true);
        }
        CustomCode.onViewRendered = onViewRendered;
        function checkIsView() {
            if (!HybridForms.API.System.IsView()) {
                $('.testinitialyzr').append('<h5 class="inserted">(Formularansicht)</h5>');
            }
            else {
                $('.testinitialyzr').append('<h5 class="inserted">(PDF Ausgabe)</h5>');
            }
        }
        CustomCode.checkIsView = checkIsView;
        function setInvalidValues() {
            const valueObjects = [
                {
                    id: 'invalid_value_text',
                    val: 'test@test.',
                },
                {
                    id: 'invalid_value_numeric',
                    val: 4,
                },
                {
                    id: 'invalid_value_date',
                    val: moment().add(1, 'days').toDate(),
                },
                {
                    id: 'invalid_value_time',
                    val: moment('15:00', moment.HTML5_FMT.TIME, true).toDate(),
                },
                {
                    id: 'invalid_value_combobox',
                    val: 'test3',
                },
                {
                    id: 'invalid_value_dropdownlist',
                    val: 'test3',
                },
            ];
            for (const valueObject of valueObjects) {
                const ctrl = HybridForms.API.FormControls.getCtrl(valueObject.id);
                ctrl.val(valueObject.val);
            }
        }
        CustomCode.setInvalidValues = setInvalidValues;
        function validateTestNumeric(field, val) {
            if (val < 10)
                return false;
            return true;
        }
        CustomCode.validateTestNumeric = validateTestNumeric;
        function dataCallback(data) {
            const ctrl = HybridForms.API.FormControls.getCtrl('picturepicker_pic3_data');
            ctrl.val(JSON.stringify(data, null, 4));
        }
        CustomCode.dataCallback = dataCallback;
        function buttonControlChangeMA() {
            let maCtrl = HybridForms.API.FormControls.getCtrl('ma_aggregat_1_persnr');
            let currDS;
            if (HybridForms.API.Utilities.isDefined(HybridForms.API.Platform.isV9) && HybridForms.API.Platform.isV9()) {
                currDS = maCtrl.getDataSource().data();
            }
            else {
                currDS = maCtrl.currentCtrl.dataSource.data();
            }
            if (currDS.length > 2) {
                maCtrl.val('4');
            }
            else {
                maCtrl.val('Bitte Filter entfernen!');
            }
        }
        CustomCode.buttonControlChangeMA = buttonControlChangeMA;
        function buttonClearMA() {
            let maCtrl = HybridForms.API.FormControls.getCtrl('ma_aggregat_1_persnr');
            maCtrl.val('');
        }
        CustomCode.buttonClearMA = buttonClearMA;
        function setStreetTemplate(item) {
            return item.Strassenbezeichnung;
            let text = item.Strassenbezeichnung, ctrl = this, comboBoxCtrl = HybridForms.API.FormControls.getCtrl(ctrl.id), kendoCtrl;
            if (!comboBoxCtrl) {
                return;
            }
            if (HybridForms.API.Utilities.isDefined(comboBoxCtrl.dialogKendoCtrl)) {
                kendoCtrl = comboBoxCtrl.dialogKendoCtrl;
            }
            else {
                kendoCtrl = comboBoxCtrl.inputCtrl;
            }
            if (kendoCtrl) {
                let search = kendoCtrl.text();
                if (search.length) {
                    let reg = new RegExp(search, 'gi');
                    text = text.replace(reg, function (str) {
                        return '<b>' + str + '</b>';
                    });
                }
            }
            text = '<span>' + text + ' <small>(' + item.PLZ + ' ' + item.Postort + ')</small></span>';
            return text;
        }
        CustomCode.setStreetTemplate = setStreetTemplate;
        function setStreetTemplateNew(item) {
            return '<span>' + item.Strassenbezeichnung + ' <small>(' + item.PLZ + ' ' + item.Postort + ')</small></span>';
        }
        CustomCode.setStreetTemplateNew = setStreetTemplateNew;
        function enableSelectBox() {
            let selOption = HybridForms.API.FormControls.getCtrl('tab1_selectbox'), selectBoxTargetCtrl;
            selectBoxTargetCtrl = HybridForms.API.FormControls.getCtrl(selOption.selectCtrlId);
            if (typeof selectBoxTargetCtrl === 'undefined') {
                return;
            }
            if (selOption.val() === '5') {
                selectBoxTargetCtrl.enable();
            }
            else {
                selectBoxTargetCtrl.disable();
            }
        }
        CustomCode.enableSelectBox = enableSelectBox;
        function provideAmounts() {
            let dataItem = this.inputCtrl.dataItem(), ctrls = this.provideAmountsOptions.split(',');
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                let postfixId = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                ctrls.forEach(function (ctrlId, idx) {
                    ctrlId += postfixId;
                    ctrls[idx] = ctrlId;
                });
            }
            let priceCtrl = HybridForms.API.FormControls.getCtrl(ctrls[1]), amountCtrl = HybridForms.API.FormControls.getCtrl(ctrls[2]);
            if (dataItem) {
                if (dataItem.Price) {
                    priceCtrl.val(dataItem.Price);
                }
                else {
                    priceCtrl.val('');
                }
                if (dataItem.Stock) {
                    let amountItems = amountCtrl.getDataSource();
                    if (amountItems) {
                        amountItems = [];
                        amountCtrl.val('');
                        amountCtrl.setDataSource([
                            {
                                key: '-',
                            },
                        ]);
                    }
                    for (let i = 1; i <= dataItem.Stock; i++) {
                        amountItems.push({
                            key: String(i),
                        });
                    }
                    amountCtrl.setDataSource(amountItems);
                    amountCtrl.inputCtrl.refresh();
                }
                else {
                    let amountItems = amountCtrl.getDataSource();
                    amountCtrl.setDataSource(amountItems);
                    amountCtrl.inputCtrl.refresh();
                }
            }
            else {
                priceCtrl.val('');
                amountCtrl.val('');
                amountCtrl.setDataSource([
                    {
                        key: '-',
                    },
                ]);
                return;
            }
        }
        CustomCode.provideAmounts = provideAmounts;
        function setPartsComboBoxTemplate(item) {
            let text = item.Description;
            let inputCtrl = this.currentInputCtrl;
            if (inputCtrl) {
                let search = inputCtrl.text();
                if (search.length) {
                    let reg = new RegExp(search, 'gi');
                    text = text.replace(reg, function (str) {
                        return '<b>' + str + '</b>';
                    });
                }
            }
            text = '<span>' + text + ' <small>(' + item.Title + ')</small></span>';
            return text;
        }
        CustomCode.setPartsComboBoxTemplate = setPartsComboBoxTemplate;
        function setPartsAmounts() {
            let sparePartsField = HybridForms.API.Fields.getById(this.baseItemId), amountCtrl = HybridForms.API.FormControls.getCtrl(this.baseAmountId), selectedItem = sparePartsField.value, amountItems = amountCtrl.dataSource ? amountCtrl.dataSource : [];
            if (!amountCtrl) {
                return;
            }
            if (amountItems.length && selectedItem) {
                amountItems = [];
                for (let j = 1; j <= selectedItem; j++) {
                    amountItems.push({
                        key: String(j),
                    });
                }
                amountCtrl.setDataSource(amountItems);
            }
            else {
                amountCtrl.setDataSource(amountItems);
            }
        }
        CustomCode.setPartsAmounts = setPartsAmounts;
        function customQRScanButton(scanConfig, barcode, postfix) {
            let ctrl = scanConfig.comboBoxId;
            let currentRu = postfix;
            let formattedBarcode = '';
            if (barcode) {
                formattedBarcode = barcode.replace(/\s/g, '');
            }
            if (!barcode || !formattedBarcode.match(/^#[0-9]{3,32}$/)) {
                HybridForms.API.Messages.error('This QR code can not be processed.', 'Error');
                return;
            }
            let comboCtrl = HybridForms.API.FormControls.getCtrl(ctrl + currentRu);
            comboCtrl.val(formattedBarcode);
            comboCtrl.currentCtrl.trigger('change');
        }
        CustomCode.customQRScanButton = customQRScanButton;
        function getElseStatePage() {
            let currStage = HybridForms.API.Stages.getFormStage();
            switch (currStage) {
                case 'ST2':
                    return 'readonly';
                default:
                    return 'invisible';
            }
        }
        CustomCode.getElseStatePage = getElseStatePage;
        function getElseStateDisabledPage() {
            let currStage = HybridForms.API.Stages.getFormStage();
            switch (currStage) {
                case 'ST3':
                    return 'readonly';
                case 'ST4':
                    return 'disabled';
                default:
                    return 'invisible';
            }
        }
        CustomCode.getElseStateDisabledPage = getElseStateDisabledPage;
        function getElseStateReadOnlyPage() {
            let currStage = HybridForms.API.Stages.getFormStage();
            switch (currStage) {
                case 'ST3':
                    return 'disabled';
                case 'ST4':
                    return 'readonly';
                default:
                    return 'invisible';
            }
        }
        CustomCode.getElseStateReadOnlyPage = getElseStateReadOnlyPage;
        function demoFieldConditions() {
            let field = HybridForms.API.Fields.getById('invisible-block-combobox');
            let selValue = HybridForms.API.Utilities.isDefined(field) ? field.value : null;
            switch (selValue) {
                case 'meat':
                    return 'invisible';
                case 'pasta':
                    return 'disabled';
                case 'pizza':
                    return 'readonly';
                default:
                    return 'readonly';
            }
        }
        CustomCode.demoFieldConditions = demoFieldConditions;
        function highlightCell() {
            $('input:radio').each(function () {
                $(this).closest($('[class^="hf-radio-"]')).toggleClass('highlight', $(this).is(':checked'));
            });
        }
        CustomCode.highlightCell = highlightCell;
        function setCustomDateValidator(field, val) {
            const fieldTarget = HybridForms.API.Fields.getById('compare_date2');
            let d1 = Date.parse(fieldTarget.value);
            let d2 = Date.parse(val);
            let diff = d2 - d1;
            if (diff > 0) {
                return false;
            }
            return true;
        }
        CustomCode.setCustomDateValidator = setCustomDateValidator;
        function triggerDateChange() {
            const ctrl = HybridForms.API.FormControls.getCtrl('compare_date1');
            if (ctrl && ctrl.currentCtrl) {
                HybridForms.API.FormControls.getCtrl('compare_date1').currentCtrl.trigger('change');
            }
        }
        CustomCode.triggerDateChange = triggerDateChange;
        function setCustomEmailValidator(field, val) {
            const fieldTarget = HybridForms.API.Fields.getById('email');
            if (fieldTarget.value === val) {
                return false;
            }
            return true;
        }
        CustomCode.setCustomEmailValidator = setCustomEmailValidator;
        function triggerEmailChange() {
            $('#email2').trigger('change');
        }
        CustomCode.triggerEmailChange = triggerEmailChange;
        function setCustomTimeValidator(field, val) {
            const fieldTarget = HybridForms.API.FormControls.getCtrl('compare_time1');
            let time1 = new Date(fieldTarget.val());
            let time2 = new Date(val);
            if (time1 !== null && time2 !== null) {
                let t1 = moment(time1.formatTime(), 'HH:mm');
                let t2 = moment(time2.formatTime(), 'HH:mm');
                if (t1 >= t2) {
                    return false;
                }
            }
            return true;
        }
        CustomCode.setCustomTimeValidator = setCustomTimeValidator;
        function triggerTimeChange() {
            const ctrl = HybridForms.API.FormControls.getCtrl('compare_time2');
            if (ctrl && ctrl.currentCtrl) {
                HybridForms.API.FormControls.getCtrl('compare_time2').currentCtrl.trigger('change');
            }
        }
        CustomCode.triggerTimeChange = triggerTimeChange;
        function setCustomComboValidator(field, val) {
            const fieldTarget = HybridForms.API.Fields.getById('compare1_combobox');
            if (fieldTarget.value === val) {
                return false;
            }
            return true;
        }
        CustomCode.setCustomComboValidator = setCustomComboValidator;
        function triggerComboChange() {
            const ctrl = HybridForms.API.FormControls.getCtrl('compare2_combobox');
            if (ctrl && ctrl.currentCtrl) {
                HybridForms.API.FormControls.getCtrl('compare2_combobox').currentCtrl.trigger('change');
            }
        }
        CustomCode.triggerComboChange = triggerComboChange;
        function pdfReturn2() {
            return 'HybridForms® – Software for Mobile Business';
        }
        CustomCode.pdfReturn2 = pdfReturn2;
        function pdfReturn() {
            let changelogo = HybridForms.API.FormControls.getCtrl('radiov5').val();
            let url = '';
            if (changelogo === true) {
                url = HybridForms.API.FormDefinition.getAttachmentPath() + '/form-logo.svg';
            }
            else {
                url = HybridForms.API.FormDefinition.getAttachmentPath() + '/form-logo.png';
            }
            if (url) {
                return `<img src="${url}" />`;
            }
            else {
                return '<h4>No logo</h4>';
            }
        }
        CustomCode.pdfReturn = pdfReturn;
        function pdfBranding() {
            const langField = HybridForms.API.Fields.getById('hfCurrentFormLang').value;
            let branding = '';
            switch (langField) {
                case 'de':
                    branding = 'HybridForms® ist eine Marke der icomedias GmbH';
                    break;
                case 'en':
                    branding = 'HybridForms® is a brand by icomedias';
                    break;
                default:
                    branding = 'HybridForms® is a brand by icomedias';
                    break;
            }
            if (branding) {
                return branding;
            }
            else {
                return 'HybridForms® is a brand by icomedias';
            }
        }
        CustomCode.pdfBranding = pdfBranding;
        function openPDF(ev, that) {
            ev.stopPropagation();
            ev.preventDefault();
            HybridForms.API.Platform.openFileWithExternalApplication($(that).attr('href'), 'application/pdf');
        }
        CustomCode.openPDF = openPDF;
        function showComments() {
            let checkSig = HybridForms.API.FormControls.getCtrl('condSignature').val();
            if (checkSig === false) {
                HybridForms.API.FormControls.getCtrl('condSignature').val(true);
            }
            else {
                HybridForms.API.FormControls.getCtrl('condSignature').val(false);
            }
            return Promise.resolve();
        }
        CustomCode.showComments = showComments;
        function getTreeViewTextTemplate(_idValue, selectedNode) {
            let paths = selectedNode.$sortpath.replace(/\//g, ' > ');
            return paths + ' > ' + selectedNode.Value_DE;
        }
        CustomCode.getTreeViewTextTemplate = getTreeViewTextTemplate;
        function getTreeViewLNTemplate(_idValue, selectedNode) {
            let paths = selectedNode.$sortpath.replace(/\//g, ' > ');
            let pathsVal = selectedNode.$path.replace(/\//g, ' > ');
            return paths;
        }
        CustomCode.getTreeViewLNTemplate = getTreeViewLNTemplate;
        function onTreeViewChange(value) {
            const ctrl = HybridForms.API.FormControls.getCtrl('treeview_dependent');
            if (!ctrl) {
                return;
            }
            let hierarchyDataSource1;
            let hierarchyDataSource2;
            if (value && value.length && value[0].id === '10252577') {
                ctrl.setDataSource(hierarchyDataSource1);
            }
            else {
                ctrl.setDataSource(hierarchyDataSource2);
            }
        }
        CustomCode.onTreeViewChange = onTreeViewChange;
        function provideMAName() {
            let nameField = HybridForms.API.FormControls.getCtrl(this.maNameOptions);
            if (this.val()) {
                let cid = parseInt(this.val().value);
                if (isNaN(cid)) {
                    nameField.val('');
                }
                else {
                    let filter = [{ field: 'ID', operator: 'eq', value: this.val().value }];
                    return HybridForms.API.FormStorage.getCatalog('QATestMitarbeiter', filter).then((dataSource) => {
                        let item = dataSource[0];
                        if (item !== undefined) {
                            nameField.val(item.Name);
                        }
                        else {
                            this.val('');
                        }
                    });
                }
            }
        }
        CustomCode.provideMAName = provideMAName;
        function filterMA() {
            let that = HybridForms.API.FormControls.getCtrl('ma_aggregat_1_persnr');
            let opt = this.callbackOptions;
            if (opt !== 'Reset') {
                let filter = [{ field: 'Department', operator: 'eq', value: opt }];
                return HybridForms.API.FormStorage.getCatalog('QATestMitarbeiter', filter).then(function (dataSource) {
                    that.setDataSource(dataSource);
                    that.currentInputCtrl.trigger('change');
                });
            }
            else {
                return HybridForms.API.FormStorage.getCatalog('QATestMitarbeiter').then(function (dataSource) {
                    that.setDataSource(dataSource);
                    that.currentInputCtrl.trigger('change');
                });
            }
        }
        CustomCode.filterMA = filterMA;
        function stopVideo() {
            let listaFrames = document.getElementsByTagName('iframe');
            if (listaFrames.length) {
                for (let index = 0; index < listaFrames.length; index++) {
                    let iframe = listaFrames[index].contentWindow;
                    if (listaFrames[index].src !== '') {
                        iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    }
                    else {
                        let myVideo = listaFrames[index].contentDocument.getElementsByTagName('video');
                        myVideo[0].pause();
                    }
                }
            }
        }
        CustomCode.stopVideo = stopVideo;
        function filterData() {
            let datengruppe = HybridForms.API.FormControls.getCtrl(this.element.id).val();
            let currentRU = '';
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
            }
            const comboBoxTargetCtrl = HybridForms.API.FormControls.getCtrl(this.subCtrlId + currentRU);
            if (typeof comboBoxTargetCtrl === 'undefined') {
                return;
            }
            const datenquelle = comboBoxTargetCtrl.options.dataSource;
            if (!(datengruppe === null || datengruppe === void 0 ? void 0 : datengruppe.value)) {
                comboBoxTargetCtrl.setDataSource(datenquelle);
                return;
            }
            let filterByValue = datengruppe.value;
            let filtered = datenquelle.filter(function (item) {
                return filterByValue === item.kat;
            });
            comboBoxTargetCtrl.setDataSource(filtered);
        }
        CustomCode.filterData = filterData;
        function initFilter() {
            let postfix = '';
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                postfix = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
            }
            let comboBoxSourceCtrl = HybridForms.API.FormControls.getCtrl(this.ctrlId + postfix);
            let datengruppe = comboBoxSourceCtrl.val();
            let comboBoxTargetCtrl = HybridForms.API.FormControls.getCtrl(this.subCtrlId + postfix);
            let datenquelle;
            if (!comboBoxSourceCtrl || !comboBoxSourceCtrl.val().value) {
                return;
            }
            datenquelle = comboBoxTargetCtrl.options.dataSource;
            if (!datengruppe || !datengruppe.value) {
                comboBoxTargetCtrl.setDataSource(datenquelle);
                return;
            }
            let filterByValue = datengruppe.value;
            let filtered = datenquelle.filter(function (item) {
                return filterByValue === item.kat;
            });
            comboBoxTargetCtrl.setDataSource(filtered);
        }
        CustomCode.initFilter = initFilter;
        function oDataParameterMap(data, type) {
            if (type === 'read') {
                if (data && data.filter && $(data.filter.filters) && data.filter.filters[0]) {
                    data.filter.filters[0].ignoreCase = false;
                }
                return kendo.data.transports.odata.parameterMap(data, type);
            }
        }
        CustomCode.oDataParameterMap = oDataParameterMap;
        function htmlContainerFunc(ruId, ruCount) {
            if (ruId && ruCount) {
                return `RepeatingUnit: ${ruId} - ${ruCount}`;
            }
            return 'Custom Function Execution';
        }
        CustomCode.htmlContainerFunc = htmlContainerFunc;
        function setStamp() {
            HybridForms.API.FormDefinition.getAttachmentUrl('icomedias-transp.png').then((url) => {
                const sigCtrl = HybridForms.API.FormControls.getCtrl('signature_incl_name3');
                sigCtrl.setStamp({
                    url,
                    alpha: 0.5,
                });
            });
            HybridForms.API.FormDefinition.getAttachmentUrl('icomedias-transp.png').then((url) => {
                const sigCtrl = HybridForms.API.FormControls.getCtrl('signature_incl_name1');
                sigCtrl.setStamp({
                    url,
                    alpha: 0.5,
                });
            });
        }
        CustomCode.setStamp = setStamp;
        function setFeaturesReadonly() {
            const form = HybridForms.API.Form;
            const ctrl = HybridForms.API.FormControls.getCtrl(this.element.id);
            const val = ctrl.val();
            form.getCurrent().pictures.forEach((picture) => {
                picture.readonly = val;
            });
            form.save();
        }
        CustomCode.setFeaturesReadonly = setFeaturesReadonly;
        function errorTypeValidation(field, val) {
            if (val === 'invalid') {
                return { errorType: 'custom' };
            }
            return true;
        }
        CustomCode.errorTypeValidation = errorTypeValidation;
        function onDataControlChanged(value) {
            console.log(value);
            console.log(this);
        }
        CustomCode.onDataControlChanged = onDataControlChanged;
        function setUnitNumber(value) {
            const ctrl = HybridForms.API.FormControls.getCtrl('unit_number');
            ctrl.setUnit(`#,##.## ${value}`, value);
        }
        CustomCode.setUnitNumber = setUnitNumber;
        class BeforeApproveAlert extends HybridForms.API.UIControls.BaseControl {
            constructor(element, options) {
                super(element, options);
            }
            createControl() {
                return Promise.resolve();
            }
            registerEvents() {
                const currentStage = HybridForms.API.Stages.getFormStage();
                if (currentStage !== 'ST1') {
                    return;
                }
                this.beforeApprove = () => {
                    const ctrl = HybridForms.API.FormControls.getCtrl('before_approve');
                    if (!ctrl.val()) {
                        return Promise.resolve();
                    }
                    return HybridForms.API.Messages.info('Before Approve Event wurde ausgefürt.');
                };
                HybridForms.API.Form.addEventListener('beforeApprove', this.beforeApprove);
            }
            dispose() {
                if (this.disposed) {
                    return;
                }
                HybridForms.API.Form.removeEventListener('beforeApprove', this.beforeApprove);
                this.disposed = true;
            }
        }
        CustomCode.BeforeApproveAlert = BeforeApproveAlert;
        class SetCompanyInfo extends HybridForms.API.UIControls.BaseControl {
            constructor(element, options) {
                super(element, options);
            }
            fetchLogo(url) {
                if (!url) {
                    return Promise.resolve('');
                }
                const baseUrl = HybridForms.API.Activation.getBaseUrl();
                const fullUrl = baseUrl + url;
                const filename = 'company-logo.png';
                return fetch(fullUrl).then((response) => {
                    if (!response.ok) {
                        return null;
                    }
                    return response
                        .blob()
                        .then((data) => {
                        return HybridForms.API.Form.addOrUpdateAttachment(filename, data);
                    })
                        .then(() => {
                        return Promise.resolve(filename);
                    });
                });
            }
            createControl() {
                return Promise.resolve();
            }
            registerEvents() {
                this.onRendered = () => {
                    const ctrl = HybridForms.API.FormControls.getCtrl(this.ctrlId);
                    const ctrlVal = ctrl.val();
                    if (ctrlVal)
                        return;
                    const group = HybridForms.API.Form.getCurrent().group;
                    if (!group)
                        return;
                    const company = group.company;
                    const logoUrl = group.logoUrl;
                    let address = group.address;
                    if (!company && !logoUrl && !address)
                        return;
                    address = address ? address.split('\n').join('<br>') : '';
                    this.fetchLogo(logoUrl)
                        .then((filename) => {
                        const companyHtml = company ? `<h4>${company}</h4>` : '';
                        const addressHtml = address ? `<p class="address-text">${address}</p>` : '';
                        const logoHtml = filename
                            ? `<hf-img id="company_logo" hf-type="form" hf-src="${filename}" class="img-responsive"/>`
                            : '';
                        const template = `
                            <div class="company-info-wrapper">
                                <div class="text-wrapper">${companyHtml} ${addressHtml}</div>
                                <div class="logo-wrapper">${logoHtml}</div>
                            </div>
                        `;
                        ctrl.val(template);
                    })
                        .catch((error) => {
                        HybridForms.API.Log.error('SetCompanyInfo._fetchLogo, failed to fetch logo image');
                        HybridForms.API.Log.error(error);
                    });
                };
                HybridForms.API.Page.addEventListener('rendered', this.onRendered);
            }
            dispose() {
                if (this.disposed) {
                    return;
                }
                HybridForms.API.Page.removeEventListener('rendered', this.onRendered);
                this.disposed = true;
            }
        }
        CustomCode.SetCompanyInfo = SetCompanyInfo;
        class AudioPlayer extends HybridForms.API.UIControls.BaseControl {
            constructor(element, options) {
                super(element, options);
                this.canPlay = false;
            }
            setUpAudio(audioUrl) {
                return new Promise((resolve, reject) => {
                    this.audio.src = audioUrl;
                    this.canPlayThrough = () => {
                        this.canPlay = true;
                        resolve();
                    };
                    this.audio.addEventListener('canplaythrough', this.canPlayThrough);
                    this.audioEnded = () => {
                        this.stop();
                    };
                    this.audio.addEventListener('ended', this.audioEnded);
                    this.audioPlay = () => {
                        this.$element.removeClass('stop');
                        this.$element.addClass('play');
                    };
                    this.audio.addEventListener('play', this.audioPlay);
                    this.audioPause = () => {
                        this.$element.removeClass('play');
                        this.$element.addClass('stop');
                        this.audio.currentTime = 0;
                    };
                    this.audio.addEventListener('pause', this.audioPause);
                    this.audio.load();
                });
            }
            downloadAudio() {
                if (!HybridForms.API.Platform.isOnline()) {
                    return Promise.reject('ERROR_OFFLINE');
                }
                return HybridForms.API.FormDefinition.getAttachmentUrl(this.fileUrl)
                    .then((audioUrl) => {
                    return this.setUpAudio(audioUrl);
                })
                    .then(() => {
                    this.fileLoaded = true;
                })
                    .catch((error) => {
                    var _a, _b;
                    HybridForms.API.Log.error(error);
                    if (((_a = error.target) === null || _a === void 0 ? void 0 : _a.readyState) === 4 && ((_b = error.target) === null || _b === void 0 ? void 0 : _b.status) === 0) {
                        return Promise.reject('ERROR_OFFLINE');
                    }
                });
            }
            playAudio() {
                if (!this.canPlay) {
                    return;
                }
                this.audio.currentTime = 0;
                this.audio.play();
            }
            createControl() {
                if (!this.fileUrl) {
                    return Promise.resolve();
                }
                this.audio = $('#audio-player', this.$element)[0];
                this.$playStopButton = $('.audio-button', this.$element);
                this.fileLoaded = this.fileUrl.indexOf('blob:') > -1 ? true : false;
                if (this.fileLoaded) {
                    return this.setUpAudio(this.fileUrl);
                }
                return Promise.resolve();
            }
            registerEvents() {
                this.$playStopButton.on('click', (ev) => {
                    if (this.audio && !this.audio.paused) {
                        this.stop();
                        return;
                    }
                    if (this.fileLoaded) {
                        this.playAudio();
                        return;
                    }
                    return this.downloadAudio()
                        .then(() => {
                        this.playAudio();
                    })
                        .catch((e) => {
                        let errMsg;
                        if (e === 'ERROR_OFFLINE') {
                            const translation = HybridForms.API.Internalization.getLocalRes('FormDefinition.SyncExcluded.Offline');
                            if (translation !== 'FormDefinition.SyncExcluded.Offline') {
                                errMsg = translation;
                            }
                            else {
                                errMsg =
                                    'Die Audio Datei kann nicht abgespielt werden, weil Sie Offline sind. Bitte überprüfen Sie Ihre Netzwerkeinstellungen und versuchen es nochmals.';
                            }
                        }
                        else {
                            errMsg = 'Sorry, an error occured. Audio cannot be played at the moment.';
                        }
                        HybridForms.API.Messages.error(errMsg);
                    });
                });
                [this.$playStopButton].forEach(($el) => {
                    $el.on('keydown', (ev) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                            $el.trigger('click');
                        }
                    });
                });
                this.onPageNavigated = () => {
                    if (this.audio.paused) {
                        return;
                    }
                    this.stop();
                };
                HybridForms.API.Page.addEventListener('navigated', this.onPageNavigated);
            }
            stop() {
                this.audio.pause();
            }
            dispose() {
                var _a;
                if (this.disposed) {
                    return;
                }
                if (this.audio) {
                    this.stop();
                }
                if (this.audio) {
                    this.audio.removeEventListener('canplaythrough', this.canPlayThrough);
                    this.audio.removeEventListener('ended', this.audioEnded);
                    this.audio.removeEventListener('play', this.audioPlay);
                    this.audio.removeEventListener('pause', this.audioPause);
                }
                HybridForms.API.Page.removeEventListener('navigated', this.onPageNavigated);
                (_a = this.$playStopButton) === null || _a === void 0 ? void 0 : _a.off();
                this.disposed = true;
            }
        }
        CustomCode.AudioPlayer = AudioPlayer;
        function playAudio() {
            if (audioIsPlaying && audio) {
                audioIsPlaying = false;
                this.hfButton.setLabel('Play Audio');
                audio.pause();
                audio.currentTime = 0;
                return;
            }
            console.log(this);
            console.log(this.fdFilename);
            if (!audio) {
                HybridForms.API.FormDefinition.getAttachmentUrl(this.fdFilename).then((audioUrl) => {
                    this.hfButton.setLabel('Stop Audio');
                    audio = new Audio(audioUrl);
                    audio.play();
                    audioIsPlaying = true;
                    audio.onended = () => {
                        audioIsPlaying = false;
                        this.hfButton.setLabel('Play Audio');
                    };
                });
            }
            else {
                audio.play();
                audioIsPlaying = true;
            }
            HybridForms.API.Page.addEventListener('disposed', () => {
                audio.pause();
                audio.removeAttribute('src');
                audio.onended = null;
                audio = null;
            });
        }
        CustomCode.playAudio = playAudio;
        function listTemplateCallback(formItemCt, formItemData) {
            if (!formItemData.data.stage.first) {
                $(formItemCt).css('background', '#ff97e566');
            }
            return Promise.resolve();
        }
        CustomCode.listTemplateCallback = listTemplateCallback;
        function mapOnLoad() {
            console.log('Map loaded');
            console.log(this);
        }
        CustomCode.mapOnLoad = mapOnLoad;
        function triggerPhoneChange(value) {
            let id = this.shadowCtrlId;
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                id += HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
            }
            const ctrl = HybridForms.API.FormControls.getCtrl(id);
            if (!ctrl) {
                return;
            }
            const phoneNr = this.val();
            if (phoneNr) {
                if (!phoneNr.startsWith('+')) {
                    ctrl.val('+' + phoneNr);
                }
                else {
                    ctrl.val(phoneNr);
                }
            }
            else {
                ctrl.val('');
            }
        }
        CustomCode.triggerPhoneChange = triggerPhoneChange;
        function filterDynamicRUDataSource(dataSource) {
            return dataSource;
        }
        CustomCode.filterDynamicRUDataSource = filterDynamicRUDataSource;
        function onFinishDynamicRU() {
            HybridForms.API.Log.info('CustomCode.onFinishDynamicRU(): Dynamic RU finished');
        }
        CustomCode.onFinishDynamicRU = onFinishDynamicRU;
        function addVat(value, dataItem) {
            let vat = 0.2;
            return (parseFloat(value) * vat).toFixed(2);
        }
        CustomCode.addVat = addVat;
        function initializeDynamicRepeatingUnit() {
            HybridForms.API.RepeatingUnits.initializeDynamicRepeatingUnit(this.druId).then(() => {
                HybridForms.API.Log.info('CustomCode.initializeDynamicRepeatingUnit(): Dynamic RU initialized');
                this.disable();
            });
        }
        CustomCode.initializeDynamicRepeatingUnit = initializeDynamicRepeatingUnit;
        function fetchAssetFile(init) {
            const imgShownCtrl = HybridForms.API.FormControls.getCtrl('asset_file_shown');
            if (init && !imgShownCtrl.val())
                return Promise.resolve();
            return HybridForms.API.Assets.getFileAsBlob('form-test-async', 'kangaru.jpg')
                .then((blob) => {
                const imageUrl = URL.createObjectURL(blob);
                let container;
                if (HybridForms.API.System.IsView()) {
                    container = $('[data-hf-id="image-container"]')[0];
                }
                else {
                    container = document.getElementById('image-container');
                }
                if (!container) {
                    return;
                }
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Kangaru Image';
                img.style.width = '300px';
                img.id = 'kangaru';
                container.appendChild(img);
                img.onload = () => {
                    URL.revokeObjectURL(imageUrl);
                };
                imgShownCtrl.val(true);
            })
                .catch((error) => {
                console.error('ERROR:', error);
            });
        }
        CustomCode.fetchAssetFile = fetchAssetFile;
        function booleanTest(value) {
            const ctrl = HybridForms.API.FormControls.getCtrl('newBooleanControl');
            if (value) {
                ctrl.val(true);
            }
            else {
                ctrl.val(false);
            }
        }
        CustomCode.booleanTest = booleanTest;
    })(CustomCode = HFFormdefinition.CustomCode || (HFFormdefinition.CustomCode = {}));
})(HFFormdefinition || (HFFormdefinition = {}));
//# sourceMappingURL=CustomCode.js.map