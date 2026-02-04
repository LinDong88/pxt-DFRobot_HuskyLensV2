huskylens2.I2CInit()
huskylens2.switchAlgorithm(huskylens2.Algorithm.ALGORITHM_FACE_RECOGNITION)
basic.forever(function () {
    huskylens2.getResultFaceRecogtion()
    if (huskylens2.availableFaceRecogtion()) {
        serial.writeLine("ID:" + huskylens2.getCachedCenterResult(huskylens2.BasePropertyID.ID))
        serial.writeLine("NAME:" + huskylens2.getCachedCenterResult(huskylens2.BasePropertyID.Name))
        serial.writeLine("X:" + huskylens2.getCachedCenterResult(huskylens2.BasePropertyID.XCenter))
        serial.writeLine("Y:" + huskylens2.getCachedCenterResult(huskylens2.BasePropertyID.YCenter))
        serial.writeLine("W:" + huskylens2.getCachedCenterResult(huskylens2.BasePropertyID.Width))
        serial.writeLine("H:" + huskylens2.getCachedCenterResult(huskylens2.BasePropertyID.Height))
        serial.writeLine("----")
    }
})