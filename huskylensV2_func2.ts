/**
 * Custom graphic block
 */
//% weight=100 color=#0fbc11 icon="\uf067" block="HuskylensV2"
//% groups='["Communication","Algorithm Switch","Face Recognition","Object Recognition","Object Tracking","Color Recognition","Object Classification","Self-learning Classification","Instance Segmentation","Hand Recognition","Pose Recognition","License Plate Recognition","Optical Char Recognition","Line Tracking","Face Emotion Recognition","Tag Recognition","QR Code Recognition","Barcode Recognition"]'
namespace huskylensV2 {

    // ================= Hand Recognition =================
    function getGesturePropertyValue(result: ResultVariant, prop: GestureProperty): any {
        if (!result) return 0;
        if (result instanceof HandResult) {
            const hr = result as HandResult;
            switch (prop) {
                case GestureProperty.ID: return hr.ID;
                case GestureProperty.Name: return hr.name.length > 0 ? hr.name : "";
                case GestureProperty.XCenter: return hr.xCenter;
                case GestureProperty.YCenter: return hr.yCenter;
                case GestureProperty.Width: return hr.width;
                case GestureProperty.Height: return hr.height;
                case GestureProperty.ThumbBaseX: return hr.thumb_cmc_x;
                case GestureProperty.ThumbBaseY: return hr.thumb_cmc_y;
                case GestureProperty.ThumbMiddleJointX: return hr.thumb_mcp_x;
                case GestureProperty.ThumbMiddleJointY: return hr.thumb_mcp_y;
                case GestureProperty.ThumbSecondJointX: return hr.thumb_ip_x;
                case GestureProperty.ThumbSecondJointY: return hr.thumb_ip_y;
                case GestureProperty.ThumbTipX: return hr.thumb_tip_x;
                case GestureProperty.ThumbTipY: return hr.thumb_tip_y;
                case GestureProperty.IndexFingerBaseX: return hr.index_finger_mcp_x;
                case GestureProperty.IndexFingerBaseY: return hr.index_finger_mcp_y;
                case GestureProperty.IndexFingerFirstJointX: return hr.index_finger_pip_x;
                case GestureProperty.IndexFingerFirstJointY: return hr.index_finger_pip_y;
                case GestureProperty.IndexFingerSecondJointX: return hr.index_finger_dip_x;
                case GestureProperty.IndexFingerSecondJointY: return hr.index_finger_dip_y;
                case GestureProperty.IndexFingerTipX: return hr.index_finger_tip_x;
                case GestureProperty.IndexFingerTipY: return hr.index_finger_tip_y;
                case GestureProperty.MiddleFingerBaseX: return hr.middle_finger_mcp_x;
                case GestureProperty.MiddleFingerBaseY: return hr.middle_finger_mcp_y;
                case GestureProperty.MiddleFingerFirstJointX: return hr.middle_finger_pip_x;
                case GestureProperty.MiddleFingerFirstJointY: return hr.middle_finger_pip_y;
                case GestureProperty.MiddleFingerSecondJointX: return hr.middle_finger_dip_x;
                case GestureProperty.MiddleFingerSecondJointY: return hr.middle_finger_dip_y;
                case GestureProperty.MiddleFingerTipX: return hr.middle_finger_tip_x;
                case GestureProperty.MiddleFingerTipY: return hr.middle_finger_tip_y;
                case GestureProperty.RingFingerBaseX: return hr.ring_finger_mcp_x;
                case GestureProperty.RingFingerBaseY: return hr.ring_finger_mcp_y;
                case GestureProperty.RingFingerFirstJointX: return hr.ring_finger_pip_x;
                case GestureProperty.RingFingerFirstJointY: return hr.ring_finger_pip_y;
                case GestureProperty.RingFingerSecondJointX: return hr.ring_finger_dip_x;
                case GestureProperty.RingFingerSecondJointY: return hr.ring_finger_dip_y;
                case GestureProperty.RingFingerTipX: return hr.ring_finger_tip_x;
                case GestureProperty.RingFingerTipY: return hr.ring_finger_tip_y;
                case GestureProperty.PinkyFingerBaseX: return hr.pinky_finger_mcp_x;
                case GestureProperty.PinkyFingerBaseY: return hr.pinky_finger_mcp_y;
                case GestureProperty.PinkyFingerFirstJointX: return hr.pinky_finger_pip_x;
                case GestureProperty.PinkyFingerFirstJointY: return hr.pinky_finger_pip_y;
                case GestureProperty.PinkyFingerSecondJointX: return hr.pinky_finger_dip_x;
                case GestureProperty.PinkyFingerSecondJointY: return hr.pinky_finger_dip_y;
                case GestureProperty.PinkyFingerTipX: return hr.pinky_finger_tip_x;
                case GestureProperty.PinkyFingerTipY: return hr.pinky_finger_tip_y;
                default: return 0;
            }
        }
        return getObjectPropertyValue(result, prop as any);
    }

    function getGesturePropertyValueID(result: ResultVariant, prop: GesturePropertyID): any {
        if (!result) return 0;
        if (result instanceof HandResult) {
            const hr = result as HandResult;
            switch (prop) {
                case GesturePropertyID.Name: return hr.name.length > 0 ? hr.name : "";
                case GesturePropertyID.XCenter: return hr.xCenter;
                case GesturePropertyID.YCenter: return hr.yCenter;
                case GesturePropertyID.Width: return hr.width;
                case GesturePropertyID.Height: return hr.height;
                case GesturePropertyID.confidence: return hr.confidence;
                case GesturePropertyID.WristX: return hr.wrist_x;
                case GesturePropertyID.WristY: return hr.wrist_y;
                case GesturePropertyID.ThumbBaseX: return hr.thumb_cmc_x;
                case GesturePropertyID.ThumbBaseY: return hr.thumb_cmc_y;
                case GesturePropertyID.ThumbMiddleJointX: return hr.thumb_mcp_x;
                case GesturePropertyID.ThumbMiddleJointY: return hr.thumb_mcp_y;
                case GesturePropertyID.ThumbSecondJointX: return hr.thumb_ip_x;
                case GesturePropertyID.ThumbSecondJointY: return hr.thumb_ip_y;
                case GesturePropertyID.ThumbTipX: return hr.thumb_tip_x;
                case GesturePropertyID.ThumbTipY: return hr.thumb_tip_y;
                case GesturePropertyID.IndexFingerBaseX: return hr.index_finger_mcp_x;
                case GesturePropertyID.IndexFingerBaseY: return hr.index_finger_mcp_y;
                case GesturePropertyID.IndexFingerFirstJointX: return hr.index_finger_pip_x;
                case GesturePropertyID.IndexFingerFirstJointY: return hr.index_finger_pip_y;
                case GesturePropertyID.IndexFingerSecondJointX: return hr.index_finger_dip_x;
                case GesturePropertyID.IndexFingerSecondJointY: return hr.index_finger_dip_y;
                case GesturePropertyID.IndexFingerTipX: return hr.index_finger_tip_x;
                case GesturePropertyID.IndexFingerTipY: return hr.index_finger_tip_y;
                case GesturePropertyID.MiddleFingerBaseX: return hr.middle_finger_mcp_x;
                case GesturePropertyID.MiddleFingerBaseY: return hr.middle_finger_mcp_y;
                case GesturePropertyID.MiddleFingerFirstJointX: return hr.middle_finger_pip_x;
                case GesturePropertyID.MiddleFingerFirstJointY: return hr.middle_finger_pip_y;
                case GesturePropertyID.MiddleFingerSecondJointX: return hr.middle_finger_dip_x;
                case GesturePropertyID.MiddleFingerSecondJointY: return hr.middle_finger_dip_y;
                case GesturePropertyID.MiddleFingerTipX: return hr.middle_finger_tip_x;
                case GesturePropertyID.MiddleFingerTipY: return hr.middle_finger_tip_y;
                case GesturePropertyID.RingFingerBaseX: return hr.ring_finger_mcp_x;
                case GesturePropertyID.RingFingerBaseY: return hr.ring_finger_mcp_y;
                case GesturePropertyID.RingFingerFirstJointX: return hr.ring_finger_pip_x;
                case GesturePropertyID.RingFingerFirstJointY: return hr.ring_finger_pip_y;
                case GesturePropertyID.RingFingerSecondJointX: return hr.ring_finger_dip_x;
                case GesturePropertyID.RingFingerSecondJointY: return hr.ring_finger_dip_y;
                case GesturePropertyID.RingFingerTipX: return hr.ring_finger_tip_x;
                case GesturePropertyID.RingFingerTipY: return hr.ring_finger_tip_y;
                case GesturePropertyID.PinkyFingerBaseX: return hr.pinky_finger_mcp_x;
                case GesturePropertyID.PinkyFingerBaseY: return hr.pinky_finger_mcp_y;
                case GesturePropertyID.PinkyFingerFirstJointX: return hr.pinky_finger_pip_x;
                case GesturePropertyID.PinkyFingerFirstJointY: return hr.pinky_finger_pip_y;
                case GesturePropertyID.PinkyFingerSecondJointX: return hr.pinky_finger_dip_x;
                case GesturePropertyID.PinkyFingerSecondJointY: return hr.pinky_finger_dip_y;
                case GesturePropertyID.PinkyFingerTipX: return hr.pinky_finger_tip_x;
                case GesturePropertyID.PinkyFingerTipY: return hr.pinky_finger_tip_y;
                default: return 0;
            }
        }
        return getObjectPropertyValueID(result, prop as any);
    }

    // Gesture properties (with ID)
    export enum GestureProperty {
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
        //% block="Thumb Base X"
        ThumbBaseX,
        //% block="Thumb Base Y"
        ThumbBaseY,
        //% block="Thumb Middle Joint X"
        ThumbMiddleJointX,
        //% block="Thumb Middle Joint Y"
        ThumbMiddleJointY,
        //% block="Thumb Second Joint X"
        ThumbSecondJointX,
        //% block="Thumb Second Joint Y"
        ThumbSecondJointY,
        //% block="Thumb Tip X"
        ThumbTipX,
        //% block="Thumb Tip Y"
        ThumbTipY,
        //% block="Index Finger Base X"
        IndexFingerBaseX,
        //% block="Index Finger Base Y"
        IndexFingerBaseY,
        //% block="Index Finger First Joint X"
        IndexFingerFirstJointX,
        //% block="Index Finger First Joint Y"
        IndexFingerFirstJointY,
        //% block="Index Finger Second Joint X"
        IndexFingerSecondJointX,
        //% block="Index Finger Second Joint Y"
        IndexFingerSecondJointY,
        //% block="Index Finger Tip X"
        IndexFingerTipX,
        //% block="Index Finger Tip Y"
        IndexFingerTipY,
        //% block="Middle Finger Base X"
        MiddleFingerBaseX,
        //% block="Middle Finger Base Y"
        MiddleFingerBaseY,
        //% block="Middle Finger First Joint X"
        MiddleFingerFirstJointX,
        //% block="Middle Finger First Joint Y"
        MiddleFingerFirstJointY,
        //% block="Middle Finger Second Joint X"
        MiddleFingerSecondJointX,
        //% block="Middle Finger Second Joint Y"
        MiddleFingerSecondJointY,
        //% block="Middle Finger Tip X"
        MiddleFingerTipX,
        //% block="Middle Finger Tip Y"
        MiddleFingerTipY,
        //% block="Ring Finger Base X"
        RingFingerBaseX,
        //% block="Ring Finger Base Y"
        RingFingerBaseY,
        //% block="Ring Finger First Joint X"
        RingFingerFirstJointX,
        //% block="Ring Finger First Joint Y"
        RingFingerFirstJointY,
        //% block="Ring Finger Second Joint X"
        RingFingerSecondJointX,
        //% block="Ring Finger Second Joint Y"
        RingFingerSecondJointY,
        //% block="Ring Finger Tip X"
        RingFingerTipX,
        //% block="Ring Finger Tip Y"
        RingFingerTipY,
        //% block="Pinky Finger Base X"
        PinkyFingerBaseX,
        //% block="Pinky Finger Base Y"
        PinkyFingerBaseY,
        //% block="Pinky Finger First Joint X"
        PinkyFingerFirstJointX,
        //% block="Pinky Finger First Joint Y"
        PinkyFingerFirstJointY,
        //% block="Pinky Finger Second Joint X"
        PinkyFingerSecondJointX,
        //% block="Pinky Finger Second Joint Y"
        PinkyFingerSecondJointY,
        //% block="Pinky Finger Tip X"
        PinkyFingerTipX,
        //% block="Pinky Finger Tip Y"
        PinkyFingerTipY,
    }

    // Gesture properties (without ID)
    export enum GesturePropertyID {
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
        //% block="confidence"
        confidence,
        //% block="Wrist X"
        WristX,
        //% block="Wrist Y"
        WristY,
        //% block="Thumb Base X"
        ThumbBaseX,
        //% block="Thumb Base Y"
        ThumbBaseY,
        //% block="Thumb Middle Joint X"
        ThumbMiddleJointX,
        //% block="Thumb Middle Joint Y"
        ThumbMiddleJointY,
        //% block="Thumb Second Joint X"
        ThumbSecondJointX,
        //% block="Thumb Second Joint Y"
        ThumbSecondJointY,
        //% block="Thumb Tip X"
        ThumbTipX,
        //% block="Thumb Tip Y"
        ThumbTipY,
        //% block="Index Finger Base X"
        IndexFingerBaseX,
        //% block="Index Finger Base Y"
        IndexFingerBaseY,
        //% block="Index Finger First Joint X"
        IndexFingerFirstJointX,
        //% block="Index Finger First Joint Y"
        IndexFingerFirstJointY,
        //% block="Index Finger Second Joint X"
        IndexFingerSecondJointX,
        //% block="Index Finger Second Joint Y"
        IndexFingerSecondJointY,
        //% block="Index Finger Tip X"
        IndexFingerTipX,
        //% block="Index Finger Tip Y"
        IndexFingerTipY,
        //% block="Middle Finger Base X"
        MiddleFingerBaseX,
        //% block="Middle Finger Base Y"
        MiddleFingerBaseY,
        //% block="Middle Finger First Joint X"
        MiddleFingerFirstJointX,
        //% block="Middle Finger First Joint Y"
        MiddleFingerFirstJointY,
        //% block="Middle Finger Second Joint X"
        MiddleFingerSecondJointX,
        //% block="Middle Finger Second Joint Y"
        MiddleFingerSecondJointY,
        //% block="Middle Finger Tip X"
        MiddleFingerTipX,
        //% block="Middle Finger Tip Y"
        MiddleFingerTipY,
        //% block="Ring Finger Base X"
        RingFingerBaseX,
        //% block="Ring Finger Base Y"
        RingFingerBaseY,
        //% block="Ring Finger First Joint X"
        RingFingerFirstJointX,
        //% block="Ring Finger First Joint Y"
        RingFingerFirstJointY,
        //% block="Ring Finger Second Joint X"
        RingFingerSecondJointX,
        //% block="Ring Finger Second Joint Y"
        RingFingerSecondJointY,
        //% block="Ring Finger Tip X"
        RingFingerTipX,
        //% block="Ring Finger Tip Y"
        RingFingerTipY,
        //% block="Pinky Finger Base X"
        PinkyFingerBaseX,
        //% block="Pinky Finger Base Y"
        PinkyFingerBaseY,
        //% block="Pinky Finger First Joint X"
        PinkyFingerFirstJointX,
        //% block="Pinky Finger First Joint Y"
        PinkyFingerFirstJointY,
        //% block="Pinky Finger Second Joint X"
        PinkyFingerSecondJointX,
        //% block="Pinky Finger Second Joint Y"
        PinkyFingerSecondJointY,
        //% block="Pinky Finger Tip X"
        PinkyFingerTipX,
        //% block="Pinky Finger Tip Y"
        PinkyFingerTipY,
    }

    /** Get one-time Hand Recognition result and cache it */
    //% block="get Hand Recognition result"
    //% weight=149
    //% group="Hand Recognition"
    export function getResultGestureRecogtion(): void {
        getResultInternal(ALGORITHM_HAND_RECOGNITION);
    }

    /** Whether gesture detected */
    //% block="gesture detected?"
    //% weight=148
    //% group="Hand Recognition"
    export function availableGestureRecogtion(): boolean {
        return availableInternal(ALGORITHM_HAND_RECOGNITION);
    }

    /** Gesture property nearest to center */
    //% block="gesture nearest to center %alg"
    //% weight=147
    //% group="Hand Recognition"
    export function getCachedCenterGestureResult(alg: GestureProperty): any {
        const r = getCachedCenterResultInternal(ALGORITHM_HAND_RECOGNITION);
        return getGesturePropertyValue(r, alg);
    }

    /** Total number of detected gestures */
    //% block="number of detected gestures"
    //% weight=146
    //% group="Hand Recognition"
    export function getCachedResultNumGesture(): number {
        return getCachedResultNumInternal(ALGORITHM_HAND_RECOGNITION);
    }

    /** Property of Nth gesture */
    //% block="gesture %index %alg"
    //% weight=145
    //% index.min=1 index.defl=1
    //% group="Hand Recognition"
    export function getCachedResultGestureProperty(index: number, alg: GestureProperty): any {
        const r = getCachedResultByIndexInternal(ALGORITHM_HAND_RECOGNITION, index - 1);
        return getGesturePropertyValue(r, alg);
    }

    /** Total number of learned gesture IDs */
    //% block="number of learned gesture IDs"
    //% weight=144
    //% group="Hand Recognition"
    export function getNumLearnedGestureIDs(): number {
        return getCachedResultLearnedNumInternal(ALGORITHM_HAND_RECOGNITION);
    }

    /** Whether gesture with specified ID exists */
    //% block="gesture ID %index exists?"
    //% weight=143
    //% index.min=1 index.defl=1
    //% group="Hand Recognition"
    export function gestureIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(ALGORITHM_HAND_RECOGNITION, index);
        return r != null;
    }

    /** Number of gestures with specified ID */
    //% block="number of gestures with ID %index"
    //% weight=142
    //% index.min=1 index.defl=1
    //% group="Hand Recognition"
    export function getNumGestureByID(index: number): number {
        return getCachedResultNumByIDInternal(ALGORITHM_HAND_RECOGNITION, index);
    }

    /** Property of gesture with specified ID */
    //% block="gesture ID %index %alg"
    //% weight=141
    //% index.min=1 index.defl=1
    //% group="Hand Recognition"
    export function getGesturePropertyByID(index: number, alg: GesturePropertyID): any {
        const r = getCachedResultByIDInternal(ALGORITHM_HAND_RECOGNITION, index);
        return getGesturePropertyValueID(r, alg);
    }

    /** Property of Nth gesture with specified ID */
    //% block="gesture ID %id nth %n %alg"
    //% weight=140
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% group="Hand Recognition"
    export function getGesturePropertyByIDNth(id: number, n: number, alg: GesturePropertyID): any {
        const r = getCachedIndexResultByIDInternal(ALGORITHM_HAND_RECOGNITION, id, n - 1);
        return getGesturePropertyValueID(r, alg);
    }

    // ================= Pose Recognition (Human Pose) =================
    function getPosePropertyValue(result: ResultVariant, prop: PoseProperty): any {
        if (!result) return 0;
        if (result instanceof PoseResult) {
            const pr = result as PoseResult;
            switch (prop) {
                case PoseProperty.ID: return pr.ID;
                case PoseProperty.Name: return pr.name.length > 0 ? pr.name : "";
                case PoseProperty.XCenter: return pr.xCenter;
                case PoseProperty.YCenter: return pr.yCenter;
                case PoseProperty.Width: return pr.width;
                case PoseProperty.Height: return pr.height;
                case PoseProperty.NoseX: return pr.nose_x;
                case PoseProperty.NoseY: return pr.nose_y;
                case PoseProperty.LeftEyeX: return pr.leye_x;
                case PoseProperty.LeftEyeY: return pr.leye_y;
                case PoseProperty.RightEyeX: return pr.reye_x;
                case PoseProperty.RightEyeY: return pr.reye_y;
                case PoseProperty.LeftEarX: return pr.lear_x;
                case PoseProperty.LeftEarY: return pr.lear_y;
                case PoseProperty.RightEarX: return pr.rear_x;
                case PoseProperty.RightEarY: return pr.rear_y;
                case PoseProperty.LeftShoulderX: return pr.lshoulder_x;
                case PoseProperty.LeftShoulderY: return pr.lshoulder_y;
                case PoseProperty.RightShoulderX: return pr.rshoulder_x;
                case PoseProperty.RightShoulderY: return pr.rshoulder_y;
                case PoseProperty.LeftElbowX: return pr.lelbow_x;
                case PoseProperty.LeftElbowY: return pr.lelbow_y;
                case PoseProperty.RightElbowX: return pr.relbow_x;
                case PoseProperty.RightElbowY: return pr.relbow_y;
                case PoseProperty.LeftWristX: return pr.lwrist_x;
                case PoseProperty.LeftWristY: return pr.lwrist_y;
                case PoseProperty.RightWristX: return pr.rwrist_x;
                case PoseProperty.RightWristY: return pr.rwrist_y;
                case PoseProperty.LeftHipX: return pr.lhip_x;
                case PoseProperty.LeftHipY: return pr.lhip_y;
                case PoseProperty.RightHipX: return pr.rhip_x;
                case PoseProperty.RightHipY: return pr.rhip_y;
                case PoseProperty.LeftKneeX: return pr.lknee_x;
                case PoseProperty.LeftKneeY: return pr.lknee_y;
                case PoseProperty.RightKneeX: return pr.rknee_x;
                case PoseProperty.RightKneeY: return pr.rknee_y;
                case PoseProperty.LeftAnkleX: return pr.lankle_x;
                case PoseProperty.LeftAnkleY: return pr.lankle_y;
                case PoseProperty.RightAnkleX: return pr.rankle_x;
                case PoseProperty.RightAnkleY: return pr.rankle_y;
                default: return 0;
            }
        }
        return getObjectPropertyValue(result, prop as any);
    }

    function getPosePropertyValueID(result: ResultVariant, prop: PosePropertyID): any {
        if (!result) return 0;
        if (result instanceof PoseResult) {
            const pr = result as PoseResult;
            switch (prop) {
                case PosePropertyID.Name: return pr.name.length > 0 ? pr.name : "";
                case PosePropertyID.XCenter: return pr.xCenter;
                case PosePropertyID.YCenter: return pr.yCenter;
                case PosePropertyID.Width: return pr.width;
                case PosePropertyID.Height: return pr.height;
                case PosePropertyID.NoseX: return pr.nose_x;
                case PosePropertyID.NoseY: return pr.nose_y;
                case PosePropertyID.LeftEyeX: return pr.leye_x;
                case PosePropertyID.LeftEyeY: return pr.leye_y;
                case PosePropertyID.RightEyeX: return pr.reye_x;
                case PosePropertyID.RightEyeY: return pr.reye_y;
                case PosePropertyID.LeftEarX: return pr.lear_x;
                case PosePropertyID.LeftEarY: return pr.lear_y;
                case PosePropertyID.RightEarX: return pr.rear_x;
                case PosePropertyID.RightEarY: return pr.rear_y;
                case PosePropertyID.LeftShoulderX: return pr.lshoulder_x;
                case PosePropertyID.LeftShoulderY: return pr.lshoulder_y;
                case PosePropertyID.RightShoulderX: return pr.rshoulder_x;
                case PosePropertyID.RightShoulderY: return pr.rshoulder_y;
                case PosePropertyID.LeftElbowX: return pr.lelbow_x;
                case PosePropertyID.LeftElbowY: return pr.lelbow_y;
                case PosePropertyID.RightElbowX: return pr.relbow_x;
                case PosePropertyID.RightElbowY: return pr.relbow_y;
                case PosePropertyID.LeftWristX: return pr.lwrist_x;
                case PosePropertyID.LeftWristY: return pr.lwrist_y;
                case PosePropertyID.RightWristX: return pr.rwrist_x;
                case PosePropertyID.RightWristY: return pr.rwrist_y;
                case PosePropertyID.LeftHipX: return pr.lhip_x;
                case PosePropertyID.LeftHipY: return pr.lhip_y;
                case PosePropertyID.RightHipX: return pr.rhip_x;
                case PosePropertyID.RightHipY: return pr.rhip_y;
                case PosePropertyID.LeftKneeX: return pr.lknee_x;
                case PosePropertyID.LeftKneeY: return pr.lknee_y;
                case PosePropertyID.RightKneeX: return pr.rknee_x;
                case PosePropertyID.RightKneeY: return pr.rknee_y;
                case PosePropertyID.LeftAnkleX: return pr.lankle_x;
                case PosePropertyID.LeftAnkleY: return pr.lankle_y;
                case PosePropertyID.RightAnkleX: return pr.rankle_x;
                case PosePropertyID.RightAnkleY: return pr.rankle_y;
                default: return 0;
            }
        }
        return getObjectPropertyValueID(result, prop as any);
    }

    // Pose properties (with ID)
    export enum PoseProperty {
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
        //% block="Nose X"
        NoseX,
        //% block="Nose Y"
        NoseY,
        //% block="Left Eye X"
        LeftEyeX,
        //% block="Left Eye Y"
        LeftEyeY,
        //% block="Right Eye X"
        RightEyeX,
        //% block="Right Eye Y"
        RightEyeY,
        //% block="Left Ear X"
        LeftEarX,
        //% block="Left Ear Y"
        LeftEarY,
        //% block="Right Ear X"
        RightEarX,
        //% block="Right Ear Y"
        RightEarY,
        //% block="Left Shoulder X"
        LeftShoulderX,
        //% block="Left Shoulder Y"
        LeftShoulderY,
        //% block="Right Shoulder X"
        RightShoulderX,
        //% block="Right Shoulder Y"
        RightShoulderY,
        //% block="Left Elbow X"
        LeftElbowX,
        //% block="Left Elbow Y"
        LeftElbowY,
        //% block="Right Elbow X"
        RightElbowX,
        //% block="Right Elbow Y"
        RightElbowY,
        //% block="Left Wrist X"
        LeftWristX,
        //% block="Left Wrist Y"
        LeftWristY,
        //% block="Right Wrist X"
        RightWristX,
        //% block="Right Wrist Y"
        RightWristY,
        //% block="Left Hip X"
        LeftHipX,
        //% block="Left Hip Y"
        LeftHipY,
        //% block="Right Hip X"
        RightHipX,
        //% block="Right Hip Y"
        RightHipY,
        //% block="Left Knee X"
        LeftKneeX,
        //% block="Left Knee Y"
        LeftKneeY,
        //% block="Right Knee X"
        RightKneeX,
        //% block="Right Knee Y"
        RightKneeY,
        //% block="Left Ankle X"
        LeftAnkleX,
        //% block="Left Ankle Y"
        LeftAnkleY,
        //% block="Right Ankle X"
        RightAnkleX,
        //% block="Right Ankle Y"
        RightAnkleY,
    }

    // Pose properties (without ID)
    export enum PosePropertyID {
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
        //% block="Nose X"
        NoseX,
        //% block="Nose Y"
        NoseY,
        //% block="Left Eye X"
        LeftEyeX,
        //% block="Left Eye Y"
        LeftEyeY,
        //% block="Right Eye X"
        RightEyeX,
        //% block="Right Eye Y"
        RightEyeY,
        //% block="Left Ear X"
        LeftEarX,
        //% block="Left Ear Y"
        LeftEarY,
        //% block="Right Ear X"
        RightEarX,
        //% block="Right Ear Y"
        RightEarY,
        //% block="Left Shoulder X"
        LeftShoulderX,
        //% block="Left Shoulder Y"
        LeftShoulderY,
        //% block="Right Shoulder X"
        RightShoulderX,
        //% block="Right Shoulder Y"
        RightShoulderY,
        //% block="Left Elbow X"
        LeftElbowX,
        //% block="Left Elbow Y"
        LeftElbowY,
        //% block="Right Elbow X"
        RightElbowX,
        //% block="Right Elbow Y"
        RightElbowY,
        //% block="Left Wrist X"
        LeftWristX,
        //% block="Left Wrist Y"
        LeftWristY,
        //% block="Right Wrist X"
        RightWristX,
        //% block="Right Wrist Y"
        RightWristY,
        //% block="Left Hip X"
        LeftHipX,
        //% block="Left Hip Y"
        LeftHipY,
        //% block="Right Hip X"
        RightHipX,
        //% block="Right Hip Y"
        RightHipY,
        //% block="Left Knee X"
        LeftKneeX,
        //% block="Left Knee Y"
        LeftKneeY,
        //% block="Right Knee X"
        RightKneeX,
        //% block="Right Knee Y"
        RightKneeY,
        //% block="Left Ankle X"
        LeftAnkleX,
        //% block="Left Ankle Y"
        LeftAnkleY,
        //% block="Right Ankle X"
        RightAnkleX,
        //% block="Right Ankle Y"
        RightAnkleY,
    }

    /** Get one-time pose recognition result and cache it */
    //% block="get pose recognition result"
    //% weight=139
    //% group="Pose Recognition"
    export function getResultPoseRecogtion(): void {
        getResultInternal(ALGORITHM_POSE_RECOGNITION);
    }

    /** Whether pose detected */
    //% block="pose detected?"
    //% weight=138
    //% group="Pose Recognition"
    export function availablePoseRecogtion(): boolean {
        return availableInternal(ALGORITHM_POSE_RECOGNITION);
    }

    /** Pose property nearest to center */
    //% block="pose nearest to center %alg"
    //% weight=137
    //% group="Pose Recognition"
    export function getCachedCenterPoseResult(alg: PoseProperty): any {
        const r = getCachedCenterResultInternal(ALGORITHM_POSE_RECOGNITION);
        return getPosePropertyValue(r, alg);
    }

    /** Total number of detected poses */
    //% block="number of detected poses"
    //% weight=136
    //% group="Pose Recognition"
    export function getCachedResultNumPose(): number {
        return getCachedResultNumInternal(ALGORITHM_POSE_RECOGNITION);
    }

    /** Property of Nth pose */
    //% block="pose %index %alg"
    //% weight=135
    //% index.min=1 index.defl=1
    //% group="Pose Recognition"
    export function getCachedResultPoseProperty(index: number, alg: PoseProperty): any {
        const r = getCachedResultByIndexInternal(ALGORITHM_POSE_RECOGNITION, index - 1);
        return getPosePropertyValue(r, alg);
    }

    /** Total number of learned pose IDs */
    //% block="number of learned pose IDs"
    //% weight=134
    //% group="Pose Recognition"
    export function getNumLearnedPoseIDs(): number {
        return getCachedResultLearnedNumInternal(ALGORITHM_POSE_RECOGNITION);
    }

    /** Whether pose with specified ID exists */
    //% block="pose ID %index exists?"
    //% weight=133
    //% index.min=1 index.defl=1
    //% group="Pose Recognition"
    export function poseIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(ALGORITHM_POSE_RECOGNITION, index);
        return r != null;
    }

    /** Number of poses with specified ID */
    //% block="number of poses with ID %index"
    //% weight=132
    //% index.min=1 index.defl=1
    //% group="Pose Recognition"
    export function getNumPoseByID(index: number): number {
        return getCachedResultNumByIDInternal(ALGORITHM_POSE_RECOGNITION, index);
    }

    /** Property of pose with specified ID */
    //% block="pose ID %index %alg"
    //% weight=131
    //% index.min=1 index.defl=1
    //% group="Pose Recognition"
    export function getPosePropertyByID(index: number, alg: PosePropertyID): any {
        const r = getCachedResultByIDInternal(ALGORITHM_POSE_RECOGNITION, index);
        return getPosePropertyValueID(r, alg);
    }

    /** Property of Nth pose with specified ID */
    //% block="pose ID %id nth %n %alg"
    //% weight=130
    //% id.min=1 id.defl=1
    //% n.min=1 n.defl=1
    //% group="Pose Recognition"
    export function getPosePropertyByIDNth(id: number, n: number, alg: PosePropertyID): any {
        const r = getCachedIndexResultByIDInternal(ALGORITHM_POSE_RECOGNITION, id, n - 1);
        return getPosePropertyValueID(r, alg);
    }

}