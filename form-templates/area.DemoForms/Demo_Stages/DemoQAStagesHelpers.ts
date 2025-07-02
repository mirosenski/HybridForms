namespace HFFormdefinition.DemoQAStagesHelpers {
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

    /*
     * calculateDuration
     * Type: onChanged Method
     * Description:
     *      Gets the values of the two defined TimePicker fields, calculates the duration and places the result within a third field (mostly a disabled one).
     * @data-win-options:
     *      calcDurationOptions[string](required) : comma-seperated list of formcontrol-ids;
     *                                              first id is start, second is end time, third id is target field for calculated duration
     */
    export function calculateDuration() {
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
        } else {
            HybridForms.API.Fields.setField(ctrlIds[2], '');
        }
    }

    export function getElseStateFirstPage() {
        const currStage = HybridForms.API.Stages.getFormStage();
        // return 'readonly';
        switch (currStage) {
            case 'S2':
                return 'readonly';
            case 'S3':
                return 'invisible';
            default:
                return 'invisible';
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
        private onRendered: () => void;
        public userId: string;

        private getUserOnApp() {
            const user = HybridForms.API.User.get();

            if (user && user.displayName) {
                return user.displayName;
            }
            return '';
        }

        protected createControl() {
            return Promise.resolve();
        }

        protected registerEvents() {
            this.onRendered = () => {
                if (HybridForms.API.RepeatingUnits.isRepeatingUnit(this.element)) {
                    this.userId += HybridForms.API.RepeatingUnits.getPostfixFieldId(this.element);
                }

                const ctrl = HybridForms.API.FormControls.getCtrl(this.userId); //ID vom Control, in das der Username eingetragen werden soll
                const user = this.getUserOnApp();

                if (user.length) {
                    ctrl.val(user);
                }
            };
            HybridForms.API.Page.addEventListener('rendered', this.onRendered);
        }
    }

    export class Initializr extends HybridForms.API.UIControls.BaseControl {
        private onRendered: () => void;
        public callback: () => void;

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

        protected createControl() {
            return Promise.resolve();
        }

        public dispose() {
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
}
