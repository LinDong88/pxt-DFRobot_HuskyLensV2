/** 
 * @file huskylens2_app1.ts
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
    // ================= Block =================
    /**
     *  Init I2C until success
     */
    //% weight=200
    //%block="initialize via I2C until success"
    //% group="communication"
    export function I2CInit(): void {
        let res = beginInternal();
        while (!res) {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `, 10)
            basic.pause(500);
            res = beginInternal();
            basic.clearScreen()
        }
        basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `, 10)
        basic.pause(500);
        basic.clearScreen()
    }

    /**
     * Switch algorithm
     * @param alg select algorithm
     */
    //% block="switch algorithm %alg"
    //% weight=199
    //% group="algorithm switch"
    export function switchAlgorithm(alg: Algorithm): void {
        let s = switchAlgorithmInternal(algorithmToID(alg));
        while (!s) { 
            basic.pause(1000);
            s = switchAlgorithmInternal(algorithmToID(alg));
        }
        basic.pause(5000);// Wait 5 seconds for model loading
    }

    // ========================================================== face recognition ==================================================
    /**
     * Request one-time face recognition result and store it
     */
    //% block="get face recognition result"
    //% weight=198
    //% subcategory="face recognition"
    export function getResultFaceRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmFaceRecognition);
    }

    /**
     * Whether face recognized
     * Return true if a face is detected
     */
    //% block="available face recogtion"
    //% weight=197
    //% subcategory="face recognition"
    export function availableFaceRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmFaceRecognition);
    }

    /**
     * Get cached result of the face nearest to the center
     * @param alg face property to query
     */
    //% block="face nearest to center %alg"
    //% weight=196
    //% subcategory="face recognition"
    export function getCachedCenterResult(alg: BasePropertyId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmFaceRecognition);
        return getBasePropertyValue(r, alg);
    }

    /**
     * Get number of detected faces from cache
     */
    //% block="number of detected faces"
    //% weight=195
    //% subcategory="face recognition"
    export function getCachedResultNumFace(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmFaceRecognition);
    }

    /**
     * Get a specific face's property by index from cache
     * @param index face index (1-based)
     * @param alg face property to query
     */
    //% block="face %index %alg"
    //% weight=194
    //% index.min=1 index.defl=1
    //% subcategory="face recognition"
    export function getCachedResultFaceProperty(index: number, alg: BasePropertyId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmFaceRecognition, index - 1);
        return getBasePropertyValue(r, alg);
    }

    /**
     * Get number of learned face IDs
     */
    //% block="number of learned face IDs"
    //% weight=193
    //% subcategory="face recognition"
    export function getNumLearnedFaceIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmFaceRecognition);
    }

    /**
     * Whether face with given ID exists
     * @param index face ID index (number)
     */
    //% block="face ID %index exists?"
    //% weight=192
    //% index.min=1 index.defl=1
    //% subcategory="face recognition"
    export function faceIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmFaceRecognition, index);
        return r != null;
    }

    /**
     * Get number of faces with a given ID
     * @param index face ID index (number)
     */
    //% block="number of faces with ID %index"
    //% weight=191
    //% index.min=1 index.defl=1
    //% subcategory="face recognition"
    export function getNumFaceByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmFaceRecognition, index);
    }

    /**
     * Get a property for faces with a given ID
     * @param index face ID index (number)
     * @param alg face property (without ID)
     */
    //% block="face ID %index %alg"
    //% weight=190
    //% index.min=1 index.defl=1
    //% subcategory="face recognition"
    export function getFacePropertyByID(index: number, alg: BaseProperty): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmFaceRecognition, index);
        return getBasePropertyValue(r, alg);
    }

    /**
     * Get a property for the Nth face of a given ID
     * @param id face ID (number)
     * @param n Nth face (1-based)
     * @param alg face property (without ID)
     */
    //% block="face ID %id nth %n %alg"
    //% weight=189
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="face recognition"
    export function getFacePropertyByIDNth(id: number, n: number, alg: BaseProperty): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmFaceRecognition, id, n - 1);
        return getBasePropertyValue(r, alg);
    }

    
    // ==================== Algorithm selection enum ====================
    export enum AlgorithmLearnSetNameOfId {
        //% blockHidden=true
        AlgorithmAny = 0,                      // 0
        //% block="face recognition"
        AlgorithmFaceRecognition = 1,         // 1
        //% block="object tracking"
        AlgorithmObjectTracking = 3,          // 3
        //% block="color recognition"
        AlgorithmColorRecognition = 4,        // 4
        //% block="self learning classification"
        AlgorithmSelfLearningClassification = 6, // 6
        //% block="hand recognition"
        AlgorithmHandRecognition = 8,        // 8
        //% block="pose recognition"
        AlgorithmPoseRecognition = 9,        // 9
        //% block="license plate recognition"
        AlgorithmLicenseRecognition = 10,      // 10
        //% block="OCR recognition"
        AlgorithmOcrRecognition = 11,          // 11
        //% block="gaze recognition"
        AlgorithmGazeRecognition = 14,            // 14
        //% block="face Orientation"
        AlgorithmFaceOrientation = 15,             // 15
         //% block="tag recognition"
        AlgorithmTagRecognition = 16,              // 16
        //% block="barcode recognition"
        AlgorithmBarcodeRecognition = 17,        // 17
        //% block="QR code recognition"
        AlgorithmQrCodeRecognition = 18,       // 18
    }

        export enum AlgorithmLearnObjectAtCenter {
        //% blockHidden=true
        AlgorithmAny = 0,                      // 0
        //% block="face recognition"
        AlgorithmFaceRecognition = 1,         // 1
        //% block="object recognition"
        AlgorithmObjectRecognition = 2,       // 2
        //% block="color recognition"
        AlgorithmColorRecognition = 4,        // 4
        //% block="object classification"
        AlgorithmObjectClassification = 5,   // 5
        //% block="self learning classification"
        AlgorithmSelfLearningClassification = 6, // 6
        //% block="instance segmentation"
        AlgorithmSegment = 7,                 // 7
        //% block="hand recognition"
        AlgorithmHandRecognition = 8,        // 8
        //% block="pose recognition"
        AlgorithmPoseRecognition = 9,        // 9
        //% block="license plate recognition"
        AlgorithmLicenseRecognition = 10,      // 10
        //% block="OCR recognition"
        AlgorithmOcrRecognition = 11,          // 11

        //% block="gaze recognition"
        AlgorithmGazeRecognition = 14,            // 14
        //% block="face Orientation"
        AlgorithmFaceOrientation = 15,             // 15
         //% block="tag recognition"
        AlgorithmTagRecognition = 16,              // 16
        //% block="barcode recognition"
        AlgorithmBarcodeRecognition = 17,        // 17
        //% block="QR code recognition"
        AlgorithmQrCodeRecognition = 18,       // 18
    }

     export enum AlgorithmLearnObjectInBox {
        //% blockHidden=true
        AlgorithmAny = 0,                      // 0
        //% block="face recognition"
        AlgorithmFaceRecognition = 1,         // 1
        //% block="object recognition"
        AlgorithmObjectRecognition = 2,       // 2
        //% block="object tracking"
        AlgorithmObjectTracking = 3,          // 3
        //% block="color recognition"
        AlgorithmColorRecognition = 4,        // 4
        //% block="instance segmentation"
        AlgorithmSegment = 7,                 // 7
        //% block="hand recognition"
        AlgorithmHandRecognition = 8,        // 8
        //% block="pose recognition"
        AlgorithmPoseRecognition = 9,        // 9
        //% block="license plate recognition"
        AlgorithmLicenseRecognition = 10,      // 10
        //% block="OCR recognition"
        AlgorithmOcrRecognition = 11,          // 11


        //% block="gaze recognition"
        AlgorithmGazeRecognition = 14,            // 14
        //% block="face Orientation"
        AlgorithmFaceOrientation = 15,             // 15
         //% block="tag recognition"
        AlgorithmTagRecognition = 16,              // 16
        //% block="barcode recognition"
        AlgorithmBarcodeRecognition = 17,        // 17
        //% block="QR code recognition"
        AlgorithmQrCodeRecognition = 18,       // 18
    }

        export enum Algorithm {
        //% blockHidden=true
        AlgorithmAny = 0,                      // 0
        //% block="face recognition"
        AlgorithmFaceRecognition = 1,         // 1
        //% block="object recognition"
        AlgorithmObjectRecognition = 2,       // 2
        //% block="object tracking"
        AlgorithmObjectTracking = 3,          // 3
        //% block="color recognition"
        AlgorithmColorRecognition = 4,        // 4
        //% block="object classification"
        AlgorithmObjectClassification = 5,   // 5
        //% block="self learning classification"
        AlgorithmSelfLearningClassification = 6, // 6
        //% block="instance segmentation"
        AlgorithmSegment = 7,                 // 7
        //% block="hand recognition"
        AlgorithmHandRecognition = 8,        // 8
        //% block="pose recognition"
        AlgorithmPoseRecognition = 9,        // 9
        //% block="license plate recognition"
        AlgorithmLicenseRecognition = 10,      // 10
        //% block="OCR recognition"
        AlgorithmOcrRecognition = 11,          // 11
        //% block="line tracking"
        AlgorithmLineTracking = 12,            // 12
        //% block="face emotion recognition"
        AlgorithmEmotionRecognition = 13,     // 13

        //% block="gaze recognition"
        AlgorithmGazeRecognition = 14,            // 14
        //% block="face Orientation"
        AlgorithmFaceOrientation = 15,             // 15
        //% block="tag recognition"
        AlgorithmTagRecognition = 16,              // 16
        //% block="barcode recognition"
        AlgorithmBarcodeRecognition = 17,        // 17
        //% block="QR code recognition"
        AlgorithmQrCodeRecognition = 18,       // 18
        //% block="fall detection property"
        AlgorithmFallDownRecognition = 19,        // 19

        //% blockHidden=true
        AlgorithmCustom0 = 20,                 // 20
        //% blockHidden=true
        AlgorithmCustom1 = 21,                 // 21
        //% blockHidden=true
        AlgorithmCustom2 = 22,                 // 22
        //% blockHidden=true
        AlgorithmBuiltinCount = 23,           // 23
        //% blockHidden=true
        AlgorithmCustomBegin = 128,           // 128
    }

    export enum BaseProperty {
        //% block="name"
        Name=1,
        //% block="x center"
        XCenter,
        //% block="y center"
        YCenter,
        //% block="width"
        Width,
        //% block="height"
        Height
    }
    export enum BasePropertyId {
        //% block="ID"
        Id,
        //% block="name"
        Name,
        //% block="x center"
        XCenter,
        //% block="y center"
        YCenter,
        //% block="width"
        Width,
        //% block="height"
        Height
    }

    export enum BasePropertyContent {
        //% block="name"
        Name=1,
        //% block="x Center"
        XCenter,
        //% block="y Center"
        YCenter,
        //% block="width"
        Width,
        //% block="height"
        Height,
        //% block="content"
        Content
    }

    export enum BasePropertyContentId {
        //% block="ID"
        Id,
        //% block="name"
        Name,
        //% block="x center"
        XCenter,
        //% block="y center"
        YCenter,
        //% block="width"
        Width,
        //% block="height"
        Height,
        //% block="content"
        Content
    }

    // Helper export function: Convert Algorithm enum to algorithm ID
    export function algorithmToID(alg: Algorithm): number {
        return alg as number;
    }

    export function getBasePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case BasePropertyId.Id: return res.ID;
            case BasePropertyId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyId.XCenter: return res.xCenter;
            case BasePropertyId.YCenter: return res.yCenter;
            case BasePropertyId.Width: return res.width;
            case BasePropertyId.Height: return res.height;
            default: return 0;
        }
    }


    // ====================================================== object recognition ===============================================

    /** Get one-time object recognition result and cache it */
    //% block="get object recognition result"
    //% weight=188
    //% subcategory="object recognition"
    export function getResultObjectRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmObjectRecognition);
    }

    /** Whether object detected */
    //% block="object detected?"
    //% weight=187
    //% subcategory="object recognition"
    export function availableObjectRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmObjectRecognition);
    }

    /** Object property nearest to center */
    //% block="object nearest to center %alg"
    //% weight=186
    //% subcategory="object recognition"
    export function getCachedCenterObjectResult(alg: BasePropertyId): number {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmObjectRecognition);
        return getBasePropertyValue(r, alg);
    }

    /** Total number of detected objects */
    //% block="number of detected objects"
    //% weight=185
    //% subcategory="object recognition"
    export function getCachedResultNumObject(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmObjectRecognition);
    }

    /** Property of Nth object */
    //% block="object %index %alg"
    //% weight=184
    //% index.min=1 index.defl=1
    //% subcategory="object recognition"
    export function getCachedResultObjectProperty(index: number, alg: BasePropertyId): number {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmObjectRecognition, index - 1);
        return getBasePropertyValue(r, alg);
    }

    /** Total number of learned object IDs */
    //% block="number of learned object IDs"
    //% weight=183
    //% subcategory="object recognition"
    export function getNumLearnedObjectIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmObjectRecognition);
    }

    /** Whether object with specified ID exists */
    //% block="object ID %index exists?"
    //% weight=182
    //% index.min=1 index.defl=1
    //% subcategory="object recognition"
    export function objectIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmObjectRecognition, index);
        return r != null;
    }

    /** Number of objects with specified ID */
    //% block="number of objects with ID %index"
    //% weight=181
    //% index.min=1 index.defl=1
    //% subcategory="object recognition"
    export function getNumObjectByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmObjectRecognition, index);
    }

    /** Property of object with specified ID */
    //% block="object ID %index %alg"
    //% weight=180
    //% index.min=1 index.defl=1
    //% subcategory="object recognition"
    export function getObjectPropertyByID(index: number, alg: BaseProperty): number {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmObjectRecognition, index);
        return getBasePropertyValue(r, alg);
    }

    /** Property of Nth object with specified ID */
    //% block="object ID %id nth %n %alg"
    //% weight=179
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="object recognition"
    export function getObjectPropertyByIDNth(id: number, n: number, alg: BaseProperty): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmObjectRecognition, id, n - 1);
        return getBasePropertyValue(r, alg);
    }

    // =============================================================== object tracking ========================================
    /** Request one-time object tracking data and store in result */
    //% block="get object tracking result"
    //% weight=178
    //% subcategory="object tracking"
    export function getResultObjectTracking(): void {
        getResultInternal(Algorithm.AlgorithmObjectTracking);
    }

    /** Whether tracked object detected */
    //% block="tracked object detected?"
    //% weight=177
    //% subcategory="object tracking"
    export function availableObjectTracking(): boolean {
        return availableInternal(Algorithm.AlgorithmObjectTracking);
    }

    /** Property of tracked object */
    //% block="tracked object %alg"
    //% weight=176
    //% subcategory="object tracking"
    export function getCachedObjectTrackingResult(alg: BasePropertyId): number {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmObjectTracking);
        return getBasePropertyValue(r, alg);
    }

    // ================= color recognition =================
    export function getColorPropertyValue(result: ResultVariant, prop: number): number {
        return getBasePropertyValue(result, prop as any);
    }

    /** Get one-time color recognition result and cache it */
    //% block="get color recognition result"
    //% weight=175
    //% subcategory="color recognition"
    export function getResultColorRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmColorRecognition);
    }

    /** Whether color block detected */
    //% block="color block detected?"
    //% weight=174
    //% subcategory="color recognition"
    export function availableColorRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmColorRecognition);
    }

    /** Color block property nearest to center */
    //% block="color block nearest to center %alg"
    //% weight=173
    //% subcategory="color recognition"
    export function getCachedCenterColorResult(alg: BasePropertyId): number {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmColorRecognition);
        return getColorPropertyValue(r, alg);
    }

    /** Total number of detected color blocks */
    //% block="number of detected color blocks"
    //% weight=172
    //% subcategory="color recognition"
    export function getCachedResultNumColor(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmColorRecognition);
    }

    /** Property of Nth color block */
    //% block="color block %index %alg"
    //% weight=171
    //% index.min=1 index.defl=1
    //% subcategory="color recognition"
    export function getCachedResultColorProperty(index: number, alg: BasePropertyId): number {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmColorRecognition, index - 1);
        return getColorPropertyValue(r, alg);
    }

    /** Total number of learned color block IDs */
    //% block="number of learned color block IDs"
    //% weight=170
    //% subcategory="color recognition"
    export function getNumLearnedColorIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmColorRecognition);
    }

    /** Whether color block with specified ID exists */
    //% block="color block ID %index exists?"
    //% weight=169
    //% index.min=1 index.defl=1
    //% subcategory="color recognition"
    export function colorIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmColorRecognition, index);
        return r != null;
    }

    /** Number of color blocks with specified ID */
    //% block="number of color blocks with ID %index"
    //% weight=168
    //% index.min=1 index.defl=1
    //% subcategory="color recognition"
    export function getNumColorByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmColorRecognition, index);
    }

    /** Property of color block with specified ID */
    //% block="color block ID %index %alg"
    //% weight=167
    //% index.min=1 index.defl=1
    //% subcategory="color recognition"
    export function getColorPropertyByID(index: number, alg: BaseProperty): number {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmColorRecognition, index);
        return getColorPropertyValue(r, alg);
    }

    /** Property of Nth color block with specified ID */
    //% block="color block ID %id nth %n %alg"
    //% weight=166
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="color recognition"
    export function getColorPropertyByIDNth(id: number, n: number, alg: BaseProperty): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmColorRecognition, id, n - 1);
        return getColorPropertyValue(r, alg);
    }


    // ============================================== object classification============================================================
    // object classification properties (only ID and Name)
    export enum ObjectClassificationProperty {
        //% block="ID"
        Id,
        //% block="Name"
        Name,
    }

    function getObjectClassificationPropertyValue(result: ResultVariant, prop: ObjectClassificationProperty): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case ObjectClassificationProperty.Id: return res.classID;
            case ObjectClassificationProperty.Name: return res.name.length > 0 ? res.name : "";
            default: return 0;
        }
    }

    /** Request one-time object classification data and store in result */
    //% block="get object classification result"
    //% weight=4
    //% subcategory="object classification"
    export function getResultObjectClassification(): void {
        getResultInternal(Algorithm.AlgorithmObjectClassification);
    }
    /** Whether classified object detected */
    //% block="classified object detected?"
    //% weight=3
    //% subcategory="object classification"
    export function availableObjectClassification(): boolean {
        return availableInternal(Algorithm.AlgorithmObjectClassification);
    }

    /** Total number of detected classified objects */
    //% block="number of detected classified objects"
    //% weight=2
    //% subcategory="object classification"
    export function getCachedResultNumObjectClassification(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmObjectClassification);
    }

    /** Property of Nth classified object */
    //% block="classified object %num %alg"
    //% weight=1
    //% num.min=1 num.defl=1
    //% subcategory="object classification"
    export function getCachedObjectClassificationResult(num: number, alg: ObjectClassificationProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmObjectClassification, num - 1);
        return getObjectClassificationPropertyValue(r, alg);
    }



    // ==================================================== self learning classification ========================================
    // self learning classification properties (only ID and Name)
    export enum SelfLearningClassificationProperty {
        //% block="ID"
        Id,
        //% block="Name"
        Name,
    }

    export function getSelfLearningClassificationPropertyValue(result: ResultVariant, prop: SelfLearningClassificationProperty): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case SelfLearningClassificationProperty.Id: return res.ID;
            case SelfLearningClassificationProperty.Name: return res.name.length > 0 ? res.name : "";
            default: return 0;
        }
    }

    /** Request one-time self learning classification data and store in result */
    //% block="get self learning classification result"
    //% weight=162
    //% subcategory="self learning classification"
    export function getResultSelfLearningClassification(): void {
        getResultInternal(Algorithm.AlgorithmSelfLearningClassification);
    }

    /** Whether self learning classification detected */
    //% block="self learning classification detected?"
    //% weight=161
    //% subcategory="self learning classification"
    export function availableSelfLearningClassification(): boolean {
        return availableInternal(Algorithm.AlgorithmSelfLearningClassification);
    }

    /** Property of self learning classification */
    //% block="self learning classification %alg"
    //% weight=160
    //% subcategory="self learning classification"
    export function getCachedSelfLearningClassificationResult(alg: SelfLearningClassificationProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmSelfLearningClassification);
        return getSelfLearningClassificationPropertyValue(r, alg);
    }

    // =================================================== instance segmentation ===================================================
    export function getInstancePropertyValue(result: ResultVariant, prop: BasePropertyId): number {
        return getBasePropertyValue(result, prop as any);
    }

    export function getInstancePropertyValueID(result: ResultVariant, prop: BaseProperty): number {
        return getBasePropertyValue(result, prop as any);
    }

    /** Get one-time instance segmentation result and cache it */
    //% block="get instance segmentation result"
    //% weight=159
    //% subcategory="instance segmentation"
    export function getResultInstanceRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmSegment);
    }

    /** Whether instance detected */
    //% block="instance detected?"
    //% weight=158
    //% subcategory="instance segmentation"
    export function availableInstanceRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmSegment);
    }

    /** Instance property nearest to center */
    //% block="instance nearest to center %alg"
    //% weight=157
    //% subcategory="instance segmentation"
    export function getCachedCenterInstanceResult(alg: BasePropertyId): number {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmSegment);
        return getInstancePropertyValue(r, alg);
    }

    /** Total number of detected instances */
    //% block="number of detected instances"
    //% weight=156
    //% subcategory="instance segmentation"
    export function getCachedResultNumInstance(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmSegment);
    }

    /** Property of Nth instance */
    //% block="instance %index %alg"
    //% weight=155
    //% index.min=1 index.defl=1
    //% subcategory="instance segmentation"
    export function getCachedResultInstanceProperty(index: number, alg: BasePropertyId): number {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmSegment, index - 1);
        return getInstancePropertyValue(r, alg);
    }

    /** Total number of learned instance IDs */
    //% block="number of learned instance IDs"
    //% weight=154
    //% subcategory="instance segmentation"
    export function getNumLearnedInstanceIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmSegment);
    }

    /** Whether instance with specified ID exists */
    //% block="instance ID %index exists?"
    //% weight=153
    //% index.min=1 index.defl=1
    //% subcategory="instance segmentation"
    export function instanceIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmSegment, index);
        return r != null;
    }

    /** Number of instances with specified ID */
    //% block="number of instances with ID %index"
    //% weight=152
    //% index.min=1 index.defl=1
    //% subcategory="instance segmentation"
    export function getNumInstanceByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmSegment, index);
    }

    /** Property of instance with specified ID */
    //% block="instance ID %index %alg"
    //% weight=151
    //% index.min=1 index.defl=1
    //% subcategory="instance segmentation"
    export function getInstancePropertyByID(index: number, alg: BaseProperty): number {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmSegment, index);
        return getInstancePropertyValueID(r, alg);
    }

    /** Property of Nth instance with specified ID */
    //% block="instance ID %id nth %n %alg"
    //% weight=150
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="instance segmentation"
    export function getInstancePropertyByIDNth(id: number, n: number, alg: BaseProperty): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmSegment, id, n - 1);
        return getInstancePropertyValueID(r, alg);
    }

    // ================================== hand recognition ==================================
    function getGesturePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        return getBasePropertyValue(result, prop as any);
    }

    /** Get one-time hand recognition result and cache it */
    //% block="get hand recognition result"
    //% weight=149
    //% subcategory="hand recognition"
    export function getResultGestureRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmHandRecognition);
    }

    /** Whether gesture detected */
    //% block="gesture detected?"
    //% weight=148
    //% subcategory="hand recognition"
    export function availableGestureRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmHandRecognition);
    }

    /** Gesture property nearest to center */
    //% block="gesture nearest to center %alg"
    //% weight=147
    //% subcategory="hand recognition"
    export function getCachedCenterGestureResult(alg: BasePropertyId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmHandRecognition);
        return getGesturePropertyValue(r, alg);
    }

    /** Total number of detected gestures */
    //% block="number of detected gestures"
    //% weight=146
    //% subcategory="hand recognition"
    export function getCachedResultNumGesture(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmHandRecognition);
    }

    /** Property of Nth gesture */
    //% block="gesture %index %alg"
    //% weight=145
    //% index.min=1 index.defl=1
    //% subcategory="hand recognition"
    export function getCachedResultGestureProperty(index: number, alg: BasePropertyId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmHandRecognition, index - 1);
        return getGesturePropertyValue(r, alg);
    }

    /** Total number of learned gesture IDs */
    //% block="number of learned gesture IDs"
    //% weight=144
    //% subcategory="hand recognition"
    export function getNumLearnedGestureIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmHandRecognition);
    }

    /** Whether gesture with specified ID exists */
    //% block="gesture ID %index exists?"
    //% weight=143
    //% index.min=1 index.defl=1
    //% subcategory="hand recognition"
    export function gestureIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmHandRecognition, index);
        return r != null;
    }

    /** Number of gestures with specified ID */
    //% block="number of gestures with ID %index"
    //% weight=142
    //% index.min=1 index.defl=1
    //% subcategory="hand recognition"
    export function getNumGestureByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmHandRecognition, index);
    }

    /** Property of gesture with specified ID */
    //% block="gesture ID %index %alg"
    //% weight=141
    //% index.min=1 index.defl=1
    //% subcategory="hand recognition"
    export function getGesturePropertyByID(index: number, alg: BaseProperty): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmHandRecognition, index);
        return getGesturePropertyValue(r, alg);
    }

    /** Property of Nth gesture with specified ID */
    //% block="gesture ID %id nth %n %alg"
    //% weight=140
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="hand recognition"
    export function getGesturePropertyByIDNth(id: number, n: number, alg: BaseProperty): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmHandRecognition, id, n - 1);
        return getGesturePropertyValue(r, alg);
    }

    // ================================================================ pose recognition (Human Pose) ========================
    function getPosePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        return getBasePropertyValue(result, prop as any);
    }

    /** Get one-time pose recognition result and cache it */
    //% block="get pose recognition result"
    //% weight=139
    //% subcategory="pose recognition"
    export function getResultPoseRecogtion(): void {
        getResultInternal(Algorithm.AlgorithmPoseRecognition);
    }

    /** Whether pose detected */
    //% block="pose detected?"
    //% weight=138
    //% subcategory="pose recognition"
    export function availablePoseRecogtion(): boolean {
        return availableInternal(Algorithm.AlgorithmPoseRecognition);
    }

    /** Pose property nearest to center */
    //% block="pose nearest to center %alg"
    //% weight=137
    //% subcategory="pose recognition"
    export function getCachedCenterPoseResult(alg: BasePropertyId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmPoseRecognition);
        return getPosePropertyValue(r, alg);
    }

    /** Total number of detected poses */
    //% block="number of detected poses"
    //% weight=136
    //% subcategory="pose recognition"
    export function getCachedResultNumPose(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmPoseRecognition);
    }

    /** Property of Nth pose */
    //% block="pose %index %alg"
    //% weight=135
    //% index.min=1 index.defl=1
    //% subcategory="pose recognition"
    export function getCachedResultPoseProperty(index: number, alg: BasePropertyId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmPoseRecognition, index - 1);
        return getPosePropertyValue(r, alg);
    }

    /** Total number of learned pose IDs */
    //% block="number of learned pose IDs"
    //% weight=134
    //% subcategory="pose recognition"
    export function getNumLearnedPoseIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmPoseRecognition);
    }

    /** Whether pose with specified ID exists */
    //% block="pose ID %index exists?"
    //% weight=133
    //% index.min=1 index.defl=1
    //% subcategory="pose recognition"
    export function poseIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmPoseRecognition, index);
        return r != null;
    }

    /** Number of poses with specified ID */
    //% block="number of poses with ID %index"
    //% weight=132
    //% index.min=1 index.defl=1
    //% subcategory="pose recognition"
    export function getNumPoseByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmPoseRecognition, index);
    }

    /** Property of pose with specified ID */
    //% block="pose ID %index %alg"
    //% weight=131
    //% index.min=1 index.defl=1
    //% subcategory="pose recognition"
    export function getPosePropertyByID(index: number, alg: BaseProperty): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmPoseRecognition, index);
        return getPosePropertyValue(r, alg);
    }

    /** Property of Nth pose with specified ID */
    //% block="pose ID %id nth %n %alg"
    //% weight=130
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% subcategory="pose recognition"
    export function getPosePropertyByIDNth(id: number, n: number, alg: BaseProperty): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmPoseRecognition, id, n - 1);
        return getPosePropertyValue(r, alg);
    }
}
