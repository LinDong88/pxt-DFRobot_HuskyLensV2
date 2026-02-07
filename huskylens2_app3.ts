/** 
 * @file huskylens2_app3.ts
 * @brief DFRobot's huskylens 2 makecode library.
 * @n [Get the module here](https://github.com/DFRobot/pxt-DFRobot_huskylens2)
 * @copyright    [DFRobot](http://www.dfrobot.com), 2026
 * @license The MIT License (MIT)
 * @author [email](rong.li@dfrobot.com)
 * @date  2026-2-2
*/


/**
 * HuskyLens 2 
 */
//% weight=100 color=#0fbc11 icon="\uf083" block="huskylens2"
//% groups='["communication","algorithm switch"]'
namespace huskylens2 {

    // ================================================== fall detection ========================================
    /**
     * Get fall detection Property Value (Include ID)
     * @param result The result object to read from.
     * @param property The fall-detection property to retrieve.
     */
    function getFallDetectionPropertyValue(result: ResultVariant, property: BasePropertyId): any {
        if (!result) return 0;
        const res = result as Result;
        switch (property) {
            case BasePropertyId.ID: return res.ID;
            case BasePropertyId.Name: return res.name.length > 0 ? res.name : "";
            case BasePropertyId.XCenter: return res.xCenter;
            case BasePropertyId.YCenter: return res.yCenter;
            case BasePropertyId.Width: return res.width;
            case BasePropertyId.Height: return res.height;
            default: return 0;
        }
    }


    /**
     * Request fall detection data and store in results
     */
    //% block="request fall detection data and store in results"
    //% weight=149
    //% subcategory="fall detection"
    export function requestFallDetectionData(): void {
        getResultInternal(Algorithm.AlgorithmFallDownRecognition);
    }

    /**
     * Is fall detected?
     */
    //% block="is fall detected?"
    //% weight=148
    //% subcategory="fall detection"
    export function fallDetected(): boolean {
        return availableInternal(Algorithm.AlgorithmFallDownRecognition);
    }

    /**
     * Closest fall detection property
     * @param property The fall-detection property to retrieve.
     */
    //% block="closest fall detection %property"
    //% weight=147
    //% subcategory="fall detection"
    export function nearestFallDetection(property: BasePropertyId): any {
        const r = cachedCenterResultInternal(Algorithm.AlgorithmFallDownRecognition);
        return getFallDetectionPropertyValue(r, property);
    }

    /**
     * Total number of fall detections
     */
    //% block="total number of fall detections"
    //% weight=146
    //% subcategory="fall detection"
    export function totalFallDetections(): number {
        return cachedResultNumInternal(Algorithm.AlgorithmFallDownRecognition);
    }

    /**
     * property of the [INDEX]th fall detection
     * @param index The index (1-based).
     * @param property The fall-detection property to retrieve.
     */

    //% block=" the %index th fall detection %property"
    //% weight=145
    //% index.min=1 index.defl=1
    //% subcategory="fall detection"
    export function fallDetectionProperty(index: number, property: BasePropertyId): any {
        const r = cachedResultByIndexInternal(Algorithm.AlgorithmFallDownRecognition, index - 1);
        return getFallDetectionPropertyValue(r, property);
    }

    // ================================ Face Orientation Detection Related Enums ==================================================
    // Face Orientation Detection Properties
    export enum FaceOrientationProperty {
        //% block="ID"
        ID = 0,
        //% block="name"
        Name,
        //% block="roll angle"
        Roll,
        //% block="yaw angle"
        Yaw,
        //% block="pitch angle"
        Pitch,

    }
    // Face Orientation Detection Properties
    export enum FaceOrientationPropertyId {
        //% block="name"
        Name = 1,
        //% block="roll angle"
        Roll,
        //% block="yaw angle"
        Yaw,
        //% block="pitch angle"
        Pitch,
    }
    // ================================= Face Orientation Detection Property Get Function ===========================================


    /**
     * Get Face Orientation Detection Property Value (Include ID)
     * @param result The result object to read from.
     * @param property The face-orientation property to retrieve.
     */
    function getFaceOrientationPropertyValue(result: ResultVariant, property: number): any {
        if (!result) return 0;
        const res = result as Result;
        const p = property | 0; // Ensure it's an integer
        switch (property) {
            case FaceOrientationProperty.ID: return res.ID || 0;
            case FaceOrientationProperty.Name: return res.name || "";
            case FaceOrientationProperty.Yaw: return res.yaw || 0;
            case FaceOrientationProperty.Pitch: return res.pitch || 0;
            case FaceOrientationProperty.Roll: return res.roll || 0;
            default: return 0;
        }
    }
    /**
     * Request face orientation data and store in results
     */
    //% block="request face orientation data and store in results"
    //% weight=139
    //% subcategory="faceorientation recognition"
    export function requestFaceOrientationData(): void {
        getResultInternal(Algorithm.AlgorithmFaceOrientation);
    }

    /**
     * Is face orientation detected?
     */
    //% block="is face orientation detected?"
    //% weight=138
    //% subcategory="faceorientation recognition"
    export function faceOrientationDetected(): boolean {
        return availableInternal(Algorithm.AlgorithmFaceOrientation);
    }

    /**
     * Closest face orientation property
     * @param property The face-orientation property to retrieve.
     */
    //% block="closest face orientation %property"
    //% weight=137
    //% subcategory="faceorientation recognition"
    export function nearestFaceOrientation(property: FaceOrientationProperty): any {
        const r = cachedCenterResultInternal(Algorithm.AlgorithmFaceOrientation);
        return getFaceOrientationPropertyValue(r, property);
    }

    /**
     * Total number of face orientations detected
     */
    //% block="total number of face orientations detected"
    //% weight=136
    //% subcategory="faceorientation recognition"
    export function totalFaceOrientations(): number {
        return cachedResultNumInternal(Algorithm.AlgorithmFaceOrientation);
    }

    /**
     * Total number of learned face orientation IDs
     */
    //% block="total number of learned face orientation IDs"
    //% weight=135
    //% subcategory="faceorientation recognition"
    export function totalLearnedFaceOrientations(): number {
        return cachedResultLearnedNumInternal(Algorithm.AlgorithmFaceOrientation);
    }

    /**
     * property of the [INDEX]th face orientation
     * @param index The index (1-based).
     * @param property The face-orientation property to retrieve.
     */
    //% block="the %index th face orientation %property"
    //% weight=134
    //% index.min=1 index.defl=1
    //% subcategory="faceorientation recognition"
    export function faceOrientationProperty(index: number, property: FaceOrientationProperty): any {
        const r = cachedResultByIndexInternal(Algorithm.AlgorithmFaceOrientation, index - 1);
        return getFaceOrientationPropertyValue(r, property);
    }

    /**
     * Does face orientation with ID %ID exist?
     * @param ID The face-orientation ID.
     */
    //% block="does face orientation with ID %ID exist?"
    //% weight=133
    //% ID.min=1 ID.defl=1
    //% subcategory="faceorientation recognition"
    export function faceOrientationIDExists(ID: number): boolean {
        const r = cachedResultByIDInternal(Algorithm.AlgorithmFaceOrientation, ID);
        return r != null;
    }

    /**
     * Total number of face orientations with ID %ID
     * @param ID The face-orientation ID.
     */
    //% block="total number of face orientations with ID %ID"
    //% weight=132
    //% ID.min=1 ID.defl=1
    //% subcategory="faceorientation recognition"
    export function totalFaceOrientationsWithID(ID: number): number {
        return cachedResultNumByIDInternal(Algorithm.AlgorithmFaceOrientation, ID);
    }

    /**
     * property of face orientation with ID 
     * @param ID The face-orientation ID.
     * @param property The face-orientation property to retrieve. (excluding ID)
     */
    //% block="ID %ID face orientation %property"
    //% weight=131
    //% ID.min=1 ID.defl=1
    //% subcategory="faceorientation recognition"
    export function faceOrientationWithID(ID: number, property: FaceOrientationPropertyId): any {
        const r = cachedResultByIDInternal(Algorithm.AlgorithmFaceOrientation, ID);
        return getFaceOrientationPropertyValue(r, property);
    }

    /**
     * property of the [INDEX]th face orientation with ID 
     * @param ID The face-orientation ID.
     * @param index The index (1-based).
     * @param property The face-orientation property to retrieve. (excluding ID)
     */
    //% block="ID %ID of the %index th face orientation %property "
    //% weight=130
    //% ID.min=1 ID.defl=1
    //% index.min=1 index.defl=1

    //% subcategory="faceorientation recognition"
    export function faceOrientationWithIDProperty(ID: number, index: number, property: FaceOrientationPropertyId): any {
        const r = cachedIndexResultByIDInternal(Algorithm.AlgorithmFaceOrientation, ID, index - 1);
        return getFaceOrientationPropertyValue(r, property);
    }

    // ==================================== gaze direction detection Related Enums ===============================
    // gaze direction detection Properties (Include ID)
    export enum EyeGazeProperty {
        //% block="ID"
        ID = 0,
        //% block="name"
        Name,
        //% block="projected angle"
        Angle,
        //% block="projected length"
        Length,
        //% block="pitch angle"
        Pitch,
        //% block="yaw angle"
        Yaw
    }

    // gaze direction detection Properties (excluding ID)
    export enum EyeGazePropertyId {
        //% block="name"
        Name = 1,
        //% block="projected angle"
        Angle,
        //% block="projected length"
        Length,
        //% block="pitch angle"
        Pitch,
        //% block="yaw angle"
        Yaw
    }
    /**
     * Get gaze direction detection Property Value (Include ID)
     * @param result The result object to read from.
     * @param property The eye-gaze property to retrieve.
     * 
     */
    function getEyeGazePropertyValue(result: ResultVariant, property: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (property) {
            case EyeGazeProperty.ID: return res.ID;
            case EyeGazeProperty.Name: return res.name || "";
            case EyeGazeProperty.Angle: return res.angle;        // Projected angle
            case EyeGazeProperty.Length: return res.length;      // Projected length
            case EyeGazeProperty.Pitch: return res.pitch;        // Pitch angle
            case EyeGazeProperty.Yaw: return res.yaw;           // Yaw angle
            default: return 0;
        }
    }

    /**
     * Request gaze direction data and store in results
     */
    //% block="request gaze direction data and store in results"
    //% weight=129
    //% subcategory="gaze direction detection"
    export function requestEyeGazeData(): void {
        getResultInternal(Algorithm.AlgorithmGazeRecognition);
    }

    /**
     * Is gaze direction detected?
     */
    //% block="is gaze direction detected?"
    //% weight=128
    //% subcategory="gaze direction detection"
    export function eyeGazeDetected(): boolean {
        return availableInternal(Algorithm.AlgorithmGazeRecognition);
    }

    /**
     * Closest gaze direction property
     * @param property The eye-gaze property to retrieve.
     */
    //% block="closest gaze direction %property"
    //% weight=127
    //% subcategory="gaze direction detection"
    export function nearestEyeGaze(property: EyeGazeProperty): any {
        const r = cachedCenterResultInternal(Algorithm.AlgorithmGazeRecognition);
        return getEyeGazePropertyValue(r, property);
    }

    /**
     * Total number of gaze directions detected
     */
    //% block="total number of gaze directions detected"
    //% weight=126
    //% subcategory="gaze direction detection"
    export function totalEyeGazes(): number {
        return cachedResultNumInternal(Algorithm.AlgorithmGazeRecognition);
    }

    /**
     * Total number of learned gaze direction IDs
     */
    //% block="total number of learned gaze direction IDs"
    //% weight=125
    //% subcategory="gaze direction detection"
    export function totalLearnedEyeGazes(): number {
        return cachedResultLearnedNumInternal(Algorithm.AlgorithmGazeRecognition);
    }

    /**
     * property of the [INDEX]th gaze direction
     * @param index The index (1-based).
     * @param property The eye-gaze property to retrieve.
     */
    //% block="the %index th gaze direction %property"
    //% weight=124
    //% index.min=1 index.defl=1
    //% subcategory="gaze direction detection"
    export function eyeGazeProperty(index: number, property: EyeGazeProperty): any {
        const r = cachedResultByIndexInternal(Algorithm.AlgorithmGazeRecognition, index - 1);
        return getEyeGazePropertyValue(r, property);
    }

    /**
     * Does gaze direction with ID %ID exist?
     * @param ID The eye-gaze ID.
     */
    //% block="does gaze direction with ID %ID exist?"
    //% weight=123
    //% ID.min=1 ID.defl=1
    //% subcategory="gaze direction detection"
    export function gazeIDExists(ID: number): boolean {
        const r = cachedResultByIDInternal(Algorithm.AlgorithmGazeRecognition, ID);
        return r != null;
    }

    /**
     * Total number of gaze directions with ID %ID
     * @param ID The eye-gaze ID.
     */
    //% block="total number of gaze directions with ID %ID"
    //% weight=122
    //% ID.min=1 ID.defl=1
    //% subcategory="gaze direction detection"
    export function totalEyeGazesWithID(ID: number): number {
        return cachedResultNumByIDInternal(Algorithm.AlgorithmGazeRecognition, ID);
    }

    /**
     * property of gaze direction with ID 
     * @param ID The eye-gaze ID.
     * @param property The eye-gaze property to retrieve. (excluding ID)
     */
    //% block="ID %ID gaze direction %property "
    //% weight=121
    //% ID.min=1 ID.defl=1
    //% subcategory="gaze direction detection"
    export function gazeWithID(ID: number, property: EyeGazePropertyId): any {
        const r = cachedResultByIDInternal(Algorithm.AlgorithmGazeRecognition, ID);
        return getEyeGazePropertyValue(r, property);
    }

    /**
     * property of the [INDEX]th gaze direction with ID 
     * @param ID The eye-gaze ID.
     * @param index The index (1-based).
     * @param property The eye-gaze property to retrieve. (excluding ID)
     */
    //% block="ID %ID of the %index th gaze direction %property"
    //% weight=120
    //% ID.min=1 ID.defl=1
    //% index.min=1 index.defl=1
    //% subcategory="gaze direction detection"
    export function gazeWithIDProperty(ID: number, index: number, property: EyeGazePropertyId): any {
        const r = cachedIndexResultByIDInternal(Algorithm.AlgorithmGazeRecognition, ID, index - 1);
        return getEyeGazePropertyValue(r, property);
    }


    // ==================================== Self-trained model related enums ========================================

    /**
     * Switch to a custom-trained model by specifying the model ID.
     * @param num Model ID (range: 128-255, default: 128)
     */
    //% block="HUSKYLENS 2 switch to custom-trained model, model ID%num"
    //% weight=119
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function selfTrainedModelSwitchAlgorithm(num: number): void {
        // Switch to self-trained model
        switchAlgorithmInternal(num);
        basic.pause(5000); // Wait 5 seconds for model loading
    }

    /**
     * Request data from the specified model ID and save it to the results cache.
     * @param num Model ID (range: 128-255, default: 128)
     */
    //% block="model ID%num request data and save to results"
    //% weight=118
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function requestData(num: number): void {
        // Request data and save to result cache
        getResultInternal(num);
    }

    /**
     * Check if a target is detected by the specified model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @returns True if a target is detected, false otherwise.
     */
    //% block="model ID%num target detected?"
    //% weight=117
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function detected(num: number): boolean {
        return availableInternal(num);
    }

    /**
     * Get the property of the target closest to the center for the specified model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @param property Property to retrieve (e.g., ID, Name, XCenter, etc.)
     * @returns The requested property value.
     */
    //% block="model ID%num target closest to center%property"
    //% weight=116
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% property.defl=BasePropertyId.ID
    export function nearest(num: number, property: BasePropertyId): any {
        const res = cachedCenterResultInternal(num);
        const result = res as Result;
        if (!result) return 0;
        
        switch (property) {
            case BasePropertyId.ID: return result.ID || 0;
            case BasePropertyId.Name:return result.name|| "";
            case BasePropertyId.XCenter:return result.xCenter|| 0;
            case BasePropertyId.YCenter:return result.yCenter|| 0;
            case BasePropertyId.Width:return result.width|| 0;
            case BasePropertyId.Height: return result.height|| 0;

            default:
                return 0;
        }
    }

    /**
     * Get the total number of detected targets for the specified model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @returns Total number of detected targets.
     */
    //% block="model ID%num total number of detected targets"
    //% weight=115
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function total(num: number): number {
        return cachedResultNumInternal(num);
    }

    /**
     * Get the total number of learned target IDs for the specified model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @returns Total number of learned target IDs.
     */
    //% block="model ID%num total number of learned target IDs"
    //% weight=114
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function totalLearned(num: number): number {
        return cachedResultMaxIDInternal(num);
    }

    /**
     * Get the property of the Nth target for the specified model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @param INDEX The target index (1-based, range: 1-6, default: 1).
     * @param property Property to retrieve (e.g., ID, Name, XCenter, etc.)
     * @returns The requested property value.
     */
    //% block="model ID%num No.%index target%property"
    //% weight=113
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% INDEX.min=1 INDEX.max=6 INDEX.defl=1
    //% property.defl=BasePropertyId.ID
    export function targetProperty(num: number, INDEX: number, property: BasePropertyId): any {
        const res = cachedResultByIndexInternal(num, INDEX - 1);
        const result = res as Result;
        if (!result) {
            if (property === BasePropertyId.Name ) {
                return "";
            }
            return 0;
        }
        
        switch (property) {
            case BasePropertyId.ID: return result.ID || 0;
            case BasePropertyId.Name:return result.name || "";
            case BasePropertyId.XCenter:return result.xCenter|| 0;
            case BasePropertyId.YCenter:return result.yCenter|| 0;
            case BasePropertyId.Width:return result.width|| 0;
            case BasePropertyId.Height:return result.height|| 0;
            default:
                return 0;
        }
    }

    /**
     * Check if a target with the specified ID exists for the given model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @param ID Target ID (range: 1-100, default: 1)
     * @returns True if the target exists, false otherwise.
     */
    //% block="model ID%num target ID%ID exists?"
    //% weight=112
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% ID.min=1 ID.max=100 ID.defl=1
    export function IDExists(num: number, ID: number): boolean {
        return cachedResultByIDInternal(num, ID) !== null;
    }

    /**
     * Get the total number of targets with the specified ID for the given model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @param ID Target ID (range: 1-100, default: 1)
     * @returns Total number of targets with the specified ID.
     */
    //% block="model ID%num total number of targets with ID%ID"
    //% weight=111
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% ID.min=1 ID.max=100 ID.defl=1
    export function totalWithID(num: number, ID: number): number {
        return cachedResultNumByIDInternal(num, ID);
    }

    /**
     * Get the property of a target with the specified ID for the given model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @param ID Target ID (range: 1-100, default: 1)
     * @param property Property to retrieve (e.g., Name, XCenter, etc.)
     * @returns The requested property value.
     */
    //% block="model ID%num target with ID%ID%property"
    //% weight=110
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% ID.min=1 ID.max=100 ID.defl=1
    //% property.defl=BaseProperty.Name
    export function withID(num: number, ID: number, property: BaseProperty): any {
        const res = cachedResultByIDInternal(num, ID);
        const result = res as Result;
        if (!result) {
            if (property === BaseProperty.Name ) {
                return "";
            }
            return 0;
        }
        
        switch (property) {
            case BaseProperty.Name: return result.name|| "";
            case BaseProperty.XCenter:return result.xCenter|| 0;
            case BaseProperty.YCenter:return result.yCenter|| 0;
            case BaseProperty.Width:return result.width|| 0;
            case BaseProperty.Height:return result.height|| 0;
            default:return 0;
        }
    }

    /**
     * Get the property of the Nth target with the specified ID for the given model ID.
     * @param num Model ID (range: 128-255, default: 128)
     * @param ID Target ID (range: 1-100, default: 1)
     * @param index Index of the target (1-based, range: 1-6, default: 1)
     * @param property Property to retrieve (e.g., Name, XCenter, etc.)
     * @returns The requested property value.
     */
    //% block="model ID %num ID %ID the %index target of %property""
    //% weight=109
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% ID.min=1 ID.max=100 ID.defl=1
    //% index.min=1 index.max=6 index.defl=1
    //% property.defl=BaseProperty.Name
    export function withIDProperty(num: number, ID: number, index: number, property: BaseProperty): any {
        const res = cachedIndexResultByIDInternal(num, ID, index - 1);
        const result = res as Result;
       
        if (!result) return 0;
        
        switch (property) {
            case BaseProperty.Name: return result.name|| "";
            case BaseProperty.XCenter:return result.xCenter;
            case BaseProperty.YCenter:return result.yCenter;
            case BaseProperty.Width:return result.width;
            case BaseProperty.Height: return result.height;
            default:
                return 0;
        }
    }

}
