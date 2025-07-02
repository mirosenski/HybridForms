"use strict";
var HFFormdefinition;
(function (HFFormdefinition) {
    var DemoQAStagesHelpers;
    (function (DemoQAStagesHelpers) {
        function getSigner() {
            const thisCtrl = this;
            const name = [];
            let currentRU = '';
            let namePart;
            if (!thisCtrl.getSignerOptions) {
                return;
            }
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(thisCtrl.element)) {
                currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(thisCtrl.element);
            }
            const signerParts = thisCtrl.getSignerOptions.split(',');
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
            return name.join(' ').trim();
        }
        DemoQAStagesHelpers.getSigner = getSigner;
        function calculateDuration() {
            const that = this;
            const ctrlIds = that.calcDurationOptions.split(',');
            if (ctrlIds.length !== 3) {
                return;
            }
            if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                const currentRU = HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                ctrlIds.forEach(function (ctrlId, idx) {
                    ctrlId += currentRU;
                    ctrlIds[idx] = ctrlId;
                });
            }
            const ctrl1 = HybridForms.API.FormControls.getCtrl(ctrlIds[0]);
            const ctrl2 = HybridForms.API.FormControls.getCtrl(ctrlIds[1]);
            const start = moment(ctrl1.val());
            const end = moment(ctrl2.val());
            let duration;
            if (start && end) {
                duration = end.diff(start);
                const duration_formatted = moment.utc(duration).format('HH:mm');
                const ctrl3 = HybridForms.API.FormControls.getCtrl(ctrlIds[2]);
                ctrl3.val(duration_formatted);
            }
            else {
                HybridForms.API.Fields.setField(ctrlIds[2], '');
            }
        }
        DemoQAStagesHelpers.calculateDuration = calculateDuration;
        function getElseStateFirstPage() {
            const currStage = HybridForms.API.Stages.getFormStage();
            switch (currStage) {
                case 'S2':
                    return 'readonly';
                case 'S3':
                    return 'invisible';
                default:
                    return 'invisible';
            }
        }
        DemoQAStagesHelpers.getElseStateFirstPage = getElseStateFirstPage;
        class User extends HybridForms.API.UIControls.BaseControl {
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
                    const ctrl = HybridForms.API.FormControls.getCtrl(this.userId);
                    const user = this.getUserOnApp();
                    if (user.length) {
                        ctrl.val(user);
                    }
                };
                HybridForms.API.Page.addEventListener('rendered', this.onRendered);
            }
        }
        DemoQAStagesHelpers.User = User;
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
            createControl() {
                return Promise.resolve();
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
        DemoQAStagesHelpers.Initializr = Initializr;
    })(DemoQAStagesHelpers = HFFormdefinition.DemoQAStagesHelpers || (HFFormdefinition.DemoQAStagesHelpers = {}));
})(HFFormdefinition || (HFFormdefinition = {}));
//# sourceMappingURL=DemoQAStagesHelpers.js.map