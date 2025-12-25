/**
 * Custom graphic block
 */
//% weight=100 color=#0fbc11 icon="\uf067" block="HuskylensV2"
//% groups='["Communication","Algorithm Switch","Face Recognition","Object Recognition","Object Tracking","Color Recognition","Object Classification","Self-learning Classification","Instance Segmentation","Hand Recognition","Pose Recognition","License Plate Recognition","Optical Char Recognition","Line Tracking","Face Emotion Recognition","Tag Recognition","QR Code Recognition","Barcode Recognition"]'
namespace huskylensV2 {

    // ================================================== Fall Detection ========================================
    // Fall Detection Properties (Include ID)
    export enum FallDetectionProperty {
        //% block="ID"
        ID,
        //% block="Name"
        Name,
        //% block="X Center"
        XCenter,
        //% block="Y Center"
        YCenter,
        //% block="Width"
        Width,
        //% block="Height"
        Height,
    }
    /**
     * Get Fall Detection Property Value (Include ID)
     * @param result Result object
     * @param prop Fall detection property
     */
    export function getFallDetectionPropertyValue(result: ResultVariant, prop: FallDetectionProperty): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case FallDetectionProperty.ID: return res.ID;
            case FallDetectionProperty.Name: return res.name.length > 0 ? res.name : "";
            case FallDetectionProperty.XCenter: return res.xCenter;
            case FallDetectionProperty.YCenter: return res.yCenter;
            case FallDetectionProperty.Width: return res.width;
            case FallDetectionProperty.Height: return res.height;
            default: return 0;
        }
    }


    /**
     * Request fall detection data and store in results
     */
    //% block="Request fall detection data and store in results"
    //% weight=149
    //% group="Fall Detection"
    //% subcategory="Fall Detection"
    export function requestFallDetectionData(): void {
        getResultInternal(Algorithm.ALGORITHM_FALLDOWN_RECOGNITION);
    }

    /**
     * Is fall detected?
     */
    //% block="Is fall detected?"
    //% weight=148
    //% group="Fall Detection"
    //% subcategory="Fall Detection"
    export function fallDetected(): boolean {
        return availableInternal(Algorithm.ALGORITHM_FALLDOWN_RECOGNITION);
    }

    /**
     * Closest fall detection %alg
     * @param alg Fall detection property
     */
    //% block="Closest fall detection %alg"
    //% weight=147
    //% group="Fall Detection"
    //% subcategory="Fall Detection"
    export function nearestFallDetection(alg: FallDetectionProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_FALLDOWN_RECOGNITION);
        return getFallDetectionPropertyValue(r, alg);
    }

    /**
     * Total number of fall detections
     */
    //% block="Total number of fall detections"
    //% weight=146
    //% group="Fall Detection"
    //% subcategory="Fall Detection"
    export function totalFallDetections(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_FALLDOWN_RECOGNITION);
    }

    /**
     * %alg of the [INDEX]th fall detection
     * @param index Index (1-based)
     * @param alg Fall detection property
     */

    //% block=" the %index th fall detection %alg"
    //% weight=145
    //% index.min=1 index.defl=1
    //% group="Fall Detection"
    //% subcategory="Fall Detection"
    export function fallDetectionProperty(index: number, alg: FallDetectionProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_FALLDOWN_RECOGNITION, index - 1);
        return getFallDetectionPropertyValue(r, alg);
    }

    // ================================================== Face Orientation Detection Related Enums ==================================================
    // Face Orientation Detection Properties
    export enum FaceOrientationProperty {
        //% block="ID"
        ID = 0,
        //% block="Name"
        Name,
        //% block="Yaw Angle"
        Yaw,
        //% block="Pitch Angle"
        Pitch,
        //% block="Roll Angle"
        Roll,
    }
    // Face Orientation Detection Properties
    export enum FaceOrientationPropertyID {
        //% block="Name"
        Name = 1,
        //% block="Yaw Angle"
        Yaw,
        //% block="Pitch Angle"
        Pitch,
        //% block="Roll Angle"
        Roll,
    }
    // ============================================ Face Orientation Detection Property Get Function ===========================================


    /**
     * Get Face Orientation Detection Property Value (Include ID)
     * @param result Result object
     * @param prop Face orientation detection property
     */
    export function getFaceOrientationPropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        const p = prop | 0; // Ensure it's an integer
        switch (prop) {
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
    //% block="Request face orientation data and store in results"
    //% weight=139
    //% subcategory="Face Orientation Recognition"
    export function requestFaceOrientationData(): void {
        getResultInternal(Algorithm.ALGORITHM_FACE_ORIENTATION);
    }

    /**
     * Is face orientation detected?
     */
    //% block="Is face orientation detected?"
    //% weight=138
    //% subcategory="Face Orientation Recognition"
    export function faceOrientationDetected(): boolean {
        return availableInternal(Algorithm.ALGORITHM_FACE_ORIENTATION);
    }

    /**
     * Closest face orientation %alg
     * @param alg Face orientation detection property
     */
    //% block="Closest face orientation %alg"
    //% weight=137
    //% subcategory="Face Orientation Recognition"
    export function nearestFaceOrientation(alg: FaceOrientationProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_FACE_ORIENTATION);
        return getFaceOrientationPropertyValue(r, alg);
    }

    /**
     * Total number of face orientations detected
     */
    //% block="Total number of face orientations detected"
    //% weight=136
    //% subcategory="Face Orientation Recognition"
    export function totalFaceOrientations(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_FACE_ORIENTATION);
    }

    /**
     * Total number of learned face orientation IDs
     */
    //% block="Total number of learned face orientation IDs"
    //% weight=135
    //% subcategory="Face Orientation Recognition"
    export function totalLearnedFaceOrientations(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_FACE_ORIENTATION);
    }

    /**
     * %alg of the [INDEX]th face orientation
     * @param index Index (1-based)
     * @param alg Face orientation detection property
     */
    //% block="the %index th face orientation %alg"
    //% weight=134
    //% index.min=1 index.defl=1
    //% subcategory="Face Orientation Recognition"
    export function faceOrientationProperty(index: number, alg: FaceOrientationProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_FACE_ORIENTATION, index - 1);
        return getFaceOrientationPropertyValue(r, alg);
    }

    /**
     * Does face orientation with ID %id exist?
     * @param id Face orientation ID
     */
    //% block="Does face orientation with ID %id exist?"
    //% weight=133
    //% id.min=1 id.defl=1
    //% subcategory="Face Orientation Recognition"
    export function faceOrientationIDExists(id: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_FACE_ORIENTATION, id);
        return r != null;
    }

    /**
     * Total number of face orientations with ID %id
     * @param id Face orientation ID
     */
    //% block="Total number of face orientations with ID %id"
    //% weight=132
    //% id.min=1 id.defl=1
    //% subcategory="Face Orientation Recognition"
    export function totalFaceOrientationsWithID(id: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_FACE_ORIENTATION, id);
    }

    /**
     * %alg of face orientation with ID %id
     * @param id Face orientation ID
     * @param alg Face orientation detection property (excluding ID)
     */
    //% block="ID %id face orientation %alg"
    //% weight=131
    //% id.min=1 id.defl=1
    //% subcategory="Face Orientation Recognition"
    export function faceOrientationWithID(id: number, alg: FaceOrientationPropertyID): any {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_FACE_ORIENTATION, id);
        return getFaceOrientationPropertyValue(r, alg);
    }

    /**
     * %alg of the [INDEX]th face orientation with ID %id
     * @param id Face orientation ID
     * @param index Which one (1-based)
     * @param alg Face orientation detection property (excluding ID)
     */
    //% block="ID %id of the %index th face orientation %alg "
    //% weight=130
    //% id.min=1 id.defl=1
    //% index.min=1 index.defl=1

    //% subcategory="Face Orientation Recognition"
    export function faceOrientationWithIDProperty(id: number, index: number, alg: FaceOrientationPropertyID): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_FACE_ORIENTATION, id, index - 1);
        return getFaceOrientationPropertyValue(r, alg);
    }

    // ======================================== Gaze Direction Detection Related Enums ========================================
    // Gaze Direction Detection Properties (Include ID)
    export enum Eye_GAZE_PROPERTY {
        //% block="ID"
        ID = 0,
        //% block="Name"
        Name,
        //% block="Projected Angle"
        Angle,
        //% block="Projected Length"
        Length,
        //% block="Pitch Angle"
        Pitch,
        //% block="Yaw Angle"
        Yaw
    }

    // Gaze Direction Detection Properties (excluding ID)
    export enum Eye_GAZE_PROPERTY_ID {
        //% block="Name"
        Name = 1,
        //% block="Projected Angle"
        Angle,
        //% block="Projected Length"
        Length,
        //% block="Pitch Angle"
        Pitch,
        //% block="Yaw Angle"
        Yaw
    }
    /**
     * Get Gaze Direction Detection Property Value (Include ID)
     * @param result Result object
     * @param prop Gaze direction detection property
     */
    export function getEyeGazePropertyValue(result: ResultVariant, prop: number): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case Eye_GAZE_PROPERTY.ID: return res.ID;
            case Eye_GAZE_PROPERTY.Name: return res.name.length > 0 ? res.name : "";
            case Eye_GAZE_PROPERTY.Angle: return res.angle;        // Projected angle
            case Eye_GAZE_PROPERTY.Length: return res.length;      // Projected length
            case Eye_GAZE_PROPERTY.Pitch: return res.pitch;        // Pitch angle
            case Eye_GAZE_PROPERTY.Yaw: return res.yaw;           // Yaw angle
            default: return 0;
        }
    }

    /**
     * Request gaze direction data and store in results
     */
    //% block="Request gaze direction data and store in results"
    //% weight=129
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function requestEyeGazeData(): void {
        getResultInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION);
    }

    /**
     * Is gaze direction detected?
     */
    //% block="Is gaze direction detected?"
    //% weight=128
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function eyeGazeDetected(): boolean {
        return availableInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION);
    }

    /**
     * Closest gaze direction %alg
     * @param alg Gaze direction detection property
     */
    //% block="Closest gaze direction %alg"
    //% weight=127
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function nearestEyeGaze(alg: Eye_GAZE_PROPERTY): any {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION);
        return getEyeGazePropertyValue(r, alg);
    }

    /**
     * Total number of gaze directions detected
     */
    //% block="Total number of gaze directions detected"
    //% weight=126
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function totalEyeGazes(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION);
    }

    /**
     * Total number of learned gaze direction IDs
     */
    //% block="Total number of learned gaze direction IDs"
    //% weight=125
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function totalLearnedEyeGazes(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION);
    }

    /**
     * %alg of the [INDEX]th gaze direction
     * @param index Index (1-based)
     * @param alg Gaze direction detection property
     */
    //% block="the %index th gaze direction %alg"
    //% weight=124
    //% index.min=1 index.defl=1
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function eyeGazeProperty(index: number, alg: Eye_GAZE_PROPERTY): any {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION, index - 1);
        return getEyeGazePropertyValue(r, alg);
    }

    /**
     * Does gaze direction with ID %id exist?
     * @param id Gaze direction ID
     */
    //% block="Does gaze direction with ID %id exist?"
    //% weight=123
    //% id.min=1 id.defl=1
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function gazeIDExists(id: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION, id);
        return r != null;
    }

    /**
     * Total number of gaze directions with ID %id
     * @param id Gaze direction ID
     */
    //% block="Total number of gaze directions with ID %id"
    //% weight=122
    //% id.min=1 id.defl=1
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function totalEyeGazesWithID(id: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION, id);
    }

    /**
     * %alg of gaze direction with ID %id
     * @param id Gaze direction ID
     * @param alg Gaze direction detection property (excluding ID)
     */
    //% block="ID %id gaze direction %alg "
    //% weight=121
    //% id.min=1 id.defl=1
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function gazeWithID(id: number, alg: Eye_GAZE_PROPERTY_ID): any {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION, id);
        return getEyeGazePropertyValue(r, alg);
    }

    /**
     * %alg of the [INDEX]th gaze direction with ID %id
     * @param id Gaze direction ID
     * @param index Which one (1-based)
     * @param alg Gaze direction detection property (excluding ID)
     */
    //% block="ID %id of the %index th gaze direction %alg"
    //% weight=120
    //% id.min=1 id.defl=1
    //% index.min=1 index.defl=1
    //% group="Gaze Direction Detection"
    //% subcategory="Gaze Direction Detection"
    export function gazeWithIDProperty(id: number, index: number, alg: Eye_GAZE_PROPERTY_ID): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_GAZE_RECOGNITION, id, index - 1);
        return getEyeGazePropertyValue(r, alg);
    }

    //% block="play Music %name  %number"
    //% name.shadow="text"
    //% name.defl="music.mp3"
    //% weight=119
    //% volume.min=0 volume.max=100 volume.defl=50
    //% subcategory="multimedia"
    export function playMusic(name: string = "music.mp3", volume: number = 50): void {
        _playMusic(name, volume);
    }

    let photoName: string = "";
    //% block="takePhoto"
    //% weight=118
    //% subcategory="multimedia"
    export function takePhoto(): void {
       photoName = _takePhoto(eResolution_t.RESOLUTION_1280x720);
    }
    //% block="getStoredPhotoName"
    //% weight=117
    //% subcategory="multimedia"
    export function getStoredPhotoName(): string {
        return photoName;
    }

    let screenshotName: string = "";
    //% block="takeScreenshot"
    //% weight=116
    //% subcategory="multimedia"
    export function takeScreenshot(): void {
        screenshotName = _takeScreenshot();
    }
    //% block="getStoredScreenshotName"
    //% weight=115
    //% subcategory="multimedia"
    export function getStoredScreenshotName(): string {
        return screenshotName;
    }

}