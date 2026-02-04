/** 
 * @file huskylens2_app2.ts
 * @brief DFRobot's huskylens 2 makecode library.
 * @n [Get the module here](https://github.com/DFRobot/pxt-DFRobot_huskylens2)
 * @copyright    [DFRobot](http://www.dfrobot.com), 2026
 * @license The MIT License (MIT)
 * @author [email](rong.li@dfrobot.com)
 * @date  2026-2-2
*/

//% weight=100 color=#0fbc11 icon="\uf083" block="huskylens2"
//% groups='["communication","algorithm switch"]'
namespace huskylens2 {

    // ======================================================= license plate recognition ======================================
    function getPlatePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case BasePropertyContentId.Id: return res.ID;
            case BasePropertyContentId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyContentId.XCenter: return res.xCenter;
            case BasePropertyContentId.YCenter: return res.yCenter;
            case BasePropertyContentId.Width: return res.width;
            case BasePropertyContentId.Height: return res.height;
            case BasePropertyContentId.Content: return res.content.length > 0 ? res.content : "";
            default: return 0;
        }
    }

    /** Get one-time license plate recognition result and cache it */
    //% block="get license plate recognition result"
    //% weight=129
    //% subcategory="license plate recognition"
    export function getResultPlateRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmLicenseRecognition);
    }

    /** Whether license plate detected */
    //% block="license plate detected?"
    //% weight=128
    //% subcategory="license plate recognition"
    export function availablePlateRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmLicenseRecognition);
    }

    /** The license plate attributes close to the center */
    //% block="plate near center %alg"
    //% weight=127
    //% subcategory="license plate recognition"
    export function getCachedCenterPlateResult(alg: BasePropertyContentId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmLicenseRecognition);
        return getPlatePropertyValue(r, alg);
    }

    /** Total number of detected license plates */
    //% block="number of detected plates"
    //% weight=126
    //% subcategory="license plate recognition"
    export function getCachedResultNumPlate(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmLicenseRecognition);
    }

    /** The attributes of the Nth license plate */
    //% block="plate %index %alg"
    //% weight=125
    //% index.min=1 index.defl=1
    //% subcategory="license plate recognition"
    export function getCachedResultPlateProperty(index: number, alg: BasePropertyContentId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmLicenseRecognition, index - 1);
        return getPlatePropertyValue(r, alg);
    }

    /** Total number of learned license plate IDs */
    //% block="number of learned plate IDs"
    //% weight=124
    //% subcategory="license plate recognition"
    export function getNumLearnedPlateIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmLicenseRecognition);
    }

    /** Check if a specific ID's license plate exists */
    //% block="does plate ID %index exist?"
    //% weight=123
    //% index.min=1 index.defl=1
    //% subcategory="license plate recognition"
    export function plateIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmLicenseRecognition, index);
        return r != null;
    }

    /** The number of license plates with the specified ID */
    //% block="number of plates with ID %index"
    //% weight=122
    //% index.min=1 index.defl=1
    //% subcategory="license plate recognition"
    export function getNumPlateByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmLicenseRecognition, index);
    }

    /** The license plate attribute with the specified ID */
    //% block="plate ID %index %alg"
    //% weight=121
    //% index.min=1 index.defl=1
    //% subcategory="license plate recognition"
    export function getPlatePropertyByID(index: number, alg: BasePropertyContent): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmLicenseRecognition, index);
        return getPlatePropertyValue(r, alg);
    }

    /** The attribute of the Nth license plate with the specified ID */
    //% block="plate ID %id No.%n %alg"
    //% weight=120
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="license plate recognition"
    export function getPlatePropertyByIDNth(id: number, n: number, alg: BasePropertyContent): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmLicenseRecognition, id, n - 1);
        return getPlatePropertyValue(r, alg);
    }

    // ========================================================== optical char recognition ==============================================
    function getTextPropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;

        switch (prop) {
            case BasePropertyContentId.Id: return res.ID;
            case BasePropertyContentId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyContentId.Content: return res.content.length > 0 ? res.content : "";
            case BasePropertyContentId.XCenter: return res.xCenter;
            case BasePropertyContentId.YCenter: return res.yCenter;
            case BasePropertyContentId.Width: return res.width;
            case BasePropertyContentId.Height: return res.height;
            default: return 0;
        }
    }


    /** Obtain a text recognition result and cache it */
    //% block="get optical char recognition result"
    //% weight=119
    //% subcategory="optical char recognition"
    export function getResultTextRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmOcrRecognition);
    }

    /** Whether a text area has been detected */
    //% block="whether text region detected"
    //% weight=118
    //% subcategory="optical char recognition"
    export function availableTextRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmOcrRecognition);
    }

    /** Attributes of the text area close to the center */
    //% block="text region near center %alg"
    //% weight=117
    //% subcategory="optical char recognition"
    export function getCachedCenterTextResult(alg: BasePropertyContentId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmOcrRecognition);
        return getTextPropertyValue(r, alg);
    }

    /** Total number of learned text areas */
    //% block="number of learned text region IDs"
    //% weight=114
    //% subcategory="optical char recognition"
    export function getNumLearnedTextIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmOcrRecognition);
    }

    /** Check if the text area with the specified ID exists */
    //% block="does text region ID %index exist?"
    //% weight=113
    //% index.min=1 index.defl=1
    //% subcategory="optical char recognition"
    export function textIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmOcrRecognition, index);
        return r != null;
    }

    /** Text area attribute with specified ID */
    //% block="text region ID %index %alg"
    //% weight=111
    //% index.min=1 index.defl=1
    //% subcategory="optical char recognition"
    export function getTextPropertyByID(index: number, alg: BasePropertyContent): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmOcrRecognition, index);
        return getTextPropertyValue(r, alg);
    }

    // ============================================================= line tracking ====================================================
    // Helper function to convert unsigned 16-bit to signed 16-bit integer
    function toSigned16(val: number): number {
        // If value is greater than 32767, it's a negative number in signed 16-bit representation
        return val > 32767 ? val - 65536 : val;
    }

    function getLineTrackingPropertyValue(result: ResultVariant, prop: LineTrackingProperty): number {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case LineTrackingProperty.XComponent: return toSigned16(res.xCenter);
            case LineTrackingProperty.YComponent: return toSigned16(res.yCenter);
            case LineTrackingProperty.Angle: return toSigned16(res.angle);
            case LineTrackingProperty.Length: return res.length;
            default: return 0;
        }
    }

    // line tracking properties
    export enum LineTrackingProperty {
        //% block="x component"
        XComponent,
        //% block="y component"
        YComponent,
        //% block="angle"
        Angle,
        //% block="length"
        Length,
    }

    /** 请求一次巡线数据存入结果 */
    //% block="request line tracking data and store result"
    //% weight=109
    //% subcategory="line tracking"
    export function getResultLineTracking(): void {
        getResultInternal(Algorithm.AlgorithmLineTracking);
    }

    /** 是否检测到路线 */
    //% block="whether line detected"
    //% weight=108
    //% subcategory="line tracking"
    export function availableLineTracking(): boolean {
        return availableInternal(Algorithm.AlgorithmLineTracking);
    }

    /** 当前路线的属性 */
    //% block="current line %alg"
    //% weight=107
    //% subcategory="line tracking"
    export function getCachedLineTrackingResult(alg: LineTrackingProperty): number {
        const r = getCurrentBranchInternal(Algorithm.AlgorithmLineTracking);
        return getLineTrackingPropertyValue(r, alg);
    }

    /** 前方路口分支数量 */
    //% block="number of branches at intersection ahead"
    //% weight=106
    //% subcategory="line tracking"
    export function getLineTrackingBranchCount(): number {
        return getUpcomingBranchCountInternal(Algorithm.AlgorithmLineTracking);
    }

    /** 逆时针第index条分支路线的属性 */
    //% block="branch %index counterclockwise %alg"
    //% weight=105
    //% index.min=1 index.defl=1
    //% subcategory="line tracking"
    export function getLineTrackingBranchProperty(index: number, alg: LineTrackingProperty): number {
        const r = getBranchInternal(Algorithm.AlgorithmLineTracking, index - 1);
        return getLineTrackingPropertyValue(r, alg);
    }

    // ======================================================== face emotion recognition ==============================================
    function getEmotionPropertyValue(result: ResultVariant, prop: BasePropertyId): number {
        return getBasePropertyValue(result, prop as any);
    }

    function getEmotionPropertyValueID(result: ResultVariant, prop: BaseProperty): number {
        return getBasePropertyValue(result, prop as any);
    }

    //% block="get face emotion recognition result"
    //% weight=104
    //% subcategory="face emotion recognition"
    export function getResultEmotionRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmEmotionRecognition);
    }

    //% block="whether emotion detected"
    //% weight=103
    //% subcategory="face emotion recognition"
    export function availableEmotionRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmEmotionRecognition);
    }

    //% block="emotion near center %alg"
    //% weight=102
    //% subcategory="face emotion recognition"
    export function getCachedCenterEmotionResult(alg: BasePropertyId): number {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmEmotionRecognition);
        return getEmotionPropertyValue(r, alg);
    }

    //% block="number of detected emotions"
    //% weight=101
    //% subcategory="face emotion recognition"
    export function getCachedResultNumEmotion(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmEmotionRecognition);
    }

    //% block="emotion %index %alg"
    //% weight=100
    //% index.min=1 index.defl=1
    //% subcategory="face emotion recognition"
    export function getCachedResultEmotionProperty(index: number, alg: BasePropertyId): number {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmEmotionRecognition, index - 1);
        return getEmotionPropertyValue(r, alg);
    }

    //% block="number of learned emotion IDs"
    //% weight=99
    //% subcategory="face emotion recognition"
    export function getNumLearnedEmotionIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmEmotionRecognition);
    }

    //% block="does emotion ID %index exist?"
    //% weight=98
    //% index.min=1 index.defl=1
    //% subcategory="face emotion recognition"
    export function emotionIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmEmotionRecognition, index);
        return r != null;
    }

    //% block="number of emotions with ID %index"
    //% weight=97
    //% index.min=1 index.defl=1
    //% subcategory="face emotion recognition"
    export function getNumEmotionByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmEmotionRecognition, index);
    }

    //% block="emotion ID %index %alg"
    //% weight=96
    //% index.min=1 index.defl=1
    //% subcategory="face emotion recognition"
    export function getEmotionPropertyByID(index: number, alg: BaseProperty): number {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmEmotionRecognition, index);
        return getEmotionPropertyValueID(r, alg);
    }

    //% block="emotion ID %id No.%n %alg"
    //% weight=95
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="face emotion recognition"
    export function getEmotionPropertyByIDNth(id: number, n: number, alg: BaseProperty): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmEmotionRecognition, id, n - 1);
        return getEmotionPropertyValueID(r, alg);
    }

    // =========================================================== tag recognition ====================================================

    function getTagPropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case BasePropertyContentId.Id: return res.ID;
            case BasePropertyContentId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyContentId.Content: return res.content.length > 0 ? res.content : "";
            case BasePropertyContentId.XCenter: return res.xCenter;
            case BasePropertyContentId.YCenter: return res.yCenter;
            case BasePropertyContentId.Width: return res.width;
            case BasePropertyContentId.Height: return res.height;
            default: return 0;
        }
    }

    //% block="get tag recognition result"
    //% weight=94
    //% subcategory="tag recognition"
    export function getResultTagRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmTagRecognition);
    }

    //% block="whether tag detected"
    //% weight=93
    //% subcategory="tag recognition"
    export function availableTagRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmTagRecognition);
    }

    //% block="tag near center %alg"
    //% weight=92
    //% subcategory="tag recognition"
    export function getCachedCenterTagResult(alg: BasePropertyContentId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmTagRecognition);
        return getTagPropertyValue(r, alg);
    }

    //% block="number of detected tags"
    //% weight=91
    //% subcategory="tag recognition"
    export function getCachedResultNumTag(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmTagRecognition);
    }

    //% block="tag %index %alg"
    //% weight=90
    //% index.min=1 index.defl=1
    //% subcategory="tag recognition"
    export function getCachedResultTagProperty(index: number, alg: BasePropertyContentId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmTagRecognition, index - 1);
        return getTagPropertyValue(r, alg);
    }

    //% block="number of learned tag IDs"
    //% weight=89
    //% subcategory="tag recognition"
    export function getNumLearnedTagIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmTagRecognition);
    }

    //% block="does tag ID %index exist?"
    //% weight=88
    //% index.min=1 index.defl=1
    //% subcategory="tag recognition"
    export function tagIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmTagRecognition, index);
        return r != null;
    }

    //% block="number of tags with ID %index"
    //% weight=87
    //% index.min=1 index.defl=1
    //% subcategory="tag recognition"
    export function getNumTagByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmTagRecognition, index);
    }

    //% block="tag ID %index %alg"
    //% weight=86
    //% index.min=1 index.defl=1
    //% subcategory="tag recognition"
    export function getTagPropertyByID(index: number, alg: BasePropertyContent): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmTagRecognition, index);
        return getTagPropertyValue(r, alg);
    }

    //% block="tag ID %id No.%n %alg"
    //% weight=85
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="tag recognition"
    export function getTagPropertyByIDNth(id: number, n: number, alg: BasePropertyContent): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmTagRecognition, id, n - 1);
        return getTagPropertyValue(r, alg);
    }

    // =================================================================== QR code recognition =====================================
    function getQRCodePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case BasePropertyContentId.Id: return res.ID;
            case BasePropertyContentId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyContentId.Content: return res.content.length > 0 ? res.content : "";
            case BasePropertyContentId.XCenter: return res.xCenter;
            case BasePropertyContentId.YCenter: return res.yCenter;
            case BasePropertyContentId.Width: return res.width;
            case BasePropertyContentId.Height: return res.height;
            default: return 0;
        }
    }


    //% block="get QR code recognition result"
    //% weight=84
    //% subcategory="QR code recognition"
    export function getResultQRCodeRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmQrCodeRecognition);
    }

    //% block="whether QR code detected"
    //% weight=83
    //% subcategory="QR code recognition"
    export function availableQRCodeRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmQrCodeRecognition);
    }

    //% block="QR code near center %alg"
    //% weight=82
    //% subcategory="QR code recognition"
    export function getCachedCenterQRCodeResult(alg: BasePropertyContentId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmQrCodeRecognition);
        return getQRCodePropertyValue(r, alg);
    }

    //% block="number of detected QR codes"
    //% weight=81
    //% subcategory="QR code recognition"
    export function getCachedResultNumQRCode(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmQrCodeRecognition);
    }

    //% block="QR code %index %alg"
    //% weight=80
    //% index.min=1 index.defl=1
    //% subcategory="QR code recognition"
    export function getCachedResultQRCodeProperty(index: number, alg: BasePropertyContentId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmQrCodeRecognition, index - 1);
        return getQRCodePropertyValue(r, alg);
    }

    //% block="number of learned QR code IDs"
    //% weight=79
    //% subcategory="QR code recognition"
    export function getNumLearnedQRCodeIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmQrCodeRecognition);
    }

    //% block="does QR code ID %index exist?"
    //% weight=78
    //% index.min=1 index.defl=1
    //% subcategory="QR code recognition"
    export function qrcodeIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmQrCodeRecognition, index);
        return r != null;
    }

    //% block="number of QR codes with ID %index"
    //% weight=77
    //% index.min=1 index.defl=1
    //% subcategory="QR code recognition"
    export function getNumQRCodeByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmQrCodeRecognition, index);
    }

    //% block="QR code ID %index %alg"
    //% weight=76
    //% index.min=1 index.defl=1
    //% subcategory="QR code recognition"
    export function getQRCodePropertyByID(index: number, alg: BasePropertyContent): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmQrCodeRecognition, index);
        return getQRCodePropertyValue(r, alg);
    }

    //% block="QR code ID %id No.%n %alg"
    //% weight=75
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="QR code recognition"
    export function getQRCodePropertyByIDNth(id: number, n: number, alg: BasePropertyContent): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmQrCodeRecognition, id, n - 1);
        return getQRCodePropertyValue(r, alg);
    }

    // ===================================================== barcode recognition" ==============================================



    function getBarcodePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case BasePropertyContentId.Id: return res.ID;
            case BasePropertyContentId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyContentId.Content: return res.content.length > 0 ? res.content : "";
            case BasePropertyContentId.XCenter: return res.xCenter;
            case BasePropertyContentId.YCenter: return res.yCenter;
            case BasePropertyContentId.Width: return res.width;
            case BasePropertyContentId.Height: return res.height;
            default: return 0;
        }
    }


    //% block="get barcode recognition result"
    //% weight=74
    //% subcategory="barcode recognition"
    export function getResultBarcodeRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmBarcodeRecognition);
    }

    //% block="whether barcode detected"
    //% weight=73
    //% subcategory="barcode recognition"
    export function availableBarcodeRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmBarcodeRecognition);
    }

    //% block="barcode near center %alg"
    //% weight=72
    //% subcategory="barcode recognition"
    export function getCachedCenterBarcodeResult(alg: BasePropertyContentId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmBarcodeRecognition);
        return getBarcodePropertyValue(r, alg);
    }

    //% block="number of detected barcodes"
    //% weight=71
    //% subcategory="barcode recognition"
    export function getCachedResultNumBarcode(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmBarcodeRecognition);
    }

    //% block="barcode %index %alg"
    //% weight=70
    //% index.min=1 index.defl=1
    //% subcategory="barcode recognition"
    export function getCachedResultBarcodeProperty(index: number, alg: BasePropertyContentId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmBarcodeRecognition, index - 1);
        return getBarcodePropertyValue(r, alg);
    }

    //% block="number of learned barcode IDs"
    //% weight=69
    //% subcategory="barcode recognition"
    export function getNumLearnedBarcodeIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmBarcodeRecognition);
    }

    //% block="does barcode ID %index exist?"
    //% weight=68
    //% index.min=1 index.defl=1
    //% subcategory="barcode recognition"
    export function barcodeIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmBarcodeRecognition, index);
        return r != null;
    }

    //% block="number of barcodes with ID %index"
    //% weight=67
    //% index.min=1 index.defl=1
    //% subcategory="barcode recognition"
    export function getNumBarcodeByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmBarcodeRecognition, index);
    }

    //% block="barcode ID %index %alg"
    //% weight=66
    //% index.min=1 index.defl=1
    //% subcategory="barcode recognition"
    export function getBarcodePropertyByID(index: number, alg: BasePropertyContent): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmBarcodeRecognition, index);
        return getBarcodePropertyValue(r, alg);
    }

    //% block="barcode ID %id No.%n %alg"
    //% weight=65
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="barcode recognition"
    export function getBarcodePropertyByIDNth(id: number, n: number, alg: BasePropertyContent): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmBarcodeRecognition, id, n - 1);
        return getBarcodePropertyValue(r, alg);
    }

    // ================= Custom Model =================

    function getCustomModelPropertyValue(result: ResultVariant, prop: BaseProperty): number {
        return getBasePropertyValue(result, prop as any);
    }

    function getCustomModelPropertyValueID(result: ResultVariant, prop: BasePropertyId): number {
        return getBasePropertyValue(result, prop as any);
    }



    /** HUSKYLENS 2 switching algorithm ID until successful */
    //% blockHidden=true
    //% block="HUSKYLENS 2 switch algorithm ID %algorithmId until success"
    //% weight=64
    //% algorithmId.min=1 algorithmId.defl=128
    //% subcategory="custom model"
    export function switchCustomModelAlgorithm(algorithmId: number): void {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        switchAlgorithmInternal(algoId);
    }

    /** Request for algorithm ID to store data once */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId request data and store result"
    //% weight=63
    //% algorithmId.min=1 algorithmId.defl=128
    //% subcategory="custom model"
    export function getResultCustomModel(algorithmId: number): void {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        getResultInternal(algoId);
    }

    /** Algorithm ID detects the target */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId target detected?"
    //% weight=62
    //% algorithmId.min=1 algorithmId.defl=128
    //% subcategory="custom model"
    export function availableCustomModel(algorithmId: number): boolean {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        return availableInternal(algoId);
    }

    /** Target attribute with algorithm ID close to the center */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId target near center %alg1"
    //% weight=61
    //% algorithmId.min=1 algorithmId.defl=128
    //% subcategory="custom model"
    export function getCachedCenterCustomModelResult(algorithmId: number, alg1: BasePropertyId): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        const r = getCachedCenterResultInternal(algoId);
        return getCustomModelPropertyValueID(r, alg1);
    }

    /** The total number of targets detected by the algorithm ID */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId number of detected targets"
    //% weight=60
    //% algorithmId.min=1 algorithmId.defl=128
    //% subcategory="custom model"
    export function getCachedResultNumCustomModel(algorithmId: number): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        return getCachedResultNumInternal(algoId);
    }

    /** The attribute of the num-th target of the algorithm ID */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId target %num %alg1"
    //% weight=59
    //% algorithmId.min=1 algorithmId.defl=128
    //% num.min=1 num.defl=1
    //% subcategory="custom model"
    export function getCachedResultCustomModelProperty(algorithmId: number, num: number, alg1: BasePropertyId): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        const r = getCachedResultByIndexInternal(algoId, num - 1);
        return getCustomModelPropertyValueID(r, alg1);
    }

    /** The total number of target IDs that the algorithm has learned */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId number of learned target IDs"
    //% weight=58
    //% algorithmId.min=1 algorithmId.defl=128
    //% subcategory="custom model"
    export function getNumLearnedCustomModelIDs(algorithmId: number): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        return getCachedResultLearnedNumInternal(algoId);
    }

    /** The objective of Algorithm ID exists. */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId target ID %targetId exists?"
    //% weight=57
    //% algorithmId.min=1 algorithmId.defl=128
    //% targetId.min=1 targetId.defl=1
    //% subcategory="custom model"
    export function customModelIdExists(algorithmId: number, targetId: number): boolean {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        const r = getCachedResultByIDInternal(algoId, targetId);
        return r != null;
    }

    /** The total target number of Algorithm ID ID */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId number of targets with ID %targetId"
    //% weight=56
    //% algorithmId.min=1 algorithmId.defl=128
    //% targetId.min=1 targetId.defl=1
    //% subcategory="custom model"
    export function getNumCustomModelByID(algorithmId: number, targetId: number): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        return getCachedResultNumByIDInternal(algoId, targetId);
    }

    /** The target attribute of Algorithm ID ID */
    //% blockHidden=true
    //% block="algorithm ID %algorithmId target ID %targetId %alg2"
    //% weight=55
    //% algorithmId.min=1 algorithmId.defl=128
    //% targetId.min=1 targetId.defl=1
    //% subcategory="custom model"
    export function getCustomModelPropertyByID(algorithmId: number, targetId: number, alg2: BaseProperty): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        const r = getCachedResultByIDInternal(algoId, targetId);
        return getCustomModelPropertyValue(r, alg2);
    }

    /** The attribute of the num-th target of algorithm ID ID */
    //% blockHidden=true
    //% block="algorithm %algorithmId ID%targetId No.%num %alg2"
    //% inlineInputMode=inline
    //% weight=54
    //% algorithmId.min=1 algorithmId.defl=128
    //% targetId.min=1 targetId.defl=1
    //% num.min=1 num.defl=1
    //% subcategory="custom model"
    export function getCustomModelPropertyByIDNth(algorithmId: number, targetId: number, num: number, alg2: BaseProperty): number {
        const algoId = Algorithm.AlgorithmCustomBegin + (algorithmId - 1);
        const r = getCachedIndexResultByIDInternal(algoId, targetId, num - 1);
        return getCustomModelPropertyValue(r, alg2);
    }
}