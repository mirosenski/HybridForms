"use strict";
var HFFormdefinition;
(function (HFFormdefinition) {
    var DemoFieldService;
    (function (DemoFieldService) {
        var S2L;
        (function (S2L) {
            function customQRScanButton(scanConfig, barcode, postfix) {
                const ctrl = scanConfig.comboBoxId;
                const currentRu = postfix;
                let formattedBarcode = '';
                if (barcode) {
                    formattedBarcode = barcode.replace(/\s/g, '');
                }
                if (!barcode || !formattedBarcode.match(/^#[0-9]{3,32}$/)) {
                    HybridForms.API.Messages.error('This QR code can not be processed.', 'Error');
                    return;
                }
                const comboCtrl = HybridForms.API.FormControls.getCtrl(ctrl + currentRu);
                comboCtrl.val(formattedBarcode);
            }
            S2L.customQRScanButton = customQRScanButton;
        })(S2L = DemoFieldService.S2L || (DemoFieldService.S2L = {}));
    })(DemoFieldService = HFFormdefinition.DemoFieldService || (HFFormdefinition.DemoFieldService = {}));
})(HFFormdefinition || (HFFormdefinition = {}));
WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldService.S2L.customQRScanButton);
//# sourceMappingURL=s2l.js.map