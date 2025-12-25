/**
 * Custom graphic block
 */
//% weight=100 color=#0fbc11 icon="\uf067" block="HuskylensV2"
//% groups='["Communication","Algorithm Switch","Face Recognition","Object Recognition","Object Tracking","Color Recognition","Object Classification","Self-learning Classification","Instance Segmentation","Hand Recognition","Pose Recognition","License Plate Recognition","Optical Char Recognition","Line Tracking","Face Emotion Recognition","Tag Recognition","QR Code Recognition","Barcode Recognition"]'
namespace huskylensV2 {
    // ================= Block =================
    /**
     *  Init I2C until success
     */
    //% weight=200
    //%block="initialize via I2C until success"
    //% group="Communication"
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
            basic.pause(500)
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
        basic.pause(500)
        basic.clearScreen()
    }

    /**
     * Switch algorithm
     * @param alg select algorithm
     */
    //% block="switch algorithm %alg"
    //% weight=199
    //% group="Algorithm Switch"
    export function switchAlgorithm(alg: Algorithm): void {
        let s = switchAlgorithmInternal(algorithmToID(alg));
        while (!s) { 
            basic.pause(1000)
            s = switchAlgorithmInternal(algorithmToID(alg));
        }
    }

    // ========================================================== Face recognition ==================================================
    /**
     * Request one-time face recognition result and store it
     */
    //% block="get face recognition result"
    //% weight=198
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getResultFaceRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_FACE_RECOGNITION);
    }

    /**
     * Whether face recognized
     * Return true if a face is detected
     */
    //% block="available face recogtion"
    //% weight=197
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function availableFaceRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_FACE_RECOGNITION);
    }

    /**
     * Get cached result of the face nearest to the center
     * @param alg face property to query
     */
    //% block="face nearest to center %alg"
    //% weight=196
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getCachedCenterResult(alg: FaceProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_FACE_RECOGNITION);
        return getFacePropertyValue(r, alg);
    }

    /**
     * Get number of detected faces from cache
     */
    //% block="number of detected faces"
    //% weight=195
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getCachedResultNumFace(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_FACE_RECOGNITION);
    }

    /**
     * Get a specific face's property by index from cache
     * @param index face index (1-based)
     * @param alg face property to query
     */
    //% block="face %index %alg"
    //% weight=194
    //% index.min=1 index.defl=1
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getCachedResultFaceProperty(index: number, alg: FaceProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_FACE_RECOGNITION, index - 1);
        return getFacePropertyValue(r, alg);
    }

    /**
     * Get number of learned face IDs
     */
    //% block="number of learned face IDs"
    //% weight=193
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getNumLearnedFaceIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_FACE_RECOGNITION);
    }

    /**
     * Whether face with given ID exists
     * @param index face ID index (number)
     */
    //% block="face ID %index exists?"
    //% weight=192
    //% index.min=1 index.defl=1
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function faceIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_FACE_RECOGNITION, index);
        return r != null;
    }

    /**
     * Get number of faces with a given ID
     * @param index face ID index (number)
     */
    //% block="number of faces with ID %index"
    //% weight=191
    //% index.min=1 index.defl=1
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getNumFaceByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_FACE_RECOGNITION, index);
    }

    /**
     * Get a property for faces with a given ID
     * @param index face ID index (number)
     * @param alg face property (without ID)
     */
    //% block="face ID %index %alg"
    //% weight=190
    //% index.min=1 index.defl=1
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getFacePropertyByID(index: number, alg: FacePropertyID): any {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_FACE_RECOGNITION, index);
        return getFacePropertyValueID(r, alg);
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
    //% group="Face Recognition"
    //% subcategory="Face Recognition"
    export function getFacePropertyByIDNth(id: number, n: number, alg: FacePropertyID): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_FACE_RECOGNITION, id, n - 1);
        return getFacePropertyValueID(r, alg);
    }

    
    // ==================== Algorithm selection enum ====================
    export enum Algorithm {
        //% blockHidden=true
        ALGORITHM_ANY = 0,                      // 0
        //% block="Face recognition"
        ALGORITHM_FACE_RECOGNITION = 1,         // 1
        //% block="Object recognition"
        ALGORITHM_OBJECT_RECOGNITION = 2,       // 2
        //% block="Object tracking"
        ALGORITHM_OBJECT_TRACKING = 3,          // 3
        //% block="Color recognition"
        ALGORITHM_COLOR_RECOGNITION = 4,        // 4
        //% block="Object classification"
        ALGORITHM_OBJECT_CLASSIFICATION = 5,   // 5
        //% block="Self-learning classification"
        ALGORITHM_SELF_LEARNING_CLASSIFICATION = 6, // 6
        //% block="Instance Segmentation"
        ALGORITHM_SEGMENT = 7,                 // 7
        //% block="Hand recognition"
        ALGORITHM_HAND_RECOGNITION = 8,        // 8
        //% block="Pose recognition"
        ALGORITHM_POSE_RECOGNITION = 9,        // 9
        //% block="License plate recognition"
        ALGORITHM_LICENSE_RECOGNITION = 10,      // 10
        //% block="OCR recognition"
        ALGORITHM_OCR_RECOGNITION = 11,          // 11
        //% block="Line tracking"
        ALGORITHM_LINE_TRACKING = 12,            // 12
        //% block="Face Emotion Recognition"
        ALGORITHM_EMOTION_RECOGNITION = 13,     // 13

        //% block="Gaze recognition"
        ALGORITHM_GAZE_RECOGNITION = 14,            // 14
        //% block="Face Orientation"
        ALGORITHM_FACE_ORIENTATION = 15,             // 15
         //% block="Tag recognition"
        ALGORITHM_TAG_RECOGNITION = 16,              // 16
        //% block="Barcode recognition"
        ALGORITHM_BARCODE_RECOGNITION = 17,        // 17
        //% block="QR code recognition"
        ALGORITHM_QRCODE_RECOGNITION = 18,       // 18
        //% block="Fall detection property"
        ALGORITHM_FALLDOWN_RECOGNITION = 19,        // 19

        //% blockHidden=true
        ALGORITHM_CUSTOM0 = 20,                 // 20
        //% blockHidden=true
        ALGORITHM_CUSTOM1 = 21,                 // 21
        //% blockHidden=true
        ALGORITHM_CUSTOM2 = 22,                 // 22
        //% blockHidden=true
        ALGORITHM_BUILTIN_COUNT = 23,           // 23
        //% blockHidden=true
        ALGORITHM_CUSTOM_BEGIN = 128,           // 128
    }


    // Face properties (with ID)
    export enum FaceProperty {
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
        //% block="Left Eye X"
        LeftEyeX,
        //% block="Left Eye Y"
        LeftEyeY,
        //% block="Right Eye X"
        RightEyeX,
        //% block="Right Eye Y"
        RightEyeY,
        //% block="Left Mouth X"
        LeftMouthX,
        //% block="Left Mouth Y"
        LeftMouthY,
        //% block="Right Mouth X"
        RightMouthX,
        //% block="Right Mouth Y"
        RightMouthY,
        //% block="Nose X"
        NoseX,
        //% block="Nose Y"
        NoseY,
    }

    // Face properties (without ID)
    export enum FacePropertyID {
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
        //% block="Left Eye X"
        LeftEyeX,
        //% block="Left Eye Y"
        LeftEyeY,
        //% block="Right Eye X"
        RightEyeX,
        //% block="Right Eye Y"
        RightEyeY,
        //% block="Left Mouth X"
        LeftMouthX,
        //% block="Left Mouth Y"
        LeftMouthY,
        //% block="Right Mouth X"
        RightMouthX,
        //% block="Right Mouth Y"
        RightMouthY,
        //% block="Nose X"
        NoseX,
        //% block="Nose Y"
        NoseY,
    }

    // Object properties (with ID)
    export enum ObjectProperty {
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

    // Object properties (without ID)
    export enum ObjectPropertyID {
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

    // Color properties (with ID)
    export enum ColorProperty {
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

    // Color properties (without ID)
    export enum ColorPropertyID {
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

    // Instance properties (with ID)
    export enum InstanceProperty {
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

    // Instance properties (without ID)
    export enum InstancePropertyID {
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

    // Helper export function: Convert Algorithm enum to algorithm ID
    export function algorithmToID(alg: Algorithm): number {
        return alg as number;
    }

    // Helper export function: Get FaceResult property value
    export function getFacePropertyValue(result: ResultVariant, prop: FaceProperty): any {
        if (!result) return 0;
        if (result instanceof FaceResult) {
            const fr = result as FaceResult;
            switch (prop) {
                case FaceProperty.ID: return fr.ID;
                case FaceProperty.Name: return fr.name; // Return name length or existence flag
                case FaceProperty.XCenter: return fr.xCenter;
                case FaceProperty.YCenter: return fr.yCenter;
                case FaceProperty.Width: return fr.width;
                case FaceProperty.Height: return fr.height;
                case FaceProperty.LeftEyeX: return fr.leye_x;
                case FaceProperty.LeftEyeY: return fr.leye_y;
                case FaceProperty.RightEyeX: return fr.reye_x;
                case FaceProperty.RightEyeY: return fr.reye_y;
                case FaceProperty.LeftMouthX: return fr.lmouth_x;
                case FaceProperty.LeftMouthY: return fr.lmouth_y;
                case FaceProperty.RightMouthX: return fr.rmouth_x;
                case FaceProperty.RightMouthY: return fr.rmouth_y;
                case FaceProperty.NoseX: return fr.nose_x;
                case FaceProperty.NoseY: return fr.nose_y;
                default: return 0;
            }
        }
        // Regular Result also supports basic properties
        const res = result as Result;
        switch (prop) {
            case FaceProperty.ID: return res.ID;
            case FaceProperty.Name: return res.name; // Return name string
            case FaceProperty.XCenter: return res.xCenter;
            case FaceProperty.YCenter: return res.yCenter;
            case FaceProperty.Width: return res.width;
            case FaceProperty.Height: return res.height;
            default: return 0;
        }
    }

    export function getFacePropertyValueID(result: ResultVariant, prop: FacePropertyID): any {
        if (!result) return 0;
        if (result instanceof FaceResult) {
            const fr = result as FaceResult;
            switch (prop) {
                case FacePropertyID.Name: return fr.name;
                case FacePropertyID.XCenter: return fr.xCenter;
                case FacePropertyID.YCenter: return fr.yCenter;
                case FacePropertyID.Width: return fr.width;
                case FacePropertyID.Height: return fr.height;
                case FacePropertyID.LeftEyeX: return fr.leye_x;
                case FacePropertyID.LeftEyeY: return fr.leye_y;
                case FacePropertyID.RightEyeX: return fr.reye_x;
                case FacePropertyID.RightEyeY: return fr.reye_y;
                case FacePropertyID.LeftMouthX: return fr.lmouth_x;
                case FacePropertyID.LeftMouthY: return fr.lmouth_y;
                case FacePropertyID.RightMouthX: return fr.rmouth_x;
                case FacePropertyID.RightMouthY: return fr.rmouth_y;
                case FacePropertyID.NoseX: return fr.nose_x;
                case FacePropertyID.NoseY: return fr.nose_y;
                default: return 0;
            }
        }
        const res = result as Result;
        switch (prop) {
            case FacePropertyID.Name: return res.name;
            case FacePropertyID.XCenter: return res.xCenter;
            case FacePropertyID.YCenter: return res.yCenter;
            case FacePropertyID.Width: return res.width;
            case FacePropertyID.Height: return res.height;
            default: return 0;
        }
    }

    export function getObjectPropertyValue(result: ResultVariant, prop: ObjectProperty): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case ObjectProperty.ID: return res.ID;
            case ObjectProperty.Name: return res.name.length > 0 ? res.name : "";
            case ObjectProperty.XCenter: return res.xCenter;
            case ObjectProperty.YCenter: return res.yCenter;
            case ObjectProperty.Width: return res.width;
            case ObjectProperty.Height: return res.height;
            default: return 0;
        }
    }

    export function getObjectPropertyValueID(result: ResultVariant, prop: ObjectPropertyID): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case ObjectPropertyID.Name: return res.name.length > 0 ? res.name : "";
            case ObjectPropertyID.XCenter: return res.xCenter;
            case ObjectPropertyID.YCenter: return res.yCenter;
            case ObjectPropertyID.Width: return res.width;
            case ObjectPropertyID.Height: return res.height;
            default: return 0;
        }
    }

    export class FaceResult extends Result {
        leye_x: number = 0; leye_y: number = 0;
        reye_x: number = 0; reye_y: number = 0;
        nose_x: number = 0; nose_y: number = 0;
        lmouth_x: number = 0; lmouth_y: number = 0;
        rmouth_x: number = 0; rmouth_y: number = 0;

        constructor(buf: Buffer) {
            super(buf);
            let name_length = buf[10];
            let content_length = buf[11 + name_length];

            let offset = 12 + content_length + name_length;

            this.leye_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.leye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.reye_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.reye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.nose_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.nose_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lmouth_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lmouth_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rmouth_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rmouth_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
        }
    }

    export class HandResult extends Result {
        wrist_x: number = 0; wrist_y: number = 0;
        thumb_cmc_x: number = 0; thumb_cmc_y: number = 0;
        thumb_mcp_x: number = 0; thumb_mcp_y: number = 0;
        thumb_ip_x: number = 0; thumb_ip_y: number = 0;
        thumb_tip_x: number = 0; thumb_tip_y: number = 0;
        index_finger_mcp_x: number = 0; index_finger_mcp_y: number = 0;
        index_finger_pip_x: number = 0; index_finger_pip_y: number = 0;
        index_finger_dip_x: number = 0; index_finger_dip_y: number = 0;
        index_finger_tip_x: number = 0; index_finger_tip_y: number = 0;
        middle_finger_mcp_x: number = 0; middle_finger_mcp_y: number = 0;
        middle_finger_pip_x: number = 0; middle_finger_pip_y: number = 0;
        middle_finger_dip_x: number = 0; middle_finger_dip_y: number = 0;
        middle_finger_tip_x: number = 0; middle_finger_tip_y: number = 0;
        ring_finger_mcp_x: number = 0; ring_finger_mcp_y: number = 0;
        ring_finger_pip_x: number = 0; ring_finger_pip_y: number = 0;
        ring_finger_dip_x: number = 0; ring_finger_dip_y: number = 0;
        ring_finger_tip_x: number = 0; ring_finger_tip_y: number = 0;
        pinky_finger_mcp_x: number = 0; pinky_finger_mcp_y: number = 0;
        pinky_finger_pip_x: number = 0; pinky_finger_pip_y: number = 0;
        pinky_finger_dip_x: number = 0; pinky_finger_dip_y: number = 0;
        pinky_finger_tip_x: number = 0; pinky_finger_tip_y: number = 0;

        constructor(buf: Buffer) {
            super(buf);
            let name_length = buf[10];
            let content_length = buf[11 + name_length];
            let offset = 12 + content_length + name_length;

            this.wrist_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.wrist_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_cmc_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_cmc_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_ip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_ip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
        }
    }

    export class PoseResult extends Result {
        nose_x: number = 0; nose_y: number = 0;
        leye_x: number = 0; leye_y: number = 0;
        reye_x: number = 0; reye_y: number = 0;
        lear_x: number = 0; lear_y: number = 0;
        rear_x: number = 0; rear_y: number = 0;
        lshoulder_x: number = 0; lshoulder_y: number = 0;
        rshoulder_x: number = 0; rshoulder_y: number = 0;
        lelbow_x: number = 0; lelbow_y: number = 0;
        relbow_x: number = 0; relbow_y: number = 0;
        lwrist_x: number = 0; lwrist_y: number = 0;
        rwrist_x: number = 0; rwrist_y: number = 0;
        lhip_x: number = 0; lhip_y: number = 0;
        rhip_x: number = 0; rhip_y: number = 0;
        lknee_x: number = 0; lknee_y: number = 0;
        rknee_x: number = 0; rknee_y: number = 0;
        lankle_x: number = 0; lankle_y: number = 0;
        rankle_x: number = 0; rankle_y: number = 0;

        constructor(buf: Buffer) {
            super(buf);
            let name_length = buf[10];
            let content_length = buf[11 + name_length];
            let offset = 12 + content_length + name_length;

            this.nose_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.nose_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.leye_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.leye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.reye_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.reye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lear_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lear_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rear_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rear_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lshoulder_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lshoulder_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rshoulder_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rshoulder_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lelbow_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lelbow_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.relbow_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.relbow_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lwrist_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lwrist_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rwrist_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rwrist_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lhip_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lhip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rhip_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rhip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lknee_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lknee_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rknee_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rknee_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lankle_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lankle_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rankle_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rankle_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
        }
    }

    // ====================================================== Object Recognition ===============================================

    /** Get one-time object recognition result and cache it */
    //% block="get object recognition result"
    //% weight=188
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getResultObjectRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Whether object detected */
    //% block="object detected?"
    //% weight=187
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function availableObjectRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Object property nearest to center */
    //% block="object nearest to center %alg"
    //% weight=186
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getCachedCenterObjectResult(alg: ObjectProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
        return getObjectPropertyValue(r, alg);
    }

    /** Total number of detected objects */
    //% block="number of detected objects"
    //% weight=185
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getCachedResultNumObject(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Property of Nth object */
    //% block="object %index %alg"
    //% weight=184
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getCachedResultObjectProperty(index: number, alg: ObjectProperty): number {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index - 1);
        return getObjectPropertyValue(r, alg);
    }

    /** Total number of learned object IDs */
    //% block="number of learned object IDs"
    //% weight=183
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getNumLearnedObjectIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Whether object with specified ID exists */
    //% block="object ID %index exists?"
    //% weight=182
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function objectIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index);
        return r != null;
    }

    /** Number of objects with specified ID */
    //% block="number of objects with ID %index"
    //% weight=181
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getNumObjectByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index);
    }

    /** Property of object with specified ID */
    //% block="object ID %index %alg"
    //% weight=180
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getObjectPropertyByID(index: number, alg: ObjectPropertyID): number {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index);
        return getObjectPropertyValueID(r, alg);
    }

    /** Property of Nth object with specified ID */
    //% block="object ID %id nth %n %alg"
    //% weight=179
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% group="Object Recognition"
    //% subcategory="Object Recognition"
    export function getObjectPropertyByIDNth(id: number, n: number, alg: ObjectPropertyID): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, id, n - 1);
        return getObjectPropertyValueID(r, alg);
    }

    // =============================================================== Object Tracking ========================================
    /** Request one-time object tracking data and store in result */
    //% block="get object tracking result"
    //% weight=178
    //% group="Object Tracking"
    //% subcategory="Object Tracking"
    export function getResultObjectTracking(): void {
        getResultInternal(Algorithm.ALGORITHM_OBJECT_TRACKING);
    }

    /** Whether tracked object detected */
    //% block="tracked object detected?"
    //% weight=177
    //% group="Object Tracking"
    //% subcategory="Object Tracking"
    export function availableObjectTracking(): boolean {
        return availableInternal(Algorithm.ALGORITHM_OBJECT_TRACKING);
    }

    /** Property of tracked object */
    //% block="tracked object %alg"
    //% weight=176
    //% group="Object Tracking"
    //% subcategory="Object Tracking"
    export function getCachedObjectTrackingResult(alg: ObjectProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_OBJECT_TRACKING);
        return getObjectPropertyValue(r, alg);
    }

    // ================= Color Recognition =================
    export function getColorPropertyValue(result: ResultVariant, prop: ColorProperty): number {
        return getObjectPropertyValue(result, prop as any);
    }

    export function getColorPropertyValueID(result: ResultVariant, prop: ColorPropertyID): number {
        return getObjectPropertyValueID(result, prop as any);
    }

    /** Get one-time color recognition result and cache it */
    //% block="get color recognition result"
    //% weight=175
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getResultColorRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Whether color block detected */
    //% block="color block detected?"
    //% weight=174
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function availableColorRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Color block property nearest to center */
    //% block="color block nearest to center %alg"
    //% weight=173
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getCachedCenterColorResult(alg: ColorProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
        return getColorPropertyValue(r, alg);
    }

    /** Total number of detected color blocks */
    //% block="number of detected color blocks"
    //% weight=172
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getCachedResultNumColor(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Property of Nth color block */
    //% block="color block %index %alg"
    //% weight=171
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getCachedResultColorProperty(index: number, alg: ColorProperty): number {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index - 1);
        return getColorPropertyValue(r, alg);
    }

    /** Total number of learned color block IDs */
    //% block="number of learned color block IDs"
    //% weight=170
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getNumLearnedColorIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Whether color block with specified ID exists */
    //% block="color block ID %index exists?"
    //% weight=169
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function colorIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index);
        return r != null;
    }

    /** Number of color blocks with specified ID */
    //% block="number of color blocks with ID %index"
    //% weight=168
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getNumColorByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index);
    }

    /** Property of color block with specified ID */
    //% block="color block ID %index %alg"
    //% weight=167
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getColorPropertyByID(index: number, alg: ColorPropertyID): number {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index);
        return getColorPropertyValueID(r, alg);
    }

    /** Property of Nth color block with specified ID */
    //% block="color block ID %id nth %n %alg"
    //% weight=166
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% group="Color Recognition"
    //% subcategory="Color Recognition"
    export function getColorPropertyByIDNth(id: number, n: number, alg: ColorPropertyID): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, id, n - 1);
        return getColorPropertyValueID(r, alg);
    }


    // ============================================== Object Classification============================================================
    // Object classification properties (only ID and Name)
    export enum ObjectClassificationProperty {
        //% block="ID"
        ID,
        //% block="Name"
        Name,
    }

    function getObjectClassificationPropertyValue(result: ResultVariant, prop: ObjectClassificationProperty): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case ObjectClassificationProperty.ID: return res.classID;
            case ObjectClassificationProperty.Name: return res.name.length > 0 ? res.name : "";
            default: return 0;
        }
    }

    /** Request one-time object classification data and store in result */
    //% block="get object classification result"
    //% weight=4
    //% group="Object Classification"
    //% subcategory="Object Classification"
    export function getResultObjectClassification(): void {
        getResultInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION);
    }
    /** Whether classified object detected */
    //% block="classified object detected?"
    //% weight=3
    //% group="Object Classification"
    //% subcategory="Object Classification"
    export function availableObjectClassification(): boolean {
        return availableInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION);
    }

    /** Total number of detected classified objects */
    //% block="number of detected classified objects"
    //% weight=2
    //% group="Object Classification"
    //% subcategory="Object Classification"
    export function getCachedResultNumObjectClassification(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION);
    }

    /** Property of Nth classified object */
    //% block="classified object %num %alg"
    //% weight=1
    //% num.min=1 num.defl=1
    //% group="Object Classification"
    //% subcategory="Object Classification"
    export function getCachedObjectClassificationResult(num: number, alg: ObjectClassificationProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION, num - 1);
        return getObjectClassificationPropertyValue(r, alg);
    }



    // ==================================================== Self-Learning Classification ========================================
    // Self-learning classification properties (only ID and Name)
    export enum SelfLearningClassificationProperty {
        //% block="ID"
        ID,
        //% block="Name"
        Name,
    }

    export function getSelfLearningClassificationPropertyValue(result: ResultVariant, prop: SelfLearningClassificationProperty): any {
        if (!result) return 0;
        const res = result as Result;
        switch (prop) {
            case SelfLearningClassificationProperty.ID: return res.ID;
            case SelfLearningClassificationProperty.Name: return res.name.length > 0 ? res.name : "";
            default: return 0;
        }
    }

    /** Request one-time self-learning classification data and store in result */
    //% block="get self-learning classification result"
    //% weight=162
    //% group="Self-learning Classification"
    //% subcategory="Self-learning Classification"
    export function getResultSelfLearningClassification(): void {
        getResultInternal(Algorithm.ALGORITHM_SELF_LEARNING_CLASSIFICATION);
    }

    /** Whether self-learning classification detected */
    //% block="self-learning classification detected?"
    //% weight=161
    //% group="Self-learning Classification"
    //% subcategory="Self-learning Classification"
    export function availableSelfLearningClassification(): boolean {
        return availableInternal(Algorithm.ALGORITHM_SELF_LEARNING_CLASSIFICATION);
    }

    /** Property of self-learning classification */
    //% block="self-learning classification %alg"
    //% weight=160
    //% group="Self-learning Classification"
    //% subcategory="Self-learning Classification"
    export function getCachedSelfLearningClassificationResult(alg: SelfLearningClassificationProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_SELF_LEARNING_CLASSIFICATION);
        return getSelfLearningClassificationPropertyValue(r, alg);
    }

    // =================================================== Instance Segmentation ===================================================
    export function getInstancePropertyValue(result: ResultVariant, prop: InstanceProperty): number {
        return getObjectPropertyValue(result, prop as any);
    }

    export function getInstancePropertyValueID(result: ResultVariant, prop: InstancePropertyID): number {
        return getObjectPropertyValueID(result, prop as any);
    }

    /** Get one-time instance segmentation result and cache it */
    //% block="get instance segmentation result"
    //% weight=159
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getResultInstanceRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Whether instance detected */
    //% block="instance detected?"
    //% weight=158
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function availableInstanceRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Instance property nearest to center */
    //% block="instance nearest to center %alg"
    //% weight=157
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getCachedCenterInstanceResult(alg: InstanceProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_SEGMENT);
        return getInstancePropertyValue(r, alg);
    }

    /** Total number of detected instances */
    //% block="number of detected instances"
    //% weight=156
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getCachedResultNumInstance(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Property of Nth instance */
    //% block="instance %index %alg"
    //% weight=155
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getCachedResultInstanceProperty(index: number, alg: InstanceProperty): number {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_SEGMENT, index - 1);
        return getInstancePropertyValue(r, alg);
    }

    /** Total number of learned instance IDs */
    //% block="number of learned instance IDs"
    //% weight=154
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getNumLearnedInstanceIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Whether instance with specified ID exists */
    //% block="instance ID %index exists?"
    //% weight=153
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function instanceIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_SEGMENT, index);
        return r != null;
    }

    /** Number of instances with specified ID */
    //% block="number of instances with ID %index"
    //% weight=152
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getNumInstanceByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_SEGMENT, index);
    }

    /** Property of instance with specified ID */
    //% block="instance ID %index %alg"
    //% weight=151
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getInstancePropertyByID(index: number, alg: InstancePropertyID): number {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_SEGMENT, index);
        return getInstancePropertyValueID(r, alg);
    }

    /** Property of Nth instance with specified ID */
    //% block="instance ID %id nth %n %alg"
    //% weight=150
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% group="Instance Segmentation"
    //% subcategory="Instance Segmentation"
    export function getInstancePropertyByIDNth(id: number, n: number, alg: InstancePropertyID): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_SEGMENT, id, n - 1);
        return getInstancePropertyValueID(r, alg);
    }

}