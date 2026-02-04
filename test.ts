huskylens2.I2CInit()
huskylens2.switchAlgorithm(huskylens2.Algorithm.AlgorithmFaceRecognition)
huskylens2.playMusic("music.mp3", 50)
huskylens2.takePhoto()
basic.showString(huskylens2.getStoredPhotoName())
huskylens2.takeScreenshot()
basic.showString(huskylens2.getStoredScreenshotName())
huskylens2.drawBox(
0,
0,
0,
0,
0,
0
)
basic.forever(function () {
    basic.showNumber(huskylens2.getLearnedID())
    huskylens2.learnObjectAtCenter(huskylens2.AlgorithmLearnObjectAtCenter.AlgorithmFaceRecognition)
    huskylens2.learnObjectAtCenterNUM(128)
    huskylens2.learnObjectInBox(
    huskylens2.AlgorithmLearnObjectInBox.AlgorithmFaceRecognition,
    0,
    0,
    0,
    0
    )
    huskylens2.learnObjectInBoxNUM(
    128,
    0,
    0,
    0,
    0
    )
    huskylens2.forgetAllIDs(huskylens2.Algorithm.AlgorithmFaceRecognition)
    huskylens2.forgetAllIDsNUM(128)
    huskylens2.setNameOfID(huskylens2.AlgorithmLearnSetNameOfId.AlgorithmFaceRecognition, 1, "object")
})
basic.forever(function () {
    huskylens2.getResultFaceRecogtion()
    basic.showString("" + (huskylens2.availableFaceRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumFace())
    basic.showNumber(huskylens2.getCachedResultFaceProperty(1, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getNumLearnedFaceIDs())
    basic.showString("" + (huskylens2.faceIdExists(1)))
    basic.showNumber(huskylens2.getNumFaceByID(1))
    basic.showNumber(huskylens2.getFacePropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getFacePropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultObjectRecogtion()
    basic.showString("" + (huskylens2.availableObjectRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterObjectResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumObject())
    basic.showNumber(huskylens2.getCachedResultObjectProperty(1, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getNumLearnedObjectIDs())
    basic.showString("" + (huskylens2.objectIdExists(1)))
    basic.showNumber(huskylens2.getNumObjectByID(1))
    basic.showNumber(huskylens2.getObjectPropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getObjectPropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultColorRecogtion()
    basic.showString("" + (huskylens2.availableColorRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterColorResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumColor())
    basic.showNumber(huskylens2.getNumLearnedColorIDs())
    basic.showNumber(huskylens2.getCachedResultColorProperty(1, huskylens2.BasePropertyId.Id))
    basic.showString("" + (huskylens2.colorIdExists(1)))
    basic.showNumber(huskylens2.getNumColorByID(1))
    basic.showNumber(huskylens2.getColorPropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getColorPropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultObjectTracking()
    basic.showString("" + (huskylens2.availableObjectTracking()))
    basic.showNumber(huskylens2.getCachedObjectTrackingResult(huskylens2.BasePropertyId.Id))
})
basic.forever(function () {
    huskylens2.getResultInstanceRecogtion()
    basic.showString("" + (huskylens2.availableInstanceRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterInstanceResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumInstance())
    basic.showNumber(huskylens2.getCachedResultInstanceProperty(1, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getNumLearnedInstanceIDs())
    basic.showString("" + (huskylens2.instanceIdExists(1)))
    basic.showNumber(huskylens2.getNumInstanceByID(1))
    basic.showNumber(huskylens2.getInstancePropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getInstancePropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultGestureRecogtion()
    basic.showString("" + (huskylens2.availableGestureRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterGestureResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumGesture())
    basic.showNumber(huskylens2.getCachedResultGestureProperty(1, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getNumLearnedGestureIDs())
    basic.showString("" + (huskylens2.gestureIdExists(1)))
    basic.showNumber(huskylens2.getNumGestureByID(1))
    basic.showNumber(huskylens2.getGesturePropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getGesturePropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultObjectClassification()
    basic.showString("" + (huskylens2.availableObjectClassification()))
    basic.showNumber(huskylens2.getCachedResultNumObjectClassification())
    basic.showNumber(huskylens2.getCachedObjectClassificationResult(1, huskylens2.ObjectClassificationProperty.Id))
    huskylens2.getResultSelfLearningClassification()
    basic.showString("" + (huskylens2.availableSelfLearningClassification()))
    basic.showNumber(huskylens2.getCachedSelfLearningClassificationResult(huskylens2.SelfLearningClassificationProperty.Id))
})
basic.forever(function () {
    huskylens2.getResultPoseRecogtion()
    basic.showString("" + (huskylens2.availablePoseRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterPoseResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumPose())
    basic.showNumber(huskylens2.getCachedResultPoseProperty(1, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getNumLearnedPoseIDs())
    basic.showString("" + (huskylens2.poseIdExists(1)))
    basic.showNumber(huskylens2.getNumPoseByID(1))
    basic.showNumber(huskylens2.getPosePropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getPosePropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultPlateRecogtion()
    basic.showString("" + (huskylens2.availablePlateRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterPlateResult(huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getCachedResultNumPlate())
    basic.showNumber(huskylens2.getCachedResultPlateProperty(1, huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getNumLearnedPlateIDs())
    basic.showString("" + (huskylens2.plateIdExists(1)))
    basic.showNumber(huskylens2.getNumPlateByID(1))
    basic.showNumber(huskylens2.getPlatePropertyByID(1, huskylens2.BasePropertyContent.Name))
    basic.showNumber(huskylens2.getPlatePropertyByIDNth(1, 1, huskylens2.BasePropertyContent.Name))
})
basic.forever(function () {
    huskylens2.getResultTextRecogtion()
    basic.showString("" + (huskylens2.availableTextRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterTextResult(huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getNumLearnedTextIDs())
    basic.showString("" + (huskylens2.textIdExists(1)))
    basic.showNumber(huskylens2.getTextPropertyByID(1, huskylens2.BasePropertyContent.Name))
    huskylens2.getResultLineTracking()
    basic.showString("" + (huskylens2.availableLineTracking()))
    basic.showNumber(huskylens2.getCachedLineTrackingResult(huskylens2.LineTrackingProperty.XComponent))
    basic.showNumber(huskylens2.getLineTrackingBranchCount())
    basic.showNumber(huskylens2.getLineTrackingBranchProperty(1, huskylens2.LineTrackingProperty.XComponent))
})
basic.forever(function () {
    huskylens2.getResultEmotionRecogtion()
    basic.showString("" + (huskylens2.availableEmotionRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterEmotionResult(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getCachedResultNumEmotion())
    basic.showNumber(huskylens2.getCachedResultEmotionProperty(1, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.getNumLearnedEmotionIDs())
    basic.showString("" + (huskylens2.emotionIdExists(1)))
    basic.showNumber(huskylens2.getNumEmotionByID(1))
    basic.showNumber(huskylens2.getEmotionPropertyByID(1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.getEmotionPropertyByIDNth(1, 1, huskylens2.BaseProperty.Name))
})
basic.forever(function () {
    huskylens2.getResultTagRecogtion()
    basic.showString("" + (huskylens2.availableTagRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterTagResult(huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getCachedResultNumTag())
    basic.showNumber(huskylens2.getCachedResultTagProperty(1, huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getNumLearnedTagIDs())
    basic.showString("" + (huskylens2.tagIdExists(1)))
    basic.showNumber(huskylens2.getNumTagByID(1))
    basic.showNumber(huskylens2.getTagPropertyByID(1, huskylens2.BasePropertyContent.Name))
    basic.showNumber(huskylens2.getTagPropertyByIDNth(1, 1, huskylens2.BasePropertyContent.Name))
})
basic.forever(function () {
    huskylens2.getResultQRCodeRecogtion()
    basic.showString("" + (huskylens2.availableQRCodeRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterQRCodeResult(huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getCachedResultNumQRCode())
    basic.showNumber(huskylens2.getCachedResultQRCodeProperty(1, huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getNumLearnedQRCodeIDs())
    basic.showString("" + (huskylens2.qrcodeIdExists(1)))
    basic.showNumber(huskylens2.getNumQRCodeByID(1))
    basic.showNumber(huskylens2.getQRCodePropertyByID(1, huskylens2.BasePropertyContent.Name))
    basic.showNumber(huskylens2.getQRCodePropertyByIDNth(1, 1, huskylens2.BasePropertyContent.Name))
})
basic.forever(function () {
    huskylens2.getResultBarcodeRecogtion()
    basic.showString("" + (huskylens2.availableBarcodeRecogtion()))
    basic.showNumber(huskylens2.getCachedCenterBarcodeResult(huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getCachedResultNumBarcode())
    basic.showNumber(huskylens2.getCachedResultBarcodeProperty(1, huskylens2.BasePropertyContentId.Id))
    basic.showNumber(huskylens2.getNumLearnedBarcodeIDs())
    basic.showString("" + (huskylens2.barcodeIdExists(1)))
    basic.showNumber(huskylens2.getNumBarcodeByID(1))
    basic.showNumber(huskylens2.getBarcodePropertyByID(1, huskylens2.BasePropertyContent.Name))
    basic.showNumber(huskylens2.getBarcodePropertyByIDNth(1, 1, huskylens2.BasePropertyContent.Name))
})
basic.forever(function () {
    huskylens2.requestFallDetectionData()
    basic.showString("" + (huskylens2.fallDetected()))
    basic.showNumber(huskylens2.nearestFallDetection(huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.totalFallDetections())
    basic.showNumber(huskylens2.fallDetectionProperty(1, huskylens2.BasePropertyId.Id))
})
basic.forever(function () {
    huskylens2.requestFaceOrientationData()
    basic.showString("" + (huskylens2.faceOrientationDetected()))
    basic.showNumber(huskylens2.nearestFaceOrientation(huskylens2.FaceOrientationProperty.Id))
    basic.showNumber(huskylens2.totalFaceOrientations())
    basic.showNumber(huskylens2.totalLearnedFaceOrientations())
    basic.showNumber(huskylens2.faceOrientationProperty(1, huskylens2.FaceOrientationProperty.Id))
    basic.showString("" + (huskylens2.faceOrientationIDExists(1)))
    basic.showNumber(huskylens2.totalFaceOrientationsWithID(1))
    basic.showNumber(huskylens2.faceOrientationWithID(1, huskylens2.FaceOrientationPropertyId.Name))
    basic.showNumber(huskylens2.faceOrientationWithIDProperty(1, 1, huskylens2.FaceOrientationPropertyId.Name))
})
basic.forever(function () {
    huskylens2.selfTrainedModelswitchAlgorithm(128)
    huskylens2.requestData(128)
    basic.showString("" + (huskylens2.Detected(128)))
    basic.showNumber(huskylens2.nearest(128, huskylens2.BasePropertyId.Id))
    basic.showNumber(huskylens2.total(128))
    basic.showNumber(huskylens2.totalLearned(128))
    basic.showNumber(huskylens2.Property(128, 1, huskylens2.BasePropertyId.Id))
    basic.showString("" + (huskylens2.IDExists(128, 1)))
    basic.showNumber(huskylens2.totalWithID(128, 1))
    basic.showNumber(huskylens2.WithID(128, 1, huskylens2.BaseProperty.Name))
    basic.showNumber(huskylens2.WithIDProperty(
    128,
    1,
    1,
    huskylens2.BaseProperty.Name
    ))
})
basic.forever(function () {
    huskylens2.requestEyeGazeData()
    basic.showString("" + (huskylens2.eyeGazeDetected()))
    basic.showNumber(huskylens2.nearestEyeGaze(huskylens2.EyeGazeProperty.Id))
    basic.showNumber(huskylens2.totalEyeGazes())
    basic.showNumber(huskylens2.totalLearnedEyeGazes())
    basic.showNumber(huskylens2.eyeGazeProperty(1, huskylens2.EyeGazeProperty.Id))
    basic.showString("" + (huskylens2.gazeIDExists(1)))
    basic.showNumber(huskylens2.totalEyeGazesWithID(1))
    basic.showNumber(huskylens2.gazeWithID(1, huskylens2.EyeGazePropertyId.Name))
    basic.showNumber(huskylens2.gazeWithIDProperty(1, 1, huskylens2.EyeGazePropertyId.Name))
})
basic.forever(function () {
    huskylens2.showText(
    0,
    huskylens2.FontSize.Font20,
    0,
    0,
    ""
    )
    huskylens2.drawNewBox(
    0,
    0,
    0,
    0,
    0,
    0
    )
    huskylens2.clearText()
    huskylens2.clearBoxes()
    basic.showNumber(huskylens2.setRGB(0, 0, 0))
})
