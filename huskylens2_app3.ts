/** 
 * @file huskylens2_app3.ts
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

    // ================================================== fall detection ========================================
    /**
     * Get fall detection Property Value (Include id)
     * @param result Result object
     * @param prop fall detection property
     */
    export function getFallDetectionPropertyValue(result: ResultVariant, prop: BasePropertyId): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case BasePropertyId.Id: return res.id;
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
     * Closest fall detection %alg
     * @param alg fall detection property
     */
    //% block="closest fall detection %alg"
    //% weight=147
    //% subcategory="fall detection"
    export function nearestFallDetection(alg: BasePropertyId): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmFallDownRecognition);
        return getFallDetectionPropertyValue(r, alg);
    }

    /**
     * Total number of fall detections
     */
    //% block="total number of fall detections"
    //% weight=146
    //% subcategory="fall detection"
    export function totalFallDetections(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmFallDownRecognition);
    }

    /**
     * %alg of the [INDEX]th fall detection
     * @param index Index (1-based)
     * @param alg fall detection property
     */

    //% block=" the %index th fall detection %alg"
    //% weight=145
    //% index.min=1 index.defl=1
    //% subcategory="fall detection"
    export function fallDetectionProperty(index: number, alg: BasePropertyId): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmFallDownRecognition, index - 1);
        return getFallDetectionPropertyValue(r, alg);
    }

    // ================================ Face Orientation Detection Related Enums ==================================================
    // Face Orientation Detection Properties
    export enum FaceOrientationProperty {
        //% block="id"
        Id = 0,
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
     * Get Face Orientation Detection Property Value (Include id)
     * @param result Result object
     * @param prop Face orientation detection property
     */
    export function getFaceOrientationPropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        const p = prop | 0; // Ensure it's an integer
        switch (prop) {
            case FaceOrientationProperty.Id: return res.id || 0;
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
     * Closest face orientation %alg
     * @param alg Face orientation detection property
     */
    //% block="closest face orientation %alg"
    //% weight=137
    //% subcategory="faceorientation recognition"
    export function nearestFaceOrientation(alg: FaceOrientationProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmFaceOrientation);
        return getFaceOrientationPropertyValue(r, alg);
    }

    /**
     * Total number of face orientations detected
     */
    //% block="total number of face orientations detected"
    //% weight=136
    //% subcategory="faceorientation recognition"
    export function totalFaceOrientations(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmFaceOrientation);
    }

    /**
     * Total number of learned face orientation IDs
     */
    //% block="total number of learned face orientation IDs"
    //% weight=135
    //% subcategory="faceorientation recognition"
    export function totalLearnedFaceOrientations(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmFaceOrientation);
    }

    /**
     * %alg of the [INDEX]th face orientation
     * @param index Index (1-based)
     * @param alg Face orientation detection property
     */
    //% block="the %index th face orientation %alg"
    //% weight=134
    //% index.min=1 index.defl=1
    //% subcategory="faceorientation recognition"
    export function faceOrientationProperty(index: number, alg: FaceOrientationProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmFaceOrientation, index - 1);
        return getFaceOrientationPropertyValue(r, alg);
    }

    /**
     * Does face orientation with id %id exist?
     * @param id Face orientation id
     */
    //% block="does face orientation with id %id exist?"
    //% weight=133
    //% id.min=1 id.defl=1
    //% subcategory="faceorientation recognition"
    export function faceOrientationIDExists(id: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmFaceOrientation, id);
        return r != null;
    }

    /**
     * Total number of face orientations with id %id
     * @param id Face orientation id
     */
    //% block="total number of face orientations with id %id"
    //% weight=132
    //% id.min=1 id.defl=1
    //% subcategory="faceorientation recognition"
    export function totalFaceOrientationsWithID(id: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmFaceOrientation, id);
    }

    /**
     * %alg of face orientation with id %id
     * @param id Face orientation id
     * @param alg Face orientation detection property (excluding id)
     */
    //% block="id %id face orientation %alg"
    //% weight=131
    //% id.min=1 id.defl=1
    //% subcategory="faceorientation recognition"
    export function faceOrientationWithID(id: number, alg: FaceOrientationPropertyId): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmFaceOrientation, id);
        return getFaceOrientationPropertyValue(r, alg);
    }

    /**
     * %alg of the [INDEX]th face orientation with id %id
     * @param id Face orientation id
     * @param index Which one (1-based)
     * @param alg Face orientation detection property (excluding id)
     */
    //% block="id %id of the %index th face orientation %alg "
    //% weight=130
    //% id.min=1 id.defl=1
    //% index.min=1 index.defl=1

    //% subcategory="faceorientation recognition"
    export function faceOrientationWithIDProperty(id: number, index: number, alg: FaceOrientationPropertyId): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmFaceOrientation, id, index - 1);
        return getFaceOrientationPropertyValue(r, alg);
    }

    // ==================================== gaze direction detection Related Enums ===============================
    // gaze direction detection Properties (Include id)
    export enum EyeGazeProperty {
        //% block="id"
        Id = 0,
        //% block="name"
        Name,
        //% block="projected Angle"
        Angle,
        //% block="projected Length"
        Length,
        //% block="pitch Angle"
        Pitch,
        //% block="yaw Angle"
        Yaw
    }

    // gaze direction detection Properties (excluding id)
    export enum EyeGazePropertyId {
        //% block="name"
        Name = 1,
        //% block="projected Angle"
        Angle,
        //% block="projected Length"
        Length,
        //% block="pitch Angle"
        Pitch,
        //% block="yaw Angle"
        Yaw
    }
    /**
     * Get gaze direction detection Property Value (Include id)
     * @param result Result object
     * @param prop gaze direction detection property
     */
    export function getEyeGazePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case EyeGazeProperty.Id: return res.id;
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
     * Closest gaze direction %alg
     * @param alg gaze direction detection property
     */
    //% block="closest gaze direction %alg"
    //% weight=127
    //% subcategory="gaze direction detection"
    export function nearestEyeGaze(alg: EyeGazeProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.AlgorithmGazeRecognition);
        return getEyeGazePropertyValue(r, alg);
    }

    /**
     * Total number of gaze directions detected
     */
    //% block="total number of gaze directions detected"
    //% weight=126
    //% subcategory="gaze direction detection"
    export function totalEyeGazes(): number {
        return getCachedResultNumInternal(Algorithm.AlgorithmGazeRecognition);
    }

    /**
     * Total number of learned gaze direction IDs
     */
    //% block="total number of learned gaze direction IDs"
    //% weight=125
    //% subcategory="gaze direction detection"
    export function totalLearnedEyeGazes(): number {
        return getCachedResultLearnedNumInternal(Algorithm.AlgorithmGazeRecognition);
    }

    /**
     * %alg of the [INDEX]th gaze direction
     * @param index Index (1-based)
     * @param alg gaze direction detection property
     */
    //% block="the %index th gaze direction %alg"
    //% weight=124
    //% index.min=1 index.defl=1
    //% subcategory="gaze direction detection"
    export function eyeGazeProperty(index: number, alg: EyeGazeProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.AlgorithmGazeRecognition, index - 1);
        return getEyeGazePropertyValue(r, alg);
    }

    /**
     * Does gaze direction with id %id exist?
     * @param id Gaze direction id
     */
    //% block="does gaze direction with id %id exist?"
    //% weight=123
    //% id.min=1 id.defl=1
    //% subcategory="gaze direction detection"
    export function gazeIDExists(id: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmGazeRecognition, id);
        return r != null;
    }

    /**
     * Total number of gaze directions with id %id
     * @param id Gaze direction id
     */
    //% block="total number of gaze directions with id %id"
    //% weight=122
    //% id.min=1 id.defl=1
    //% subcategory="gaze direction detection"
    export function totalEyeGazesWithID(id: number): number {
        return getCachedResultNumByIDInternal(Algorithm.AlgorithmGazeRecognition, id);
    }

    /**
     * %alg of gaze direction with id %id
     * @param id Gaze direction id
     * @param alg gaze direction detection property (excluding id)
     */
    //% block="id %id gaze direction %alg "
    //% weight=121
    //% id.min=1 id.defl=1
    //% subcategory="gaze direction detection"
    export function gazeWithID(id: number, alg: EyeGazePropertyId): any {
        const r = getCachedResultByIDInternal(Algorithm.AlgorithmGazeRecognition, id);
        return getEyeGazePropertyValue(r, alg);
    }

    /**
     * %alg of the [INDEX]th gaze direction with id %id
     * @param id Gaze direction id
     * @param index Which one (1-based)
     * @param alg gaze direction detection property (excluding id)
     */
    //% block="id %id of the %index th gaze direction %alg"
    //% weight=120
    //% id.min=1 id.defl=1
    //% index.min=1 index.defl=1
    //% subcategory="gaze direction detection"
    export function gazeWithIDProperty(id: number, index: number, alg: EyeGazePropertyId): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.AlgorithmGazeRecognition, id, index - 1);
        return getEyeGazePropertyValue(r, alg);
    }


    // ==================================== Self-trained model related enums ========================================
    
    //% block="HUSKYLENS 2 switch to custom-trained model, model id%num"
    //% weight=119
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function selfTrainedModelswitchAlgorithm(num: number): void {
        // Switch to self-trained model
        switchAlgorithmInternal(num);
        basic.pause(5000); // Wait 5 seconds for model loading
    }

    //% block="model id%num request data and save to results"
    //% weight=118
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function requestData(num: number): void {
        // Request data and save to result cache
        getResultInternal(num);
    }

    //% block="model id%num target detected?"
    //% weight=117
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function Detected(num: number): boolean {
        return availableInternal(num);
    }

    //% block="model id%num target closest to center%alg"
    //% weight=116
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% alg.defl=BasePropertyId.Id
    export function nearest(num: number, alg: BasePropertyId): any {
        const res = getCachedCenterResultInternal(num);
        const result = res as Result;
        if (!result) return 0;
        
        switch (alg) {
            case BasePropertyId.Id: return result.id || 0;
            case BasePropertyId.Name:return result.name|| "";
            case BasePropertyId.XCenter:return result.xCenter|| 0;
            case BasePropertyId.YCenter:return result.yCenter|| 0;
            case BasePropertyId.Width:return result.width|| 0;
            case BasePropertyId.Height: return result.height|| 0;

            default:
                return 0;
        }
    }

    //% block="model id%num total number of detected targets"
    //% weight=115
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function total(num: number): number {
        return getCachedResultNumInternal(num);
    }

    //% block="model id%num total number of learned target IDs"
    //% weight=114
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    export function totalLearned(num: number): number {
        return getCachedResultMaxID(num);
    }

    //% block="model id%num No.%index target%alg"
    //% weight=113
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% INDEX.min=1 INDEX.max=6 INDEX.defl=1
    //% alg.defl=BasePropertyId.Id
    export function Property(num: number, INDEX: number, alg: BasePropertyId): any {
        const res = getCachedResultByIndexInternal(num, INDEX - 1);
        const result = res as Result;
        if (!result) {
            if (alg === BasePropertyId.Name ) {
                return "";
            }
            return 0;
        }
        
        switch (alg) {
            case BasePropertyId.Id: return result.id || 0;
            case BasePropertyId.Name:return result.name || "";
            case BasePropertyId.XCenter:return result.xCenter|| 0;
            case BasePropertyId.YCenter:return result.yCenter|| 0;
            case BasePropertyId.Width:return result.width|| 0;
            case BasePropertyId.Height:return result.height|| 0;
            default:
                return 0;
        }
    }

    //% block="model id%num target id%id exists?"
    //% weight=112
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% id.min=1 id.max=100 id.defl=1
    export function IDExists(num: number, id: number): boolean {
        return getCachedResultByIDInternal(num, id) !== null;
    }

    //% block="model id%num total number of targets with id%id"
    //% weight=111
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% id.min=1 id.max=100 id.defl=1
    export function totalWithID(num: number, id: number): number {
        return getCachedResultNumByIDInternal(num, id);
    }

    //% block="model id%num target with id%id%alg"
    //% weight=110
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% id.min=1 id.max=100 id.defl=1
    //% alg.defl=BaseProperty.Name
    export function WithID(num: number, id: number, alg: BaseProperty): any {
        const res = getCachedResultByIDInternal(num, id);
        const result = res as Result;
        if (!result) {
            if (alg === BaseProperty.Name ) {
                return "";
            }
            return 0;
        }
        
        switch (alg) {
            case BaseProperty.Name: return result.name|| "";
            case BaseProperty.XCenter:return result.xCenter|| 0;
            case BaseProperty.YCenter:return result.yCenter|| 0;
            case BaseProperty.Width:return result.width|| 0;
            case BaseProperty.Height:return result.height|| 0;
            default:return 0;
        }
    }

    //% block="model id %num id %id the %index target of %alg""
    //% weight=109
    //% subcategory="self training"
    //% num.min=128 num.max=255 num.defl=128
    //% id.min=1 id.max=100 id.defl=1
    //% index.min=1 index.max=6 index.defl=1
    //% alg.defl=BaseProperty.name
    export function WithIDProperty(num: number, id: number, index: number, alg: BaseProperty): any {
        const res = getCachedIndexResultByIDInternal(num, id, index - 1);
        const result = res as Result;
       
        if (!result) return 0;
        
        switch (alg) {
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


