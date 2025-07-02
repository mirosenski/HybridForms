/// <reference path="./hybridforms.d.ts" />

import * as HF from 'index';

declare global {
    namespace HybridForms {
        export import API = HF.HybridForms.API;
    }

    const HFAPI: typeof HF.HFAPI;
}
