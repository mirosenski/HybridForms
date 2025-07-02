namespace HFFormdefinition.DemoFieldServiceHelpers {
    export function provideAmounts() {
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
            } else {
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
            } else {
                amountCtrl._ctrl.setDataSource(amountItems);
                amountCtrl.inputCtrl.refresh();
                HybridForms.API.FormControls.getCtrl(ctrls[3]).val('0');
            }
        } else {
            priceCtrl.val('');
            amountCtrl.val('');
            amountCtrl.setDataSource([{ key: '0' }]);

            return;
        }
    }

    export function setPartsComboBoxTemplate(item) {
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

    export function setPartsAmounts() {
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
            } else {
                amountCtrl.setDataSource(amountItems);
            }
        }
    }

    /* Zeitberechnungen */
    export function getDuration(tStart, tEnd) {
        const duration = tStart <= tEnd ? tEnd - tStart : (tEnd as Date).getTime() + 24 * 60 * 60 * 1000 - tStart;
        let strHours: string;
        let strMinutes: string;
        let hours = Math.floor(duration / 1000 / 60 / 60);
        let minutes = Math.floor(duration / 1000 / 60 - hours * 60);
        strHours = hours < 10 ? '0' + hours.toString() : hours.toString();
        strMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

        return `${strHours}:${strMinutes}`;
    }

    export function baseCalculateDuration(ctrl) {
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
        let start = ctrl1.val() as Date;
        let end = ctrl2.val() as Date;

        if (start && end) {
            start = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate(),
                start.getHours(),
                start.getMinutes(),
            );
            start.setSeconds(0);
            end.setSeconds(0);
            end.setFullYear(start.getFullYear());
            end.setMonth(start.getMonth());
            end.setDate(start.getDate());

            const duration =
                start <= end ? end.getTime() - start.getTime() : end.getTime() + 24 * 60 * 60 * 1000 - start.getTime();
            let strHours;
            let strMinutes;
            let hours = Math.floor(duration / 1000 / 60 / 60);
            let minutes = Math.floor(duration / 1000 / 60 - hours * 60);
            strHours = hours < 10 ? '0' + hours.toString() : hours.toString();
            strMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

            HybridForms.API.FormControls.getCtrl(ctrlIds[2]).val(`${strHours}:${strMinutes}`);
        } else {
            HybridForms.API.FormControls.getCtrl(ctrlIds[2]).val('');
        }
    }

    export function calculateDuration(value, ctrl) {
        const that = ctrl ? ctrl : this;
        HFFormdefinition.DemoFieldServiceHelpers.baseCalculateDuration(that);
    }

    export function calculateDurationDays(ctrl) {
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
            // 1.5 days
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
                endDateTime = HFFormdefinition.DemoFieldServiceHelpers.handleOffset(
                    endDateTime,
                    offset,
                    anreise,
                    startDateTime,
                );
                console.log(endDateTime);
            } else {
                startDateTime = HFFormdefinition.DemoFieldServiceHelpers.handleOffsetBack(
                    startDateTime,
                    offset,
                    anreise,
                    endDateTime,
                );
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
        } else {
            totalCtrl.val(null);
        }
    }

    export function calculateDurationOverDays(value, ctrl) {
        let that = ctrl ? ctrl : this;
        HFFormdefinition.DemoFieldServiceHelpers.calculateDurationDays(that);
    }

    export function calculateArbeitszeit() {
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
            // copy arbeitszeit value to totalZeit field
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

    export function calculateTotalArbeitszeit(value, ctrl) {
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

    export function getMinutes(fieldVal) {
        let fieldTime;
        if (fieldVal.indexOf(':') < 0) {
            // in format hhmm
            const hours = fieldVal.substring(0, 2);
            const minutes = fieldVal.substring(2, 4);
            fieldTime = [hours, minutes];
        } else {
            // in format hh:mm
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

    export function getFormattedTimeString(minutes) {
        let totalZeitHours = Math.floor(minutes / 60);
        let totalZeitHoursStr: string;
        if (totalZeitHours < 10) {
            totalZeitHoursStr = '0' + totalZeitHours.toString();
        } else {
            totalZeitHoursStr = totalZeitHours.toString();
        }

        const totalZeitMinutes = minutes % 60;
        let totalZeitMinutesStr: string;

        if (totalZeitMinutes < 10) {
            totalZeitMinutesStr = '0' + totalZeitMinutes.toString();
        } else {
            totalZeitMinutesStr = totalZeitMinutes.toString();
        }

        return `${totalZeitHoursStr}:${totalZeitMinutesStr}`;
    }

    export function convertToDateTime(time, date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0);
    }

    export function convertToTimeFormat(input) {
        return input.slice(0, 2) + ':' + input.slice(2);
    }

    export function handleOffsetBack(dateTime, offset, subtractOffset, refDateTime) {
        const dateTimeNew = new Date();
        dateTimeNew.setTime(dateTime.getTime() + offset * 60 * 60 * 1000);

        if (dateTimeNew > refDateTime) {
            return null;
        }

        return dateTimeNew;
    }

    export function handleOffset(dateTime, offset, subtractOffset, refDateTime) {
        const dateTimeNew = new Date();
        dateTimeNew.setTime(dateTime.getTime() - offset * 60 * 60 * 1000);

        if (dateTimeNew < refDateTime) {
            return null;
        }

        return dateTimeNew;
    }

    /* Wegberechnung */
    export function calculateKilometer() {
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
        } else {
            $('#' + that.totalField).addClass('invalid');
            $('#' + that.totalField)[0].winControl.val('Eingaben prüfen');
        }
    }

    /*
     * getSigner
     * Type: onChanged Method
     * Description:
     *      Gets the names from one or two fields and makes an additional stamp entry within the signature field
     * @data-win-options:
     *      getSignerOptions[string](required) : comma-seperated list of formcontrol-ids; concatenated in order of appearance
     */

    export function getSigner() {
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

    export function copyFullName() {
        let fname = HybridForms.API.FormControls.getCtrl('customer_last_name').val();
        let lname = HybridForms.API.FormControls.getCtrl('customer_first_name').val();
        let fullname = fname + ' ' + lname;

        HybridForms.API.FormControls.getCtrl('customer_fullname').val(fullname);
    }

    export function setTimeValidator(field, val) {
        const sourceTarget = HybridForms.API.FormControls.getCtrl(field.id);

        let t1 = moment(sourceTarget._ctrl.value().formatTime(), 'HH:mm');
        if (!t1) {
            return false;
        }
        return true;
    }

    export class Initializr extends HybridForms.API.UIControls.BaseControl {
        private onRendered = null;
        public callback: () => void;

        protected createControl(): Promise<void> {
            if (this.callback && {}.toString.call(this.callback) === '[object Function]') {
                this.onRendered = () => {
                    this.callback.call(this);
                };
                HybridForms.API.Page.addEventListener('rendered', this.onRendered);
                HybridForms.API.Page.addEventListener('viewrendered', this.onRendered);
            }

            return Promise.resolve();
        }

        public dispose() {
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

    /*
     * User
     * Description:
     *      Gets the current User name from the person logged in.
     * @data-win-options:
     *      userId[string](required)    : id of formcontrol for the username
     */
    export class User extends HybridForms.API.UIControls.BaseControl {
        public userId: string = null;
        private static user = null;

        private getUserOnApp() {
            const user = HybridForms.API.User.get();

            if (user && user.displayName) {
                return user.displayName;
            }
            return '';
        }

        protected createControl() {
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                this.userId += HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
            }

            let ctrl = HybridForms.API.FormControls.getCtrl(this.userId); //ID vom Control, in das der Username eingetragen werden soll
            if (!ctrl.val()) {
                let user = this.getUserOnApp();

                if (user.length) {
                    ctrl.val(user);
                    HFFormdefinition.DemoFieldServiceHelpers.User.user = user;
                } else {
                    HFFormdefinition.DemoFieldServiceHelpers.User.user = null;
                }
            }
            return Promise.resolve();
        }
    }

    export class ButtonInitializr extends HybridForms.API.UIControls.BaseControl {
        private onRendered = null;

        private initButtons() {
            const callBtnEle = document.getElementById('callBtn');
            new HybridForms.API.UIControls.FormButton(callBtnEle, {
                type: 2,
                heading: 'Assistance',
                label: 'Call',
                icon: 'fa-phone',
                clickHandler: () => {
                    const url =
                        'https://login.evocall.net/api/auth/token/5a8bce12c07efa35e9a90299?redirect=/call/user/5a8bceaac07efa35e9a9030a';
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

        private openUrl(url) {
            HybridForms.API.Platform.openExternalUrl(url);
        }

        protected createControl(): Promise<void> {
            this.onRendered = () => {
                this.initButtons();
            };
            HybridForms.API.Page.addEventListener('rendered', this.onRendered);
            return Promise.resolve();
        }

        public dispose() {
            if (this.disposed) {
                return;
            }
            if (this.onRendered) {
                HybridForms.API.Page.removeEventListener('rendered', this.onRendered);
            }

            this.disposed = true;
        }
    }
}

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
//# sourceURL=FieldServiceHelpers_TS.js
