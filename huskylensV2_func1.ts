/**
 * Custom graphic block
 */
//% weight=100 color=#0fbc11 icon="\uf067" block="HuskylensV1"
//% groups='["Communication","Algorithm Switch","Face Recognition","Object Recognition","Object Tracking","Color Recognition","Object Classification","Self-learning Classification","Instance Segmentation","Hand Recognition","Pose Recognition","License Plate Recognition","Optical Char Recognition","Line Tracking","Face Emotion Recognition","Tag Recognition","QR Code Recognition","Barcode Recognition"]'
namespace huskylensV2 {
    /**
     *  Init I2C until success
     */

    //% weight=200
    //%block="initialize via I2C until success"
    //% group="Communication"
    export function I2CInit(): void {
        beginInternal();
    }

    /**
     * Switch algorithm
     * @param alg select algorithm
     */
    //% block="switch algorithm %alg"
    //% weight=199
    //% group="Algorithm Switch"
    export function switchAlgorithm(alg: Algorithm): void {
        switchAlgorithmInternal(algorithmToID(alg));
    }

    /**
     * Request one-time face recognition result and store it
     */
    //% block="get face recognition result"
    //% weight=198
    //% group="Face Recognition"
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
    export function getFacePropertyByIDNth(id: number, n: number, alg: FacePropertyID): any {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_FACE_RECOGNITION, id, n - 1);
        return getFacePropertyValueID(r, alg);
    }

    // ================= Object Recognition =================
    /** Get one-time object recognition result and cache it */
    //% block="get object recognition result"
    //% weight=188
    //% group="Object Recognition"
    export function getResultObjectRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Whether object detected */
    //% block="object detected?"
    //% weight=187
    //% group="Object Recognition"
    export function availableObjectRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Object property nearest to center */
    //% block="object nearest to center %alg"
    //% weight=186
    //% group="Object Recognition"
    export function getCachedCenterObjectResult(alg: ObjectProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
        return getObjectPropertyValue(r, alg);
    }

    /** Total number of detected objects */
    //% block="number of detected objects"
    //% weight=185
    //% group="Object Recognition"
    export function getCachedResultNumObject(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Property of Nth object */
    //% block="object %index %alg"
    //% weight=184
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    export function getCachedResultObjectProperty(index: number, alg: ObjectProperty): number {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index - 1);
        return getObjectPropertyValue(r, alg);
    }

    /** Total number of learned object IDs */
    //% block="number of learned object IDs"
    //% weight=183
    //% group="Object Recognition"
    export function getNumLearnedObjectIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION);
    }

    /** Whether object with specified ID exists */
    //% block="object ID %index exists?"
    //% weight=182
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    export function objectIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index);
        return r != null;
    }

    /** Number of objects with specified ID */
    //% block="number of objects with ID %index"
    //% weight=181
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
    export function getNumObjectByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, index);
    }

    /** Property of object with specified ID */
    //% block="object ID %index %alg"
    //% weight=180
    //% index.min=1 index.defl=1
    //% group="Object Recognition"
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
    export function getObjectPropertyByIDNth(id: number, n: number, alg: ObjectPropertyID): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_OBJECT_RECOGNITION, id, n - 1);
        return getObjectPropertyValueID(r, alg);
    }

    // ================= Object Tracking =================
    /** Request one-time object tracking data and store in result */
    //% block="get object tracking result"
    //% weight=178
    //% group="Object Tracking"
    export function getResultObjectTracking(): void {
        getResultInternal(Algorithm.ALGORITHM_OBJECT_TRACKING);
    }

    /** Whether tracked object detected */
    //% block="tracked object detected?"
    //% weight=177
    //% group="Object Tracking"
    export function availableObjectTracking(): boolean {
        return availableInternal(Algorithm.ALGORITHM_OBJECT_TRACKING);
    }

    /** Property of tracked object */
    //% block="tracked object %alg"
    //% weight=176
    //% group="Object Tracking"
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
    export function getResultColorRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Whether color block detected */
    //% block="color block detected?"
    //% weight=174
    //% group="Color Recognition"
    export function availableColorRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Color block property nearest to center */
    //% block="color block nearest to center %alg"
    //% weight=173
    //% group="Color Recognition"
    export function getCachedCenterColorResult(alg: ColorProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
        return getColorPropertyValue(r, alg);
    }

    /** Total number of detected color blocks */
    //% block="number of detected color blocks"
    //% weight=172
    //% group="Color Recognition"
    export function getCachedResultNumColor(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Property of Nth color block */
    //% block="color block %index %alg"
    //% weight=171
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    export function getCachedResultColorProperty(index: number, alg: ColorProperty): number {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index - 1);
        return getColorPropertyValue(r, alg);
    }

    /** Total number of learned color block IDs */
    //% block="number of learned color block IDs"
    //% weight=170
    //% group="Color Recognition"
    export function getNumLearnedColorIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION);
    }

    /** Whether color block with specified ID exists */
    //% block="color block ID %index exists?"
    //% weight=169
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    export function colorIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index);
        return r != null;
    }

    /** Number of color blocks with specified ID */
    //% block="number of color blocks with ID %index"
    //% weight=168
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
    export function getNumColorByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, index);
    }

    /** Property of color block with specified ID */
    //% block="color block ID %index %alg"
    //% weight=167
    //% index.min=1 index.defl=1
    //% group="Color Recognition"
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
    export function getColorPropertyByIDNth(id: number, n: number, alg: ColorPropertyID): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_COLOR_RECOGNITION, id, n - 1);
        return getColorPropertyValueID(r, alg);
    }


    // ================= Object Classification =================
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
    export function getResultObjectClassification(): void {
        getResultInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION);
    }
    /** Whether classified object detected */
    //% block="classified object detected?"
    //% weight=3
    //% group="Object Classification"
    export function availableObjectClassification(): boolean {
        return availableInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION);
    }

    /** Total number of detected classified objects */
    //% block="number of detected classified objects"
    //% weight=2
    //% group="Object Classification"
    export function getCachedResultNumObjectClassification(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION);
    }

    /** Property of Nth classified object */
    //% block="classified object %num %alg"
    //% weight=1
    //% num.min=1 num.defl=1
    //% group="Object Classification"
    export function getCachedObjectClassificationResult(num: number, alg: ObjectClassificationProperty): any {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_OBJECT_CLASSIFICATION, num - 1);
        return getObjectClassificationPropertyValue(r, alg);
    }



    // ================= Self-Learning Classification =================
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
    export function getResultSelfLearningClassification(): void {
        getResultInternal(Algorithm.ALGORITHM_SELF_LEARNING_CLASSIFICATION);
    }

    /** Whether self-learning classification detected */
    //% block="self-learning classification detected?"
    //% weight=161
    //% group="Self-learning Classification"
    export function availableSelfLearningClassification(): boolean {
        return availableInternal(Algorithm.ALGORITHM_SELF_LEARNING_CLASSIFICATION);
    }

    /** Property of self-learning classification */
    //% block="self-learning classification %alg"
    //% weight=160
    //% group="Self-learning Classification"
    export function getCachedSelfLearningClassificationResult(alg: SelfLearningClassificationProperty): any {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_SELF_LEARNING_CLASSIFICATION);
        return getSelfLearningClassificationPropertyValue(r, alg);
    }

    // ================= Instance Segmentation =================
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
    export function getResultInstanceRecogtion(): void {
        getResultInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Whether instance detected */
    //% block="instance detected?"
    //% weight=158
    //% group="Instance Segmentation"
    export function availableInstanceRecogtion(): boolean {
        return availableInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Instance property nearest to center */
    //% block="instance nearest to center %alg"
    //% weight=157
    //% group="Instance Segmentation"
    export function getCachedCenterInstanceResult(alg: InstanceProperty): number {
        const r = getCachedCenterResultInternal(Algorithm.ALGORITHM_SEGMENT);
        return getInstancePropertyValue(r, alg);
    }

    /** Total number of detected instances */
    //% block="number of detected instances"
    //% weight=156
    //% group="Instance Segmentation"
    export function getCachedResultNumInstance(): number {
        return getCachedResultNumInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Property of Nth instance */
    //% block="instance %index %alg"
    //% weight=155
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    export function getCachedResultInstanceProperty(index: number, alg: InstanceProperty): number {
        const r = getCachedResultByIndexInternal(Algorithm.ALGORITHM_SEGMENT, index - 1);
        return getInstancePropertyValue(r, alg);
    }

    /** Total number of learned instance IDs */
    //% block="number of learned instance IDs"
    //% weight=154
    //% group="Instance Segmentation"
    export function getNumLearnedInstanceIDs(): number {
        return getCachedResultLearnedNumInternal(Algorithm.ALGORITHM_SEGMENT);
    }

    /** Whether instance with specified ID exists */
    //% block="instance ID %index exists?"
    //% weight=153
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    export function instanceIdExists(index: number): boolean {
        const r = getCachedResultByIDInternal(Algorithm.ALGORITHM_SEGMENT, index);
        return r != null;
    }

    /** Number of instances with specified ID */
    //% block="number of instances with ID %index"
    //% weight=152
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
    export function getNumInstanceByID(index: number): number {
        return getCachedResultNumByIDInternal(Algorithm.ALGORITHM_SEGMENT, index);
    }

    /** Property of instance with specified ID */
    //% block="instance ID %index %alg"
    //% weight=151
    //% index.min=1 index.defl=1
    //% group="Instance Segmentation"
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
    export function getInstancePropertyByIDNth(id: number, n: number, alg: InstancePropertyID): number {
        const r = getCachedIndexResultByIDInternal(Algorithm.ALGORITHM_SEGMENT, id, n - 1);
        return getInstancePropertyValueID(r, alg);
    }

}