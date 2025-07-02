namespace HFFormdefinition.DemoFieldService.S2L {

    export function customQRScanButton(scanConfig, barcode, postfix) {
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

}

WinJS.Utilities.markSupportedForProcessing(HFFormdefinition.DemoFieldService.S2L.customQRScanButton);

