"use strict";
var HFFormdefinition;
(function (HFFormdefinition) {
    var DemoFieldServiceHelpers;
    (function (DemoFieldServiceHelpers) {
        function provideAmounts() {
            const dataItem = this.inputCtrl.dataItem();
            const ctrls = this.provideAmountsOptions.split(',');
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                const postfixId = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                ctrls.forEach((ctrlId, idx) => {
                    ctrlId += postfixId;
                    ctrls[idx] = ctrlId;
                });
            }
            const priceCtrl = HybridForms.API.FormControls.getCtrl(ctrls[1]);
            const amountCtrl = HybridForms.API.FormControls.getCtrl(ctrls[2]);
            if (dataItem) {
                if (dataItem.Price) {
                    priceCtrl.val(dataItem.Price);
                }
                else {
                    priceCtrl.val('');
                }
                let amountItems;
                if (dataItem.Stock) {
                    amountItems = amountCtrl.getDataSource();
                    if (amountItems) {
                        amountItems = [];
                        amountCtrl.val('');
                        amountCtrl.setDataSource([{ key: '0' }]);
                    }
                    for (let i = 1; i <= dataItem.Stock; i++) {
                        amountItems.push({ key: String(i) });
                    }
                    amountCtrl.setDataSource(amountItems);
                    amountCtrl.inputCtrl.refresh();
                    HybridForms.API.FormControls.getCtrl(ctrls[3]).val(dataItem.Stock);
                }
                else {
                    amountCtrl._ctrl.setDataSource(amountItems);
                    amountCtrl.inputCtrl.refresh();
                    HybridForms.API.FormControls.getCtrl(ctrls[3]).val('0');
                }
            }
            else {
                priceCtrl.val('');
                amountCtrl.val('');
                amountCtrl.setDataSource([{ key: '0' }]);
                return;
            }
        }
        DemoFieldServiceHelpers.provideAmounts = provideAmounts;
        function setPartsComboBoxTemplate(item) {
            let text = item.Description;
            const inputCtrl = this.currentInputCtrl;
            if (inputCtrl) {
                const search = inputCtrl.text();
                if (search.length) {
                    const reg = new RegExp(search, 'gi');
                    text = text.replace(reg, (str) => {
                        return '<b>' + str + '</b>';
                    });
                }
            }
            text = text + ' <small>(' + item.Title + ')</small>';
            return text;
        }
        DemoFieldServiceHelpers.setPartsComboBoxTemplate = setPartsComboBoxTemplate;
        function setPartsAmounts() {
            let currentRU = '';
            let idx = 1;
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
            }
            for (idx; idx < 4; idx++) {
                const sparePartsField = HybridForms.API.Fields.getById(this.baseItemId + idx.toString() + currentRU);
                const amountCtrl = HybridForms.API.FormControls.getCtrl(this.baseAmountId + idx.toString() + currentRU);
                const selectedItem = sparePartsField.value;
                let amountItems = amountCtrl.dataSource ? amountCtrl.dataSource : [];
                if (!amountCtrl) {
                    return;
                }
                if (amountItems.length && selectedItem) {
                    amountItems = [];
                    for (let j = 1; j <= Number(selectedItem); j++) {
                        amountItems.push({ key: String(j) });
                    }
                    amountCtrl.setDataSource(amountItems);
                }
                else {
                    amountCtrl.setDataSource(amountItems);
                }
            }
        }
        DemoFieldServiceHelpers.setPartsAmounts = setPartsAmounts;
        function getDuration(tStart, tEnd) {
            const duration = tStart <= tEnd ? tEnd - tStart : tEnd.getTime() + 24 * 60 * 60 * 1000 - tStart;
            let strHours;
            let strMinutes;
            let hours = Math.floor(duration / 1000 / 60 / 60);
            let minutes = Math.floor(duration / 1000 / 60 - hours * 60);
            strHours = hours < 10 ? '0' + hours.toString() : hours.toString();
            strMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            return `${strHours}:${strMinutes}`;
        }
        DemoFieldServiceHelpers.getDuration = getDuration;
        function baseCalculateDuration(ctrl) {
            const that = ctrl ? ctrl : this;
            const ctrlIds = that.calcDurationOptions.split(',');
            if (ctrlIds.length !== 3) {
                return;
            }
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(that.element)) {
                const postfixId = HybridForms.API.RepeatingUnits.getPostfixFieldId(that.element);
                ctrlIds.forEach((ctrlId, idx) => {
                    ctrlId += postfixId;
                    ctrlIds[idx] = ctrlId;
                });
            }
            const ctrl1 = HybridForms.API.FormControls.getCtrl(ctrlIds[0]);
            const ctrl2 = HybridForms.API.FormControls.getCtrl(ctrlIds[1]);
            let start = ctrl1.val();
            let end = ctrl2.val();
            if (start && end) {
                start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes());
                start.setSeconds(0);
                end.setSeconds(0);
                end.setFullYear(start.getFullYear());
                end.setMonth(start.getMonth());
                end.setDate(start.getDate());
                const duration = start <= end ? end.getTime() - start.getTime() : end.getTime() + 24 * 60 * 60 * 1000 - start.getTime();
                let strHours;
                let strMinutes;
                let hours = Math.floor(duration / 1000 / 60 / 60);
                let minutes = Math.floor(duration / 1000 / 60 - hours * 60);
                strHours = hours < 10 ? '0' + hours.toString() : hours.toString();
                strMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
                HybridForms.API.FormControls.getCtrl(ctrlIds[2]).val(`${strHours}:${strMinutes}`);
            }
            else {
                HybridForms.API.FormControls.getCtrl(ctrlIds[2]).val('');
            }
        }
        DemoFieldServiceHelpers.baseCalculateDuration = baseCalculateDuration;
        function calculateDuration(value, ctrl) {
            const that = ctrl ? ctrl : this;
            HFFormdefinition.DemoFieldServiceHelpers.baseCalculateDuration(that);
        }
        DemoFieldServiceHelpers.calculateDuration = calculateDuration;
        function calculateDurationDays(ctrl) {
            const that = ctrl ? ctrl : this;
            const ctrlIds = that.calcDurationOptions.split(',');
            const dateStartCtrl = HybridForms.API.FormControls.getCtrl(ctrlIds[0]);
            const timeStartCtrl = HybridForms.API.FormControls.getCtrl(ctrlIds[1]);
            const dateEndCtrl = HybridForms.API.FormControls.getCtrl(ctrlIds[2]);
            const timeEndCtrl = HybridForms.API.FormControls.getCtrl(ctrlIds[3]);
            const offsetCtrl = HybridForms.API.FormControls.getCtrl(ctrlIds[4]);
            const totalCtrl = HybridForms.API.FormControls.getCtrl(ctrlIds[5]);
            const anreise = ctrlIds[0].indexOf('anreise') > -1 ? true : false;
            let startDateTime = new Date();
            let endDateTime = new Date();
            let dateStart = dateStartCtrl.val();
            let timeStart = timeStartCtrl.val();
            let dateEnd = dateEndCtrl.val();
            let timeEnd = timeEndCtrl.val();
            let offset = parseInt(offsetCtrl.val());
            if (!dateStart || !dateEnd || !timeStart || !timeEnd) {
                totalCtrl.val(null);
                return;
            }
            dateStart = new Date(dateStart);
            dateEnd = new Date(dateEnd);
            let dateDiff = Math.abs(dateEnd.getTime() - dateStart.getTime());
            if (dateDiff >= 1.5 * 24 * 60 * 60 * 1000) {
                totalCtrl.val('NaN');
                return;
            }
            if (timeStart) {
                timeStartCtrl.val(timeStart, true);
            }
            if (timeEnd) {
                timeEndCtrl.val(timeEnd, true);
            }
            if (dateStart && timeStart && dateEnd && timeEnd) {
                dateStart = new Date(dateStart);
                dateEnd = new Date(dateEnd);
                startDateTime = HFFormdefinition.DemoFieldServiceHelpers.convertToDateTime(timeStart, dateStart);
                endDateTime = HFFormdefinition.DemoFieldServiceHelpers.convertToDateTime(timeEnd, dateEnd);
                if (anreise) {
                    endDateTime = HFFormdefinition.DemoFieldServiceHelpers.handleOffset(endDateTime, offset, anreise, startDateTime);
                    console.log(endDateTime);
                }
                else {
                    startDateTime = HFFormdefinition.DemoFieldServiceHelpers.handleOffsetBack(startDateTime, offset, anreise, endDateTime);
                }
                if (endDateTime === null || startDateTime === null) {
                    totalCtrl.val('-');
                    return;
                }
                if (endDateTime.getTime() - startDateTime.getTime() < 0) {
                    endDateTime.setTime(endDateTime.getTime() + 24 * 60 * 60 * 1000);
                }
                let timestring = HFFormdefinition.DemoFieldServiceHelpers.getDuration(startDateTime, endDateTime);
                totalCtrl.val(timestring);
            }
            else {
                totalCtrl.val(null);
            }
        }
        DemoFieldServiceHelpers.calculateDurationDays = calculateDurationDays;
        function calculateDurationOverDays(value, ctrl) {
            let that = ctrl ? ctrl : this;
            HFFormdefinition.DemoFieldServiceHelpers.calculateDurationDays(that);
        }
        DemoFieldServiceHelpers.calculateDurationOverDays = calculateDurationOverDays;
        function calculateArbeitszeit() {
            const that = this;
            let totalZeitField = 'arbeitszeit_summe_gesamt';
            let arbeitsZeitField = 'arbeitszeit_summe_ohne';
            let pauseField = 'arbeitszeit_pause';
            let postfixId;
            let $totalZeit;
            let $arbeitsZeit;
            let arbeitsZeitCtrl;
            let totalZeitCtrl;
            let arbeitsZeitVal;
            let pauseZeitVal;
            let timeStr;
            let totalZeit;
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(that.element)) {
                postfixId = HybridForms.API.RepeatingUnits.getPostfixFieldId(that.element);
            }
            if (!postfixId) {
                return;
            }
            arbeitsZeitField += postfixId;
            pauseField += postfixId;
            totalZeitField += postfixId;
            $arbeitsZeit = $('#' + arbeitsZeitField);
            $totalZeit = $('#' + totalZeitField);
            console.log(totalZeitField);
            if (!$totalZeit.length || !$arbeitsZeit.length) {
                return;
            }
            arbeitsZeitCtrl = $arbeitsZeit[0].winControl;
            totalZeitCtrl = $totalZeit[0].winControl;
            pauseZeitVal = HybridForms.API.Fields.getById(pauseField + '_HFValue');
            arbeitsZeitVal = arbeitsZeitCtrl.val();
            if (!arbeitsZeitVal) {
                return;
            }
            if (!pauseZeitVal || !pauseZeitVal.value) {
                $totalZeit.removeClass('invalid');
                totalZeitCtrl.val(arbeitsZeitVal);
                return;
            }
            const arbeitsZeitArr = arbeitsZeitVal.split(':');
            const arbeitsZeitHours = parseInt(arbeitsZeitArr[0]);
            const arbeitsZeitMinutes = arbeitsZeitHours * 60 + parseInt(arbeitsZeitArr[1]);
            totalZeit = arbeitsZeitMinutes - pauseZeitVal.value;
            if (totalZeit < 0) {
                $totalZeit.addClass('invalid');
                totalZeitCtrl.val('Eingabe prüfen');
                return;
            }
            timeStr = HFFormdefinition.DemoFieldServiceHelpers.getFormattedTimeString(totalZeit);
            totalZeitCtrl.val(timeStr);
            $totalZeit.removeClass('invalid');
        }
        DemoFieldServiceHelpers.calculateArbeitszeit = calculateArbeitszeit;
        function calculateTotalArbeitszeit(value, ctrl) {
            const that = ctrl ? ctrl : this;
            const $tabContent = $('#' + that.fieldsToCalculate[0] + '_hfrepeating_1').closest('.tab-content');
            const arbeitszeitField = that.fieldsToCalculate[0];
            $('.repeatingunit', $tabContent).each((idx) => {
                const ruIdx = idx + 1;
                let $arbeitszeit;
                let arbeitszeitCtrl;
                let arbeitszeitVal;
                let totalMin = 0;
                let arbeitszeitMinutes;
                $arbeitszeit = $('#' + arbeitszeitField + '_hfrepeating_' + ruIdx);
                if (!$arbeitszeit.length) {
                    return;
                }
                arbeitszeitCtrl = $arbeitszeit[0].winControl;
                arbeitszeitVal = arbeitszeitCtrl.val();
                if (arbeitszeitVal) {
                    arbeitszeitMinutes = HFFormdefinition.DemoFieldServiceHelpers.getMinutes(arbeitszeitVal);
                    totalMin += arbeitszeitMinutes;
                }
            });
        }
        DemoFieldServiceHelpers.calculateTotalArbeitszeit = calculateTotalArbeitszeit;
        function getMinutes(fieldVal) {
            let fieldTime;
            if (fieldVal.indexOf(':') < 0) {
                const hours = fieldVal.substring(0, 2);
                const minutes = fieldVal.substring(2, 4);
                fieldTime = [hours, minutes];
            }
            else {
                fieldTime = fieldVal.split(':');
            }
            if (fieldTime.length !== 2) {
                return null;
            }
            if (fieldTime[1] > 59) {
                return null;
            }
            const fieldHours = parseInt(fieldTime[0]);
            return fieldHours * 60 + (fieldTime[1] % 60);
        }
        DemoFieldServiceHelpers.getMinutes = getMinutes;
        function getFormattedTimeString(minutes) {
            let totalZeitHours = Math.floor(minutes / 60);
            let totalZeitHoursStr;
            if (totalZeitHours < 10) {
                totalZeitHoursStr = '0' + totalZeitHours.toString();
            }
            else {
                totalZeitHoursStr = totalZeitHours.toString();
            }
            const totalZeitMinutes = minutes % 60;
            let totalZeitMinutesStr;
            if (totalZeitMinutes < 10) {
                totalZeitMinutesStr = '0' + totalZeitMinutes.toString();
            }
            else {
                totalZeitMinutesStr = totalZeitMinutes.toString();
            }
            return `${totalZeitHoursStr}:${totalZeitMinutesStr}`;
        }
        DemoFieldServiceHelpers.getFormattedTimeString = getFormattedTimeString;
        function convertToDateTime(time, date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0);
        }
        DemoFieldServiceHelpers.convertToDateTime = convertToDateTime;
        function convertToTimeFormat(input) {
            return input.slice(0, 2) + ':' + input.slice(2);
        }
        DemoFieldServiceHelpers.convertToTimeFormat = convertToTimeFormat;
        function handleOffsetBack(dateTime, offset, subtractOffset, refDateTime) {
            const dateTimeNew = new Date();
            dateTimeNew.setTime(dateTime.getTime() + offset * 60 * 60 * 1000);
            if (dateTimeNew > refDateTime) {
                return null;
            }
            return dateTimeNew;
        }
        DemoFieldServiceHelpers.handleOffsetBack = handleOffsetBack;
        function handleOffset(dateTime, offset, subtractOffset, refDateTime) {
            const dateTimeNew = new Date();
            dateTimeNew.setTime(dateTime.getTime() - offset * 60 * 60 * 1000);
            if (dateTimeNew < refDateTime) {
                return null;
            }
            return dateTimeNew;
        }
        DemoFieldServiceHelpers.handleOffset = handleOffset;
        function calculateKilometer() {
            const that = this;
            let sum = 0;
            if (!that.fieldsToCalculate || !that.totalField) {
                return;
            }
            that.fieldsToCalculate.some((field) => {
                let ctrl = $('#' + field)[0].winControl;
                if (ctrl.val()) {
                    let ctrlVal = parseInt(ctrl.val());
                    sum += ctrlVal;
                }
            });
            if (sum >= 0) {
                $('#' + that.totalField).removeClass('invalid');
                $('#' + that.totalField)[0].winControl.val(sum);
            }
            else {
                $('#' + that.totalField).addClass('invalid');
                $('#' + that.totalField)[0].winControl.val('Eingaben prüfen');
            }
        }
        DemoFieldServiceHelpers.calculateKilometer = calculateKilometer;
        function getSigner() {
            const thisCtrl = this;
            const name = [];
            let currentRU = '';
            let signerParts;
            let namePart;
            if (!thisCtrl.getSignerOptions) {
                return;
            }
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(thisCtrl.element)) {
                currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(thisCtrl.element);
            }
            signerParts = thisCtrl.getSignerOptions.split(',');
            if (signerParts.length) {
                signerParts.forEach((signingPart) => {
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
        DemoFieldServiceHelpers.getSigner = getSigner;
        function copyFullName() {
            let fname = HybridForms.API.FormControls.getCtrl('customer_last_name').val();
            let lname = HybridForms.API.FormControls.getCtrl('customer_first_name').val();
            let fullname = fname + ' ' + lname;
            HybridForms.API.FormControls.getCtrl('customer_fullname').val(fullname);
        }
        DemoFieldServiceHelpers.copyFullName = copyFullName;
        function setTimeValidator(field, val) {
            const sourceTarget = HybridForms.API.FormControls.getCtrl(field.id);
            let t1 = moment(sourceTarget._ctrl.value().formatTime(), 'HH:mm');
            if (!t1) {
                return false;
            }
            return true;
        }
        DemoFieldServiceHelpers.setTimeValidator = setTimeValidator;
        class Initializr extends HybridForms.API.UIControls.BaseControl {
            constructor() {
                super(...arguments);
                this.onRendered = null;
            }
            createControl() {
                if (this.callback && {}.toString.call(this.callback) === '[object Function]') {
                    this.onRendered = () => {
                        this.callback.call(this);
                    };
                    HybridForms.API.Page.addEventListener('rendered', this.onRendered);
                    HybridForms.API.Page.addEventListener('viewrendered', this.onRendered);
                }
                return Promise.resolve();
            }
            dispose() {
                if (this.disposed) {
                    return;
                }
                if (this.onRendered) {
                    HybridForms.API.Page.removeEventListener('rendered', this.onRendered);
                    HybridForms.API.Page.removeEventListener('viewrendered', this.onRendered);
                }
                this.disposed = true;
            }
        }
        DemoFieldServiceHelpers.Initializr = Initializr;
        class User extends HybridForms.API.UIControls.BaseControl {
            constructor() {
                super(...arguments);
                this.userId = null;
            }
            getUserOnApp() {
                const user = HybridForms.API.User.get();
                if (user && user.displayName) {
                    return user.displayName;
                }
                return '';
            }
            createControl() {
                if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                    this.userId += HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                }
                let ctrl = HybridForms.API.FormControls.getCtrl(this.userId);
                if (!ctrl.val()) {
                    let user = this.getUserOnApp();
                    if (user.length) {
                        ctrl.val(user);
                        HFFormdefinition.DemoFieldServiceHelpers.User.user = user;
                    }
                    else {
                        HFFormdefinition.DemoFieldServiceHelpers.User.user = null;
                    }
                }
                return Promise.resolve();
            }
        }
        User.user = null;
        DemoFieldServiceHelpers.User = User;
        class ButtonInitializr extends HybridForms.API.UIControls.BaseControl {
            constructor() {
                super(...arguments);
                this.onRendered = null;
            }
            initButtons() {
                const callBtnEle = document.getElementById('callBtn');
                new HybridForms.API.UIControls.FormButton(callBtnEle, {
                    type: 2,
                    heading: 'Assistance',
                    label: 'Call',
                    icon: 'fa-phone',
                    clickHandler: () => {
                        const url = 'https://login.evocall.net/api/auth/token/5a8bce12c07efa35e9a90299?redirect=/call/user/5a8bceaac07efa35e9a9030a';
                        this.openUrl(url);
                        return Promise.resolve();
                    },
                });
                const manualBtnEle1 = document.getElementById('manualBtn_frc');
                if (manualBtnEle1) {
                    new HybridForms.API.UIControls.Button(manualBtnEle1, {
                        type: 0,
                        label: 'FRC Operation manual',
                        icon: 'fa-file-pdf',
                        clickHandler: () => {
                            let url = 'https://transfer.icomedias.com/HF-FormFiles/Festo-FRC-D_EN.PDF';
                            this.openUrl(url);
                            return Promise.resolve();
                        },
                    });
                }
                const manualBtnEle2 = document.getElementById('manualBtn_msb');
                if (manualBtnEle2) {
                    new HybridForms.API.UIControls.Button(manualBtnEle2, {
                        type: 0,
                        label: 'MSB Operation manual',
                        icon: 'fa-file-pdf',
                        clickHandler: () => {
                            let url = 'https://transfer.icomedias.com/HF-FormFiles/Festo-MS-COMBINATION_EN.PDF';
                            this.openUrl(url);
                            return Promise.resolve();
                        },
                    });
                }
                const downloadBtn = document.getElementById('downloadBtn');
                if (downloadBtn) {
                    new HybridForms.API.UIControls.Button(downloadBtn, {
                        type: 0,
                        label: 'Download product-shelf for scan',
                        clickHandler: () => {
                            const url = 'https://files.hybridforms.net/material/HybridForms-Scan-Shelf.pdf';
                            this.openUrl(url);
                            return Promise.resolve();
                        },
                    });
                }
            }
            openUrl(url) {
                HybridForms.API.Platform.openExternalUrl(url);
            }
            createControl() {
                this.onRendered = () => {
                    this.initButtons();
                };
                HybridForms.API.Page.addEventListener('rendered', this.onRendered);
                return Promise.resolve();
            }
            dispose() {
                if (this.disposed) {
                    return;
                }
                if (this.onRendered) {
                    HybridForms.API.Page.removeEventListener('rendered', this.onRendered);
                }
                this.disposed = true;
            }
        }
        DemoFieldServiceHelpers.ButtonInitializr = ButtonInitializr;
    })(DemoFieldServiceHelpers = HFFormdefinition.DemoFieldServiceHelpers || (HFFormdefinition.DemoFieldServiceHelpers = {}));
})(HFFormdefinition || (HFFormdefinition = {}));
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.provideAmounts);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.setPartsComboBoxTemplate);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.setPartsAmounts);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.getSigner);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.copyFullName);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.calculateArbeitszeit);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.calculateDuration);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.calculateDurationOverDays);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.calculateKilometer);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.calculateTotalArbeitszeit);
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldServiceHelpers.setTimeValidator);
//# sourceMappingURL=FieldServiceHelpers.js.map